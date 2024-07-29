import React from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "antd-mobile";

export default function UserList(props) {
  const { userList } = props;
  const navigate = useNavigate();

  return (
    <div
      style={{
        marginBottom: "50px",
        marginTop: "50px",
      }}
    >
      {userList.map((user) => (
        <Card
          className="user-card"
          onClick={() => {
            navigate(`/chat/${user._id}`);
          }}
          key={user._id}
          title={
            <img
              // 如果用户没有完善信息,头像就不存在!
              src={
                user.avatar
                  ? require(`../../assets/images/${user.avatar}.png`)
                  : null
              }
              alt=""
            />
          }
          extra={user.username}
        >
          <div>职位: {user.position}</div>
          {user.company ? <div>公司: {user.company}</div> : null}
          {user.salary ? <div>月薪: {user.salary}</div> : null}
          <div>描述: {user.info}</div>
        </Card>
      ))}
    </div>
  );
}
