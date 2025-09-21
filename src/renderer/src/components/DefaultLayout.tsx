import {Flex, Layout, Menu, MenuProps, Typography} from "antd";
import {Content,  Header} from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import {Link, Outlet, useLocation, useNavigate} from 'react-router'
import {useStyles} from "./defaultStyles";

import ImgLogo from '../assets/logo.png'
import IcConnect from '../assets/connect.svg?react'
import IcShield from '../assets/shield.svg?react'
import IcSettings from '../assets/settings.svg?react'
import IcMap from '../assets/map.svg?react'
import {useEffect, useState} from "react";
import axios from "axios";
const {Text} = Typography

const menuItems: MenuProps['items'] = [
  {
    key: '/list',
    label: 'Все объекты',
    icon: <IcShield/>
  },
  {
    key: '/subscriptions',
    label: 'Связь с пользователями',
    icon: <IcConnect/>
  },
  {
    key: '/settings',
    label: 'Настройки',
    icon: <IcSettings/>
  },
  {
    key: '/map',
    label: 'Опасности на карте',
    icon: <IcMap/>
  }
]

export const DefaultLayout = () => {
const {styles } =useStyles()
  const {pathname} = useLocation()
  const navigate = useNavigate();
const [uuid, setUUID] = useState<string>('');

const getUserData = async ()=> {
    const response = await axios.get(`http://localhost:8000/api/user/info/`)
    if('data' in response) {
      setUUID(response.data.code)
    }

}

  useEffect(() => {
    getUserData()
  }, []);

  return <Layout style={{ minHeight: '100vh' }}>
    <Header className={styles.header}>
      <Flex justify="space-between" align='center'>
        <Link to={'/'}>
          <img src={ImgLogo} height={43} alt=""/>
        </Link>
        <Text className={styles.id}>ID: {uuid}</Text>
      </Flex>
    </Header>
    <Layout>
      <Sider  className={styles.sider} width={260}>
        <Menu items={menuItems} defaultSelectedKeys={[pathname]} onClick={({key})=>navigate(key)} />
      </Sider>
      <Content className={styles.content}><Outlet /></Content>
    </Layout>
  </Layout>
}
