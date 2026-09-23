export type AccentColor = "green" | "blue" | "amber";

export const accentHex: Record<AccentColor, string> = {
  green: "#2ec87a",
  blue: "#5ab4d6",
  amber: "#e8a83a",
};

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function accentBorderClass(color: AccentColor) {
  switch (color) {
    case "green":
      return "border-l-accent-green";
    case "blue":
      return "border-l-accent-blue";
    case "amber":
      return "border-l-accent-amber";
  }
}

export function accentTextClass(color: AccentColor) {
  switch (color) {
    case "green":
      return "text-accent-green";
    case "blue":
      return "text-accent-blue";
    case "amber":
      return "text-accent-amber";
  }
}
