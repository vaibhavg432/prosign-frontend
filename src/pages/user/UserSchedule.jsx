import React, { useState } from "react";
import { Table, Tag, Select, Button, message, Popconfirm } from "antd";
import { AiOutlineLink } from "react-icons/ai";

import { User } from "../../components";
import {
	useGetCurrentPlayingMonitorsQuery,
	usePlayOneDocumentOnAllScreenMutation,
	useStopAllScreensMutation,
} from "../../services/UserMonitorApi";

import { useGetAllDocumentsQuery } from "../../services/UserMediaApi";

const Schedule = () => {
	const [messageApi, contextHolder] = message.useMessage();
	const [selectedDocument, setSelectedDocument] = useState("");
	const { data } = useGetCurrentPlayingMonitorsQuery();
	const { data: allDocuments, isLoading } = useGetAllDocumentsQuery();
	const documents = allDocuments?.documents;
	const [playOneDocumentOnAllScreen] =
		usePlayOneDocumentOnAllScreenMutation();
	const [stopAllScreens] = useStopAllScreensMutation();
	const current = data?.screens;
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
			title: "Screen",
			dataIndex: "username",
			key: "username",
		},
		{
			title: "Media",
			dataIndex: "document",
			key: "document",
			render: (text) => {
				return (
					<div className="flex gap-4 items-center">
						{documents?.find((doc) => doc._id === text)?.name}

						<AiOutlineLink
							className="cursor-pointer text-xl text-blue-500"
							onClick={() => {
								window.open(
									documents?.find((doc) => doc._id === text)
										.link,
								);
							}}
						/>
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
					<Popconfirm
						title="Are you sure you want to stop all screens?"
						onConfirm={() => {
							stopAllScreens();
							messageApi.success({
								content: "Stopped Playing Media",
								duration: 2,
							});
						}}
						okText="Yes"
						okButtonProps={{ danger: true }}
						cancelText="No"
						onCancel={() => {
							messageApi.success({
								content: "Cancelled",
								duration: 2,
							});
						}}
					>
						<Button type="primary" className="bg-[#598392] mt-4">
							Stop Playing
						</Button>
					</Popconfirm>
				</div>
				<Table
					columns={columns}
					dataSource={current}
					pagination={{ pageSize: 5, position: ["bottomCenter"] }}
					scroll={{ x: 240 }}
				/>
			</div>
			<div className="w-full mt-4">
				<h1 className="py-4">Play New Media</h1>
				<div>
					{!isLoading && (
						<Select
							defaultValue="Select Media"
							value={selectedDocument}
							onChange={(value) => {
								setSelectedDocument(value);
							}}
							style={{
								width: "100%",
							}}
							options={documents.map((doc) => {
								return {
									value: doc._id,
									label: doc.name,
								};
							})}
						/>
					)}
					<br />
					{contextHolder}
					<Button
						type="primary"
						className="bg-[#598392] mt-4"
						onClick={() => {
							if (selectedDocument === "") {
								messageApi.error({
									content: "Please Select a Media",
									duration: 2,
								});
								return;
							}
							playOneDocumentOnAllScreen(selectedDocument);
							messageApi.success({
								content: "Playing Media",
								duration: 2,
							});
							setSelectedDocument("");
						}}
					>
						Play
					</Button>
				</div>
			</div>
		</div>
	);
};

const UserSchedule = () => {
	return <User name="Schedule" Component={<Schedule />} />;
};

export default UserSchedule;
