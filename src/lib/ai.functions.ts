import { createServerFn } from "@tanstack/react-start";
import { generateText, gateway } from "ai";
import { z } from "zod";
import {
  FALLBACK_ADAPTIVE_QUESTIONS,
  generateFallbackCareerDNA,
  type CareerDNA,
  type QuestContext,
} from "./career-quest-data";

type GatewayAI = {
  models: {
    generateContent: (input: {
      model: string;
      contents: unknown;
      config?: { systemInstruction?: string; responseMimeType?: string; temperature?: number };
    }) => Promise<{ text: string; candidates: Array<{ content: { parts: Array<{ text: string }> } }> }>;
  };
};

function getAI(): GatewayAI {
  return {
    models: {
      async generateContent({ model, contents, config }) {
        const prompt = Array.isArray(contents)
          ? contents
              .map((turn: any) => `${turn.role === "model" ? "Assistant" : "User"}: ${turn.parts?.map((part: any) => part.text ?? "").join(" ") ?? ""}`)
              .join("\n\n")
          : typeof contents === "string"
            ? contents
            : JSON.stringify(contents);
        const result = await generateText({
          model: gateway(model),
          system: config?.systemInstruction,
          prompt: config?.responseMimeType === "application/json"
            ? `${prompt}\n\nReturn only valid JSON. Do not wrap it in markdown fences.`
            : prompt,
          temperature: config?.temperature,
        });
        return {
          text: result.text,
          candidates: [{ content: { parts: [{ text: result.text }] } }],
        };
      },
    },
  };
}

/**
 * Resilient multi-model execution helper.
 * Tries the primary model first, and automatically falls back to secondary models
 * if a 503 (high demand) or 429 (rate-limit) or 404 (unavailable) occurs.
 */
async function callGeminiWithFallback(
  ai: GatewayAI,
  models: string[],
  params: {
    contents: unknown;
    config?: { systemInstruction?: string; responseMimeType?: string; temperature?: number };
  },
) {
  let lastError: unknown = null;
  for (const model of models) {
    try {
      const response = await ai.models.generateContent({
        model,
        contents: params.contents,
        config: params.config,
      });
      if (response && (response.text !== undefined || response.candidates?.length)) {
        return { response, modelUsed: model };
      }
    } catch (err: unknown) {
      console.warn(`Model ${model} encounter issue:`, err instanceof Error ? err.message : err);
      lastError = err;
      // Try next model in sequence
    }
  }
  throw lastError || new Error("All Gemini models were unavailable.");
}

const TEXT_MODELS = [
  "google/gemini-3.8-flash",
  "google/gemini-3.7-flash",
  "google/gemini-3.6-flash",
  "google/gemini-3.5-flash",
];

/* ------------------- Legacy Ask AI (Gemini Powered) ------------------- */
const LegacyInput = z.object({
  system: z.string().max(4000),
  messages: z
    .array(z.object({ role: z.enum(["user", "assistant"]), content: z.string().max(6000) }))
    .max(40),
});

export const askAI = createServerFn({ method: "POST" })
  .validator((d: unknown) => LegacyInput.parse(d))
  .handler(async ({ data }) => {
    try {
      const ai = getAI();
      const promptParts = [
        `System: ${data.system}`,
        ...data.messages.map((m) => `${m.role === "user" ? "User" : "Assistant"}: ${m.content}`),
      ].join("\n\n");

      const { response } = await callGeminiWithFallback(ai, TEXT_MODELS, {
        contents: promptParts,
      });

      const text = response.text?.trim() ?? "";
      if (!text) {
        return { ok: false as const, error: "The assistant could not answer that request." };
      }
      return { ok: true as const, text };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "AI request failed";
      return { ok: false as const, error: msg };
    }
  });

/* ------------------- Agentic Career Assistant ------------------- */
export type AgentAction =
  | { type: "SET_GOAL"; payload: { goal: string } }
  | { type: "UPDATE_SKILLS"; payload: { skills: Record<string, number> } }
  | { type: "ENROLL_COURSE"; payload: { courseId: string; title: string } }
  | { type: "RECOMMEND_JOBS"; payload: { jobIds: number[]; rationale: string } }
  | { type: "OPEN_MOCK_TEST"; payload: { subject: string } }
  | { type: "OPEN_MOCK_INTERVIEW"; payload: { role: string; difficulty: string } }
  | {
      type: "GENERATE_ROADMAP";
      payload: {
        goal: string;
        summary: string;
        weeks?: Array<{
          week: number;
          title: string;
          topics: string[];
          deliverable: string;
        }>;
      };
    };

