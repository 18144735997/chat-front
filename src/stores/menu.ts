import type { menuItem, menuListItem } from "@/types/menu";
import { defineStore } from "pinia";

interface IMenuState {
  isCollapse: boolean;
  menuList: menuItem[];
  breadList: Array<string>;
}


export const useMenuStore = defineStore("menu", {
  state: (): IMenuState => {
    return {
      isCollapse: false,
      menuList: [
        {
          id: 1,
          path: "/home",
          parentId: 0,
          title: "主页",
          icon: "home",
          role: ["0","1"],
          children: [],
        },
        {
          id: 2,
          path: "/chat",
          parentId: 0,
          title: "聊天室",
          icon: "appstore",
          role: ["0","1"],
          children: [],
        },
        {
          id: 3,
          path: "/page2",
          parentId: 0,
          title: "功能2",
          icon: "setting",
          role: ["0","1"],
          children: [],
        },
        {
          id: 3,
          path: "/page3",
          parentId: 0,
          title: "功能3",
          icon: "setting",
          role: ["0","1"],
          children: [],
        },
      ],
      breadList: [],
    };
  },
  actions: {
    collapse(isCollapse: boolean): void {
      this.isCollapse = isCollapse;
    },
    init(list: menuListItem[]): void {
      this.menuList = this.getMenuList(0, list);
    },
    getMenuList(id: number, list: menuListItem[]): menuItem[] {
      return list
        .filter((item: menuListItem) => item.parentId === id)
        .map((item: menuListItem) => {
          return {
            ...item,
            children: this.getMenuList(item.id, list),
          };
        });
    },
    updateBreadList(path: string): void {
      this.breadList = [...this.findMenuItemWithPath(path)];
      if (this.breadList.length > 1) {
        this.breadList.unshift("主页");
      }
    },
    findMenuItemWithPath(path: string): string[] {
      // 定义一个辅助函数，用于递归查找
      const findPathRecursive = (
        items: menuItem[],
        currentTitles: string[]
      ): string[] => {
        for (const item of items) {
          // 如果找到匹配的路径
          if (item.path === path) {
            // 返回当前路径及其所有父元素的 title 组成的数组
            return [...currentTitles, item.title];
          }

          // 如果有子菜单，继续递归查找
          if (item.children.length > 0) {
            const found = findPathRecursive(item.children, [
              ...currentTitles,
              item.title,
            ]);
            if (found.length > 0) {
              return found;
            }
          }
        }

        // 没有找到匹配路径
        return [];
      };

      // 遍历顶层菜单项进行查找

      for (let i = 0; i < this.menuList.length; i++) {
        const item = this.menuList[i];
        // 如果找到匹配的顶层菜单项路径
        if (item.path === path) {
          // 返回当前菜单项及其所有父元素的 title 组成的数组
          return [item.title];
        }

        // 如果有子菜单，继续递归查找
        if (item.children.length > 0) {
          const found = findPathRecursive(item.children, [item.title]);
          if (found.length > 0) {
            return found;
          }
        }
      }

      // 没有找到匹配路径
      return [];
    },
  },
});
