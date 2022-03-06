import React, { useState } from "react";
import "antd/dist/antd.css";
import { Layout, Menu, Breadcrumb, Affix } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import styled from "styled-components";
import UserProfile from "./user-profile";
import { useRouter } from "next/router";
import Link from "next/link";


const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const LayoutHeader = styled(Header)`
  display: flex;
  justify-content: space-between;
  align-items:center;
  position: fixed;
  color:white;
`
const StyledContent = styled(Content)`
  margin: 16px;
  justify-content: flex-start;
  background-color: #fff;
  padding: 16px;
  min-height: auto;
`;

//to-do: create a function that render different user menu 
export default function DashLayout({ children }: any) {
  let state = {
    collapsed: false
  };
  const router = useRouter();
  const [collapsed, toggleCollapsed] = useState(false);
  const toggle = () => {
    toggleCollapsed(!collapsed)
  }
  /* 
    const GetStudentsList = () =>{
  
    } */

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(isCollapsed) => toggleCollapsed(isCollapsed)}>
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" >
          <Menu.Item key="1" icon={<PieChartOutlined />}>
            <Link href="/dashboard/manager">
              <a>Overview</a>
            </Link>
          </Menu.Item>

          <SubMenu key="sub1" icon={<UserOutlined />} title="Student">
            <Menu.Item key="2" >
              <Link href="/dashboard/manager/student">
                <a>Student_List</a>
              </Link>
            </Menu.Item>
          </SubMenu>

          <SubMenu key="sub2" icon={<TeamOutlined />} title="Teacher">
            <Menu.Item key="3">Team 1</Menu.Item>
            <Menu.Item key="4">Team 2</Menu.Item>
          </SubMenu>

          <SubMenu key="sub3" icon={<TeamOutlined />} title="Course">
            <Menu.Item key="5">Course 1</Menu.Item>
            <Menu.Item key="6">Course 2</Menu.Item>
          </SubMenu>

          <Menu.Item key="9" icon={<FileOutlined />}>
            Message
          </Menu.Item>
        </Menu>
      </Sider>

      <Layout className="site-layout">
        {/*  change to normal component && use Affix  */}
        <Affix>
          <LayoutHeader className="site-layout-header" >
            {React.createElement(state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: toggle,
            })}
            <UserProfile />
          </LayoutHeader>
        </Affix>

        <StyledContent className="site-layout-background">
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>CMS Manage System</Breadcrumb.Item>
            <Breadcrumb.Item>Overview</Breadcrumb.Item>
          </Breadcrumb>
          {/*  put list-table here  */}
          {children}
        </StyledContent>

        <Footer style={{ textAlign: 'center' }}>Daydream Design ©2022 Created by CMS</Footer>
      </Layout>
    </Layout>
  );
}

