import React, { useState } from "react";
import {
	Button,
	Space,
	Modal,
	Table,
	Popconfirm,
	message,
	Upload,
	Spin,
} from "antd";
import { AiOutlineLink } from "react-icons/ai";
import {
	UploadOutlined,
	DeleteOutlined,
	SaveOutlined,
} from "@ant-design/icons";

import { COLORS as color } from "../../constants";
import { User } from "../../components";
import {
	useGetAllDocumentsQuery,
	useUploadOneDocumentMutation,
	useDeleteOneDocumentMutation,
	useUpdateOneDocumentMutation,
} from "../../services/UserMediaApi";

const Media = () => {
	const [messageApi, contextHolder] = message.useMessage();
	const [file, setFile] = useState(null);
	const { data, isLoading } = useGetAllDocumentsQuery();
	const [uploadOneDocument] = useUploadOneDocumentMutation();
	const [deleteOneDocument] = useDeleteOneDocumentMutation();
	const [updateOneDocument] = useUpdateOneDocumentMutation();
	const [documentName, setDocumentName] = useState("");
	const [documentEdit, setDocumentEdit] = useState(-1);
	const documents = data?.documents;
	const showMessage = (text) => {
		messageApi.open({
			type: "success",
			content: text,
		});
	};
	const showError = (text) => {
		messageApi.open({
			type: "error",
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
			render: (text, record, index) => {
				return documentEdit === index ? (
					<div className="w-full flex gap-4 items-center">
						<input
							value={documentName}
							type="text"
							placeholder="Enter document name"
							className="border-2 border-[#598392] rounded-md p-2"
							onChange={(e) => {
								setDocumentName(e.target.value);
							}}
						/>
						<SaveOutlined
							className="text-xl text-blue-500 cursor-pointer"
							onClick={() => {
								updateOneDocument({
									documentId: record._id,
									name: documentName,
								});
								setDocumentEdit(-1);
								setDocumentName("");
								showMessage("Document updated");
							}}
						/>
					</div>
				) : (
					<h1
						onClick={() => {
							setDocumentEdit(index);
							setDocumentName(text);
						}}
					>
						{text}
					</h1>
				);
			},
		},
		{
			title: "Media",
			dataIndex: "link",
			key: "link",
			render: (text) => {
				return (
					<div className="flex gap-4 items-center">
						<AiOutlineLink
							className="cursor-pointer text-2xl text-green-500"
							onClick={() => {
								window.open(text);
							}}
						/>
					</div>
				);
			},
		},
		{
			title: "Date Uploaded",
			dataIndex: "date",
			key: "date",
			render: (text) => {
				return new Date(text).toLocaleDateString();
			},
		},
		{
			title: "Action",
			dataIndex: "action",
			key: "action",
			render: (text, record, index) => {
				return (
					<div className="flex items-center gap-2">
						{contextHolder}
						<Popconfirm
							title="Are you sure to delete this document?"
							onConfirm={async () => {
								const res = await deleteOneDocument(record._id);
								messageApi.success(
									"Document deleted successfully",
								);
							}}
							onCancel={() => {
								messageApi.error("Document not deleted");
							}}
							okText="Yes"
							cancelText="No"
							okButtonProps={{ danger: true }}
						>
							<DeleteOutlined
								className={`text-xl ${color.hoverIconSecondary}`}
							/>
						</Popconfirm>
					</div>
				);
			},
		},
	];
	const [isModalVisible, setIsModalVisible] = useState(false);
	return (
		<div className="w-full py-4">
			<div className="w-full flex justify-between">
				<h1>All Media Items</h1>
				<div>
					<Space direction="vertical" style={{ width: "100%" }}>
						<Button
							type="primary"
							danger
							block
							className={`${color.btnPrimary}`}
							onClick={() => setIsModalVisible(true)}
						>
							Add Media
						</Button>
						<Modal
							title="Add Media"
							open={isModalVisible}
							onClose={() => setIsModalVisible(false)}
							okButtonProps={{ style: { display: "none" } }}
							onCancel={() => setIsModalVisible(false)}
							closable={true}
						>
							<div className="w-full flex flex-col gap-4">
								{/* Input file using antd upload */}
								<Upload
									name="file"
									listType="picture"
									className="w-full"
									showUploadList={true}
									beforeUpload={(file) => {
										setFile(file);
										return false;
									}}
								>
									<Button icon={<UploadOutlined />}>
										Click to Upload
									</Button>
								</Upload>
								{/* Input file using antd upload */}
								<Button
									type="primary"
									danger
									className={`${color.btnPrimary}`}
									onClick={() => {
										console.log(file);
										if (file) {
											const formData = new FormData();
											formData.append("data", file);
											uploadOneDocument(formData);
											setIsModalVisible(false);
											setFile(null);
											showMessage("Document uploaded");
										}
									}}
								>
									Upload
								</Button>
							</div>
						</Modal>
					</Space>
				</div>
			</div>
			<br />
			<br />
			{!isLoading ? (
				<Table
					columns={columns}
					dataSource={documents}
					pagination={{ pageSize: 5, position: ["bottomCenter"] }}
					scroll={{ x: 240 }}
				/>
			) : (
				<div className="w-full flex justify-center items-center">
					<Spin size="large" />;
				</div>
			)}
		</div>
	);
};

const UserMedia = () => {
	return <User name="Media" Component={<Media />} />;
};

export default UserMedia;