export type AgentResponse = {
  ok: boolean;
  reply: string;
  actions: AgentAction[];
  suggestedChips: string[];
  error?: string;
};

const CareerAgentInput = z.object({
  message: z.string(),
  history: z
    .array(z.object({ role: z.enum(["user", "assistant"]), content: z.string() }))
    .optional(),
  userState: z
    .object({
      name: z.string().optional(),
      education: z.string().optional(),
      educationLevel: z.string().optional(),
      stream: z.string().optional(),
      headline: z.string().optional(),
      goal: z.string().optional(),
      skills: z.record(z.string(), z.number()).optional(),
      enrolledCourses: z.array(z.string()).optional(),
      lessonsDone: z.number().optional(),
      hours: z.number().optional(),
      cvName: z.string().optional(),
      recentTests: z.array(z.any()).optional(),
      recentInterviews: z.array(z.any()).optional(),
    })
    .optional(),
});

export const askCareerAgent = createServerFn({ method: "POST" })
  .validator((d: unknown) => CareerAgentInput.parse(d))
  .handler(async ({ data }): Promise<AgentResponse> => {
    try {
      const ai = getAI();
      const userName = data.userState?.name ?? "the learner";
      const userEducation = data.userState?.education ?? "Not provided";
      const userEducationLevel = data.userState?.educationLevel ?? "Undergraduate";
      const userStream = data.userState?.stream ?? "Computer Science & IT";
      const userHeadline =
        data.userState?.headline ?? "Aspiring Frontend Developer & UI Enthusiast";
      const currentGoal = data.userState?.goal ?? "Frontend Developer";
      const currentSkills = JSON.stringify(data.userState?.skills ?? {});
      const enrolled = JSON.stringify(data.userState?.enrolledCourses ?? []);

      const systemInstruction = `You are PATHFINDER's Lead Career Intelligence Advisor.
You converse with students, competitive exam aspirants, and job seekers (like ${userName}) across diverse academic disciplines (engineering, sciences, medicine, commerce, law, civil services, and school education) to help them clarify goals, audit skills, bridge learning gaps, build concrete week-by-week roadmaps, and excel in their fields.

USER PROFILE IN CONTEXT:
- Student Name: ${userName}
- Education Level: ${userEducationLevel}
- Academic Stream: ${userStream}
- Education Details: ${userEducation}
- Headline: ${userHeadline}
- Target Goal: ${currentGoal}
- Current Skills & Ratings: ${currentSkills}
- Currently Enrolled Courses: ${enrolled}
- Uploaded CV: ${data.userState?.cvName ?? "None yet"}
- Completed Lessons: ${data.userState?.lessonsDone ?? 0}
- Practice Tests Taken: ${JSON.stringify(data.userState?.recentTests ?? [])}
- Mock Interviews Taken: ${JSON.stringify(data.userState?.recentInterviews ?? [])}

MULTI-DISCIPLINARY INTELLIGENCE & ADAPTATION:
- Do NOT assume every student is in software engineering or UI design.
- Respect their declared Education Level (${userEducationLevel}) and Stream (${userStream}). For example:
  * If the student is in Class 10/11/12 (Science/Commerce/Arts), focus on board syllabus mastery, foundational concepts, competitive entrance strategy (JEE, NEET, CUET, CLAT), and study schedules.
  * If in Medical & Healthcare, provide rich academic guidance on anatomy, physiology, clinical biochemistry, and entrance prep. (Always clarify that online courses provide academic enrichment and do not substitute for formal clinical licensing).
  * If in Commerce & Finance, advise on accounting standards, DCF financial modeling, corporate governance, and CA/CFA pathways.
  * If in Law or Civil Services, advise on constitutional law, Indian polity, public administration, and GS answer writing.
  * If in Tech / Engineering, provide state-of-the-art software architecture, coding patterns, and system design.
- Provide concrete, detailed responses rather than generic placeholders.
- Never mention, request, repeat, or infer private contact details such as email addresses, phone numbers, or account identifiers. The assistant does not receive them.
- Act as an execution-oriented assistant, not only a conversational chatbot: turn requests into useful deliverables and platform actions when appropriate.
- If the user asks for course material, teach the topic directly in the reply. Include a short explanation, learning objectives, structured notes, examples, a practice exercise with an answer or solution outline, and a suggested next lesson. Do not merely recommend a course or say to visit another page.
- If asked for a learning roadmap, craft a week-by-week curriculum with realistic deliverables and include a "GENERATE_ROADMAP" action.
- When recommending courses, reference PATHFINDER's catalogue (NPTEL, SWAYAM, MIT OCW, Khan Academy, Coursera, Harvard Online, etc.) while still providing immediate self-contained learning material.

STRUCTURED AGENT ACTIONS:
When appropriate, trigger real platform actions that update the user's dashboard and profile:
- "SET_GOAL": { "goal": string }
- "UPDATE_SKILLS": { "skills": { [skillName]: number 0-100 } }
- "ENROLL_COURSE": { "courseId": string, "title": string }
- "GENERATE_ROADMAP": { "goal": string, "summary": string, "weeks": [ { "week": number, "title": string, "topics": string[], "deliverable": string } ] }
- "RECOMMEND_JOBS": { "jobIds": number[], "rationale": string }
- "OPEN_MOCK_TEST": { "subject": string }
- "OPEN_MOCK_INTERVIEW": { "role": string, "difficulty": "Easy" | "Medium" | "Hard" }

IMPORTANT OUTPUT FORMAT:
Output MUST be strict JSON with this exact structure:
{
  "reply": "Your in-depth, professional, empathetic conversational response formatted with clear paragraphs and bullet points if needed.",
  "actions": [
    { "type": "...", "payload": { ... } }
  ],
  "suggestedChips": ["Short next step tag 1", "Short next step tag 2", "Short next step tag 3"]
}`;

      // Build conversation turns for Gemini
      const contents: Array<{ role: "user" | "model"; parts: Array<{ text: string }> }> = [];

      if (data.history && data.history.length > 0) {
        for (const item of data.history) {
          contents.push({
            role: item.role === "user" ? "user" : "model",
            parts: [{ text: item.content.replace(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi, "[private email removed]") }],
          });
        }
      }

      contents.push({
        role: "user",
        parts: [{ text: data.message }],
      });

      const { response } = await callGeminiWithFallback(ai, TEXT_MODELS, {
        contents,
        config: {
          systemInstruction,
          responseMimeType: "application/json",
        },
      });

      const text = response.text?.trim() ?? "{}";
      const parsed = JSON.parse(text);

      if (!parsed.reply) {
        throw new Error("Gemini returned an empty reply payload.");
      }

      return {
        ok: true,
        reply: parsed.reply,
        actions: Array.isArray(parsed.actions) ? parsed.actions : [],
        suggestedChips: Array.isArray(parsed.suggestedChips)
          ? parsed.suggestedChips
          : ["Skill gaps", "Explore careers", "Mock interview"],
      };
    } catch (err: unknown) {
      console.error("askCareerAgent error:", err);
      const errMsg = err instanceof Error ? err.message : "Failed to connect with Gemini AI model.";
      return {
        ok: false,
        reply: "",
        actions: [],
        suggestedChips: [],
        error: errMsg,
      };
    }
  });

