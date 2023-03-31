import React, { useState } from "react";
import { Button, Table, Select, Modal, message, Popconfirm } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

import { styles } from "../../constants";
import { useGetAllDocumentsQuery } from "../../services/UserMediaApi";
import {
	useGetPlaylistsQuery,
	useCreatePlaylistMutation,
	useUpdatePlaylistMutation,
	useDeletePlaylistMutation,
} from "../../services/PlaylistApi";
import { User } from "../../components";

const Playlist = () => {
	const [messageApi, contextHolder] = message.useMessage();
	const [newPlaylist, setNewPlaylist] = useState({
		name: "",
		documents: [],
	});
	const [adding, setAdding] = useState(false);
	const [moreModal, setMoreModal] = useState(false);
	const [edit, setEdit] = useState(false);
	const [selectedPlaylist, setSelectedPlaylist] = useState({});
	const [editPlaylist, setEditPlaylist] = useState({});
	const [updatePlaylist] = useUpdatePlaylistMutation();
	const [deletePlaylist] = useDeletePlaylistMutation();
	const [createPlaylist] = useCreatePlaylistMutation();
	const { data: documentData } = useGetAllDocumentsQuery();
	const { data: playlistData, isLoading: playlistLoading } =
		useGetPlaylistsQuery();
	const playlist = playlistData?.playlist;
	const documents = documentData?.documents;
	const options = [];
	documents?.forEach((doc) => {
		options.push({
			label: doc.name,
			value: doc._id,
		});
	});
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
					<div className="flex items-center gap-4">
						{contextHolder}
						<Popconfirm
							title="Are you sure to delete this playlist?"
							onConfirm={async () => {
								const { data } = await deletePlaylist(
									record._id,
								);
								console.log(data);
								if (data.success) {
									messageApi.success(data.message);
								} else {
									messageApi.error(data.message);
								}
							}}
							onCancel={() => {}}
							okButtonProps={{ danger: true }}
						>
							<DeleteOutlined className="text-lg cursor-pointer" />
						</Popconfirm>
						<h1
							className="cursor-pointer text-blue-500 hover:text-blue-700"
							onClick={() => {
								setMoreModal(true);
								setSelectedPlaylist(record);
							}}
						>
							More
						</h1>
					</div>
				);
			},
		},
	];
	return (
		<div className="w-full flex flex-col gap-2 mt-4">
			<div className="w-full flex justify-between">
				<h1>All Playlists</h1>
				<Button type="primary" danger onClick={() => setAdding(true)}>
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
			<Modal
				title="Create Playlist"
				visible={adding}
				onCancel={() => {
					setNewPlaylist({
						name: "",
						documents: [],
					});
					setAdding(false);
				}}
				footer={null}
			>
				<div className="w-full flex flex-col gap-2">
					<div>
						<label className={styles.label}>Name*</label>
						<input
							type="text"
							value={newPlaylist.name}
							className={styles.input}
							placeholder="Enter Playlist Name"
							onChange={(e) =>
								setNewPlaylist({
									...newPlaylist,
									name: e.target.value,
								})
							}
						/>
					</div>
					<div>
						<label className={styles.label}>Choose Media*</label>
						<Select
							mode="multiple"
							allowClear
							style={{
								width: "100%",
							}}
							value={newPlaylist.documents}
							onChange={(value) =>
								setNewPlaylist({
									...newPlaylist,
									documents: value,
								})
							}
							placeholder="Select Media Files"
							options={options}
						/>
					</div>
					{contextHolder}
					<Button
						type="primary"
						danger
						onClick={async (e) => {
							e.preventDefault();
							console.log(newPlaylist);
							const { data } = await createPlaylist(newPlaylist);
							if (data.success) {
								setNewPlaylist({
									name: "",
									documents: [],
								});
								messageApi.success(data.message);
								setAdding(false);
							} else {
								messageApi.error(data.message);
							}
						}}
					>
						Create
					</Button>
				</div>
			</Modal>

			<Modal
				title="Playlist Details"
				visible={moreModal}
				onCancel={() => {
					setMoreModal(false);
					setSelectedPlaylist({});
				}}
				footer={null}
			>
				<div className="w-full flex flex-col gap-2">
					<div className="w-full flex justify-end">
						{!edit ? (
							<Button
								type="primary"
								danger
								onClick={() => {
									editPlaylist(selectedPlaylist);
									setEdit(true);
								}}
							>
								Edit
							</Button>
						) : (
							<Button
								type="primary"
								danger
								onClick={async () => {
									const { data } = await updatePlaylist(
										selectedPlaylist._id,
										selectedPlaylist,
									);
									if (data.success) {
										messageApi.success(data.message);
										setEdit(false);
									} else {
										messageApi.error(data.message);
									}
								}}
							>
								Save
							</Button>
						)}
					</div>
					<div>
						<label className={styles.label}>Name</label>
						{!edit ? (
							<h1>{selectedPlaylist.name}</h1>
						) : (
							<input
								type="text"
								value={editPlaylist.name}
								className={styles.input}
								placeholder="Enter Playlist Name"
								onChange={(e) =>
									setEditPlaylist({
										...editPlaylist,
										name: e.target.value,
									})
								}
							/>
						)}

						<label className={styles.label}>Media</label>
						{!edit ? (
							<div className="w-full flex flex-col gap-2">
								{selectedPlaylist?.documents?.map((doc) => (
									<div className="w-full flex justify-between">
										<h1>{doc.name}</h1>
									</div>
								))}
							</div>
						) : (
							<Select
								mode="multiple"
								allowClear
								style={{
									width: "100%",
								}}
								value={editPlaylist.documents}
								onChange={(value) =>
									setEditPlaylist({
										...editPlaylist,
										documents: value,
									})
								}
								placeholder="Select Media Files"
								options={options}
							/>
						)}
					</div>
				</div>
			</Modal>
		</div>
	);
};

const UserPlaylist = () => {
	return <User name="Playlist" Component={<Playlist />} />;
};

export default UserPlaylist;
