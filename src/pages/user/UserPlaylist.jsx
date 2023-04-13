import React, { useState } from "react";
import {
	Button,
	Table,
	Select,
	Modal,
	message,
	Descriptions,
	Spin,
	Popconfirm,
} from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { AiOutlineMore } from "react-icons/ai";
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
	const [loading, setLoading] = useState(false);
	const [view, setView] = useState(false);
	const [edit, setEdit] = useState(false);
	const [editPlaylist, setEditPlaylist] = useState({});
	const [selectedPlaylist, setSelectedPlaylist] = useState({});

	const [messageApi, contextHolder] = message.useMessage();
	const [newPlaylist, setNewPlaylist] = useState({
		name: "",
		documents: [],
	});
	const [adding, setAdding] = useState(false);

	const [updatePlaylist, { isLoading: isUpdating }] =
		useUpdatePlaylistMutation();
	const [deletePlaylist, { isLoading: isDeleting }] =
		useDeletePlaylistMutation();
	const [createPlaylist, { isLoading: isCreating }] =
		useCreatePlaylistMutation();
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
						<AiOutlineMore
							size={20}
							className="cursor-pointer"
							onClick={() => {
								setSelectedPlaylist(record);
								setView(true);
							}}
						/>
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
					<div className="w-full flex justify-center items-center h-48">
						<Spin size="large" />
					</div>
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
						{isCreating ? (
							<LoadingOutlined className="text-white" />
						) : (
							"Create"
						)}
					</Button>
				</div>
			</Modal>
			<Modal
				title="Playlist Details"
				visible={view}
				onCancel={() => {
					setView(false);
					setEdit(false);
				}}
				footer={null}
			>
				<div className="w-full flex flex-col gap-2">
					<div className="w-full flex justify-end mt-2 gap-4">
						{contextHolder}
						<Button
							type="primary"
							danger
							onClick={async (e) => {
								setLoading(true);
								const { data } = await deletePlaylist(
									selectedPlaylist._id,
								);
								setLoading(false);
								if (data.success) {
									messageApi.success(data.message);
									setView(false);
									setEdit(false);
								} else {
									messageApi.error(data.message);
								}
							}}
						>
							{isDeleting ? (
								<LoadingOutlined className="text-white" />
							) : (
								"Delete"
							)}
						</Button>
						{contextHolder}
						<Button
							type="primary"
							danger
							disabled={edit}
							onClick={() => {
								setEditPlaylist(selectedPlaylist);
								setEdit(true);
							}}
						>
							Edit
						</Button>
					</div>
					<div>
						<Descriptions title="Playlist Details" column={1}>
							<Descriptions.Item label="Name">
								{!edit ? (
									selectedPlaylist?.name
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
							</Descriptions.Item>
							<Descriptions.Item label="Media Count">
								{selectedPlaylist?.documents?.length}
							</Descriptions.Item>
							<Descriptions.Item label="Date Created">
								{new Date(
									selectedPlaylist?.dateCreated,
								).toLocaleDateString()}
							</Descriptions.Item>
							<Descriptions.Item label="Date Modified">
								{new Date(
									selectedPlaylist?.dateModified,
								).toLocaleDateString()}
							</Descriptions.Item>
							<Descriptions.Item label="Media Files">
								{!edit ? (
									<ul>
										{selectedPlaylist?.documents?.map(
											(item) => (
												<h1>
													{
														documents?.find(
															(doc) =>
																doc._id ===
																item,
														)?.name
													}
												</h1>
											),
										)}
									</ul>
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
							</Descriptions.Item>
						</Descriptions>
					</div>
					{edit && (
						<div className="w-full flex justify-center gap-4">
							{contextHolder}
							<Button
								type="primary"
								danger
								onClick={async (e) => {
									e.preventDefault();
									const { data } = await updatePlaylist(
										editPlaylist,
									);

									if (data.success) {
										messageApi.success(data.message);
										setEdit(false);
										setView(false);
									} else {
										messageApi.error(data.message);
									}
								}}
							>
								{isUpdating ? <LoadingOutlined className = "text-white"/> : "Save"}
							</Button>
							<Button
								type="primary"
								danger
								disabled = {isUpdating}
								onClick={() => {
									setEdit(false);
								}}
							>
								Cancel
							</Button>
						</div>
					)}
				</div>
			</Modal>
		</div>
	);
};

const UserPlaylist = () => {
	return <User name="Playlist" Component={<Playlist />} />;
};

export default UserPlaylist;