/* ------------------- Resume / CV Analysis ------------------- */
const ResumeInput = z.object({
  fileName: z.string(),
  content: z.string(),
  targetGoal: z.string(),
});

export const analyzeResumeWithGemini = createServerFn({ method: "POST" })
  .validator((d: unknown) => ResumeInput.parse(d))
  .handler(async ({ data }) => {
    try {
      const ai = getAI();
      const prompt = `Analyze this resume/CV for candidate aspiring to be a "${data.targetGoal}".
File name: ${data.fileName}
Resume Content/Summary:
${data.content.slice(0, 10000)}

Perform an intelligent skill gap analysis and return JSON:
{
  "candidateName": "Name or Sneha",
  "summary": "2-3 sentence overview of profile strengths and current standing",
  "matchScore": number (0-100),
  "extractedSkills": { "SkillName": number from 0-100 (e.g. JavaScript: 65, React: 55, Communication: 70) },
  "strengths": ["string", "string"],
  "gaps": ["string", "string"],
  "recommendations": ["string", "string"],
  "recommendedCourseId": "react-pro" | "web-foundations" | "typescript" | "dsa" | "communication" | "interview-prep"
}`;

      const { response } = await callGeminiWithFallback(ai, TEXT_MODELS, {
        contents: prompt,
        config: {
          responseMimeType: "application/json",
        },
      });

      const parsed = JSON.parse(response.text?.trim() ?? "{}");
      return { ok: true as const, data: parsed };
    } catch (err: unknown) {
      console.error("analyzeResume error:", err);
      return {
        ok: false as const,
        error: err instanceof Error ? err.message : "Resume analysis failed",
      };
    }
  });

