import React from "react";
import { Button, Table, Dropdown } from "antd";
import {
	EditOutlined,
	DeleteOutlined,
	PlusCircleOutlined,
} from "@ant-design/icons";

import {
	useGetPlaylistsQuery,
	useCreatePlaylistMutation,
} from "../../services/PlaylistApi";
import { User } from "../../components";

const Playlist = () => {
	const { data: playlistData, isLoading: playlistLoading } =
		useGetPlaylistsQuery();
	const playlist = playlistData?.playlist;
	console.log(playlist);

	const columns = [
		{
			title: "S.No",
			dataIndex: "_id",
			key: "_id",
			render: (text, record, index) => index + 1,
		},
		{
			title: "Name",
			dataIndex: "name",
			key: "name",
		},
		{
			title: "Media Count",
			dataIndex: "documents",
			key: "documents",
			render: (text) => text.length,
		},
		{
			title: "Date Created",
			dataIndex: "dateCreated",
			key: "dateCreated",
			render: (text, record, index) =>
				new Date(record.dateCreated).toLocaleDateString(),
		},
		{
			title: "Date Modified",
			dataIndex: "dateModified",
			key: "dateModified",
			render: (text, record, index) =>
				new Date(record.dateModified).toLocaleDateString(),
		},
		{
			title: "Action",
			dataIndex: "action",
			key: "action",
			render: (text, record, index) => {
				return (
					<div className="flex gap-4">
						<DeleteOutlined className="text-lg cursor-pointer" />
						<EditOutlined className="text-lg cursor-pointer" />
						<PlusCircleOutlined className="text-lg cursor-pointer" />
					</div>
				);
			},
		},
	];
	return (
		<div className="w-full flex flex-col gap-2 mt-4">
			<div className="w-full flex justify-between">
				<h1>All Playlists</h1>
				<Button type="primary" danger>
					Create Playlist
				</Button>
			</div>
			<div className="w-full mt-2">
				{!playlistLoading ? (
					<Table
						dataSource={playlist}
						columns={columns}
						pagination={{
							pageSize: 15,
							position: ["bottomCenter"],
						}}
						scroll={{ x: 500 }}
					/>
				) : (
					<h1>Loading ...</h1>
				)}
			</div>
		</div>
	);
};

const UserPlaylist = () => {
	return <User name="Playlist" Component={<Playlist />} />;
};

export default UserPlaylist;
