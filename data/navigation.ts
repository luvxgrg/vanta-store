export interface NavigationItem {
  id: string;
  label: string;
  // Omit href until a destination exists; the Navbar renders a disabled link.
  href?: string;
}

export const primaryNavigation: NavigationItem[] = [
  { id: "new-in", label: "NEW IN", href: "/collections/new-in" },
  { id: "men", label: "MEN", href: "/collections/men" },
  { id: "women", label: "WOMEN", href: "/collections/women" },
  { id: "collections", label: "COLLECTIONS", href: "/collections/drop-001-form" },
];