/* ------------------- Mock Interview Evaluation ------------------- */
const InterviewInput = z.object({
  role: z.string(),
  difficulty: z.string(),
  question: z.string(),
  answer: z.string(),
  questionIndex: z.number().optional(),
  totalQuestions: z.number().optional(),
});

export const evaluateInterviewAnswerWithGemini = createServerFn({ method: "POST" })
  .validator((d: unknown) => InterviewInput.parse(d))
  .handler(async ({ data }) => {
    try {
      const ai = getAI();
      const prompt = `You are a senior tech interviewer evaluating an answer for a "${data.role}" (${data.difficulty} difficulty) interview.
Question: "${data.question}"
Candidate Answer: "${data.answer}"

Evaluate on 5 core dimensions (0 to 100 each):
1. technical: Technical accuracy and domain depth
2. problemSolving: Approach, logic, edge-case consideration
3. communication: Conciseness, clarity, flow
4. relevance: Directly addressing the specific question
5. confidence: Conviction, professional tone

Compute an overall score (0-100).
Provide actionable feedback:
- What worked well
- What was missing
- Concrete improvement advice (mentioning STAR method if behavioral).

Return valid JSON:
{
  "score": number,
  "breakdown": {
    "technical": number,
    "problemSolving": number,
    "communication": number,
    "relevance": number,
    "confidence": number
  },
  "feedback": "2-3 constructive sentences covering content, communication and skills",
  "strength": "Key strength noticed",
  "improvement": "Key area to improve",
  "recommendation": "One specific actionable advice"
}`;

      const { response } = await callGeminiWithFallback(ai, TEXT_MODELS, {
        contents: prompt,
        config: {
          responseMimeType: "application/json",
        },
      });

      const parsed = JSON.parse(response.text?.trim() ?? "{}");
      return { ok: true as const, data: parsed };
    } catch (err: unknown) {
      console.error("evaluateInterview error:", err);
      return {
        ok: false as const,
        error: err instanceof Error ? err.message : "Evaluation failed",
      };
    }
  });

/* ------------------- Speech Generation (Gemini TTS) ------------------- */
const SpeechInput = z.object({
  text: z.string().max(2000),
  voiceName: z.enum(["Kore", "Puck", "Charon", "Fenrir", "Zephyr"]).optional(),
});

export const generateSpeechWithGemini = createServerFn({ method: "POST" })
  .validator((d: unknown) => SpeechInput.parse(d))
  .handler(async ({ data }) => {
    try {
      const ai = getAI();
      const voice = data.voiceName ?? "Kore";
      const cleanText = data.text.replace(/[*_#`]/g, "").slice(0, 800);

      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash-lite-tts",
        contents: [
          {
            role: "user",
            parts: [{ text: cleanText }],
          },
        ],
        config: {
          responseModalities: ["AUDIO"],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: voice },
            },
          },
        },
      });

      const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      if (!base64Audio) {
        return { ok: false as const, error: "No audio generated" };
      }
      return { ok: true as const, audioBase64: base64Audio };
    } catch (err: unknown) {
      console.error("generateSpeech error:", err);
      return {
        ok: false as const,
        error: err instanceof Error ? err.message : "Speech generation failed",
      };
    }
  });

/* ------------------- Audio Transcription (Gemini STT) ------------------- */
const TranscribeInput = z.object({
  audioBase64: z.string(),
  mimeType: z.string().default("audio/webm"),
});

export const transcribeAudioWithGemini = createServerFn({ method: "POST" })
  .validator((d: unknown) => TranscribeInput.parse(d))
  .handler(async ({ data }) => {
    try {
      const ai = getAI();
      const response = await ai.models.generateContent({
        model: "gemini-3.5-transcribe",
        contents: {
          parts: [
            {
              inlineData: {
                mimeType: data.mimeType,
                data: data.audioBase64,
              },
            },
            {
              text: "Transcribe the spoken words accurately. Remove non-speech noise, keep the user's intended words including any self-corrections.",
            },
          ],
        },
      });

      const text = response.text?.trim() ?? "";
      return { ok: true as const, text };
    } catch (err: unknown) {
      console.error("transcribeAudio error:", err);
      return {
        ok: false as const,
        error: err instanceof Error ? err.message : "Audio transcription failed",
      };
    }
  });

