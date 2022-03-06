import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { Form, Input, Button, Row, Col, Radio, Space, Checkbox, Typography } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { RadioChangeEvent } from 'antd/lib/radio';
import styled from 'styled-components';
import Header from '../components/home/header';
import { validateMessages } from '../lib/utils/validateMessages';
import { Role } from '../lib/constant/role';
import { LoginFormData } from '../lib/model/login';
import apiService from '../lib/service/apiService';
import storage from '../lib/service/storage';

const { Title } = Typography;

export const StyledTitle = styled(Title)`
  text-align: center;
  margin: 0.5em 0;
  @media (max-width: 700px) {
    margin-top: 2em;
    font-size: 18px !important;
    padding-bottom: 0;
  }
`;

export const LoginButton = styled(Button)`
`;

export default function Login() {
  const [form] = Form.useForm();
  const router = useRouter();

  const login = async (loginRequest: LoginFormData) => {
    const { data} = await apiService.login(loginRequest);
    console.log(data);

    if (!!data) {
      storage.setUserInfo(data);
      router.push('dashboard');
    }
  };
  // to-do use useEffect set redirect to right role page
  useEffect(() => {
    if (storage?.userInfo) {
      router.push(`/dashboard/${storage.userInfo.role}`);
    }
  }, []);
  
  const onFinish = (values: any) => {
    //to-do: passing login data
    console.log('Received values of form: ', values);
  };

  return (
    <>
      <Header />
      <StyledTitle>Course Management Assistant</StyledTitle>

      <Row justify="center">
        <Col md={8} sm={24}>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            form={form}
            onFinish={(values: LoginFormData) => login(values)}
            validateMessages={ validateMessages }
          >
            <Form.Item name="role" initialValue={Role.student} rules={[{ required: true }]}>
              <Radio.Group
                onChange={(e: RadioChangeEvent) => {
                  const role = e.target.value;
                  form.resetFields();
                  form.setFieldsValue({role});
                }}
              >
                <Radio.Button value={Role.student}>Student</Radio.Button>
                <Radio.Button value={Role.teacher}>Teacher</Radio.Button>
                <Radio.Button value={Role.manager}>Manager</Radio.Button>
              </Radio.Group>
            </Form.Item>

            <Form.Item
              name="email"
              rules={[{ required: true},{ type: 'email' }]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="Username"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true },{ min:6,max:256 }]}
            >
              <Input
                prefix={<LockOutlined />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>

            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <Link href="">
                Forgot password
              </Link>
            </Form.Item>

            <Form.Item>
              <LoginButton type="primary" htmlType="submit">
                Log in
              </LoginButton>{'  '}
              Or <Link href="">register now!</Link>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
}
