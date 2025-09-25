import type { ReactNode } from "react";

export default function CommonLayout({ children }: { children: ReactNode }) {
  return <div>{children}</div>;
}