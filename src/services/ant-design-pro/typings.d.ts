// ts会默认把类型定义在typings.d.ts文件夹中，这里定义的全部东西都可以被其他页面识别到
// @ts-ignore
/* eslint-disable */

declare namespace API {
  type CurrentUser = { // 脱敏后的用户信息：后端向前端应该返回什么类型的数据
    id: number;
    username: string;
    userAccount: string;
    avatarUrl?: string;
    gender:number;
    phone: string;
    email: string;
    userStatus: number;
    userRole: number;
    planetCode: string;
    createTime: Date;
  };

  type LoginResult = { // 登录后的结果：后端向前端应该返回什么类型的数据
    status?: string;
    type?: string;
    currentAuthority?: string;
  };

  type RegisterResult = number; // 注册后的结果：后端向前端应该返回什么类型的数据

  type PageParams = {
    current?: number;
    pageSize?: number;
  };

  type RuleListItem = {
    key?: number;
    disabled?: boolean;
    href?: string;
    avatar?: string;
    name?: string;
    owner?: string;
    desc?: string;
    callNo?: number;
    status?: number;
    updatedAt?: string;
    createdAt?: string;
    progress?: number;
  };

  /**
   * 通用返回类，后端向前端的通用返回类字段的类型
   */
  type BaseResponse<T> = {
    code: number,
    data: T,
    message: string,
    description: string,
  }

  type RuleList = {
    data?: RuleListItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type FakeCaptcha = {
    code?: number;
    status?: string;
  };

  type LoginParams = { // 登录的参数
    userAccount?: string; // shift + F6 直接重构username -> userAccount，相当于用到了username的都改成userAccount
    userPassword?: string; // 同理
    autoLogin?: boolean; // 自动登录
    type?: string;
  };

  type RegisterParams = { // 注册的参数
    userAccount?: string; // shift + F6 直接重构username -> userAccount，相当于用到了username的都改成userAccount
    userPassword?: string; // 同理
    checkPassword?: string; // ?表示这个属性是可选的，可以不存在这个参数，string表示属性的类型
    planetCode?: string; // 星球编号
    type?: string;
  };

  type ErrorResponse = {
    /** 业务约定的错误码 */
    errorCode: string;
    /** 业务上的错误信息 */
    errorMessage?: string;
    /** 业务上的请求是否成功 */
    success?: boolean;
  };

  type NoticeIconList = {
    data?: NoticeIconItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type NoticeIconItemType = 'notification' | 'message' | 'event';

  type NoticeIconItem = {
    id?: string;
    extra?: string;
    key?: string;
    read?: boolean;
    avatar?: string;
    title?: string;
    status?: string;
    datetime?: string;
    description?: string;
    type?: NoticeIconItemType;
  };
}
