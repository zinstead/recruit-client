import {
  reqRegister,
  reqLogin,
  reqUpdateUser,
  reqUser,
  reqUserList,
  reqMsgList,
  reqReadMsg,
} from "../api";
import {
  AUTH_SUCCESS,
  ERROR_MSG,
  RECEIVE_USER,
  RESET_USER,
  RECEIVE_USER_LIST,
  RECEIVE_MSG_LIST,
  RECEIVE_MSG,
  MSG_READ,
} from "./constant";
import { io } from "socket.io-client";

// 同步action
export const authSuccess = (user) => ({ type: AUTH_SUCCESS, data: user });
export const errorMsg = (msg) => ({ type: ERROR_MSG, data: msg });
export const receiveUser = (user) => ({ type: RECEIVE_USER, data: user });
export const resetUser = (msg) => ({ type: RESET_USER, data: msg });
export const receiveUserList = (userList) => ({
  type: RECEIVE_USER_LIST,
  data: userList,
});
export const receiveMsgList = ({ users, chatMsgs, userid }) => ({
  type: RECEIVE_MSG_LIST,
  data: { users, chatMsgs, userid },
});
export const receiveMsg = ({ chatMsg, userid }) => ({
  type: RECEIVE_MSG,
  data: { chatMsg, userid },
});
export const msgRead = ({ from, to, count }) => ({
  type: MSG_READ,
  data: { from, to, count },
});

// 异步action
export const register = (user) => {
  const { username, password, password2, usertype } = user;
  if (!username) {
    return errorMsg("用户名不能为空!");
  }
  if (!password) {
    return errorMsg("密码不能为空!");
  }
  if (password !== password2) {
    return errorMsg("2次密码要一致!");
  }

  return async (dispatch) => {
    const response = await reqRegister({ username, password, usertype });
    const result = response.data;
    if (result.code === 0) {
      getMsgList(dispatch, result.data._id);
      dispatch(authSuccess(result.data));
    } else {
      dispatch(errorMsg(result.msg));
    }
  };
};

export const login = (user) => {
  const { username, password } = user;
  if (!username) {
    return errorMsg("用户名不能为空!");
  }
  if (!password) {
    return errorMsg("密码不能为空!");
  }
  return async (dispatch) => {
    const response = await reqLogin(user);
    const result = response.data;
    if (result.code === 0) {
      getMsgList(dispatch, result.data._id);
      dispatch(authSuccess(result.data));
    } else {
      dispatch(errorMsg(result.msg));
    }
  };
};

export const updateUser = (user) => {
  return async (dispatch) => {
    const response = await reqUpdateUser(user);
    const result = response.data;
    if (result.code === 0) {
      dispatch(receiveUser(result.data));
    } else {
      dispatch(resetUser(result.msg));
    }
  };
};

export const getUser = () => {
  return async (dispatch) => {
    const response = await reqUser();
    const result = response.data;
    if (result.code === 0) {
      getMsgList(dispatch, result.data._id);
      dispatch(receiveUser(result.data));
    } else {
      dispatch(resetUser(result.msg));
    }
  };
};

export const getUserList = (usertype) => {
  return async (dispatch) => {
    const response = await reqUserList(usertype);
    const result = response.data;
    if (result.code === 0) {
      dispatch(receiveUserList(result.data));
    }
  };
};

function initSocket(dispatch, userid) {
  if (!io.socket) {
    io.socket = io("ws://localhost:4000");
    // 连接到服务器并发送用户名信息
    io.socket.on("connect", () => {
      io.socket.emit("user connected", userid);
    });
    // 监听服务器发送过来的一对一消息
    io.socket.on("receiveMsg", (message) => {
      dispatch(receiveMsg({ chatMsg: message, userid }));
    });
  }
}

export const sendMsg = ({ from, to, content }) => {
  return (dispatch) => {
    io.socket.emit("sendMsg", {
      recipient: to,
      message: { from, to, content },
    });
  };
};

export const readMsg = (from, to) => {
  return async (dispatch) => {
    const response = await reqReadMsg(from);
    const result = response.data;
    if (result.code === 0) {
      const count = result.data;
      dispatch(msgRead({ from, to, count }));
    }
  };
};

// 注册/登录/获取用户信息后自动登录: 发送请求获取当前用户相关的消息列表
async function getMsgList(dispatch, userid) {
  initSocket(dispatch, userid);
  const response = await reqMsgList();
  const result = response.data;
  if (result.code === 0) {
    dispatch(receiveMsgList({ ...result.data, userid }));
  }
}
