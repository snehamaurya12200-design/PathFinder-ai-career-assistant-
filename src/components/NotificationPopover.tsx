import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  Bell,
  Check,
  CheckCheck,
  GraduationCap,
  Briefcase,
  Sparkles,
  MessageCircle,
  Trash2,
  ExternalLink,
} from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { usePathfinder, actions, type NotificationItem } from "@/lib/pathfinder-store";
import { toast } from "sonner";

export function NotificationPopover() {
  const store = usePathfinder((s) => s);
  const notifications = store.notifications;
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState<"all" | "unread">("all");

  const unreadCount = notifications.filter((n) => !n.read).length;

  const displayedNotifications = notifications.filter((n) => {
    if (filter === "unread") return !n.read;
    return true;
  });

  const handleMarkAllRead = () => {
    actions.markAllNotificationsRead();
    toast.success("All notifications marked as read");
  };

  const handleClearAll = () => {
    actions.clearNotifications();
    toast.info("Notification feed cleared");
  };

  const handleItemClick = (item: NotificationItem) => {
    if (!item.read) {
      actions.markNotificationRead(item.id);
    }
    if (item.link) {
      setOpen(false);
      window.location.href = item.link;
    }
  };

  const getItemIcon = (type: NotificationItem["type"]) => {
    switch (type) {
      case "lesson":
        return <GraduationCap className="h-4 w-4 text-violet" />;
      case "job":
        return <Briefcase className="h-4 w-4 text-sun" />;
      case "interview":
        return <MessageCircle className="h-4 w-4 text-pink-500" />;
      case "roadmap":
        return <Sparkles className="h-4 w-4 text-mint" />;
      case "system":
      default:
        return <Bell className="h-4 w-4 text-ink" />;
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          aria-label={`Notifications ${unreadCount > 0 ? `(${unreadCount} unread)` : ""}`}
          className="relative grid h-9 w-9 place-items-center rounded-full text-foreground/80 transition hover:bg-muted hover:text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        >
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute top-1.5 right-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-destructive px-1 text-[9px] font-bold text-destructive-foreground">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </button>
      </PopoverTrigger>

      <PopoverContent
        align="end"
        sideOffset={8}
        className="w-80 sm:w-96 rounded-3xl border-border bg-card p-4 shadow-soft"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-border/80">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-foreground">Notifications</span>
            {unreadCount > 0 && (
              <span className="rounded-full bg-destructive/10 px-2 py-0.5 text-[10px] font-bold text-destructive">
                {unreadCount} new
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <button
                type="button"
                onClick={handleMarkAllRead}
                title="Mark all as read"
                className="flex items-center gap-1 text-[11px] font-medium text-muted-foreground hover:text-foreground transition"
              >
                <CheckCheck className="h-3 w-3" />
                Read all
              </button>
            )}
            {notifications.length > 0 && (
              <button
                type="button"
                onClick={handleClearAll}
                title="Clear all notifications"
                className="text-muted-foreground hover:text-destructive transition p-1"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 py-2.5">
          <button
            type="button"
            onClick={() => setFilter("all")}
            className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
              filter === "all"
                ? "bg-ink text-ink-foreground"
                : "bg-muted text-muted-foreground hover:text-foreground"
            }`}
          >
            All ({notifications.length})
          </button>
          <button
            type="button"
            onClick={() => setFilter("unread")}
            className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
              filter === "unread"
                ? "bg-ink text-ink-foreground"
                : "bg-muted text-muted-foreground hover:text-foreground"
            }`}
          >
            Unread ({unreadCount})
          </button>
        </div>

        {/* Notification list */}
        <div className="max-h-80 space-y-2 overflow-y-auto pr-1">
          {displayedNotifications.length > 0 ? (
            displayedNotifications.map((notif) => (
              <div
                key={notif.id}
                onClick={() => handleItemClick(notif)}
                className={`group relative flex items-start gap-3 rounded-2xl p-3 text-left transition cursor-pointer ${
                  notif.read
                    ? "bg-background/40 hover:bg-muted/50 text-muted-foreground"
                    : "border border-border/80 bg-muted/30 hover:bg-muted/60 text-foreground"
                }`}
              >
                <div className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-xl bg-card shadow-xs">
                  {getItemIcon(notif.type)}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-1">
                    <p
                      className={`text-xs font-bold truncate ${notif.read ? "text-muted-foreground" : "text-foreground"}`}
                    >
                      {notif.title}
                    </p>
                    <span className="text-[10px] text-muted-foreground shrink-0">{notif.at}</span>
                  </div>
                  <p className="mt-0.5 text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                    {notif.message}
                  </p>
                  {notif.link && (
                    <span className="mt-1.5 inline-flex items-center gap-1 text-[10px] font-semibold text-primary/80 group-hover:text-primary">
                      View details <ExternalLink className="h-2.5 w-2.5" />
                    </span>
                  )}
                </div>

                {!notif.read && <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-violet" />}
              </div>
            ))
          ) : (
            <div className="py-8 text-center text-xs text-muted-foreground">
              {filter === "unread" ? "No unread notifications" : "No notifications yet"}
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
