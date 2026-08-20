import type { ReactNode } from 'react';

export function PhoneFrame({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="w-[260px] rounded-[2rem] border-8 border-[#071028] bg-[#071028] shadow-xl">
        <div className="h-5 w-full rounded-t-[1.5rem] bg-[#071028]" />
        <div className="h-[480px] overflow-y-auto bg-background p-3">{children}</div>
        <div className="h-5 w-full rounded-b-[1.5rem] bg-[#071028]" />
      </div>
      <span className="text-sm font-medium text-muted-foreground">{title}</span>
    </div>
  );
}
