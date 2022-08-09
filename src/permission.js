import router from "@/router/index";
import { getToken, setToken, removeToken } from "@/utils/auth";
import useUserStore from "@/store/modules/user";

// 不需登录的页面
const widthRouterList = ["/login"];

// 全局前置守卫
router.beforeEach((to, from, next) => {
  if (getToken() && getToken() != "") {
    /* has token*/
    if (to.path === "/login") {
      next();
    } else {
      // 判断当前用户是否已拉取完user_info信息. 或者把用户信息存储到全局，或者存储到缓存中。都可。
      useUserStore()
        .getInfo()
        .then(() => {
          next();
        })
        .catch((err) => {
          useUserStore()
            .logOut()
            .then(() => {
              next({ path: "/login" });
            });
        });
    }
  } else {
    // 没有token
    if (widthRouterList.indexOf(to.path) !== -1) {
      // 在免登录白名单，直接进入
      next();
    } else {
      next({ path: "/login" });
    }
  }
});
