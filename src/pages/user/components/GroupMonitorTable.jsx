import React, { useState } from "react";
import { Table, Tag, message, Popconfirm, Button } from "antd";
import { AiFillDelete, AiOutlineLink } from "react-icons/ai";

import { useGetPlaylistsQuery } from "../../../services/PlaylistApi";
import {
	useGetGroupedScreensQuery,
	useDeleteAScreenGroupMutation,
	useStopPlayListOneGroupMutation,
} from "../../../services/UserMonitorApi";
import { useGetAllDocumentsQuery } from "../../../services/UserMediaApi";

const GroupMonitorTable = () => {
	const { data: playlist } = useGetPlaylistsQuery();
	const [stopPlayListOneGroup] = useStopPlayListOneGroupMutation();
	const [deleteAScreenGroup] = useDeleteAScreenGroupMutation();
	const { data } = useGetGroupedScreensQuery();
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
			title: "Name",
			dataIndex: "name",
			key: "name",
		},
		{
			title: "Screen Count",
			dataIndex: "screens",
			key: "screens",
			render: (tex, record) => {
				return record.screens.length;
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
					<div className="flex gap-4">
						{contextHolder}
						<Popconfirm
							title="Are you sure to delete this group?"
							onConfirm={() => {
								deleteAScreenGroup(record._id);
								showMessage("Deleted");
							}}
							onCancel={() => {
								messageApi.error("Cancelled");
							}}
							okText="Yes"
							cancelText="No"
							okButtonProps={{ danger: true }}
						>
							<AiFillDelete className="cursor-pointer text-xl" />
						</Popconfirm>
						<h1 className="cursor-pointer text-blue-500 hover:text-blue-700">
							More
						</h1>
					</div>
				);
			},
		},
	];
	return (
		<Table
			columns={columns}
			dataSource={data?.screens}
			pagination={{ pageSize: 15, position: ["bottomCenter"] }}
			scroll={{ x: 240 }}
		/>
	);
};

export default GroupMonitorTable;
