interface BreadcrumbItem {
  link: string;
  label: string;
  level: number;
}

interface BreadcrumbState {
  crumbs: BreadcrumbItem[];
}

export { BreadcrumbItem, BreadcrumbState }
