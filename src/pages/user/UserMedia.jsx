import React, { useState } from "react";
import { Button, Space, Modal, Table, Tag } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";

import { User } from "../../components";
import { documents } from "../../constants/data";

const Media = () => {
	const { Dragger } = Upload;
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
			title: "Media",
			dataIndex: "link",
			key: "link",
			render: (text) => {
				return <img src={text} alt="media" className="w-12 h-12" />;
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
			render: (text, record) => {
				return (
					<div className="flex items-center gap-2">
						<Tag color="blue">Edit</Tag>
						<Tag color="red">Delete</Tag>
					</div>
				);
			},
		},
	];
	const props = {
		name: "file",
		multiple: true,
		action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
		onChange(info) {
			const { status } = info.file;
			if (status !== "uploading") {
				console.log(info.file, info.fileList);
			}
			if (status === "done") {
				message.success(
					`${info.file.name} file uploaded successfully.`,
				);
			} else if (status === "error") {
				message.error(`${info.file.name} file upload failed.`);
			}
		},
		onDrop(e) {
			console.log("Dropped files", e.dataTransfer.files);
		},
	};
	const [isModalVisible, setIsModalVisible] = useState(false);
	return (
		<div className="w-full py-4">
			<div className="w-full flex justify-between">
				<h1>All Media Items</h1>
				<div>
					<Space direction="vertical" style={{ width: "100%" }}>
						<Button
							type="primary"
							block
							className="bg-[#598392]"
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
							<Dragger {...props}>
								<p className="ant-upload-drag-icon">
									<InboxOutlined />
								</p>
								<p className="ant-upload-text">
									Click or drag file to this area to upload
								</p>
								<p className="ant-upload-hint">
									Support for a single or bulk upload.
									Strictly prohibited from uploading company
									data or other banned files.
								</p>
							</Dragger>
						</Modal>
					</Space>
				</div>
			</div>
			<br />
			<br />
			<Table
				columns={columns}
				dataSource={documents}
				pagination={{ pageSize: 5, position: ["bottomCenter"] }}
				scroll={{ x: 240 }}
			/>
		</div>
	);
};

const UserMedia = () => {
	return <User name="Media" Component={<Media />} />;
};

export default UserMedia;
