"use client";

import { getAvatarProps } from "@/lib/avatar";

export function Avatar({ username }: { username: string }) {
  const { color, initials } = getAvatarProps(username);
  return (
    <div
      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold text-white"
      style={{ backgroundColor: color }}
    >
      {initials}
    </div>
  );
}