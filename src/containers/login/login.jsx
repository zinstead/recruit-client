import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { NavBar, Form, Input, Button, Space } from "antd-mobile";
import { EyeInvisibleOutline, EyeOutline } from "antd-mobile-icons";
import { connect } from "react-redux";
import styles from "./login.less";

import Logo from "../../components/logo/logo";
import { login } from "../../redux/actions";

function Login(props) {
  const [visible, setVisible] = useState(false);
  const [userInfo, setUserInfo] = useState({
    username: "",
    password: "",
  });

  const handleChange = (content, val) => {
    setUserInfo({ ...userInfo, [content]: val });
  };

  const navigate = useNavigate();
  const toRegister = () => {
    navigate("/register");
  };

  const { msg, redirectTo } = props.user;
  const login = () => {
    props.login(userInfo);
  };
  useEffect(() => {
    if (redirectTo) {
      navigate(redirectTo);
    }
  }, [navigate, redirectTo]);

  return (
    <div>
      <NavBar backIcon={null} className="nav">
        硅 谷 直 聘
      </NavBar>
      <Logo />
      <Form layout="horizontal" mode="card">
        {msg ? <div className="error-msg">{msg}</div> : null}

        <Form.Item label="用户名">
          <Input
            onChange={(val) => {
              handleChange("username", val);
            }}
            placeholder="请输入用户名"
          />
        </Form.Item>
        <Form.Item
          label="密码"
          name="password"
          extra={
            <div className={styles.eye}>
              {!visible ? (
                <EyeInvisibleOutline onClick={() => setVisible(true)} />
              ) : (
                <EyeOutline onClick={() => setVisible(false)} />
              )}
            </div>
          }>
          <Input
            onChange={(val) => {
              handleChange("password", val);
            }}
            placeholder="请输入密码"
            clearable
            type={visible ? "text" : "password"}
          />
        </Form.Item>
        <Form.Item>
          <Space block direction="vertical">
            <Button onClick={login} block color="primary">
              登录
            </Button>
            <Button onClick={toRegister} block>
              还没有账户
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
}

export default connect((state) => ({ user: state.user }), { login })(Login);
