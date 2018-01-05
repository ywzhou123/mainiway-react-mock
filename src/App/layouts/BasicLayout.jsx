import React from 'react'
import { Link } from 'react-router-dom'
import { Layout, Menu, Icon, Button } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
import "./BasicLayout.scss";
import RootRoute from '../routes'

export default class BasicLayout extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      pageLoading: true,
      collapsed: false,
    }
  }
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
  render() {
    const { collapsed } = this.state;
    return (
      <div className="blank">
        <Layout>
          <Sider
            trigger={null}
            collapsible
            collapsed={collapsed}
          >
            <div className="logo" >
              {collapsed ? "Antd" : "Antd Logo"}
            </div>
            <Menu
              defaultOpenKeys={['home']}
              selectedKeys={['home']}
              theme="dark"
              mode="inline"
            >
              <Menu.Item key="home" title="主页">
                <Link to="/">
                  <Icon type="home" />
                  <span>主页</span>
                </Link>
              </Menu.Item>
              <SubMenu key="demo" title={<span><Icon type="table" /><span>demo</span></span>}>
                <Menu.Item key="calendar" title="calendar"><Link to="/calendar" >calendar</Link></Menu.Item>
                <Menu.Item key="grades" title="grades"><Link to="/grades" >grades</Link></Menu.Item>
                <Menu.Item key="messages" title="messages"><Link to="/messages" >messages</Link></Menu.Item>
                <Menu.Item key="profile" title="profile"><Link to="/profile" >profile</Link></Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <Layout style={{ padding: '0 24px 24px' }}>
            <Header style={{ display: 'flex', justifyContent: 'space-between', background: '#f1f8ff', padding: 0, borderBottom: '1px solid #e9e9e9' }}>
              <Icon
                className="trigger"
                type={collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={this.toggle}
              />
              <div>
                <Icon type="search" className="top-icon" />
                <Icon type="setting" className="top-icon" />
                <Icon type="share-alt" className="top-icon" />
                <Icon type="user" className="top-icon" />
                <a ><Icon type="logout" className="top-icon" /></a>
              </div>
            </Header>
            <Content className="blank-content">
              <RootRoute />
            </Content>
            <Footer style={{ textAlign: 'center' }}>
              Ant Design ©2016 Created by Ant UED
            </Footer>
          </Layout>
        </Layout>
      </div>
    )
  }
}

