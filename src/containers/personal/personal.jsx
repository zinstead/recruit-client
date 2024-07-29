import React from "react";
import { connect } from "react-redux";
import {
  Result,
  List,
  Card,
  Space,
  Divider,
  Button,
  Dialog,
} from "antd-mobile";
import Cookies from "js-cookie";

import { resetUser } from "../../redux/actions";

function Personal(props) {
  const { user } = props;
  const logout = () => {
    Dialog.confirm({
      title: "退出",
      content: "确认退出登录吗?",
      confirmText: "确定",
      onConfirm: () => {
        Cookies.remove("userid");
        props.resetUser();
      },
      cancelText: "取消",
    });
  };

  return (
    <div style={{ marginTop: "50px" }}>
      <Result
        icon={
          user.avatar ? (
            <img
              src={require(`../../assets/images/${user.avatar}.png`)}
              alt=""
            />
          ) : null
        }
        title={user.username}
        description={user.company}
      />
      <Divider />
      <List header="相关信息:">
        <Card>
          <Space direction="vertical">
            <div>职位: {user.position}</div>
            <div>简介: {user.info}</div>
            {user.salary ? <div>薪资: {user.salary}</div> : null}
          </Space>
        </Card>
      </List>
      <br />
      <Button block color="danger" onClick={logout}>
        退出登录
      </Button>
    </div>
  );
}

export default connect((state) => ({ user: state.user }), { resetUser })(
  Personal
);
