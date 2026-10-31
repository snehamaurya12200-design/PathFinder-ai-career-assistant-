import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  Mic,
  SendHorizontal,
  Sparkles,
  FileText,
  UserPen,
  Volume2,
  VolumeX,
  Loader2,
  Check,
  RotateCcw,
  BrainCircuit,
  Target,
  TrendingUp,
  ClipboardCheck,
  WandSparkles,
} from "lucide-react";
import { toast } from "sonner";
import { AppShell } from "@/components/AppShell";
import { actions, usePathfinder, type ChatMsg } from "@/lib/pathfinder-store";
import {
  askCareerAgent,
  generateSpeechWithGemini,
  transcribeAudioWithGemini,
  type AgentAction,
} from "@/lib/ai.functions";
import blob from "@/assets/blob.png";

export const Route = createFileRoute("/assistant")({
  head: () => ({
    meta: [
      { title: "AI Career Assistant — Pathfinder" },
      {
        name: "description",
        content: "Talk to your AI career consultant about goals, skills and next steps.",
      },
      { property: "og:title", content: "AI Career Assistant — Pathfinder" },
      {
        property: "og:description",
        content: "Voice-first AI career guidance powered by Google Gemini.",
      },
    ],
  }),
  component: Assistant,
});

const defaultChips = [
  "Explore careers",
  "Skill gaps",
  "Mock interview",
  "Build roadmap",
  "Resume tips",
  "Internships",
];

interface SpeechRecognitionEvent {
  results: { [index: number]: { [index: number]: { transcript: string } } };
}

interface BrowserSpeechRecognition {
  lang: string;
  interimResults: boolean;
  continuous: boolean;
  start: () => void;
  stop: () => void;
  onresult: (e: SpeechRecognitionEvent) => void;
  onend: () => void;
  onerror: (e: { error: string }) => void;
}

