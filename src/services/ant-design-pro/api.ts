// @ts-ignore
/* eslint-disable */
import request from '@/plugins/globalRequest';

/** 获取当前的用户 GET /api/user/current */
// 前端与后端进行交互的接口
export async function currentUser(options?: { [key: string]: any }) {
  return request<API.BaseResponse<API.CurrentUser>>('/api/user/current', { // API.BaseResponse<API.CurrentUser>是后端应该向前端返回什么类型的数据
    method: 'GET', // 上面这个是获取脱敏后用户的请求地址
    ...(options || {}),
  });
}

/** 退出登录接口 POST /api/user/logout */
export async function outLogin(options?: { [key: string]: any }) {
  return request<API.BaseResponse<number>>('/api/user/logout', { // 是对ajax和axios的封装，通过request来请求后端，API.BaseResponse<number>是后端应该向前端返回什么类型的数据
    method: 'POST',
    ...(options || {}),
  });
}

/** 登录接口 POST /api/user/login */
// 前端与后端进行交互的接口，登录时后端返回的是脱敏后的用户
export async function login(body: API.LoginParams, options?: { [key: string]: any }) {
  // 前端需要想后端发送请求，前端ajax来请求后端，axios封装了ajax，request是ant design项目又封装了一次
  // 追踪request源码：用到了umi插件、requestConfig是一个配置
  // 不用axios请求后端了，直接用request来请求更方便了，详见umi的官网：https://pro.ant.design/zh-CN/docs/upgrade-v5#%E8%AF%B7%E6%B1%82
  // 因为proxy.ts中使用了代理，所以访问localhost:8000/api/user/login -> localhost:8080:/user/login
  return request<API.BaseResponse<API.LoginResult>>('/api/user/login', { // 这个是提交登录后请求的地址，<API.BaseResponse<API.LoginResult>表示的是后端向前端返回什么类型的数据
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 注册接口 POST /api/user/register */
// 前端与后端交互的接口，注册时后端返回的是新用户注册成功后的BaseResponse<Long>
export async function register(body: API.RegisterParams, options?: { [key: string]: any }) {
  // 前端需要想后端发送请求，前端ajax来请求后端，axios封装了ajax，request是ant design项目又封装了一次
  // 追踪request源码：用到了umi插件、requestConfig是一个配置
  // 不用axios请求后端了，直接用request来请求更方便了，详见umi的官网：https://pro.ant.design/zh-CN/docs/upgrade-v5#%E8%AF%B7%E6%B1%82
  // 因为proxy.ts中使用了代理，所以访问localhost:8000/api/user/login -> localhost:8080:/user/login
  return request<API.BaseResponse<API.RegisterResult>>('/api/user/register', { // 这个是提交登录后请求的地址，API.BaseResponse<API.RegisterResult>表示的是后端向前端返回什么类型的数据
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 搜索用户 GET /api/user/search */
export async function searchUsers(options?: { [key: string]: any }) {
  return request<API.BaseResponse<API.CurrentUser[]>>('/api/user/search', { // 接收的参数是从后端向前端返回回来的CurrentUser[]数组
    method: 'GET',
    ...(options || {}),
  });
}


/** 此处后端没有提供注释 GET /api/notices */
export async function getNotices(options?: { [key: string]: any }) {
  return request<API.NoticeIconList>('/api/notices', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取规则列表 GET /api/rule */
export async function rule(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.RuleList>('/api/rule', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 新建规则 PUT /api/rule */
export async function updateRule(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/api/rule', {
    method: 'PUT',
    ...(options || {}),
  });
}

/** 新建规则 POST /api/rule */
export async function addRule(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/api/rule', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 删除规则 DELETE /api/rule */
export async function removeRule(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/rule', {
    method: 'DELETE',
    ...(options || {}),
  });
}
