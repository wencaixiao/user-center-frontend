/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import {extend} from 'umi-request';
import {message} from "antd";
import {history} from "@@/core/history";
import {stringify} from "querystring";

/**
 * 配置request请求时的默认参数
 */
const request = extend({
  credentials: 'include', // 默认请求是否带上cookie
  // 根据不同的环境去请求不同的地址,pre用来定义每次请求地址的前缀,比如域名端口之类的
  // 如果是生产环境,就去请求http://user-center-backend.xiaowc.cn这个后端的地址,否则就是undefined
  prefix: process.env.NODE_ENV === 'production' ? 'http://user-center-backend.xiaowc.cn' : undefined
  // requestType: 'form',
});

/**
 * 所以请求拦截器
 */
request.interceptors.request.use((url, options): any => {
  console.log(`do request url = ${url}`)

  return {
    url,
    options: {
      ...options,
      headers: {},
    },
  };
});

/**
 * 所有响应拦截器
 */
request.interceptors.response.use(async (response, options): Promise<any> => {
  const res = await response.clone().json();
  if (res.code === 0) {
    return res.data;
  }
  if (res.code === 40100) {
    message.error('请先登录');
    history.replace({
      pathname: '/user/login',
      search: stringify({
        redirect: location.pathname,
      }),
    });
  } else {
    message.error(res.description)
  }
  return res.data;
});

export default request;
