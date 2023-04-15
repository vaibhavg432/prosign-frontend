import React, { useState } from "react";
import { Table, Tag, message, Button, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import { useGetPlaylistsQuery } from "../../../services/PlaylistApi";
import {
	useGetUngroupedScreensQuery,
	useStopPlayListOneScreenMutation,
} from "../../../services/UserMonitorApi";

const AloneMonitorTable = () => {
	const [stopPlayListOneScreen, { isLoading: isStopping }] =
		useStopPlayListOneScreenMutation();
	const { data: playlist } = useGetPlaylistsQuery({},{
		pollingInterval: 1000,
	});
	const { data, isLoading } = useGetUngroupedScreensQuery({},{
		pollingInterval: 1000,
	});
	const [stop, setStop] = useState([]);
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
			dataIndex: "action",
			key: "action",
			render: (text, record, index) => {
				return (
					<div className="flex gap-4">
						{contextHolder}
						<Button
							type="primary"
							danger
							disabled={record.isPlaying === false}
							onClick={async (e) => {
								const temp1 = [...stop];
								temp1[index] = true;
								setStop(temp1);
								const { data } = await stopPlayListOneScreen(
									record._id,
								);
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

export default AloneMonitorTable;
