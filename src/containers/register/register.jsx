import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { NavBar, Form, Input, Radio, Button, Space } from "antd-mobile";
import styles from "./register.less";
import { EyeInvisibleOutline, EyeOutline } from "antd-mobile-icons";
import { connect } from "react-redux";

import Logo from "../../components/logo/logo";
import { register } from "../../redux/actions";

function Register(props) {
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [userInfo, setUserInfo] = useState({
    username: "",
    password: "",
    password2: "",
    usertype: "boss",
  });

  const handleChange = (content, val) => {
    setUserInfo({ ...userInfo, [content]: val });
  };

  const navigate = useNavigate();
  const toLogin = () => {
    navigate("/login");
  };

  const { msg, redirectTo } = props.user;
  const register = () => {
    props.register(userInfo);
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
        <Form.Item
          label="确认密码"
          name="password2"
          extra={
            <div className={styles.eye}>
              {!visible2 ? (
                <EyeInvisibleOutline onClick={() => setVisible2(true)} />
              ) : (
                <EyeOutline onClick={() => setVisible2(false)} />
              )}
            </div>
          }>
          <Input
            onChange={(val) => {
              handleChange("password2", val);
            }}
            placeholder="请输入确认密码"
            clearable
            type={visible2 ? "text" : "password"}
          />
        </Form.Item>
        <Form.Item label="用户类型">
          <Radio.Group
            onChange={(val) => {
              handleChange("usertype", val);
            }}
            defaultValue="boss">
            <Space>
              <Radio value="boss">老板</Radio>
              <Radio value="jobseeker">求职者</Radio>
            </Space>
          </Radio.Group>
        </Form.Item>
        <Form.Item>
          <Space block direction="vertical">
            <Button onClick={register} block color="primary">
              注册
            </Button>
            <Button onClick={toLogin} block>
              已有账户
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
}

export default connect((state) => ({ user: state.user }), { register })(
  Register
);
