import React from "react";
import { Table, Tag, Spin } from "antd";

import { ScheduleButton } from "./components";
import { User } from "../../components";
import {
	useGetCurrentPlayingMonitorsQuery,
} from "../../services/UserMonitorApi";
import { useGetPlaylistsQuery } from "../../services/PlaylistApi";

const Schedule = () => {
	const { data: playlist } = useGetPlaylistsQuery({},{ pollingInterval: 60000, });
	const { data, isLoading: monitorLoading } =
		useGetCurrentPlayingMonitorsQuery();
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
			title: "Screen / Group",
			dataIndex: "username",
			key: "username",
		},
		{
			title: "Playlist Playing",
			dataIndex: "document",
			key: "document",
			render: (text) => {
				return (
					<div className="flex gap-4 items-center">
						{
							playlist?.playlist.find(
								(playlist) => playlist._id === text,
							)?.name
						}
					</div>
				);
			},
		},
		{
			title: "Date Uploaded",
			dataIndex: "lastUpdated",
			key: "lastUpdated",
			render: (text) => {
				return new Date(text).toLocaleDateString();
			},
		},
		{
			title: "Device Status",
			dataIndex: "status",
			key: "status",
			render: (text) => {
				return (
					<Tag color={text === "active" ? "green" : "red"}>
						{text === "active" ? "ONLINE" : "OFFLINE"}
					</Tag>
				);
			},
		},
	];
	return (
		<div className="w-full ">
			<div>
				<h1>Schedule Your Monitors</h1>
			</div>
			{/*Current Playing Media */}
			<div className="w-full mt-4">
				<div className="w-full flex justify-between">
					<h1 className="py-4">Current Playing Media</h1>
					<ScheduleButton/>
				</div>
				{!monitorLoading ? (
					<Table
						columns={columns}
						dataSource={data?.screens}
						pagination={{
							pageSize: 15,
							position: ["bottomCenter"],
						}}
						scroll={{ x: 240 }}
					/>
				) : (
					<div className="w-full flex justify-center items-center h-48">
						<Spin size="large" />
					</div>
				)}
			</div>
		</div>
	);
};

const UserSchedule = () => {
	return <User name="Schedule" Component={<Schedule />} />;
};

export default UserSchedule;
