import Layout from "@/layout";
import { getStateUser } from "@/store/getters";
import { setUserInfoAction } from "@/store/user/action";
import { getLocalUser } from '@/utils';
import Login from "@pages/login";
import { Spin } from "antd";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, HashRouter } from "react-router-dom";

const Router = process.env.REACT_APP_ROUTER_ISHASH === "1" ? HashRouter : BrowserRouter
const RouterBasename = process.env.REACT_APP_ROUTERBASE || "/"

function AppRouter() {
  const [loading, setLoad] = useState(true);
  const userInfo = useSelector(getStateUser)

  const dispatch = useDispatch()
  const setUser = useCallback((info) => dispatch(setUserInfoAction(info)), [dispatch])
  useEffect(() => {
    if (!userInfo) {
      let localInfo = getLocalUser();
      if (localInfo && localInfo.isLogin === true) {
        setUser(localInfo);
      }
      return setLoad(false);
    }
    setLoad(false);
    // eslint-disable-next-line
  }, []);
  if (loading)
    return (
      <Spin size="large" wrapperClassName="loading-page" tip="Loading...">
        <div className="loading-page"></div>
      </Spin>
    );
  if (!userInfo) return <Login />;
  return (
    <Router basename={RouterBasename}>
      <Layout />
    </Router>
  );
}

export default AppRouter;
