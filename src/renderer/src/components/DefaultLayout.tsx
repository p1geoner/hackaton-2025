import {Layout} from "antd";
import {Content, Footer, Header} from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import { Outlet } from 'react-router'

export const DefaultLayout = () => {

  return <Layout style={{ minHeight: '100vh' }}>
    <Header>Header</Header>
    <Layout>
      <Sider width="25%">
        Sider
      </Sider>
      <Content><Outlet /></Content>
    </Layout>
  </Layout>
}
