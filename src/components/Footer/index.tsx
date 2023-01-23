import {GithubOutlined} from '@ant-design/icons';
import {DefaultFooter} from '@ant-design/pro-layout';
import {PLANET_LINK} from "@/constants";

const Footer: React.FC = () => {
  const defaultMessage = 'xiaowc出品';
  const currentYear = new Date().getFullYear();
  return (
    <DefaultFooter
      copyright={`${currentYear} ${defaultMessage}`}
      links={[ // 主页面下面的版权信息
        {
          key: 'planet',
          title: '知识星球',
          href: PLANET_LINK,
          blankTarget: true,
        },
        {
          key: 'codeNav',
          title: '编程导航',
          href: 'https://www.code-nav.cn',
          blankTarget: true,
        },
        {
          key: 'github',
          title: <><GithubOutlined/> xiaowc GitHub</>,
          href: 'https://github.com/wencaixiao',
          blankTarget: true,
        },

      ]}
    />
  );
};

export default Footer;
