/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * ant design pro 专门用来可控制用户的访问权限
 * */
export default function access(initialState: { currentUser?: API.CurrentUser | undefined }) {
  const { currentUser } = initialState || {}; // 从全局状态initialState中获取当前用户的信息
  return {
    canAdmin: currentUser && currentUser.userRole === 1, // 用户角色是1表示是管理员，只有管理员才可以访问，与routes.ts中的access相对应
    //canVip: currentUser && currentUser.isVip == 3; //比如只有vip才可以访问，可以这样定义
  };
}