/* ------------------- Career Quest: Adaptive Questions ------------------- */
const AdaptiveInput = z.object({
  stage: z.string(),
  fieldOrSubject: z.string().optional(),
  interests: z.string().optional(),
  coreAnswers: z.record(z.union([z.string(), z.array(z.string())])),
});

export const generateAdaptiveQuestionsServerFn = createServerFn({ method: "POST" })
  .validator((d: unknown) => AdaptiveInput.parse(d))
  .handler(async ({ data }) => {
    try {
      const ai = getAI();
      const prompt = `You are the lead psychometric and career intelligence engine for Pathfinder.
A user at stage "${data.stage}" (field: ${data.fieldOrSubject || "General"}, interests: ${data.interests || "None specified"}) has answered 15 core discovery questions across 5 dimensions:
1. The Thinker (creation vs analysis vs systems)
2. The Explorer (hands-on tech, design, science, business, writing)
3. The Decision Maker (intuition vs metrics, solo autonomy vs teamwork)
4. The Hidden Talent (unconventional superpowers)
5. The Future Self (ideal 5-year pride milestone)

Their answers:
${JSON.stringify(data.coreAnswers, null, 2)}

Analyze their patterns, conflicts, or intriguing intersections. Generate exactly 3 targeted follow-up multiple-choice questions to resolve ambiguities before synthesizing their Career DNA.
Respond ONLY with a JSON array conforming to:
[
  {
    "id": "followup_01",
    "question": "Clear, engaging question string (max 20 words)",
    "reason": "Why we are asking this (1 sentence explaining the trade-off or nuance)",
    "dimension": "e.g. tech_orientation | people_dynamic | learning_modality | risk_profile",
    "allowMultiple": false,
    "options": [
      { "id": "a", "text": "Option A text" },
      { "id": "b", "text": "Option B text" },
      { "id": "c", "text": "Option C text" },
      { "id": "d", "text": "Option D text" }
    ]
  }
]`;

      const { response } = await callGeminiWithFallback(ai, TEXT_MODELS, {
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          temperature: 0.4,
        },
      });

      const parsed = JSON.parse(response.text?.trim() ?? "[]");
      if (Array.isArray(parsed) && parsed.length >= 2) {
        return { ok: true as const, questions: parsed };
      }
      return { ok: true as const, questions: FALLBACK_ADAPTIVE_QUESTIONS };
    } catch (err: unknown) {
      console.warn("generateAdaptiveQuestions fallback activated:", err);
      return { ok: true as const, questions: FALLBACK_ADAPTIVE_QUESTIONS };
    }
  });

/* ------------------- Career Quest: Career DNA Synthesis ------------------- */
const CareerDNASynthesisInput = z.object({
  context: z.object({
    stage: z.string(),
    fieldOrSubject: z.string().optional(),
    interests: z.string().optional(),
    region: z.string().optional(),
  }),
  coreAnswers: z.record(z.union([z.string(), z.array(z.string())])),
  adaptiveAnswers: z.record(z.string()).optional(),
  version: z.number().optional().default(1),
});

