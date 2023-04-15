import React, { useState } from "react";
import {
	Table,
	Tag,
	message,
	Button,
	Spin,
	Modal,
	Descriptions,
	Select,
} from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { AiOutlineInfoCircle } from "react-icons/ai";

import { styles } from "../../../constants";
import { useGetPlaylistsQuery } from "../../../services/PlaylistApi";
import {
	useGetGroupedScreensQuery,
	useGetUngroupedScreensQuery,
	useStopPlayListOneGroupMutation,
	useGetUserMonitorQuery,
	useDeleteAScreenGroupMutation,
} from "../../../services/UserMonitorApi";

const GroupMonitorTable = () => {
	const [view, setView] = useState(false);
	const [edit, setEdit] = useState(false);
	const [viewData, setViewData] = useState({});
	const [editData, setEditData] = useState({});
	const [stop, setStop] = useState([]);
	const [options, setOptions] = useState([]);

	const { data: userMonitors } = useGetUserMonitorQuery(
		{},
		{ pollingInterval: 1000 },
	);
	const { data: ungroupedScreens } = useGetUngroupedScreensQuery(
		{},
		{ pollingInterval: 1000 },
	);
	const { data, isLoading } = useGetGroupedScreensQuery(
		{},
		{ pollingInterval: 1000 },
	);
	const { data: playlist } = useGetPlaylistsQuery(
		{},
		{ pollingInterval: 1000 },
	);

	const [stopPlayListOneGroup, { isLoading: isStopping }] =
		useStopPlayListOneGroupMutation();
	const [deleteAScreenGroup, { isLoading: isDeleting }] =
		useDeleteAScreenGroupMutation();

	const [messageApi, contextHolder] = message.useMessage();
	const showMessage = (text) => {
		messageApi.open({
			type: "success",
			content: text,
		});
	};


	const screenName = (id) => {
		const screen = userMonitors?.screens?.find((screen) => screen._id === id);
		return screen?.name;
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
			title: "Name",
			dataIndex: "name",
			key: "name",
		},
		{
			title: "Screen Count",
			dataIndex: "screens",
			key: "screens",
			render: (tex, record) => {
				return record.screens?.length;
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
										<p>{doc.name}</p>
									</div>
								);
							}
						})}
					</div>
				);
			},
		},{
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
			title: "Stop",
			dataIndex: "stop",
			key: "stop",
			render: (text, record, index) => {
				return (
					<div>
						{contextHolder}
						<Button
							type="primary"
							danger
							disabled={record.isPlaying === false}
							onClick={async () => {
								const temp1 = [...stop];
								temp1[index] = true;
								setStop(temp1);
								await stopPlayListOneGroup(record._id);
								showMessage("Stopped");
								const temp2 = [...stop];
								temp2[index] = false;
								setStop(temp2);
							}}
						>
							{isStopping && stop[index] ? (
								<LoadingOutlined className="text-white" />
							) : (
								"Stop"
							)}
						</Button>
					</div>
				);
			},
		},
		{
			title: "Action",
			dataIndex: "action",
			key: "action",
			render: (text, record, index) => {
				return (
					<div className="flex items-center gap-4">
						<AiOutlineInfoCircle
							size={20}
							className="cursor-pointer"
							onClick={() => {
								setView(true);
								setViewData(record);
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
				<div>
					<Table
						columns={columns}
						dataSource={data?.screens}
						pagination={{
							pageSize: 15,
							position: ["bottomCenter"],
						}}
						scroll={{ x: 240 }}
					/>
					<Modal
						title="Group Details"
						visible={view}
						onCancel={() => {
							setView(false);
							setEdit(false);
						}}
						footer={null}
					>
						<div className="w-full flex px-4 justify-end gap-4">
							<Button
								type="primary"
								danger
								onClick={async (e) => {
									const { data } = await deleteAScreenGroup(
										viewData._id,
									);
									showMessage("Deleted");
									setView(false);
								}}
							>
								{isDeleting ? (
									<LoadingOutlined className="text-white" />
								) : (
									"Delete"
								)}
							</Button>
							{/* <Button
								type="primary"
								danger
								disabled={edit}
								onClick={() => {
									setEdit(true);
									setEditData(viewData);
									const monitorList = userMonitors?.screens;
									for(let i = 0; i<ungroupedScreens.length; i++){
										monitorList.push(ungroupedScreens[i])
									}
									for(let i = 0; i<viewData.screens.length; i++){
										monitorList.push(viewData.screens[i])
									}
									const option = [];
									for (let i = 0; i < monitorList.length; i++) {
										option.push({
											label: monitorList[i].name,
											value: monitorList[i]._id,
										});
									}
									setOptions(option);
								}}
							>
								Edit
							</Button> */}
						</div>
						<Descriptions title="" column={1}>
							<Descriptions.Item label="Group Name">
								{edit ? (
									<input
										type="text"
										value={editData.name}
										className={styles.input}
										onChange={(e) => {
											setEditData({
												...editData,
												name: e.target.value,
											});
										}}
									/>
								) : (
									viewData.name
								)}
							</Descriptions.Item>
							<Descriptions.Item label="Number of Monitors">
								{" "}
								{viewData?.screens?.length}{" "}
							</Descriptions.Item>
							<Descriptions.Item label="Playlist Playing">
								{" "}
								{playlist?.playlist?.map((doc) => {
									if (doc._id === viewData.document) {
										return <p key = {doc._id}>{doc.name}</p>;
									}
								})}{" "}
							</Descriptions.Item>
							<Descriptions.Item label="Media Assigned">
								{" "}
								{viewData.isPlaying === true ? (
									<Tag color="green">Playing</Tag>
								) : (
									<Tag color="red">Not Playing</Tag>
								)}{" "}
							</Descriptions.Item>
							<Descriptions.Item label="Monitors">
								{" "}
								{!edit ? (
									<ul>
										{" "}
										{viewData?.screens?.map((screen) => {
											return (
												<li key = {screen}>
													{screenName(screen)}
												</li>
											);
										})}{" "}
									</ul>
								) : (
									<Select
										mode="multiple"
										allowClear
										style={{
											width: "100%",
										}}
										value={editData?.screens?.map((doc) => {
											return screenName(doc);
										})}
										onChange={(value) =>
											setEditData({
												...editData,
												screens: value,
											})
										}
										placeholder="Select Media Files"
										options={options}
									/>
								)}
							</Descriptions.Item>
						</Descriptions>
						{edit && (
							<div className="w-full flex justify-center gap-4 mt-2">
								<Button type="primary" danger>
									Save
								</Button>
								<Button
									type="primary"
									danger
									onClick={() => {
										setEdit(false);
									}}
								>
									Cancel
								</Button>
							</div>
						)}
					</Modal>
				</div>
			) : (
				<div className="w-full flex justify-center items-center h-48">
					{" "}
					<Spin size="large" />{" "}
				</div>
			)}
		</div>
	);
};

export default GroupMonitorTable;
