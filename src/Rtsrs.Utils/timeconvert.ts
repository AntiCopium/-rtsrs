// deno-lint-ignore-file no-explicit-any
export function minToMilli(time: any): number {
  return time * 60000;
}

export function MillitoMin(time: any): number {
  return time / 60000;
}