export const generateCareerDNAServerFn = createServerFn({ method: "POST" })
  .validator((d: unknown) => CareerDNASynthesisInput.parse(d))
  .handler(async ({ data }): Promise<{ ok: boolean; dna: CareerDNA }> => {
    try {
      const ai = getAI();
      const prompt = `You are Pathfinder's Master Career Intelligence Synthesizer.
Synthesize a comprehensive, personalized "Career DNA Report" based on the user's discovery responses.

USER PROFILE:
- Stage: ${data.context.stage}
- Field / Subjects: ${data.context.fieldOrSubject || "Open"}
- Interests / Background: ${data.context.interests || "General"}
- Version: ${data.version}

15 CORE DISCOVERY RESPONSES:
${JSON.stringify(data.coreAnswers, null, 2)}

ADAPTIVE FOLLOW-UP RESPONSES:
${JSON.stringify(data.adaptiveAnswers || {}, null, 2)}

REQUIREMENTS:
1. "archetype": Give them an inspiring, precise archetype title (e.g. "The Visionary Systems Architect", "The Quantitative Strategist", "The Creative Product Alchemist", "The Human-Centered Innovator"), a compelling tagline, a 2-3 paragraph identity description celebrating their unique cognitive style, and 4 distinctive traits.
2. "dimensions": Scores from 20 to 98 across 8 dimensions: analytical, creative, technical, leadership, empathy, autonomy, adaptability, socialImpact.
3. "strengths": Array of 8 to 10 distinct strengths across categories ("cognitive", "execution", "creative", "interpersonal", "strategic"). Each strength MUST cite concrete evidence from their actual responses, have a 0-100 score, and include an actionable growth tip.
4. "careerMatches": Top 5 personalized career matches (matchScore descending from 96 to 80). For each match, provide:
   - "id": "match-1" etc.
   - "title": Job or profession title tailored to their stage and potential
   - "domain": Domain name
   - "matchScore": number 80-97
   - "summary": 1-2 sentence role summary
   - "whyMatched": Direct explanation linking to their specific answers
   - "dayInTheLife": Realistic breakdown of a typical day
   - "keySkills": 5 critical modern skills
   - "growthOutlook": Industry growth projections and salary/market demand
   - "starterProject": A concrete, exciting 1-week starter project they can build right now to test the waters
   - "recommendedCourseQuery": Search term for a relevant learning course
5. "unexpectedMatch": A non-obvious, surprising career path that bridges their unconventional strengths, with reason and exploration hook.
6. "actionableNextSteps": 3 structured milestones for Day 1-2, Day 3-4, and Day 5-7.
7. "whatWeStillDontKnow": 3 honest, refreshing admissions of remaining ambiguities that can only be discovered through real action.

Return pure JSON matching this exact structure:
{
  "archetype": {
    "title": "string",
    "tagline": "string",
    "description": "string",
    "traits": ["string", "string", "string", "string"]
  },
  "dimensions": {
    "analytical": number,
    "creative": number,
    "technical": number,
    "leadership": number,
    "empathy": number,
    "autonomy": number,
    "adaptability": number,
    "socialImpact": number
  },
  "strengths": [
    {
      "name": "string",
      "category": "cognitive" | "execution" | "creative" | "interpersonal" | "strategic",
      "score": number,
      "evidence": "string",
      "growthTip": "string"
    }
  ],
  "careerMatches": [
    {
      "id": "match-1",
      "title": "string",
      "domain": "string",
      "matchScore": number,
      "summary": "string",
      "whyMatched": "string",
      "dayInTheLife": "string",
      "keySkills": ["string"],
      "growthOutlook": "string",
      "starterProject": "string",
      "recommendedCourseQuery": "string"
    }
  ],
  "unexpectedMatch": {
    "title": "string",
    "domain": "string",
    "reason": "string",
    "explorationHook": "string"
  },
  "actionableNextSteps": [
    {
      "day": "string",
      "title": "string",
      "action": "string"
    }
  ],
  "whatWeStillDontKnow": ["string", "string", "string"]
}`;

      const { response } = await callGeminiWithFallback(ai, TEXT_MODELS, {
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          temperature: 0.5,
        },
      });

      const parsed = JSON.parse(response.text?.trim() ?? "{}");
      if (parsed.archetype && parsed.careerMatches?.length) {
        const fullDNA: CareerDNA = {
          id: `dna-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
          version: data.version,
          completedAt: new Date().toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          }),
          context: data.context as QuestContext,
          archetype: parsed.archetype,
          dimensions: parsed.dimensions ?? {
            analytical: 85,
            creative: 80,
            technical: 82,
            leadership: 70,
            empathy: 75,
            autonomy: 88,
            adaptability: 82,
            socialImpact: 76,
          },
          strengths: parsed.strengths ?? [],
          careerMatches: parsed.careerMatches ?? [],
          unexpectedMatch: parsed.unexpectedMatch ?? {
            title: "Creative Technologist",
            domain: "Design & Technology",
            reason: "Synthesizes creative intuition with engineering precision.",
            explorationHook: "Explore interactive prototyping tools like Three.js and Figma.",
          },
          actionableNextSteps: parsed.actionableNextSteps ?? [],
          whatWeStillDontKnow: parsed.whatWeStillDontKnow ?? [],
          answersSummary: { ...data.coreAnswers, ...(data.adaptiveAnswers || {}) },
        };
        return { ok: true, dna: fullDNA };
      }
      throw new Error("Invalid DNA schema returned by model");
    } catch (err: unknown) {
      console.warn("generateCareerDNA model fallback triggered:", err);
      const fallbackDNA = generateFallbackCareerDNA(
        data.context as QuestContext,
        data.coreAnswers,
        data.adaptiveAnswers,
        data.version,
      );
      return { ok: true, dna: fallbackDNA };
    }
  });
