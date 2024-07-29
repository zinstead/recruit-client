import React from "react";
import { Button } from "antd-mobile";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="not-found">
      <h2>抱歉,找不到该页面!</h2>
      <br />
      <Button
        color="primary"
        onClick={() => {
          navigate("/");
        }}>
        回到首页
      </Button>
    </div>
  );
}
