const { loaderByName } = require("@craco/craco");
const CracoAntDesignPlugin = require('craco-antd')
const path = require('path')
const resolve = dir => path.resolve(__dirname, dir)
module.exports = {
    webpack:{
        alias: {
            "@": resolve("src")
          }
    },
    plugins: [
        {
            plugin: CracoAntDesignPlugin,
            options: {
                customizeThemeLessPath: resolve('src/assets/css/var.less'),
                customizeTheme:{
                    "@primary-color": "#1DA57A"
                }
            }
        },
    ],
};
