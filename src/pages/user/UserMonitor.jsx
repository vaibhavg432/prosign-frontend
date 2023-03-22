import React, { useEffect, useState } from "react";
import { Table, Tag, message, Button, Space, Modal, Input } from "antd";

import { User } from "../../components";
import { users } from "../../constants/data";

const Monitors = () => {
	const [messageApi, contextHolder] = message.useMessage();
	const [showPassword, setShowPassword] = useState([]);
	const [isOpen, setIsOpen] = useState(false);

	const columns = [
		{
			title: "SNo.",
			dataIndex: "_id",
			key: "_id",
			render: (text, record, index) => {
				return index + 1;
			},
		},
		{
			title: "Username",
			dataIndex: "username",
			key: "username",
		},
		{
			title: "Password",
			dataIndex: "password",
			key: "password",
			render: (text, record, index) => {
				return (
					<div>
						{showPassword[index] ? (
							<Tag color="green">{text}</Tag>
						) : (
							<Tag color="blue">********</Tag>
						)}
						<Tag
							color="red"
							className="cursor-pointer"
							onClick={() => {
								let temp = [...showPassword];
								temp[index] = !temp[index];
								setShowPassword(temp);
							}}
						>
							{showPassword[index] ? "Hide" : "Show"}
						</Tag>
						{showPassword[index] && (
							<Tag
								color="blue"
								className="cursor-pointer"
								onClick={() => {
									navigator.clipboard.writeText(text);
									messageApi.open({
										type: "success",
										content: "Password Copied",
									});
								}}
							>
								Copy
							</Tag>
						)}
					</div>
				);
			},
		},
		{
			title: "Current Status",
			dataIndex: "isPlaying",
			key: "isPlaying",
			render: (text) => {
				return (
					<div>
						{text === true ? (
							<Tag color="green">Playing</Tag>
						) : (
							<Tag color="red">Not Playing</Tag>
						)}
					</div>
				);
			},
		},
		{
			title: "Media Playing",
			dataIndex: "document",
			key: "document",
		},
	];
	//fill data of showpassword with length of users with false
	useEffect(() => {
		setShowPassword(Array(users.length).fill(false));
	}, []);
	return (
		<div className="w-full flex flex-col gap-8">
			<div className="w-full flex justify-between">
				<h1>All Monitors</h1>
				<div>
					<Space direction="vertical" style={{ width: "100%" }}>
						<Button
							type="primary"
							block
							className="bg-[#598392]"
							onClick={() => setIsOpen(true)}
						>
							Add Monitor User
						</Button>
						<Modal
							title="Add Monitor User"
							visible={isOpen}
							okButtonProps={{ style: { display: "none" } }}
							onCancel={() => setIsOpen(false)}
						>
							<p>No. of Vacant Users Left : 4</p>
							<div className="mt-4">
								<label>How many Users you want to add ?*</label>
								<Input type="number" max={4} />
							</div>
							<Button
								type="primary"
								className="bg-[#598392] mt-4"
								onClick={() => setIsOpen(false)}
							>
								Add
							</Button>
						</Modal>
					</Space>
				</div>
			</div>

			<div>
				<Table
					columns={columns}
					dataSource={users}
					pagination={{ pageSize: 5, position: ["bottomCenter"] }}
				/>
			</div>
		</div>
	);
};

const UserMonitor = () => {
	return <User name="Monitors" Component={<Monitors />} />;
};

export default UserMonitor;
