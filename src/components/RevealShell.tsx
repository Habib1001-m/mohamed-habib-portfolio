import { ReactNode } from "react";
import { FEATURES } from "../config/features";

interface RevealShellProps {
  id: string;
  children: ReactNode;
}

export default function RevealShell({ id, children }: RevealShellProps) {
  if (!FEATURES.motionShell) {
    return <>{children}</>;
  }

  return (
    <div data-reveal-shell={id} className="motion-safe:animate-[fadeIn_700ms_ease-out_both] motion-reduce:animate-none">
      {children}
    </div>
  );
}
