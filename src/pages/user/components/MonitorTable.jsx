import React, { useState } from "react";
import { Table, Tag, message } from "antd";
import {
	AiFillEye,
	AiFillEyeInvisible,
	AiFillCopy,
	AiOutlineLink,
} from "react-icons/ai";

import { useGetUserMonitorQuery } from "../../../services/UserMonitorApi";
import { useGetAllDocumentsQuery } from "../../../services/UserMediaApi";

const MonitorTable = () => {
	const { data } = useGetUserMonitorQuery();
	const { data: mediaData } = useGetAllDocumentsQuery();
	const documents = mediaData?.documents;
	const [messageApi, contextHolder] = message.useMessage();
	const [showPassword, setShowPassword] = useState([]);
	const showMessage = (text) => {
		messageApi.open({
			type: "success",
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
					<div className="flex gap-2 items-center">
						{showPassword[index] ? (
							<Tag color="green">{text}</Tag>
						) : (
							<Tag color="blue">********</Tag>
						)}
						{showPassword[index] ? (
							<AiFillEyeInvisible
								onClick={() => {
									let temp = [...showPassword];
									temp[index] = !temp[index];
									setShowPassword(temp);
								}}
								className="text-xl cursor-pointer text-gray-500"
							/>
						) : (
							<AiFillEye
								onClick={() => {
									let temp = [...showPassword];
									temp[index] = !temp[index];
									setShowPassword(temp);
								}}
								className="text-xl cursor-pointer text-gray-500"
							/>
						)}
						{contextHolder}

						<AiFillCopy
							className="cursor-pointer text-xl text-gray-500"
							onClick={() => {
								navigator.clipboard.writeText(text);
								showMessage("Password Copied");
							}}
						/>
					</div>
				);
			},
		},
		{
			title: "Media Status",
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
			title: "Device Status",
			dataIndex: "status",
			key: "status",
			render: (text) => {
				return (
					<div>
						{text === "active" ? (
							<Tag color="green">ONLINE</Tag>
						) : (
							<Tag color="red">OFFILNE</Tag>
						)}
					</div>
				);
			},
		},
		{
			title: "Media Playing / Last Played",
			dataIndex: "document",
			key: "document",
			render: (text) => {
				return (
					<div className="flex gap-4">
						{documents?.map((doc) => {
							if (doc._id === text) {
								return (
									<div>
										<p>{doc.name}</p>
									</div>
								);
							}
						})}
						<AiOutlineLink
							className="cursor-pointer text-xl text-blue-500"
							onClick={() => {
								window.open(
									documents?.find((doc) => doc._id === text)
										.link,
								);
							}}
						/>
					</div>
				);
			},
		},
	];
	return (
		<Table
			columns={columns}
			dataSource={data?.screens}
			pagination={{ pageSize: 5, position: ["bottomCenter"] }}
			scroll={{ x: 240 }}
		/>
	);
};

export default MonitorTable;
