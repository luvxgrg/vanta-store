export interface NavigationItem {
  id: string;
  label: string;
  // Omit href until a destination exists; the Navbar renders a disabled link.
  href?: string;
}

export const primaryNavigation: NavigationItem[] = [
  { id: "new-in", label: "NEW IN" },
  { id: "men", label: "MEN" },
  { id: "women", label: "WOMEN" },
  { id: "collections", label: "COLLECTIONS" },
];
