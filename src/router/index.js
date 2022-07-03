import { setUserMenu } from "@/store/action";
import { formatMenu, reduceMenuList } from "@/utils";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { CacheRoute, CacheSwitch } from "react-router-cache-route";
import { Route } from "react-router-dom";
import Intercept from "./intercept.js";
import routerList from "./list";

/**
 *
 * @param {Array} menuList 用户全局用户路由列表
 * @param {Function} setStateMenuList 设置全局用户路由列表
 * @returns {Array} 返回渲染的路由列表组件
 */
function useRouter(setStateMenuList) {
  const [ajaxUserMenuList, setAjaxUserMenuList] = useState([]); // 网络请求回来的 路由列表
  const [mergeRouterList, setMergeLRouterList] = useState([]);// 本地 和 接口返回的路由列表 合并的结果
  useEffect(() => {
    if (setStateMenuList && typeof setStateMenuList === "function") {
    //   getMenus().then((list) => {
    //     const formatList = formatMenu(list)
    //     const userMenus = reduceMenuList(formatList);
    //     // 把请求的数据 和 本地pages页面暴露出的路由列表合并
    //     let routers = routerList.map((router) => {
    //       let find = userMenus.find((i) => (i[MENU_PARENTPATH] || "") + i[MENU_PATH] === router[MENU_PATH]);
    //       if (find) {
    //         router = { ...find, ...router }; // 本地 优先 接口结果
    //       } else {
    //         router[MENU_KEY] = router[MENU_PATH];
    //       }
    //       return router;
    //     });
    //     if (list && list.length) {
    //       setStateMenuList(formatList);
    //       setAjaxUserMenuList(userMenus);
    //       setMergeLRouterList(routerList);
    //     }
    //   });
        const list =[
          {
            menu_id: 9,
            [MENU_TITLE]: "列表页",
            [MENU_PATH]: "/list",
            [MENU_KEY]: "list",
            [MENU_PARENTKEY]: "",
            [MENU_ICON]: "icon_list",
            [MENU_KEEPALIVE]: "false",
            order: 1,
          },
          {
            menu_id: 10,
            [MENU_TITLE]: "卡片列表",
            [MENU_PATH]: "/card",
            [MENU_KEY]: "listCard",
            [MENU_PARENTKEY]: "list",
            [MENU_ICON]: "",
            [MENU_KEEPALIVE]: "false",
            order: 5485,
          },
          {
            menu_id: 11,
            [MENU_TITLE]: "查询列表",
            [MENU_PATH]: "/search",
            [MENU_KEY]: "listSearch",
            [MENU_PARENTKEY]: "list",
            [MENU_ICON]: "",
            [MENU_KEEPALIVE]: "false",
            order: 9588,
          },
          {
            menu_id: 7,
            [MENU_TITLE]: "表单页",
            [MENU_PATH]: "/form",
            [MENU_KEY]: "from",
            [MENU_PARENTKEY]: "",
            [MENU_ICON]: "icon_form",
            [MENU_KEEPALIVE]: "false",
            order: 3,
          },
          {
            menu_id: 6,
            [MENU_TITLE]: "基础表单",
            [MENU_PATH]: "/index",
            [MENU_KEY]: "formIndex",
            [MENU_PARENTKEY]: "from",
            [MENU_ICON]: "",
            [MENU_KEEPALIVE]: "false",
            order: 9654,
          },
          {
            menu_id: 1,
            [MENU_TITLE]: "详情页",
            [MENU_PATH]: "/details",
            [MENU_KEY]: "details",
            [MENU_PARENTKEY]: "",
            [MENU_ICON]: "icon_edit",
            [MENU_KEEPALIVE]: "false",
            order: 3,
          },
          {
            menu_id: 2,
            [MENU_TITLE]: "个人中心",
            [MENU_PATH]: "/person",
            [MENU_KEY]: "detailsPerson",
            [MENU_PARENTKEY]: "details",
            [MENU_ICON]: "icon_infopersonal",
            [MENU_KEEPALIVE]: "false",
            order: 9998,
          },
          {
            menu_id: 16,
            [MENU_TITLE]: "结果页",
            [MENU_PATH]: "/result",
            [MENU_KEY]: "result",
            [MENU_PARENTKEY]: "",
            [MENU_ICON]: "icon_voiceprint",
            [MENU_KEEPALIVE]: "false",
            order: 4,
          },
          {
            menu_id: 3,
            [MENU_TITLE]: "403",
            [MENU_PATH]: "/403",
            [MENU_KEY]: "error403",
            [MENU_PARENTKEY]: "result",
            [MENU_ICON]: "icon_locking",
            [MENU_KEEPALIVE]: "false",
            order: 0,
          },
          {
            menu_id: 4,
            [MENU_TITLE]: "404",
            [MENU_PATH]: "/404",
            [MENU_KEY]: "error404",
            [MENU_PARENTKEY]: "result",
            [MENU_ICON]: "icon_close",
            [MENU_KEEPALIVE]: "false",
            order: 1,
          },
          {
            menu_id: 5,
            [MENU_TITLE]: "500",
            [MENU_PATH]: "/500",
            [MENU_KEY]: "error500",
            [MENU_PARENTKEY]: "result",
            [MENU_ICON]: "icon_privacy_closed",
            [MENU_KEEPALIVE]: "false",
            order: 4568,
          },
          {
            menu_id: 17,
            [MENU_TITLE]: "统计",
            [MENU_PATH]: "/statistics",
            [MENU_KEY]: "statistics",
            [MENU_PARENTKEY]: "",
            [MENU_ICON]: "icon_MTR",
            [MENU_KEEPALIVE]: "true",
            order: 5,
          },
          {
            menu_id: 18,
            [MENU_TITLE]: "访客统计",
            [MENU_PATH]: "/visitor",
            [MENU_KEY]: "visitor",
            [MENU_PARENTKEY]: "statistics",
            [MENU_ICON]: "icon_addresslist",
            [MENU_KEEPALIVE]: "true",
            order: 1,
          },
          {
            menu_id: 12,
            [MENU_TITLE]: "权限管理",
            [MENU_PATH]: "/power",
            [MENU_KEY]: "power",
            [MENU_PARENTKEY]: "",
            [MENU_ICON]: "icon_set",
            [MENU_KEEPALIVE]: "false",
            order: 9,
          },
          {
            menu_id: 14,
            [MENU_TITLE]: "权限类别",
            [MENU_PATH]: "/type",
            [MENU_KEY]: "powerType",
            [MENU_PARENTKEY]: "power",
            [MENU_ICON]: "icon_safety",
            [MENU_KEEPALIVE]: "true",
            order: 12,
          },
          {
            menu_id: 13,
            [MENU_TITLE]: "菜单管理",
            [MENU_PATH]: "/menu",
            [MENU_KEY]: "powerMenu",
            [MENU_PARENTKEY]: "power",
            [MENU_ICON]: "icon_menu",
            [MENU_KEEPALIVE]: "true",
            order: 1475,
          },
          {
            menu_id: 15,
            [MENU_TITLE]: "用户管理",
            [MENU_PATH]: "/user",
            [MENU_KEY]: "powerUser",
            [MENU_PARENTKEY]: "power",
            [MENU_ICON]: "icon_infopersonal",
            [MENU_KEEPALIVE]: "true",
            order: 1593,
          },
          {
            menu_id: 8,
            [MENU_TITLE]: "图标库",
            [MENU_PATH]: "/icons",
            [MENU_KEY]: "icons",
            [MENU_PARENTKEY]: "",
            [MENU_ICON]: "icon_pen",
            [MENU_KEEPALIVE]: "true",
            order: 10,
          },
          {
            menu_id: 81,
            [MENU_TITLE]: "客服",
            [MENU_PATH]: "/custorm",
            [MENU_KEY]: "custorm",
            [MENU_PARENTKEY]: "",
            [MENU_ICON]: "icon_pen",
            [MENU_KEEPALIVE]: "true",
            order: 90,
          },
        ]
        const formatList = formatMenu(list)
        const userMenus = reduceMenuList(formatList);
        // 把请求的数据 和 本地pages页面暴露出的路由列表合并
        let routers = routerList.map((router) => {
          let find = userMenus.find((i) => (i[MENU_PARENTPATH] || "") + i[MENU_PATH] === router[MENU_PATH]);
          if (find) {
            router = { ...find, ...router }; // 本地 优先 接口结果
          } else {
            router[MENU_KEY] = router[MENU_PATH];
          }
          return router;
        });
         if (list && list.length) {
          setStateMenuList(formatList);
          setAjaxUserMenuList(userMenus);
          setMergeLRouterList(routers);
        }
    }
  }, [setStateMenuList]);

  const routerBody = useMemo(() => {
    // 监听 本地路由列表   同时存在长度大于1时 渲染路由组件
    if (mergeRouterList.length) {
      return mergeRouterList.map((item) => {
        let { [MENU_KEY]: key, [MENU_PATH]: path } = item;
        const RenderRoute = item[MENU_KEEPALIVE] === "true" ? CacheRoute : Route;
        return (
          <RenderRoute
            key={key}
            exact={true}
            path={path}
            render={(allProps) => (
              <Intercept
                {...allProps}
                {...item}
                menuList={ajaxUserMenuList}
                pageKey={key}
              />
            )}
          />
        );
      });
    }
    return null
  }, [ajaxUserMenuList, mergeRouterList])
  return { routerBody };
}

const Router = () => {
  const dispatch = useDispatch()
  const setStateMenuList = useCallback((list) => dispatch(setUserMenu(list)), [dispatch])
  const { routerBody } = useRouter(setStateMenuList);
  return <CacheSwitch>{routerBody}</CacheSwitch>;
};

export default Router;
