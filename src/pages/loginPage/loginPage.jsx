import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import "./login.scss";
 import { useDispatch } from "react-redux";
import { productActions } from "../../config/productStore/productStor";
export const Login = () => {
    let dispatch = useDispatch();
  const onFinish = (values) => {
    let token = values.username+values.password
     localStorage.setItem("token", token);
     dispatch(productActions.token(token));

   };

  return (
    <div className="loginContainer">
      <div className="formBox">
        <Form
          style={{
            width: "600px",
          }}
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your Username!",
              },
            ]}
          >
            <Input
              size="large"
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password
              size="large"
              prefix={<LockOutlined className="site-form-item-icon" />}
            />
          </Form.Item>

          <Form.Item
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button
              size="large"
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
