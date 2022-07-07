import { saveLocalMenu } from "../utils";

// 解决 多次请求 菜单问题
function getMenus() {
  const job = new Promise((resolve) => {
    const result = [
      { "menu_id": 1, "title": "图标库", "path": "/icons", "key": "icons", "parentKey": "", "icon": "icon_pen", "keepAlive": true, "order": 1 },
      { "menu_id": 2, "title": "列表", "path": "/namelist", "key": "namelist1", "parentKey": "", "icon": "icon_infopersonal", "order": 2, "keepAlive": false },
      { "menu_id": 3, "title": "列表详细","isShowOnMenu":false, "path": "/:id", "key": "detailID", "parentKey": "namelist1", "icon": "icon_infopersonal", "order": 3, "keepAlive": false }
    ]
    saveLocalMenu(result)
    resolve(result)
  })
  return job
}

export { default as ajax } from "./ajax";
export * from "./var";
export { getMenus };

