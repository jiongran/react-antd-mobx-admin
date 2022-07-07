import loadable from "@loadable/component";
import { Redirect } from "react-router-dom";
import auto from "./auto";
const Error = loadable(() => import("@pages/err"));

const defaultArr = [
  {
    [MENU_PATH]: "/",
    [MENU_KEY]: "index",
    to: "/icons",
    components: Redirect,
  },
  {
    [MENU_PATH]: "*",
    [MENU_TITLE]: "页面不存在",
    key: "404",
    keepAlive: true,
    components: Error,
  },
];
const list = auto.map((c) => ({ ...c, components: loadable(c.components) }));

list.push(...defaultArr);

export default list;
