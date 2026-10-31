import { useState } from "react";
import {
  LifeBuoy,
  Search,
  MessageCircle,
  BookOpen,
  Briefcase,
  CreditCard,
  Send,
  CheckCircle2,
  HelpCircle,
  ChevronDown,
  Sparkles,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { usePathfinder, actions } from "@/lib/pathfinder-store";
import { toast } from "sonner";

interface SupportCenterModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type FaqItem = {
  id: string;
  category: "AI Assistant" | "Courses & Learning" | "Job Applications" | "Account & Billing";
  question: string;
  answer: string;
};

const FAQS: FaqItem[] = [
  {
    id: "faq-1",
    category: "AI Assistant",
    question: "How does the AI Assistant personalize career advice?",
    answer:
      "Pathfinder passes your target career goal, skill audit levels, completed courses, and uploaded CV directly into Google Gemini 3.8. The model checks your exact skill gaps and provides customized weekly milestones rather than generic advice.",
  },
  {
    id: "faq-2",
    category: "AI Assistant",
    question: "How do I turn voice speech playback on or off?",
    answer:
      "You can toggle voice playback at any time using the 'Voice On / Voice Off' pill at the top of the AI Assistant screen or within Settings > AI Config. When turned off, the assistant operates in silent text-only mode.",
  },
  {
    id: "faq-3",
    category: "AI Assistant",
    question: "Can I generate a custom week-by-week learning roadmap?",
    answer:
      "Yes! Simply ask the AI Assistant: 'Can you generate a 4-week learning roadmap for me?'. Gemini will craft a custom curriculum with deliverables and automatically save it to your 'Explore Careers' and 'Learning' sections.",
  },
  {
    id: "faq-4",
    category: "Courses & Learning",
    question: "How are lesson hours and skill radar points calculated?",
    answer:
      "When you complete lessons and interactive code builds in courses like React Pro, the platform calculates completion percentages and applies skill gains (e.g. +8 points on completion) directly to your radar graph and dashboard progress tracker.",
  },
  {
    id: "faq-5",
    category: "Courses & Learning",
    question: "Can I enroll in multiple career tracks simultaneously?",
    answer:
      "Yes. You can explore courses in Frontend, UI/UX, Data Structures, and Communication. Your enrolled courses and progress persist automatically across sessions.",
  },
  {
    id: "faq-6",
    category: "Job Applications",
    question: "How does 1-click job application tracking work?",
    answer:
      "Clicking 'Easy Apply' on any opportunity in the Job Board immediately logs the application with an 'Applied' status. You can track progress across review stages, interview schedules, and offers in your applications feed.",
  },
  {
    id: "faq-7",
    category: "Job Applications",
    question: "Does uploading my CV boost my job match percentage?",
    answer:
      "Yes. The CV parser audits your resume against required role competencies and recommends high-impact courses to close any gaps before you apply.",
  },
  {
    id: "faq-8",
    category: "Account & Billing",
    question: "How do I activate the 1-month free Pathfinder Pro trial?",
    answer:
      "Click 'Upgrade now' in the sidebar or from your profile dropdown. The 1-month trial activates instantly with no credit card required in this demo environment.",
  },
  {
    id: "faq-9",
    category: "Account & Billing",
    question: "Can I reset my career progress data?",
    answer:
      "Yes. Open Settings > Privacy and click 'Reset All Pathfinder Data'. This will restore the platform back to initial sample state.",
  },
];

export function SupportCenterModal({ open, onOpenChange }: SupportCenterModalProps) {
  const store = usePathfinder((s) => s);
  const profile = store.profile;

  const [activeTab, setActiveTab] = useState("faq");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [expandedFaq, setExpandedFaq] = useState<string | null>("faq-1");

  // Contact form state
  const [subject, setSubject] = useState("");
  const [category, setCategory] = useState<FaqItem["category"] | "Other">("AI Assistant");
  const [priority, setPriority] = useState<"Normal" | "High" | "Urgent">("Normal");
  const [message, setMessage] = useState("");
  const [submittedTicketId, setSubmittedTicketId] = useState<string | null>(null);

  const categories = [
    "All",
    "AI Assistant",
    "Courses & Learning",
    "Job Applications",
    "Account & Billing",
  ];

  const filteredFaqs = FAQS.filter((f) => {
    const matchesCategory = selectedCategory === "All" || f.category === selectedCategory;
    const matchesSearch =
      !searchQuery.trim() ||
      f.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim()) {
      toast.error("Please enter a subject line");
      return;
    }
    if (!message.trim() || message.trim().length < 10) {
      toast.error("Please provide a detailed message (minimum 10 characters)");
      return;
    }

    const ticketId = actions.submitSupportTicket({
      subject: subject.trim(),
      category,
      priority,
      message: message.trim(),
    });

    setSubmittedTicketId(ticketId);
    toast.success(`Support Ticket #${ticketId} Logged`, {
      description: "Our career advisory team has received your ticket.",
    });
  };

  const handleResetForm = () => {
    setSubject("");
    setMessage("");
    setCategory("AI Assistant");
    setPriority("Normal");
    setSubmittedTicketId(null);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border-border bg-card p-6 shadow-soft">
        <DialogHeader className="text-left">
          <div className="flex items-center gap-2.5">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-lilac/50 text-foreground">
              <LifeBuoy className="h-5 w-5" />
            </div>
            <div>
              <DialogTitle className="text-xl font-bold text-foreground">
                Support Center
              </DialogTitle>
              <DialogDescription className="text-xs text-muted-foreground">
                Browse step-by-step guides, FAQs, or contact our dedicated career team.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full pt-1">
          <TabsList className="grid w-full grid-cols-2 rounded-2xl bg-muted/60 p-1 text-xs">
            <TabsTrigger value="faq" className="rounded-xl py-1.5 text-xs font-semibold">
              Frequently Asked Questions
            </TabsTrigger>
            <TabsTrigger value="contact" className="rounded-xl py-1.5 text-xs font-semibold">
              Contact Support Team
            </TabsTrigger>
          </TabsList>

          {/* TAB 1: FAQ */}
          <TabsContent value="faq" className="space-y-4 pt-3">
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search help topics, roadmaps, voice commands..."
                className="w-full rounded-2xl border border-input bg-background py-2 pl-9 pr-3 text-xs text-foreground focus:ring-2 focus:ring-ring"
              />
            </div>

            {/* Category Filter Chips */}
            <div className="flex flex-wrap gap-1.5">
              {categories.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setSelectedCategory(c)}
                  className={`rounded-full px-2.5 py-1 text-[11px] font-semibold transition ${
                    selectedCategory === c
                      ? "bg-ink text-ink-foreground"
                      : "border border-border bg-card text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>

            {/* FAQ List */}
            <div className="space-y-2 pt-1 max-h-[380px] overflow-y-auto pr-1">
              {filteredFaqs.length > 0 ? (
                filteredFaqs.map((faq) => {
                  const isExpanded = expandedFaq === faq.id;
                  return (
                    <div
                      key={faq.id}
                      className="rounded-2xl border border-border/80 bg-background/50 transition overflow-hidden"
                    >
                      <button
                        type="button"
                        onClick={() => setExpandedFaq(isExpanded ? null : faq.id)}
                        className="flex w-full items-center justify-between p-3.5 text-left text-xs font-bold text-foreground hover:bg-muted/30"
                      >
                        <span className="flex items-center gap-2">
                          <HelpCircle className="h-3.5 w-3.5 text-violet shrink-0" />
                          {faq.question}
                        </span>
                        <ChevronDown
                          className={`h-4 w-4 text-muted-foreground transition-transform duration-200 shrink-0 ${
                            isExpanded ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {isExpanded && (
                        <div className="px-3.5 pb-3.5 pt-1 text-xs text-muted-foreground leading-relaxed border-t border-border/40">
                          <p>{faq.answer}</p>
                          <span className="mt-2 inline-block rounded-md bg-muted px-2 py-0.5 text-[10px] font-medium text-foreground/70">
                            Category: {faq.category}
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })
              ) : (
                <div className="rounded-2xl border border-dashed border-border p-6 text-center text-xs text-muted-foreground">
                  No matching help articles found. Try searching a different keyword or contact our
                  team directly below.
                </div>
              )}
            </div>
          </TabsContent>

          {/* TAB 2: CONTACT SUPPORT */}
          <TabsContent value="contact" className="space-y-4 pt-3">
            {submittedTicketId ? (
              <div className="rounded-3xl border border-border bg-mint/20 p-6 text-center space-y-3">
                <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-mint text-primary-foreground shadow-sm">
                  <CheckCircle2 className="h-6 w-6 text-success" />
                </div>
                <h4 className="text-base font-bold text-foreground">
                  Support Ticket #{submittedTicketId} Logged
                </h4>
                <p className="text-xs text-muted-foreground max-w-sm mx-auto leading-relaxed">
                  Thank you, {profile.name}! Your request has been forwarded to our career support
                  queue. A career specialist will respond to {profile.email} within 2 hours.
                </p>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={handleResetForm}
                    className="rounded-full bg-ink px-4 py-1.5 text-xs font-semibold text-ink-foreground hover:opacity-90"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleTicketSubmit} className="space-y-3.5">
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-foreground">Your Name</label>
                    <input
                      type="text"
                      disabled
                      value={profile.name}
                      className="w-full rounded-xl border border-input bg-muted/50 py-2 px-3 text-xs text-muted-foreground"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-foreground">Email Address</label>
                    <input
                      type="email"
                      disabled
                      value={profile.email}
                      className="w-full rounded-xl border border-input bg-muted/50 py-2 px-3 text-xs text-muted-foreground"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-foreground">
                      Inquiry Category
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as FaqItem["category"] | "Other")}
                      className="w-full rounded-xl border border-input bg-background py-2 px-3 text-xs text-foreground focus:ring-2 focus:ring-ring"
                    >
                      <option value="AI Assistant">AI Assistant & Gemini Prompts</option>
                      <option value="Courses & Learning">Courses & Curriculum</option>
                      <option value="Job Applications">Job Applications & CV</option>
                      <option value="Account & Billing">Account & Billing</option>
                      <option value="Other">Other Question</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-foreground">Priority</label>
                    <select
                      value={priority}
                      onChange={(e) => setPriority(e.target.value as "Normal" | "High" | "Urgent")}
                      className="w-full rounded-xl border border-input bg-background py-2 px-3 text-xs text-foreground focus:ring-2 focus:ring-ring"
                    >
                      <option value="Normal">Normal (Response within 24h)</option>
                      <option value="High">High (Response within 4h)</option>
                      <option value="Urgent">Urgent (Immediate attention)</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-foreground">Subject</label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    required
                    placeholder="e.g. Issue connecting AI roadmap to learning tab"
                    className="w-full rounded-xl border border-input bg-background py-2 px-3 text-xs text-foreground focus:ring-2 focus:ring-ring"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-foreground">Detailed Message</label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                    required
                    placeholder="Please explain the question or problem in detail..."
                    className="w-full rounded-xl border border-input bg-background p-3 text-xs text-foreground focus:ring-2 focus:ring-ring"
                  />
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    className="flex items-center gap-2 rounded-full bg-ink px-5 py-2 text-xs font-semibold text-ink-foreground transition hover:opacity-90"
                  >
                    <Send className="h-3.5 w-3.5" />
                    Submit Support Ticket
                  </button>
                </div>
              </form>
            )}
          </TabsContent>
        </Tabs>

        <DialogFooter className="pt-2">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="rounded-full border border-border px-4 py-1.5 text-xs font-semibold text-muted-foreground hover:bg-muted"
          >
            Close
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
