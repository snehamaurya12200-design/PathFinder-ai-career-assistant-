import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";

export function SectionShell({ children }: { children: ReactNode }) {
  return (
    <AppShell>
      <nav aria-label="Career sections" className="mb-6 flex flex-wrap gap-2">
        {(
          [
            { to: "/interviews", label: "Interviews" },
            { to: "/roadmap", label: "My Roadmaps" },
            { to: "/learning", label: "My development" },
            { to: "/skills", label: "Assessment Report" },
          ] as const
        ).map((item) => (
          <Button key={item.to} asChild variant="outline" size="sm">
            <Link to={item.to} activeProps={{ className: "bg-lilac text-violet" }}>
              {item.label}
            </Link>
          </Button>
        ))}
      </nav>
      {children}
    </AppShell>
  );
}
