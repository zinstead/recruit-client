import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { TabBar } from "antd-mobile";

export default function FooterNav(props) {
  let { componentList, unReadCount } = props;
  componentList = componentList.filter((item) => !item.hide);
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <TabBar
      activeKey={location.pathname}
      onChange={(key) => {
        navigate(key);
      }}
    >
      {componentList.map((item) => (
        <TabBar.Item
          key={item.path}
          icon={item.icon}
          title={item.text}
          badge={
            item.path === "/message" && unReadCount !== 0 ? unReadCount : null
          }
        />
      ))}
    </TabBar>
  );
}
