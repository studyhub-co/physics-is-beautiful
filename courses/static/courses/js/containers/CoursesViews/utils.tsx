export const calculateProgress = (
  currentPercent: number,
  completeBoundary?: number | null,
) => {
  if (completeBoundary) {
    // shrink boundary to 100%
    return (currentPercent * 100) / completeBoundary
  } else {
    return currentPercent
  }
}
