import React, { useState } from "react";
import { Table, Tag, Select, Button, message, Spin, Modal } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { AiOutlineLink } from "react-icons/ai";

import { User } from "../../components";
import {
	useGetCurrentPlayingMonitorsQuery,
	useGetGroupedScreensQuery,
	useGetUngroupedScreensQuery,
	usePlayPlaylistOnMixedScreensMutation,
} from "../../services/UserMonitorApi";
import { useGetPlaylistsQuery } from "../../services/PlaylistApi";
import { useGetAllDocumentsQuery } from "../../services/UserMediaApi";

const Schedule = () => {
	const { data: groupedData } = useGetGroupedScreensQuery({},{ pollingInterval: 1000, });
	const { data: ungroupedData } = useGetUngroupedScreensQuery({},{ pollingInterval: 1000, });
	const { data: playlist } = useGetPlaylistsQuery({},{ pollingInterval: 1000, });
	const [schedule, setSchedule] = useState(false);
	const [selected, setSelected] = useState({
		group: [],
		alone: [],
		playlist: "",
	});
	const [messageApi, contextHolder] = message.useMessage();
	const { data, isLoading: monitorLoading } =
		useGetCurrentPlayingMonitorsQuery();
	const { data: allDocuments, isLoading } = useGetAllDocumentsQuery();
	const [playPlaylistOnMixedScreens, { isLoading: isScheduling }] =
		usePlayPlaylistOnMixedScreensMutation();
	const documents = allDocuments?.documents;
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
					<Button
						type="primary"
						danger
						onClick={() => setSchedule(true)}
					>
						Schedule
					</Button>
					<Modal
						title="Schedule Monitors"
						visible={schedule}
						onCancel={() => {
							setSelected({
								group: [],
								alone: [],
								playlist: "",
							});
							setSchedule(false);
						}}
						footer={null}
					>
						<div>
							<div className="flex flex-col gap-4">
								<div>
									<label>Select Groups</label>
									<Select
										mode="multiple"
										allowClear
										style={{ width: "100%" }}
										placeholder="Please select"
										onChange={(value) => {
											setSelected({
												...selected,
												group: value,
											});
										}}
										value={selected.group}
										options={groupedData?.screens.map(
											(group) => {
												return {
													label: group.name,
													value: group._id,
												};
											},
										)}
									/>
								</div>
								<div className="mt-2">
									<label>Select Monitors</label>
									<Select
										mode="multiple"
										allowClear
										style={{ width: "100%" }}
										placeholder="Please select"
										onChange={(value) => {
											setSelected({
												...selected,
												alone: value,
											});
										}}
										value={selected.alone}
										options={ungroupedData?.screens.map(
											(group) => {
												return {
													label: group.name,
													value: group._id,
												};
											},
										)}
									/>
								</div>
								<div className="mt-2">
									<label>Select Playlist</label>
									<Select
										style={{ width: "100%" }}
										placeholder="Please select"
										onChange={(value) => {
											setSelected({
												...selected,
												playlist: value,
											});
										}}
										value={selected.playlist}
										options={playlist?.playlist.map(
											(group) => {
												return {
													label: group.name,
													value: group._id,
												};
											},
										)}
									/>
								</div>
								<div>
									{contextHolder}
									<Button
										type="primary"
										danger
										onClick={async (e) => {
											e.preventDefault();
											const { data } =
												await playPlaylistOnMixedScreens(
													selected,
												);

											if (data?.success) {
												setSchedule(false);
												setSelected({
													group: [],
													alone: [],
													playlist: "",
												});
												messageApi.success(
													"Playlist Scheduled Successfully",
												);
											} else {
												messageApi.error(
													"Playlist Scheduled Failed",
												);
											}
										}}
									>
										{isScheduling ? (
											<LoadingOutlined className="text-white" />
										) : (
											"Schedule"
										)}
									</Button>
								</div>
							</div>
						</div>
					</Modal>
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
