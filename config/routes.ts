export default [
  {
    path: '/user',
    layout: false,
    //access: 'canVip', // 自己写的，可以自己定义，比如只有vip才可以访问，和access.ts文件相对应
    routes: [
      {
        path: '/user', routes: [
          {name: '登录', path: '/user/login', component: './user/Login'},
          {name: '注册', path: '/user/register', component: './user/Register'} // 访问path中的路径就会找到component这个页面
        ]
      },
      {component: './404'},
    ],
  },
  {path: '/welcome', name: '欢迎', icon: 'smile', component: './Welcome'},
  {
    path: '/admin',
    name: '管理页',
    icon: 'crown',
    access: 'canAdmin', // 只有管理员才能够访问这个页面
    component: './Admin', // 访问上面path路径时就会加载这个Admin.tsx这个页面
    routes: [
      {path: '/admin/user-manage', name: '用户管理', icon: 'smile', component: './Admin/UserManage'},
      {component: './404'},
    ],
  },
  {name: '查询表格', icon: 'table', path: '/list', component: './TableList'},
  {path: '/', redirect: '/welcome'},
  {component: './404'},
];
