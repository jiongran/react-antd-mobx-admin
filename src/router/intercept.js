import { getOpenedMenu } from "@/store/getters";
import { addOpenedMenu, setCurrentPath, setOpenKey, setSelectKey } from "@/store/menu/action";
import { getMenuParentKey } from "@/utils";
import Error from "@pages/err";
import { Spin } from "antd";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDidRecover } from "react-router-cache-route";
import { useHistory } from "react-router-dom";

const fallback = <Spin style={{
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  minHeight: 500,
  fontSize: 24,
}} tip="页面加载中...." />

function Intercept({ menuList, components: Components, [MENU_TITLE]: title, [MENU_PATH]: path,[MENU_PARENTKEY]:parent, pageKey, ...itemProps }) {
  const history = useHistory()
  const openMenu = useSelector(getOpenedMenu)
  const dispatch = useDispatch()
  const setPath = useCallback((path) => dispatch(setCurrentPath(path)), [dispatch])
  const setOpenKeys = useCallback((val) => dispatch(setOpenKey(val)), [dispatch])
  const setSelectedKeys = useCallback((val) => dispatch(setSelectKey(val)), [dispatch])
  const addOpenedMenuFn = useCallback((val) => dispatch(addOpenedMenu(val)), [dispatch])
  const [pageInit, setPageInit] = useState(false)
  const pushMenu = useCallback((info, key, path, title) => {
    if (!info) {
      addOpenedMenuFn({ key, path, title })
    }
  }, [addOpenedMenuFn])

  const scrollPage = useCallback(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [])

  
  const setInfo = useCallback(() => {
    if (!title) {
      return;
    }
    document.title = title;
    const { pathname, hash, search } = history.location
    const pagePath = pathname + (hash || search);
    const findInfo = openMenu.find((i) => i.path === pagePath);
    console.log('menuList',menuList)
    if(/:(\w+)/.test(path)){
      console.log('parent', parent)
      setSelectedKeys([parent])
    }else{
      setSelectedKeys([pageKey])
    }
    setPath(pagePath)
    // setSelectedKeys([String(pageKey)]);
    let openkey = getMenuParentKey(menuList, pageKey);
    setOpenKeys(openkey);
    console.log('')
    pushMenu(findInfo, pageKey, pagePath, title);
  }, [history, openMenu, menuList, title, pageKey, setOpenKeys, setPath, setSelectedKeys, pushMenu])

  const init = useCallback(() => {
    setInfo()
    scrollPage()
  }, [setInfo, scrollPage])

  useEffect(() => {
    if (!pageInit) {
      init()
      setPageInit(true)
    }
  }, [init, pageInit])

  useDidRecover(init, [init])

  const hasPath = !menuList.find(
    (m) => (m[MENU_PARENTPATH] || "") + m[MENU_PATH] === path
  );
  if (hasPath && path !== "/" &&  path !== "*") {
    return (
      <Error
        {...itemProps}
        status="403"
        errTitle="权限不够"
        subTitle="Sorry, you are not authorized to access this page."
      />
    );
  }

  return (
    <Components
      {...itemProps}
      fallback={fallback}
    />
  );
}
export default Intercept
