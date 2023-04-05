import React from "react";
import { Table, Tag, message, Spin, Button, Popover, QRCode } from "antd";
import { AiFillCopy, AiOutlineQrcode } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

import { useGetPlaylistsQuery } from "../../../services/PlaylistApi";
import {
	useGetUserMonitorQuery,
	useGetGroupedScreensQuery,
	useLogoutScreenMutation,
} from "../../../services/UserMonitorApi";
import logo from "../../../assets/images/logo.jpg";

const MonitorTable = () => {
	const navigate = useNavigate();
	const [logoutScreen] = useLogoutScreenMutation();
	const { data: playlist } = useGetPlaylistsQuery();
	const { data, isLoading } = useGetUserMonitorQuery();
	const { data: groupedData } = useGetGroupedScreensQuery();
	const [messageApi, contextHolder] = message.useMessage();
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
			title: "Screen Name",
			dataIndex: "name",
			key: "name",
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
			title: "Group Associated",
			dataIndex: "isGrouped",
			key: "isGrouped",
			render: (text, record) => {
				return (
					<div>
						{text
							? groupedData?.screens?.map((group) => {
									if (group._id === record.groupId) {
										return group.name;
									}
							  })
							: "Not Grouped"}
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
										<p
											className="cursor-pointer"
											onClick={() =>
												navigate("/user/playlists")
											}
										>
											{doc.name}
										</p>
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
					<div className="w-full flex gap-4">
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
						{contextHolder}

						<Popover
							overlayInnerStyle={{
								padding: 0,
							}}
							content={
								<QRCode
									value={`username: ${record.username} password: ${record.password}`}
									errorLevel="M"
									bordered={false}
								/>
							}
						>
							<AiOutlineQrcode className="cursor-pointer text-xl text-gray-400" />
						</Popover>
					</div>
				);
			},
		},
		{
			title: "Logout",
			dataIndex: "logout",
			key: "logout",
			render: (text, record, index) => {
				return (
					<div>
						<Button
							type="primary"
							danger
							disabled={record.status === "inactive"}
							onClick={async (e) => {
								await logoutScreen(record._id)
									.then((res) => {
										if (res.data) {
											messageApi.open({
												type: "success",
												content: "Screen Logged Out",
											});
										}
									})
									.catch((err) => {
										messageApi.open({
											type: "error",
											content: "Error Logging Out Screen",
										});
									});
							}}
						>
							Logout
						</Button>
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
