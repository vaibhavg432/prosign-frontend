import React, { useState } from "react";
import { Table, Tag, message, Button, Spin, Modal, Descriptions } from "antd";
import { AiOutlineMore } from "react-icons/ai";

import { useGetPlaylistsQuery } from "../../../services/PlaylistApi";
import {
	useGetGroupedScreensQuery,
	useStopPlayListOneGroupMutation,
	useGetUserMonitorQuery,
} from "../../../services/UserMonitorApi";

const GroupMonitorTable = () => {
	const [view, setView] = useState(false);
	const [viewData, setViewData] = useState({});
	const { data: userMonitors } = useGetUserMonitorQuery();
	const { data: playlist } = useGetPlaylistsQuery();
	const [stopPlayListOneGroup] = useStopPlayListOneGroupMutation();
	const { data, isLoading } = useGetGroupedScreensQuery();
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
			title: "Stop",
			dataIndex: "stop",
			key: "stop",
			render: (text, record) => {
				return (
					<div>
						<Button
							type="primary"
							danger
							disabled={record.isPlaying === false}
							onClick={() => {
								stopPlayListOneGroup(record._id);
								showMessage("Stopped");
							}}
						>
							Stop
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
						<AiOutlineMore
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
						onCancel={() => setView(false)}
						footer={null}
					>
						<Descriptions title="" column={1}>
							<Descriptions.Item label="Group Name">
								{viewData.name}
							</Descriptions.Item>
							<Descriptions.Item label="Number of Monitors">
								{viewData?.screens?.length}
							</Descriptions.Item>
							<Descriptions.Item label="Playlist Playing">
								{playlist?.playlist?.map((doc) => {
									if (doc._id === viewData.document) {
										return <p>{doc.name}</p>;
									}
								})}
							</Descriptions.Item>
							<Descriptions.Item label="Media Status">
								{viewData.isPlaying === true ? (
									<Tag color="green">Playing</Tag>
								) : (
									<Tag color="red">Not Playing</Tag>
								)}
							</Descriptions.Item>
							<Descriptions.Item label="Monitors">
								<ul>
									{viewData?.screens?.map((screen) => {
										return (
											<li>
												{userMonitors?.screens?.map(
													(doc) => {
														if (
															doc._id === screen
														) {
															return (
																<div>
																	<p>
																		{
																			doc.username
																		}
																	</p>
																</div>
															);
														}
													},
												)}
											</li>
										);
									})}
								</ul>
							</Descriptions.Item>
						</Descriptions>
					</Modal>
				</div>
			) : (
				<div className="w-full flex justify-center items-center h-48">
					<Spin size="large" />
				</div>
			)}
		</div>
	);
};

export default GroupMonitorTable;
