import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { NavBar, Form, Input, TextArea, Button } from "antd-mobile";
import { useNavigate } from "react-router-dom";

import AvatarSelector from "../../components/avatarSelector/avatarSelector";
import { updateUser } from "../../redux/actions";

function BossInfo(props) {
	const [userInfo, setUserInfo] = useState({
		avatar: "",
		position: "",
		info: "",
		company: "",
		salary: "",
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
				老板信息完善
			</NavBar>
			<AvatarSelector setAvatar={setAvatar} />
			<Form layout="horizontal" mode="card">
				<Form.Item label="招聘职位:">
					<Input
						placeholder="请输入招聘职位"
						onChange={(val) => {
							handleChange("position", val);
						}}
					/>
				</Form.Item>
				<Form.Item label="公司名称:">
					<Input
						placeholder="请输入公司名称"
						onChange={(val) => {
							handleChange("company", val);
						}}
					/>
				</Form.Item>
				<Form.Item label="职位薪资:">
					<Input
						placeholder="请输入职位薪资"
						onChange={(val) => {
							handleChange("salary", val);
						}}
					/>
				</Form.Item>
				<Form.Item label="职位要求:">
					<TextArea
						placeholder="请输入职位要求"
						rows={3}
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
	BossInfo
);
