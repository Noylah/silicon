export function calculateParamScore(
  valA: number | boolean,
  valB: number | boolean,
  preference: "min" | "max" | null,
  paramName: string,
) {
  if (!preference) {
    const a = typeof valA === "boolean" ? (valA ? 1 : 0) : valA;
    const b = typeof valB === "boolean" ? (valB ? 1 : 0) : valB;
    if (a === b) return { scoreA: 0, scoreB: 0 };
    if (paramName === "price")
      return a < b ? { scoreA: 1, scoreB: 0 } : { scoreA: 0, scoreB: 1 };
    return a > b ? { scoreA: 1, scoreB: 0 } : { scoreA: 0, scoreB: 1 };
  }
  let a = typeof valA === "boolean" ? (valA ? 1 : 0) : valA;
  let b = typeof valB === "boolean" ? (valB ? 1 : 0) : valB;
  if (preference === "min") {
    a = a * -1;
    b = b * -1;
  }
  if (a === b) return { scoreA: 0, scoreB: 0 };
  if (a > b) {
    return { scoreA: 2.5, scoreB: -2.5 };
  } else {
    return { scoreA: -2.5, scoreB: 2.5 };
  }
}
