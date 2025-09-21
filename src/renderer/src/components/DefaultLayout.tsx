import {Flex, Layout, Menu, MenuProps, Typography} from "antd";
import {Content,  Header} from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import {Link, Outlet, useLocation} from 'react-router'
import {useStyles} from "./defaultStyles";

import ImgLogo from '../assets/logo.png'
import IcConnect from '../assets/connect.svg'
import IcShield from '../assets/shield.svg?react'
import IcSettings from '../assets/settings.svg'
const {Text} = Typography

const menuItems: MenuProps['items'] = [
  {
    key: '/list',
    label: 'Все объекты',
    icon: <IcShield/>
  },
  {
    key: '/connect',
    label: 'Связь с пользователями',
    icon: IcConnect
  },
  {
    key: '/settings',
    label: 'Настройки',
    icon: IcSettings
  }
]

export const DefaultLayout = () => {
const {styles } =useStyles()
  const {pathname} = useLocation()
  return <Layout style={{ minHeight: '100vh' }}>
    <Header className={styles.header}>
      <Flex justify="space-between" align='center'>
        <Link to={'/'}>
          <img src={ImgLogo} height={43} alt=""/>
        </Link>
        <Text className={styles.id}>ID: 324876</Text>
      </Flex>
    </Header>
    <Layout>
      <Sider  className={styles.sider}>
        <Menu items={menuItems} defaultSelectedKeys={[pathname]} />
      </Sider>
      <Content><Outlet /></Content>
    </Layout>
  </Layout>
}
