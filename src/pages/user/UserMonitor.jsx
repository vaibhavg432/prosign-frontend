import React, { useEffect, useState } from "react";
import { Table, Tag, message, Button, Space, Modal, Input } from "antd";

import { User } from "../../components";
import {
	useGetUserMonitorQuery,
	useAddMonitorMutation,
} from "../../services/UserMonitorApi";
import { useGetUserQuery } from "../../services/UserApi";

const Monitors = () => {
	const [addMonitor] = useAddMonitorMutation();
	const { data } = useGetUserMonitorQuery();
	const { data: userData, isLoading } = useGetUserQuery();
	const users = data?.screens;
	const user = userData?.user;
	const [messageApi, contextHolder] = message.useMessage();
	const [showPassword, setShowPassword] = useState([]);
	const [count, setCount] = useState(0);
	const [isOpen, setIsOpen] = useState(false);

	const showMessage = (text) => {
		messageApi.open({
			type: "success",
			content: text,
		});
	};

	const showError = (text) => {
		messageApi.open({
			type: "error",
			content: text,
		});
	};

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
						{contextHolder}
						{showPassword[index] && (
							<Tag
								color="blue"
								className="cursor-pointer"
								onClick={() => {
									navigator.clipboard.writeText(text);
									showMessage("Password Copied");
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
			title: "Media Playing / Last Played",
			dataIndex: "document",
			key: "document",
		},
	];
	//fill data of showpassword with length of users with false
	useEffect(() => {
		setShowPassword(Array(users?.length).fill(false));
		console.log(data);
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
							{!isLoading && (
								<p>
									No. of Vacant Users Left :{" "}
									{user.screenLimit - user.screenCount}
								</p>
							)}
							{!isLoading && (
								<div className="mt-4">
									<label>
										How many Users you want to add ?*
									</label>
									<Input
										type="number"
										max={
											user.screenLimit - user.screenCount
										}
										min={0}
										value={count}
										onChange={(e) => {
											setCount(e.target.value);
										}}
									/>
								</div>
							)}
							{contextHolder}
							<Button
								type="primary"
								className="bg-[#598392] mt-4"
								onClick={() => {
									if (
										count >
										user.screenLimit - user.screenCount
									) {
										showError(
											"You can't add more than " +
												(user.screenLimit -
													user.screenCount) +
												" users",
										);
										return;
									}
									addMonitor(count);
									setIsOpen(false);
									showMessage(count + " Monitor Added");
									setCount(0);
								}}
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
					dataSource={data?.screens}
					pagination={{ pageSize: 5, position: ["bottomCenter"] }}
					scroll={{ x: 240 }}
				/>
			</div>
		</div>
	);
};

const UserMonitor = () => {
	return <User name="Monitors" Component={<Monitors />} />;
};

export default UserMonitor;
