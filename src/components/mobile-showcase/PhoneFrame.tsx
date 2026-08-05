import type { ReactNode } from 'react';

export function PhoneFrame({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="w-[260px] rounded-[2rem] border-8 border-slate-900 bg-white shadow-xl">
        <div className="h-5 w-full rounded-t-[1.5rem] bg-slate-900" />
        <div className="h-[480px] overflow-y-auto bg-slate-50 p-3">{children}</div>
        <div className="h-5 w-full rounded-b-[1.5rem] bg-slate-900" />
      </div>
      <span className="text-sm font-medium text-slate-600">{title}</span>
    </div>
  );
}
