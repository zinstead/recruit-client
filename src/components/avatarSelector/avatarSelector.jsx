import React, { useState } from "react";
import { List, Grid } from "antd-mobile";

export default function AvatarSelector(props) {
  const avatarList = [];
  for (let i = 1; i <= 20; i++) {
    avatarList.push({
      text: "头像" + i,
      src: require(`../../assets/images/头像${i}.png`),
    });
  }

  const [selectedAvatar, setSelectedAvatar] = useState(null);

  const handleClick = ({ text, src }) => {
    setSelectedAvatar(src);
    props.setAvatar(text);
  };

  return (
    <List
      header={
        !selectedAvatar ? (
          "请选择头像"
        ) : (
          <div>
            已选择头像:
            <img src={selectedAvatar} alt="" />
          </div>
        )
      }
    >
      <Grid columns={5} gap={5}>
        {avatarList.map((avatar) => (
          <Grid.Item key={avatar.text} className="grid-item">
            <img
              src={avatar.src}
              alt=""
              onClick={() => {
                handleClick(avatar);
              }}
            />
          </Grid.Item>
        ))}
      </Grid>
    </List>
  );
}
