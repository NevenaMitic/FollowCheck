function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

const PALETTE = [
  "#F87171", "#FB923C", "#FBBF24", "#A3E635",
  "#34D399", "#22D3EE", "#60A5FA", "#818CF8",
  "#C084FC", "#F472B6",
];

export function getAvatarProps(username: string) {
  const hash = hashString(username);
  const color = PALETTE[hash % PALETTE.length];
  const initials = username.slice(0, 2).toUpperCase();
  return { color, initials };
}