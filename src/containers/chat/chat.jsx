import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { NavBar, List, Input, Grid } from "antd-mobile";

import { sendMsg, readMsg } from "../../redux/actions";

function Chat(props) {
  const [content, setContent] = useState("");
  const params = useParams();
  const navigate = useNavigate();
  const { user, chat } = props;

  // 初始化表情列表
  const emojis = [
    "😃",
    "😄",
    "😁",
    "😆",
    "😅",
    "🤣",
    "😂",
    "🙂",
    "😉",
    "😊",
    "😇",
    "🥰",
    "😍",
    "🤩",
    "😘",
    "😗",
    "😚",
    "😙",
    "😏",
    "😌",
    "😔",
    "😪",
    "😴",
    "😷",
    "🤒",
    "🤕",
    "🤢",
    "🤮",
    "🤧",
    "🥵",
    "🥶",
    "🥴",
    "😵",
    "😵",
    "🤯",
    "🥱",
  ];
  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight);
  });

  useEffect(() => {
    return () => {
      const from = params.fromId;
      const to = user._id;
      props.readMsg(from, to);
    };
  }, []);

  const { users, chatMsgs } = chat;
  const meId = user._id;
  if (!users[meId]) {
    // 请求的聊天数据还没有回来,此时users和chatMsgs为null;
    // 暂时显示空白,当数据回来后,props变化会导致组件重新渲染;
    return null;
  }
  const targetId = params.fromId;
  const chatId = [meId, targetId].sort().join("_");
  const msgs = chatMsgs.filter((msg) => msg.chatId === chatId);

  const targetUser = users[targetId];
  const targetIcon = targetUser.avatar
    ? require(`../../assets/images/${targetUser.avatar}.png`)
    : null;
  const meIcon = user.avatar
    ? require(`../../assets/images/${user.avatar}.png`)
    : null;

  const handleSend = () => {
    const from = props.user._id;
    const to = params.fromId;
    const msg = content.trim();
    if (msg) {
      props.sendMsg({ from, to, content: msg });
      setContent("");
      setIsShow(false);
    }
  };

  return (
    <div>
      <NavBar
        className="main-nav"
        onBack={() => {
          navigate(-1);
        }}
      >
        {targetUser.username}
      </NavBar>
      <List
        style={{
          marginTop: "45px",
          marginBottom: "50px",
        }}
      >
        {msgs.map((msg) => {
          if (targetId === msg.from) {
            return (
              <List.Item
                key={msg._id}
                prefix={<img src={targetIcon} alt="" className="chat-avatar" />}
              >
                {msg.content}
              </List.Item>
            );
          } else {
            return (
              <List.Item
                key={msg._id}
                extra={<img src={meIcon} alt="" className="chat-avatar" />}
                className="chat-me"
              >
                {msg.content}
              </List.Item>
            );
          }
        })}
      </List>
      <div className="adm-tab-bar">
        <List.Item
          className="inputBox"
          prefix={
            <Input
              placeholder="请输入内容"
              onChange={(val) => {
                setContent(val);
              }}
              onFocus={() => {
                setIsShow(false);
              }}
              value={content}
            />
          }
          extra={
            <span style={{ fontSize: "16px" }}>
              <span
                onClick={() => {
                  setIsShow(!isShow);
                }}
              >
                😀
              </span>
              &nbsp;&nbsp;
              <span onClick={handleSend}>发送</span>
            </span>
          }
        ></List.Item>
        <Grid columns={6} gap={6}>
          {isShow
            ? emojis.map((emoji, index) => (
                <Grid.Item
                  key={index}
                  onClick={() => {
                    setContent(content + emoji);
                  }}
                  className="emoji"
                >
                  {emoji}
                </Grid.Item>
              ))
            : null}
        </Grid>
      </div>
    </div>
  );
}

export default connect((state) => ({ user: state.user, chat: state.chat }), {
  sendMsg,
  readMsg,
})(Chat);
