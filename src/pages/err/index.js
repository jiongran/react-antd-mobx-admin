import { addOpenedMenu } from "@/store/app/action";
import { getApp, getOpenedMenu } from "@/store/getters";
import { filterOpenKey } from "@/store/menu/action";
import { getDefaultMenu } from "@/utils";
import { Button, Result } from "antd";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

function useErrorPage(props) {
  const {
    status = "404",
    errTitle = "404",
    subTitle = "Sorry, the page you visited does not exist.",
  } = props;
  const openedMenu = useSelector(getOpenedMenu)
  const app = useSelector(getApp)
  const dispatch = useDispatch()
  const history = useHistory()
  const filterOpenKeyFn = useCallback((key) => dispatch(filterOpenKey(key)), [dispatch])
  const back = useCallback(async () => {
    const url =
      history.location.pathname +
      (history.location.hash || history.location.search);
    // 顶部一个或以下被打开
    if (openedMenu.length <= 1) {
      filterOpenKeyFn([url]);
      const defaultMenu = await getDefaultMenu();
      if (defaultMenu.openedMenu.length === 0) return history.replace("/");
      let { parentPath, path } = defaultMenu.openedMenu[0];
      history.replace(parentPath + path);
      return;
    }
    // 从顶部打开的路径，再去跳转
    const menuList = openedMenu.filter((i) => i.path !== url);
    filterOpenKeyFn([url]);
    const next = menuList[menuList.length - 1];
    history.replace(next.path);
  }, [history, openedMenu, filterOpenKeyFn])
  const update = () => {
    dispatch(addOpenedMenu({a2:{a3:'a3',a4:'a4'}}))
  }
  return { status, errTitle, subTitle, back ,app,update};
}

function ErrorPage(props) {
  const { status, errTitle, subTitle, back,app,update } = useErrorPage(props);
  return (
    
    <Result
      status={status}
      title={errTitle}
      subTitle={subTitle}
      extra={
        <>
        <Button type="primary" onClick={back}>
          Go Back
        </Button>
            <p> {app?.a2?.a4??'asd'}</p>
           
            <Button type="primary" onClick={update}>
                 修改
                </Button>
                
    </>
      }
    />

  );
}

export default ErrorPage;
