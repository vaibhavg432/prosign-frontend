import React, { useState } from "react";
import { Table, Tag, message, Spin } from "antd";
import {
	AiFillEye,
	AiFillEyeInvisible,
	AiFillCopy,
	AiOutlineLink,
} from "react-icons/ai";

import { useGetPlaylistsQuery } from "../../../services/PlaylistApi";
import { useGetUserMonitorQuery } from "../../../services/UserMonitorApi";
import { useGetAllDocumentsQuery } from "../../../services/UserMediaApi";

const MonitorTable = () => {
	const { data: playlist } = useGetPlaylistsQuery();
	const { data, isLoading } = useGetUserMonitorQuery();
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
						<h1>{text}</h1>
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
							<h1 className="text-green-600">ONLINE</h1>
						) : (
							<h1 className="text-red-600">OFFLINE</h1>
						)}
					</div>
				);
			},
		},
		{
			title: "Playlist Playing / Last Played",
			dataIndex: "document",
			key: "document",
			render: (text) => {
				return (
					<div className="flex gap-4">
						{playlist?.playlist?.map((doc) => {
							if (doc._id === text) {
								return (
									<div>
										<p>{doc.name}</p>
									</div>
								);
							}
						})}
					</div>
				);
			},
		},
		{
			title: "Copy Credentials",
			dataIndex: "copy",
			key: "copy",
			render: (text, record, index) => {
				return (
					<div>
						{contextHolder}
						<AiFillCopy
							className="cursor-pointer text-xl text-gray-400"
							onClick={() => {
								navigator.clipboard.writeText(
									"Username: " +
										record.username +
										"\n" +
										"Password: " +
										record.password,
								);
								showMessage("Password Copied");
							}}
						/>
					</div>
				);
			},
		},
	];
	return (
		<div>
			{!isLoading ? (
				<Table
					columns={columns}
					dataSource={data?.screens}
					pagination={{ pageSize: 15, position: ["bottomCenter"] }}
					scroll={{ x: 240 }}
				/>
			) : (
				<div className="w-full flex justify-center items-center h-48">
					<Spin size="large" />
				</div>
			)}
		</div>
	);
};

export default MonitorTable;
