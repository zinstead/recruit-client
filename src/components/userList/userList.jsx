import React from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "antd-mobile";
import { FixedSizeList } from "react-window";

export default function UserList(props) {
  const { userList } = props;
  const navigate = useNavigate();

  // 103.4 169.8
  if (!userList.length) {
    return null;
  }
  const height = window.innerHeight - 45 - 49;
  const itemSize = (userList[0].usertype === "boss" ? 169.8 : 135.4) + 10;

  const userCard = ({ index, style }) => {
    const user = userList[index];

    return (
      <div
        style={{
          ...style,
          height: { itemSize },
        }}
      >
        <Card
          style={{ margin: "15px", boxShadow: "0 0 15px rgba(0, 0, 0, 0.1)" }}
          onClick={() => {
            navigate(`/chat/${user._id}`);
          }}
          key={user._id}
          title={
            <img
              // 如果用户没有完善信息,头像就不存在!
              src={
                user.avatar ? (
                  require(`../../assets/images/${user.avatar}.png`)
                ) : (
                  <img src="" alt="" />
                )
              }
              alt=""
            />
          }
          extra={user.username}
        >
          <div>职位: {user.position}</div>
          {user.usertype === "boss" ? <div>公司: {user.company}</div> : null}
          {user.usertype === "boss" ? <div>月薪: {user.salary}</div> : null}
          <div>描述: {user.info}</div>
        </Card>
      </div>
    );
  };

  return (
    <div className="main-center">
      <FixedSizeList
        itemCount={userList.length}
        itemSize={itemSize}
        height={height}
      >
        {userCard}
      </FixedSizeList>
    </div>
  );
}
