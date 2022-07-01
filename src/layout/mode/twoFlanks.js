import { Layout } from "antd";
import Header from "../header";
import Menu from "../siderMenu";
import TopMenu from "../topMenu";
import Router from "@/router";

const { Content } = Layout;

const TwoFlanks = ({ visibel }) => {
  return (
    <Layout className="my-layout-body twoflanks">
      <Menu />
      <Layout className="layout-content-wrap reset-padding">
        <Header />
        {visibel.topMenu && <TopMenu className="top-menu" />}
        <Content className="layout-content-body">
          <Router />
        </Content>
      </Layout>
    </Layout>
  );
};

export default TwoFlanks;
