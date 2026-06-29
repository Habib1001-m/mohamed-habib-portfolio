import { ReactNode } from "react";

interface RevealShellProps {
  id: string;
  children: ReactNode;
}

export default function RevealShell({ id, children }: RevealShellProps) {
  return <div data-reveal-shell={id}>{children}</div>;
}
