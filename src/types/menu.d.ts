export interface menuItem extends menuListItem {
  children: menuItem[];
}

export interface menuListItem {
  id: number;
  path: string;
  parentId: number;
  title: string;
  icon?: string;
  permissions?: string;
  role: []
}
