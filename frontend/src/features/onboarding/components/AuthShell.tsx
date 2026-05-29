import type { ReactNode } from "react";

type AuthShellProps = {
  children: ReactNode;
  rightPanel?: ReactNode;
};

export default function AuthShell({ children, rightPanel }: AuthShellProps) {
  return (
    <div className="ui-page-bg grid min-h-screen grid-cols-1 lg:grid-cols-2">

      {/* LEFT — white form panel */}
      <section className="ui-surface relative flex h-screen flex-col border-r border-[rgb(var(--form-border-muted))] px-10 py-8 overflow-hidden">
        {children}
      </section>

      {/* RIGHT — feature panel */}
      <aside className="ui-page-bg hidden h-screen lg:flex items-center justify-center px-12 overflow-hidden">
        <div className="w-full max-w-[460px]">
          {rightPanel}
        </div>
      </aside>

    </div>
  );
}