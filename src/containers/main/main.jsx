import React, { useLayoutEffect } from "react";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import Cookies from "js-cookie";
import { NavBar } from "antd-mobile";
import {
  AppstoreOutline,
  AppOutline,
  MessageOutline,
  UserOutline,
} from "antd-mobile-icons";

import BossInfo from "../bossInfo/bossInfo";
import JobseekerInfo from "../jobseekerInfo/jobseekerInfo";
import Boss from "../boss/boss";
import Jobseeker from "../jobseeker/jobseeker";
import Message from "../message/message";
import Personal from "../personal/personal";
import Chat from "../chat/chat";
import NotFound from "../../components/notFound/notFound";
import FooterNav from "../../components/footerNav/footerNav";
import { getRedirectTo } from "../../utils";
import { getUser } from "../../redux/actions";

function Main(props) {
  let componentList = [
    {
      path: "/boss",
      element: <Boss />,
      title: "求职者列表",
      icon: <AppstoreOutline />,
      text: "求职者",
    },
    {
      path: "/jobseeker",
      element: <Jobseeker />,
      title: "老板列表",
      icon: <AppOutline />,
      text: "老板",
    },
    {
      path: "/message",
      element: <Message />,
      title: "消息列表",
      icon: <MessageOutline />,
      text: "消息",
    },
    {
      path: "/personal",
      element: <Personal />,
      title: "个人中心",
      icon: <UserOutline />,
      text: "个人",
    },
  ];

  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;
  const userid = Cookies.get("userid");

  useLayoutEffect(() => {
    if (!userid) {
      navigate("/login");
    }
    const { _id, usertype, avatar } = props.user;
    if (!_id) {
      props.getUser();
    } else {
      if (pathname === "/") {
        let path = getRedirectTo(usertype, avatar);
        navigate(path);
      }
    }
  }, [navigate, userid, props, pathname]);

  const currComponent = componentList.find((item) => item.path === pathname);
  if (currComponent) {
    if (props.user.usertype === "boss") {
      componentList[1].hide = true;
    } else {
      componentList[0].hide = true;
    }
  }

  return (
    <div>
      {currComponent ? (
        <NavBar backIcon={null} className="main-header">
          {currComponent.title}
        </NavBar>
      ) : null}
      <Routes>
        {componentList.map((item) => (
          <Route key={item.path} path={item.path} element={item.element} />
        ))}
        <Route path="/bossInfo" element={<BossInfo />} />
        <Route path="/jobseekerInfo" element={<JobseekerInfo />} />
        <Route path="/chat/:fromId" element={<Chat />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {currComponent ? (
        <FooterNav
          componentList={componentList}
          unReadCount={props.unReadCount}
        />
      ) : null}
    </div>
  );
}

export default connect(
  (state) => ({ user: state.user, unReadCount: state.chat.unReadCount }),
  { getUser }
)(Main);
