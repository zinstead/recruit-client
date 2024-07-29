import ajax from "./ajax";

// 注册接口
export const reqRegister = (user) => ajax("/register", user, "POST");
// 登录接口
export const reqLogin = ({ username, password }) =>
	ajax("/login", { username, password }, "POST");
// 更新用户信息的接口
export const reqUpdateUser = (user) => ajax("/update", user, "POST");
// 获取用户信息的接口
export const reqUser = () => ajax("/user");
// 获取用户信息的接口
export const reqUserList = (usertype) => ajax("/userlist", { usertype });
// 获取消息列表的接口
export const reqMsgList = () => ajax("/msglist");
// 设置消息为已读的接口
export const reqReadMsg = (from) => ajax("/readmsg", { from }, 'POST');
