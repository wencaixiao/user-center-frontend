import type {Settings as LayoutSettings} from '@ant-design/pro-layout';
import {PageLoading, SettingDrawer} from '@ant-design/pro-layout';
import type {RunTimeLayoutConfig} from 'umi';
import {history, Link} from 'umi';
import RightContent from '@/components/RightContent';
import Footer from '@/components/Footer';
import {currentUser as queryCurrentUser} from './services/ant-design-pro/api';
import {BookOutlined, LinkOutlined} from '@ant-design/icons';
import defaultSettings from '../config/defaultSettings';
import {RequestConfig} from "@@/plugin-request/request";

// 启动方式:
// (1)开发环境:npm run start(本地启动,监听端口,自动更新)
// (2)线上环境:npm run build(项目构建打包),可以用serve启动
const isDev = process.env.NODE_ENV === 'development';  // 前端项目通过这个NODE_ENV来判断是本地启动还是线上启动
const loginPath = '/user/login';
/**
 * 无需用户登录态的页面
 */
const NO_NEED_LOGIN_WHITE_LIST = ['/user/register', loginPath];

/** 获取用户信息比较慢的时候会展示一个 loading */
export const initialStateConfig = {
  loading: <PageLoading />,
};

/** ant design自己的规则，他启动的时候会读取app.tsx，在这个文件中定义了前端数据初始化的方法，相当于定义了一些全局配置 */
export const request: RequestConfig = {
  timeout: 1000000,
};

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * 首次访问页面(刷新页面)，进入app.tsx，执行getInitialState方法，该方法的返回值就是全局可用的状态值
 * */
export async function getInitialState(): Promise<{ // 初始化状态
  settings?: Partial<LayoutSettings>;
  currentUser?: API.CurrentUser;
  loading?: boolean;
  fetchUserInfo?: () => Promise<API.CurrentUser | undefined>;
}> {
  const fetchUserInfo = async () => { // 刚进入页面就要获取用户信息，如果没有用户信息，就会重定向到登录页
    try {
      return await queryCurrentUser(); // 查询当前用户
    } catch (error) { // 没有获取到当前用户就重定向到登录页
      history.push(loginPath); // 重定向到登录页
    }
    return undefined;
  };
  // 如果是无需登录的页面，不执行
  if (NO_NEED_LOGIN_WHITE_LIST.includes(history.location.pathname)) { // 当前页面的路径是注册路径或者loginPath登录路径，说明已经登录
    return {
      // @ts-ignore
      fetchUserInfo,
      settings: defaultSettings,
    };
  }
  const currentUser = await fetchUserInfo(); // 获取当前登录用户的信息
  return { // 直接返回当前登录用户的信息
    // @ts-ignore
    fetchUserInfo,
    currentUser, // 当前用户
    settings: defaultSettings, // 全局设置
  };

}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState, setInitialState }) => {
  return {
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    waterMarkProps: { // 登录成功后在前端打印出一个水印
      content: initialState?.currentUser?.username,
    },
    footerRender: () => <Footer />,
    onPageChange: () => { // 当每次切换页面的时候，会触发这个函数
      const { location } = history; // location是从history中获得的当前页面的信息，location.pathname表示当前页面的路径
      if (NO_NEED_LOGIN_WHITE_LIST.includes(location.pathname)) { // 如果页面的请求路径位于白名单中，则不用进行下面的代码，不用重定向，直接进入这个页面就行
        return;
      }
      // 如果没有登录，重定向到 login
      if (!initialState?.currentUser) {
        history.push(loginPath);
      }
    },
    links: isDev
      ? [
          <Link to="/umi/plugin/openapi" target="_blank">
            <LinkOutlined />
            <span>OpenAPI 文档</span>
          </Link>,
          <Link to="/~docs">
            <BookOutlined />
            <span>业务组件文档</span>
          </Link>,
        ]
      : [],
    menuHeaderRender: undefined,
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    // 增加一个 loading 的状态
    childrenRender: (children, props) => {
      // if (initialState?.loading) return <PageLoading />;
      return (
        <>
          {children}
          {!props.location?.pathname?.includes('/login') && (
            <SettingDrawer
              enableDarkTheme
              settings={initialState?.settings}
              onSettingChange={(settings) => {
                setInitialState((preInitialState) => ({
                  ...preInitialState,
                  settings,
                }));
              }}
            />
          )}
        </>
      );
    },
    ...initialState?.settings,
  };
};
