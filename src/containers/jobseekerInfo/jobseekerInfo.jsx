import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { NavBar, Form, Input, Button, TextArea } from "antd-mobile";
import { useNavigate } from "react-router-dom";

import AvatarSelector from "../../components/avatarSelector/avatarSelector";
import { updateUser } from "../../redux/actions";

function JobseekerInfo(props) {
	const [userInfo, setUserInfo] = useState({
		avatar: "",
		position: "",
		info: "",
	});

	const handleChange = (content, val) => {
		setUserInfo({ ...userInfo, [content]: val });
	};

	const setAvatar = (avatar) => {
		setUserInfo({ ...userInfo, avatar });
	};

	const save = () => {
		props.updateUser(userInfo);
	};

	const navigate = useNavigate();
	const { avatar, usertype } = props.user;
	useEffect(() => {
		if (avatar) {
			const path = usertype === "boss" ? "/boss" : "/jobseeker";
			navigate(path);
		}
	}, [avatar, usertype, navigate]);

	return (
		<div>
			<NavBar backIcon={null} className="nav">
				求职者信息完善
			</NavBar>
			<AvatarSelector setAvatar={setAvatar} />
			<Form layout="horizontal" mode="card">
				<Form.Item label="求职岗位:">
					<Input
						placeholder="请输入求职岗位"
						onChange={(val) => {
							handleChange("position", val);
						}}
					/>
				</Form.Item>
				<Form.Item label="个人介绍:">
					<TextArea
						rows={3}
						placeholder="请输入个人介绍"
						onChange={(val) => {
							handleChange("info", val);
						}}
					/>
				</Form.Item>
			</Form>
			<Button color="primary" block onClick={save}>
				保 存
			</Button>
		</div>
	);
}

export default connect((state) => ({ user: state.user }), { updateUser })(
	JobseekerInfo
);
