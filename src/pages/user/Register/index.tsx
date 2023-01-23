import {LockOutlined, UserOutlined,} from '@ant-design/icons';
import {message, Tabs} from 'antd';
import React, {useState} from 'react';
import {history} from 'umi';
import {PLANET_LINK, SYSTEM_LOGO} from '@/constants'; // @表示找到的是一个根目录
import Footer from '@/components/Footer';
import {register} from '@/services/ant-design-pro/api';
import styles from './index.less';
import {LoginForm, ProFormText} from '@ant-design/pro-form';

const Register: React.FC = () => {
  // 定义的各种函数以及从对象中取得的常量
  const [type, setType] = useState<string>('account');

  // 处理表单提交的请求
  const handleSubmit = async (values: API.RegisterParams) => { // API.RegisterParams表示注册的参数
    const {userPassword, checkPassword} = values; // 从上面的注册参数中取值
    // 校验
    if (userPassword !== checkPassword) {
      message.error('两次输入的密码不一致');
      return;
    }

    try {
      // 注册
      const id = await register(values); // 注册成功后，从后端返回来一个新用户的BaseResponse<Long>
      if (id) { // data返回的是泛型T类型，返回的是Long类型，所以data的值也为Long类型
        const defaultLoginSuccessMessage = '注册成功！';
        message.success(defaultLoginSuccessMessage); // 弹出注册成功的信息
        // 用户注册成功后，跳转到登录页
        /** 此方法会跳转到 redirect 参数所在的位置 */
        if (!history) return;
        const {query} = history.location; // 查询到之前页面的参数
        history.push({ // 之前所在的页面，用户被拦截了，需要重新登录，从新登录后，让他定位到这个页面
          pathname: '/user/login',
          query, // 之前页面查询到的参数，直接传入进来
        });
        return;
      }
    } catch (error: any) {
      const defaultLoginFailureMessage = '注册失败，请重试！';
      message.error(defaultLoginFailureMessage);
    }
  };
  // 返回注册的单页面，里面包括各种判断的逻辑
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <LoginForm
          submitter={{ // 这个是自己看源码加上去的：点进LoginForm这个组件，点击左上角哪个风车即可定位到index.js即可找到
            searchConfig: {
              submitText: '注册'
            }
          }}
          logo={<img alt="logo" src={SYSTEM_LOGO}/>} // 系统的logo
          title="Road To Coding"
          subTitle={<a href={PLANET_LINK} target="_blank" rel="noreferrer">学习编程的网站</a>}
          initialValues={{
            autoLogin: true,
          }}
          onFinish={async (values) => { // 处理表单注册提交的逻辑
            await handleSubmit(values as API.RegisterParams);
          }}
        >
          <Tabs activeKey={type} onChange={setType}>
            <Tabs.TabPane key="account" tab={'账号密码注册'}/>
          </Tabs>
          {type === 'account' && (
            <>
              <ProFormText // 输入账号框，ProFormText是ant design ProComponents这个组件，可以方便的给我们生成一个输入框
                name="userAccount"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={styles.prefixIcon}/>,
                }}
                placeholder="请输入账号"
                rules={[ // 还有校验规则
                  {
                    required: true, // 表示这是一个必填项
                    message: '账号是必填项！',
                  },
                ]}
              />
              <ProFormText.Password // 输入密码框
                name="userPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon}/>,
                }}
                placeholder="请输入密码"
                rules={[
                  {
                    required: true,
                    message: '密码是必填项！',
                  },
                  {
                    min: 8,
                    type: 'string',
                    message: '长度不能小于 8',
                  },
                ]}
              />
              <ProFormText.Password // 确认密码框
                name="checkPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon}/>,
                }}
                placeholder="请再次输入密码"
                rules={[
                  {
                    required: true,
                    message: '确认密码是必填项！',
                  },
                  {
                    min: 8,
                    type: 'string',
                    message: '长度不能小于 8',
                  },
                ]}
              />
              <ProFormText // 输入星球编号框
                name="planetCode" // 起这个名字是因为这样这个表单才会将这个值以planetCode这个名字传递给后端
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={styles.prefixIcon}/>,
                }}
                placeholder="请输入星球编号"
                rules={[
                  {
                    required: true,
                    message: '星球编号是必填项！',
                  },
                ]}
              />
            </>
          )}
        </LoginForm>
      </div>
      <Footer/>
    </div>
  );
};

export default Register;