function Assistant() {
  const store = usePathfinder((s) => s);
  const msgs = store.chat;
  const [text, setText] = useState("");
  const [listening, setListening] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [speakingIdx, setSpeakingIdx] = useState<number | null>(null);

  // Default mode: text only (no automatic speech playback unless enabled)
  const [autoSpeak, setAutoSpeak] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      const fromStore = store.settings?.aiPreferences?.autoSpeak;
      if (typeof fromStore === "boolean") return fromStore;
      return localStorage.getItem("pathfinder_auto_speak") === "true";
    }
    return false;
  });

  // Keep autoSpeak in sync with store changes
  useEffect(() => {
    if (typeof store.settings?.aiPreferences?.autoSpeak === "boolean") {
      setAutoSpeak(store.settings.aiPreferences.autoSpeak);
    }
  }, [store.settings?.aiPreferences?.autoSpeak]);

  const [activeChips, setActiveChips] = useState<string[]>(defaultChips);
  const [lastActionNotice, setLastActionNotice] = useState<string | null>(null);
  const [focusMode, setFocusMode] = useState<"coach" | "interview" | "roadmap">("coach");

  const focusModes = [
    { id: "coach" as const, label: "Career coach", icon: BrainCircuit },
    { id: "interview" as const, label: "Interview lab", icon: ClipboardCheck },
    { id: "roadmap" as const, label: "Roadmap builder", icon: Target },
  ];

  const recognitionRef = useRef<BrowserSpeechRecognition | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const currentAudioRef = useRef<HTMLAudioElement | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs, processing]);

  // Clean up any audio and speech recognition on unmount
  useEffect(() => {
    return () => {
      stopAudio();
      stopListening();
    };
  }, []);

  function toggleAutoSpeak() {
    stopAudio();
    const next = !autoSpeak;
    setAutoSpeak(next);
    if (typeof window !== "undefined") {
      localStorage.setItem("pathfinder_auto_speak", String(next));
    }
    actions.updateSettings({
      aiPreferences: {
        ...store.settings.aiPreferences,
        autoSpeak: next,
      },
    });
    toast(next ? "Voice response mode enabled" : "Text-only mode (Voice playback off)");
  }

  function stopAudio() {
    if (currentAudioRef.current) {
      currentAudioRef.current.pause();
      currentAudioRef.current.currentTime = 0;
      currentAudioRef.current = null;
    }
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setSpeaking(false);
    setSpeakingIdx(null);
  }

  function stopListening() {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {
        // Ignore
      }
      recognitionRef.current = null;
    }
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
      try {
        mediaRecorderRef.current.stop();
      } catch {
        // Ignore
      }
      mediaRecorderRef.current = null;
    }
    setListening(false);
  }

  async function speakText(rawText: string, messageIdx?: number) {
    stopAudio();
    setSpeaking(true);
    if (messageIdx !== undefined) {
      setSpeakingIdx(messageIdx);
    }

    const clean = rawText
      .replace(/[*_#`]/g, "")
      .replace(/https?:\/\/\S+/g, "")
      .trim();

    try {
      const res = await generateSpeechWithGemini({
        data: { text: clean.slice(0, 700), voiceName: "Kore" },
      });

      if (res.ok && res.audioBase64) {
        const audio = new Audio(`data:audio/wav;base64,${res.audioBase64}`);
        currentAudioRef.current = audio;
        audio.onended = () => {
          setSpeaking(false);
          setSpeakingIdx(null);
          currentAudioRef.current = null;
        };
        audio.onerror = () => {
          fallbackSpeechSynthesis(clean);
        };
        await audio.play();
        return;
      }
    } catch {
      // Fallback
    }

    fallbackSpeechSynthesis(clean);
  }

  function fallbackSpeechSynthesis(clean: string) {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(clean);
      utterance.rate = 1.0;
      utterance.onend = () => {
        setSpeaking(false);
        setSpeakingIdx(null);
      };
      utterance.onerror = () => {
        setSpeaking(false);
        setSpeakingIdx(null);
      };
      window.speechSynthesis.speak(utterance);
    } else {
      setSpeaking(false);
      setSpeakingIdx(null);
    }
  }

  function executeAgentActions(actionList: AgentAction[]) {
    actionList.forEach((act) => {
      switch (act.type) {
        case "SET_GOAL":
          actions.setGoal(act.payload.goal);
          toast.success(`Career goal updated to ${act.payload.goal}`, {
            description: "Dashboard, roadmaps, and skills refreshed.",
          });
          setLastActionNotice(`Updated target goal: ${act.payload.goal}`);
          break;
        case "UPDATE_SKILLS":
          actions.updateSkillMap(act.payload.skills);
          toast.success("Skill progress updated", {
            description: Object.entries(act.payload.skills)
              .map(([k, v]) => `${k}: ${v}%`)
              .join(", "),
          });
          setLastActionNotice("Skills updated in your profile radar");
          break;
        case "ENROLL_COURSE":
          actions.enroll(act.payload.courseId);
          toast.success(`Enrolled in ${act.payload.title}`, {
            description: "View lessons in Dashboard and Learning sections.",
          });
          setLastActionNotice(`Enrolled: ${act.payload.title}`);
          break;
        case "RECOMMEND_JOBS":
          toast.info("Matched jobs available", {
            description: act.payload.rationale,
          });
          setLastActionNotice("Matched opportunities updated in Job Board");
          break;
        case "GENERATE_ROADMAP":
          actions.setCustomRoadmap({
            goal: act.payload.goal,
            summary: act.payload.summary,
            weeks: act.payload.weeks,
            generatedAt: new Date().toISOString(),
          });
          toast.success(`Personalized roadmap generated for ${act.payload.goal}`, {
            description: "Saved and accessible in Explore Careers & Learning.",
          });
          setLastActionNotice(`Roadmap ready for ${act.payload.goal}`);
          break;
        case "OPEN_MOCK_TEST":
          toast.info(`Mock test recommended: ${act.payload.subject}`);
          break;
        case "OPEN_MOCK_INTERVIEW":
          toast.info(`Mock interview prepared: ${act.payload.role} (${act.payload.difficulty})`);
          break;
      }
    });
  }

  async function send(userQuery: string) {
    const q = userQuery.trim();
    if (!q || processing) return;

    stopAudio();
    stopListening();
    setText("");
    setLastActionNotice(null);

    const modeContext =
      focusMode === "interview"
        ? "Respond as an interview coach: ask one focused follow-up when useful and give scoring criteria."
        : focusMode === "roadmap"
          ? "Respond as a roadmap architect: turn advice into sequenced milestones with clear deliverables."
          : "Respond as a pragmatic career coach: prioritize the highest-impact next step for this profile.";
    const enrichedQuery = `${modeContext}\n\nUser request: ${q}`;
    const userMsg: ChatMsg = { me: true, t: q };
    actions.addChatMessage(userMsg);
    setProcessing(true);

    try {
      // Pass previous turns excluding errors
      const historyPayload = msgs
        .filter((m) => !m.error)
        .slice(-10)
        .map((m) => ({
          role: m.me ? ("user" as const) : ("assistant" as const),
          content: m.t,
        }));

      const res = await askCareerAgent({
        data: {
          message: enrichedQuery,
          history: historyPayload,
          userState: {
            name: store.profile?.name,
            email: store.profile?.email,
            education: store.profile?.education,
            educationLevel: store.profile?.educationLevel,
            stream: store.profile?.stream,
            headline: store.profile?.headline,
            goal: store.goal,
            skills: store.skills,
            enrolledCourses: Object.keys(store.enrolled),
            lessonsDone: store.lessonsDone,
            hours: store.hours,
            cvName: store.cvName,
            recentTests: store.tests.slice(0, 3),
            recentInterviews: store.interviews.slice(0, 3),
          },
        },
      });

      if (res.ok && res.reply) {
        const assistantMsg: ChatMsg = { me: false, t: res.reply };
        actions.addChatMessage(assistantMsg);

        if (res.actions?.length) {
          executeAgentActions(res.actions);
        }

        if (res.suggestedChips?.length) {
          setActiveChips(res.suggestedChips);
        }

        // Only speak if user explicitly turned auto-speak ON
        if (autoSpeak) {
          speakText(res.reply);
        }
      } else {
        // Genuine error display with retry option
        const errDesc = res.error || "The AI career advisor could not process this request.";
        actions.addChatMessage({
          me: false,
          t: `I was unable to complete your request: ${errDesc}`,
          error: true,
          retryText: q,
        });
        toast.error("Career Assistant request failed", { description: errDesc });
      }
    } catch (err: unknown) {
      console.error("Assistant send error:", err);
      const msg = err instanceof Error ? err.message : "Connection failed";
      actions.addChatMessage({
        me: false,
        t: `Connection to Gemini failed: ${msg}. Please tap Retry.`,
        error: true,
        retryText: q,
      });
      toast.error("AI service error", { description: msg });
    } finally {
      setProcessing(false);
    }
  }

  function startVoiceInput() {
    stopAudio();

    const WindowWithSpeech = window as unknown as {
      SpeechRecognition?: new () => BrowserSpeechRecognition;
      webkitSpeechRecognition?: new () => BrowserSpeechRecognition;
    };
    const SpeechClass =
      WindowWithSpeech.SpeechRecognition ?? WindowWithSpeech.webkitSpeechRecognition;

    if (SpeechClass) {
      try {
        const recognizer = new SpeechClass();
        recognizer.lang = "en-US";
        recognizer.interimResults = true;
        recognizer.continuous = false;

        recognizer.onresult = (event: SpeechRecognitionEvent) => {
          const results = event.results;
          let transcript = "";
          for (let i = 0; i < Object.keys(results).length; i++) {
            transcript += results[i]?.[0]?.transcript ?? "";
          }
          if (transcript.trim()) {
            setText(transcript);
          }
        };

        recognizer.onend = () => {
          setListening(false);
          recognitionRef.current = null;
        };

        recognizer.onerror = () => {
          setListening(false);
          recognitionRef.current = null;
        };

        recognitionRef.current = recognizer;
        setListening(true);
        recognizer.start();
        return;
      } catch (e) {
        console.warn("SpeechRecognition fallback to MediaRecorder", e);
      }
    }

    // Fallback: MediaRecorder + Gemini 3.5 Transcribe
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
          audioChunksRef.current = [];
          const recorder = new MediaRecorder(stream);
          recorder.ondataavailable = (e) => {
            if (e.data.size > 0) audioChunksRef.current.push(e.data);
          };

          recorder.onstop = async () => {
            const blobData = new Blob(audioChunksRef.current, { type: "audio/webm" });
            stream.getTracks().forEach((track) => track.stop());
            setListening(false);
            mediaRecorderRef.current = null;

            try {
              const reader = new FileReader();
              reader.readAsDataURL(blobData);
              reader.onloadend = async () => {
                const base64 = (reader.result as string).split(",")[1];
                if (base64) {
                  setProcessing(true);
                  const res = await transcribeAudioWithGemini({
                    data: { audioBase64: base64, mimeType: "audio/webm" },
                  });
                  setProcessing(false);
                  if (res.ok && res.text) {
                    setText(res.text);
                  }
                }
              };
            } catch {
              setProcessing(false);
            }
          };

          mediaRecorderRef.current = recorder;
          setListening(true);
          recorder.start();
        })
        .catch(() => {
          toast.error("Microphone access denied. Please type your message.");
          setListening(false);
        });
    } else {
      toast.error("Voice input is not supported in this browser. Please type your message.");
    }
  }

  function toggleVoice() {
    if (speaking) {
      stopAudio();
      return;
    }

    if (listening) {
      stopListening();
      return;
    }

    startVoiceInput();
  }

  function handlePlayMessage(idx: number, messageText: string) {
    if (speaking && speakingIdx === idx) {
      stopAudio();
    } else {
      speakText(messageText, idx);
    }
  }

  return (
    <AppShell>
      <div className="relative mx-auto max-w-2xl overflow-hidden rounded-3xl border bg-card p-6">
        <img
          src={blob}
          alt=""
          width={816}
          height={816}
          className="pointer-events-none absolute -right-10 -top-10 w-40 opacity-80"
        />
        <div className="flex items-start justify-between">
          <h1 className="text-3xl font-bold leading-tight">
            Hello
            <br />
            Sneha
          </h1>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                stopAudio();
                actions.clearChat();
                setActiveChips(defaultChips);
                setLastActionNotice(null);
                toast("New conversation started");
              }}
              title="Start a fresh conversation"
              className="flex items-center gap-1 rounded-full border bg-muted/60 px-2.5 py-1 text-xs text-muted-foreground transition hover:bg-muted"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>New Chat</span>
            </button>

            <button
              onClick={toggleAutoSpeak}
              title={
                autoSpeak
                  ? "Voice auto-playback is ON. Click to mute."
                  : "Voice auto-playback is OFF. Click to enable."
              }
              className="flex items-center gap-1 rounded-full border bg-muted/60 px-2.5 py-1 text-xs text-muted-foreground transition hover:bg-muted"
            >
              {autoSpeak ? (
                <Volume2 className="h-3.5 w-3.5 text-violet" />
              ) : (
                <VolumeX className="h-3.5 w-3.5" />
              )}
              <span>{autoSpeak ? "Voice On" : "Voice Off"}</span>
            </button>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-3 gap-2 rounded-2xl border bg-background/60 p-1.5">
          {focusModes.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => setFocusMode(id)}
              className={`flex items-center justify-center gap-1.5 rounded-xl px-2 py-2 text-xs font-medium transition ${
                focusMode === id
                  ? "bg-ink text-ink-foreground shadow-sm"
                  : "text-muted-foreground hover:bg-muted"
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">{label}</span>
            </button>
          ))}
        </div>

        <div className="mt-3 grid grid-cols-3 gap-2">
          {[
            { label: "Target", value: store.goal, icon: Target },
            { label: "Skill signals", value: `${Object.keys(store.skills).length} tracked`, icon: TrendingUp },
            { label: "Next best step", value: focusMode === "interview" ? "Practice" : focusMode === "roadmap" ? "Plan" : "Discover", icon: WandSparkles },
          ].map(({ label, value, icon: Icon }) => (
            <div key={label} className="rounded-xl bg-muted/50 px-2.5 py-2">
              <div className="flex items-center gap-1 text-[10px] uppercase tracking-wide text-muted-foreground">
                <Icon className="h-3 w-3" />
                {label}
              </div>
              <p className="mt-1 truncate text-xs font-semibold">{value}</p>
            </div>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <button
            onClick={() => send("Show me my course material progress and what lesson is next.")}
            className="flex items-center gap-1 rounded-full bg-lilac px-3 py-1 text-xs transition hover:bg-lilac/80"
          >
            <FileText className="h-3 w-3" />
            Course material
          </button>
          <button
            onClick={() => send(`Summarize my profile standing for ${store.goal}.`)}
            className="flex items-center gap-1 rounded-full bg-lilac px-3 py-1 text-xs transition hover:bg-lilac/80"
          >
            <UserPen className="h-3 w-3" />
            My profile
          </button>
          {store.cvName && (
            <span className="flex items-center gap-1 rounded-full bg-mint/50 px-3 py-1 text-xs text-primary-foreground">
              <Check className="h-3 w-3" />
              CV: {store.cvName}
            </span>
          )}
        </div>

        {lastActionNotice && (
          <div className="mt-3 flex items-center gap-1.5 rounded-xl bg-mint/30 px-3 py-1.5 text-xs text-foreground animate-in fade-in">
            <Check className="h-3.5 w-3.5 text-success" />
            <span>{lastActionNotice}</span>
          </div>
        )}

        <div className="mt-6 max-h-[380px] space-y-3 overflow-y-auto pr-1">
          {msgs.map((m, i) => (
            <div key={i} className={`flex gap-2 ${m.me ? "justify-end" : ""}`}>
              {!m.me && <Sparkles className="mt-1 h-4 w-4 shrink-0 text-violet" />}
              <div
                className={`group relative max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${
                  m.me
                    ? "bg-lilac text-foreground"
                    : m.error
                      ? "border border-destructive/40 bg-destructive/10 text-destructive-foreground"
                      : "bg-muted/70 text-foreground"
                }`}
              >
                <p className="whitespace-pre-line leading-relaxed">{m.t}</p>

                {m.error && m.retryText && (
                  <div className="mt-2 flex items-center justify-end">
                    <button
                      onClick={() => send(m.retryText!)}
                      className="rounded-full bg-destructive/20 px-2.5 py-1 text-[11px] font-semibold text-destructive hover:bg-destructive/30"
                    >
                      Retry
                    </button>
                  </div>
                )}

                {!m.me && !m.error && (
                  <div className="mt-1 flex items-center justify-end">
                    <button
                      type="button"
                      onClick={() => handlePlayMessage(i, m.t)}
                      title={
                        speaking && speakingIdx === i ? "Stop speaking" : "Listen to this message"
                      }
                      aria-label="Listen to message"
                      className="rounded-full p-1 text-muted-foreground opacity-60 transition hover:bg-muted hover:opacity-100"
                    >
                      {speaking && speakingIdx === i ? (
                        <VolumeX className="h-3.5 w-3.5 text-destructive animate-pulse" />
                      ) : (
                        <Volume2 className="h-3.5 w-3.5" />
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}

          {processing && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Sparkles className="h-4 w-4 animate-spin text-violet" />
              <span>Pathfinder AI is thinking…</span>
            </div>
          )}

          {speaking && (
            <div className="flex items-center gap-2 text-xs text-violet">
              <Volume2 className="h-4 w-4 animate-pulse text-violet" />
              <span>Playing audio response… (tap speaker or mic to stop)</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          Use tags for better assistance
        </p>
        <div className="mt-2 flex flex-wrap justify-center gap-2">
          {activeChips.map((c, i) => (
            <button
              key={c}
              onClick={() => send(c)}
              className={`rounded-full px-3 py-1 text-xs transition hover:scale-105 ${["bg-lilac", "bg-blush", "bg-butter"][i % 3]}`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="mt-5 flex items-center gap-2">
          <button
            type="button"
            onClick={toggleVoice}
            aria-label="Voice input"
            title={
              speaking
                ? "Stop speaking"
                : listening
                  ? "Stop listening (keep transcription)"
                  : "Start voice input"
            }
            className={`grid h-11 w-11 shrink-0 place-items-center rounded-full bg-ink text-ink-foreground transition ${
              listening
                ? "pulse-ring ring-4 ring-violet"
                : speaking
                  ? "pulse-ring ring-4 ring-mint"
                  : ""
            }`}
          >
            {processing ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : speaking ? (
              <Volume2 className="h-5 w-5 text-mint" />
            ) : (
              <Mic className="h-5 w-5" />
            )}
          </button>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(text);
            }}
            className="ai-ring flex flex-1 items-center rounded-full px-4 py-2"
          >
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={
                listening
                  ? "Listening to your voice… tap mic to stop & edit"
                  : processing
                    ? "Consulting Gemini career advisor…"
                    : speaking
                      ? "Playing audio… (tap mic to stop)"
                      : "Ask me anything… (type or tap mic to speak)"
              }
              className="flex-1 bg-transparent text-sm outline-none"
            />
            <button
              type="submit"
              aria-label="Send"
              disabled={processing || !text.trim()}
              className="disabled:opacity-40"
            >
              <SendHorizontal className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    </AppShell>
  );
}
