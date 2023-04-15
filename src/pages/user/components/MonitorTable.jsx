import React from "react";
import { Table, Tag, message, Spin, Button, Popover, QRCode } from "antd";
import {
	LoadingOutlined,
	EyeOutlined,
	EyeInvisibleOutlined,
	SaveOutlined,
} from "@ant-design/icons";
import { AiFillCopy, AiOutlineQrcode } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

import { styles } from "../../../constants";
import { useGetPlaylistsQuery } from "../../../services/PlaylistApi";
import {
	useGetUserMonitorQuery,
	useGetGroupedScreensQuery,
	useLogoutScreenMutation,
	useUpdateMonitorNameMutation,
} from "../../../services/UserMonitorApi";

const MonitorTable = () => {
	const navigate = useNavigate();
	const [updateMonitorName, { isLoading: isUpdating }] =
		useUpdateMonitorNameMutation();
	const [logoutScreen, { isLoading: isLoggingOut }] =
		useLogoutScreenMutation();
	const { data: playlist } = useGetPlaylistsQuery(
		{},
		{ pollingInterval: 1000 },
	);
	const { data, isLoading } = useGetUserMonitorQuery(
		{},
		{ pollingInterval: 1000 },
	);
	const { data: groupedData } = useGetGroupedScreensQuery(
		{},
		{ pollingInterval: 1000 },
	);
	const [messageApi, contextHolder] = message.useMessage();
	const [showPass, setShowPass] = React.useState([]);
	const [name, setName] = React.useState([]);
	const [logout, setLogout] = React.useState([]);
	const [newName, setNewName] = React.useState("");
	const showMessage = (text) => {
		messageApi.open({
			type: "success",
			content: text,
		});
	};
	const temp = [];
	for (let i = 0; i < data?.screens?.length; i++) {
		temp.push(false);
	}
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
			render: (text, record, index) => {
				return (
					<div className="w-full flex">
						{name[index] ? (
							<div className="flex w-full items-center gap-2">
								<input
									type="text"
									value={newName}
									onChange={(e) => {
										setNewName(e.target.value);
									}}
									className={styles.input}
								/>
								{contextHolder}
								{!isUpdating ? (
									<SaveOutlined
										className="cursor-pointer text-lg"
										onClick={async () => {
											const { data } =
												await updateMonitorName({
													id: record._id,
													name: newName,
												});
											if (!data?.success) {
												messageApi.open({
													type: "error",
													content: data?.message,
												});
											} else {
												const temp1 = [...name];
												temp1[index] = false;
												setName(temp1);
												showMessage("Name Updated");
											}
										}}
									/>
								) : (
									<LoadingOutlined />
								)}
							</div>
						) : (
							<h1
								className="cursor-pointer"
								onClick={() => {
									const temp1 = [...name];
									//set all elements for false
									for (let i = 0; i < temp1.length; i++) {
										temp1[i] = false;
									}
									temp1[index] = true;
									setName(temp1);
									setNewName(text);
								}}
							>
								{text}
							</h1>
						)}
					</div>
				);
			},
		},
		{
			title: "Credentials",
			dataIndex: "creds",
			key: "creds",
			render: (text, record, index) => {
				return (
					<div className="w-full flex">
						<div className="text-sm">
							<h1>{record.username}</h1>
							<div className = "flex gap-4">
								<h1>
									<span className="font-bold">Pass :</span>{" "}
									{showPass[index] ? (
										<Tag color="blue">
											{record.password}
										</Tag>
									) : (
										<Tag color="green">********</Tag>
									)}
								</h1>
								<div className="flex justify-center items-center">
									{showPass[index] ? (
										<EyeInvisibleOutlined
											className="cursor-pointer"
											onClick={() => {
												const temp1 = [...showPass];
												temp1[index] = false;
												setShowPass(temp1);
											}}
										/>
									) : (
										<EyeOutlined
											className="cursor-pointer"
											onClick={() => {
												const temp1 = [...showPass];
												temp1[index] = true;
												setShowPass(temp1);
											}}
										/>
									)}
								</div>
							</div>
						</div>
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
			title: "Playlist Playing / Last Played",
			dataIndex: "document",
			key: "document",
			render: (text) => {
				return (
					<div className="flex gap-4">
						{playlist?.playlist?.map((doc) => {
							if (doc._id === text) {
								return (
									<div key = {doc._id}>
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
			title: "Media Assigned",
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
								const temp1 = [...logout];
								temp1[index] = true;
								setLogout(temp1);
								await logoutScreen(record._id)
									.then((res) => {
										if (res.data) {
											messageApi.open({
												type: "success",
												content: "Screen Logged Out",
											});
										}
										const temp2 = [...logout];
										temp2[index] = false;
										setLogout(temp2);
									})
									.catch((err) => {
										messageApi.open({
											type: "error",
											content: "Error Logging Out Screen",
										});
									});
							}}
						>
							{isLoggingOut && logout[index] ? (
								<LoadingOutlined />
							) : (
								"Logout"
							)}
						</Button>
					</div>
				);
			},
		},
	];
	return (
		<div className="">
			{!isLoading ? (
				<Table
					columns={columns}
					dataSource={data?.screens}
					pagination={{ pageSize: 15, position: ["bottomCenter"] }}
					scroll={{ x: 240 }}
					colorPrimary = "#FF4D4F"
					colorPrimaryBorder = "#FF4D4F"
					colorPrimaryHover = "#FF4D4F"
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
