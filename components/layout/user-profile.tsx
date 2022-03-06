import { LogoutOutlined, ProfileOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Dropdown, Menu } from 'antd';
import Link from 'antd/lib/typography/Link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Role } from '../../lib/constant/role';
import apiService from '../../lib/service/apiService';
import storage from '../../lib/service/storage';
import { useUserRole } from '../custom-hooks/login-state';

 const HeaderIcon = styled.span`
  align-items:flex-end;
  font-size: 18px;
  color: #fff;
  cursor: pointer;
  transition: color 0.3s;
  &:hover {
    color: #1890ff;
  }
`;

export default function UserProfile() {
  const router = useRouter();
  const onLogout = async () => {
   
    const { data: isLogout } = await apiService.logout();

    if (isLogout) {
      storage.deleteUserInfo();
      router.push('/login');
    }
  };
  const userRole = useUserRole();
  const [avatar, setAvatar] = useState('');

  return (
    <HeaderIcon >
      <Dropdown
        overlay={
          <Menu>
            {userRole !== 'manager' && (
              <Menu.Item>
                <ProfileOutlined />
                <Link href={`/dashboard/${storage.role}/profile`}>
                  <span>Profile</span>
                </Link>
              </Menu.Item>
            )}
            <Menu.Item onClick={onLogout}>
              <LogoutOutlined />
              <span>Logout</span>
            </Menu.Item>
          </Menu>
        }
        placement="bottomLeft"
      >
        {avatar ? <Avatar src={avatar} /> : <Avatar icon={<UserOutlined />} />}
      </Dropdown>
    </HeaderIcon>
  );
}