import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";

const channelData: Record<string, { subtitle: string; messages: { user: string; initials: string; color: string; time: string; text: string; reactions?: string }[] }> = {
  general: {
    subtitle: "Company-wide announcements",
    messages: [{ user: "Riya Das", initials: "RD", color: "#f43f5e", time: "9:00 AM", text: "Welcome to the team, everyone! ??", reactions: "?? 8" }],
  },
  "design-system": {
    subtitle: "A space for our design language",
    messages: [
      { user: "Maya Chen", initials: "MC", color: "#8b5cf6", time: "10:24 AM", text: "Pushed the new color tokens to the design system ??", reactions: "?? 4" },
      { user: "Jordan Lee", initials: "JL", color: "#f59e0b", time: "10:26 AM", text: "Love the contrast tweaks. Should we keep `--accent` for backwards compat?" },
      { user: "Alex Kim", initials: "AK", color: "#10b981", time: "10:27 AM", text: "+1 on backwards compat for one release cycle.", reactions: "?? 3" },
    ],
  },
  engineering: {
    subtitle: "Shipping the platform",
    messages: [{ user: "Sam Patel", initials: "SP", color: "#0ea5e9", time: "11:02 AM", text: "Auth refactor is merged. p99 latency dropped 40%.", reactions: "?? 6" }],
  },
  product: { subtitle: "Roadmap, specs, ideas", messages: [] },
  random: { subtitle: "Off-topic chatter", messages: [] },
};

const channels = ["general", "design-system", "engineering", "product", "random"];

export default function MessagesPage() {
  const { channel = "general" } = useParams();
  const data = useMemo(() => channelData[channel] ?? channelData.general, [channel]);

  return (
    <div className="h-full rounded-2xl border border-[rgb(var(--form-border-muted))] bg-white overflow-hidden grid grid-cols-[240px_1fr]">
      <div className="border-r border-[rgb(var(--form-border-muted))] p-3">
        <div className="h-10 rounded-xl border border-[rgb(var(--form-border-muted))] px-3 text-sm ui-text-muted flex items-center">Search messages</div>
        <p className="text-xs uppercase ui-text-muted mt-6 mb-2 font-semibold">Channels</p>
        <div className="space-y-1">
          {channels.map((name) => (
            <Link key={name} to={`/chat/${name}`} className={`h-9 px-2 rounded-lg flex items-center text-base ${channel === name ? "bg-[rgb(var(--accent))]" : "hover:bg-[rgb(var(--zinc-light))]"}`}>
              <span className="mr-2">#</span><span className="flex-1">{name}</span>
            </Link>
          ))}
        </div>
        <p className="text-xs uppercase ui-text-muted mt-6 mb-2 font-semibold">Direct messages</p>
        {[
          ["MC", "Maya Chen", "#8b5cf6"],
          ["JL", "Jordan Lee", "#f59e0b"],
          ["SP", "Sam Patel", "#0ea5e9"],
        ].map(([i, n, c]) => <div key={n} className="flex items-center gap-2 text-sm mb-2"><span className="w-5 h-5 rounded-full text-white text-[10px] grid place-items-center" style={{ background: c }}>{i}</span>{n}</div>)}
      </div>

      <div className="flex flex-col">
        <div className="h-20 px-4 border-b border-[rgb(var(--form-border-muted))] flex items-center justify-between">
          <div>
            <p className="text-2xl font-semibold"># {channel}</p>
            <p className="text-sm ui-text-muted">{data.subtitle}</p>
          </div>
          <p className="text-sm ui-text-muted">4 pinned · 14 members</p>
        </div>
        <div className="flex-1 p-6 space-y-6">
          {data.messages.length ? data.messages.map((m) => (
            <div key={`${m.user}-${m.time}`} className="flex gap-3">
              <div className="w-9 h-9 rounded-xl text-white text-xs font-bold grid place-items-center" style={{ background: m.color }}>{m.initials}</div>
              <div>
                <p className="text-lg font-semibold">{m.user} <span className="text-sm ui-text-muted font-normal">{m.time}</span></p>
                <p className="text-base mt-1">{m.text}</p>
                {m.reactions ? <button className="mt-2 h-7 px-3 rounded-full border ui-border text-sm">{m.reactions}</button> : null}
              </div>
            </div>
          )) : <div className="h-full grid place-items-center text-center"><div><p className="text-3xl font-bold">Welcome to #{channel}</p><p className="ui-text-muted mt-2">This is a brand new channel. Share an update, drop a link, or start a thread.</p></div></div>}
        </div>
        <div className="border-t border-[rgb(var(--form-border-muted))] p-4">
          <div className="h-[96px] rounded-2xl border ui-border px-4 py-3 flex flex-col justify-between">
            <p className="text-base ui-text-muted">Message # {channel}</p>
            <div className="flex items-center justify-between ui-text-muted text-sm">
              <span>+ &nbsp;?? &nbsp;@ &nbsp;?</span>
              <button className="h-8 px-4 rounded-xl ui-gradient text-white text-sm">Send</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

