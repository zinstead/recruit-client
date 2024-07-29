import React from "react";
import { connect } from "react-redux";
import { List, Image, Badge } from "antd-mobile";
import { useNavigate } from "react-router-dom";

function getLastMsgs(chatMsgs, userid) {
  // 得到每个chatId的lastMsg
  const lastMsgsObj = {};
  chatMsgs.forEach((msg) => {
    if (msg.to === userid && !msg.read) {
      msg.unReadCount = 1;
    } else {
      msg.unReadCount = 0;
    }
    const chatId = msg.chatId;
    const lastMsg = lastMsgsObj[chatId];
    if (!lastMsg) {
      lastMsgsObj[chatId] = msg;
    } else {
      const unReadCount = lastMsg.unReadCount + msg.unReadCount;
      if (msg.createTime > lastMsg.createTime) {
        lastMsgsObj[chatId] = msg;
      }
      lastMsgsObj[chatId].unReadCount = unReadCount;
    }
  });
  // 转为数组
  const lastMsgs = Object.values(lastMsgsObj);
  // 根据createTime倒序排列
  lastMsgs.sort((msg1, msg2) => msg2.createTime - msg1.createTime);
  return lastMsgs;
}

function Message(props) {
  const navigate = useNavigate();

  const { user } = props;
  const { users, chatMsgs } = props.chat;
  const lastMsgs = getLastMsgs(chatMsgs, user._id);

  return (
    <List style={{ marginTop: "45px", marginBottom: "50px" }}>
      {lastMsgs.map((msg) => {
        const targetId = msg.to === user._id ? msg.from : msg.to;
        const targetUser = users[targetId];
        return (
          <List.Item
            onClick={() => {
              navigate(`/chat/${targetId}`);
            }}
            key={msg._id}
            prefix={
              <Image
                src={
                  targetUser.avatar ? (
                    require(`../../assets/images/${targetUser.avatar}.png`)
                  ) : (
                    <img src="" alt="" />
                  )
                }
                style={{ borderRadius: 20 }}
                fit="cover"
                width={40}
                height={40}
              />
            }
            extra={<Badge content={msg.unReadCount ? msg.unReadCount : null} />}
            description={msg.content}>
            {targetUser.username}
          </List.Item>
        );
      })}
    </List>
  );
}

export default connect(
  (state) => ({ user: state.user, chat: state.chat }),
  {}
)(Message);
