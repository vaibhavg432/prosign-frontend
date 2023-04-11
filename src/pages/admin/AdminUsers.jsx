import React, { useState } from "react";
import { Table, Tag, Modal, Descriptions, Button, message } from "antd";
import { MoreOutlined, LoadingOutlined } from "@ant-design/icons";

import { Admin } from "../../components";
import {
	useGetUsersQuery,
	useToggleStatusOfUserMutation,
} from "../../services/AdminApi";

const Users = () => {
	const [messageApi, contextHolder] = message.useMessage();
	const [open, setOpen] = useState(false);
	const [user, setUser] = useState({});
	const { data: users } = useGetUsersQuery();
	const [toggleStatus, { isLoading: isToggling }] =
		useToggleStatusOfUserMutation();
	const columns = [
		{
			title: "S.No",
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
			title: "Email",
			dataIndex: "email",
			key: "email",
		},
		{
			title: "Phone No.",
			dataIndex: "phone",
			key: "phone",
		},
		{
			title: "Date Joined",
			dataIndex: "date",
			key: "date",
			render: (text, record, index) => {
				return new Date(text).toLocaleDateString();
			},
		},
		{
			title: "Status",
			dataIndex: "status",
			key: "status",
			render: (text, record, index) => {
				return text === "active" ? (
					<Tag color="green" key={index}>
						Active
					</Tag>
				) : (
					<Tag color="red" key={index}>
						Inactive
					</Tag>
				);
			},
		},
		{
			title: "More",
			dataIndex: "more",
			key: "more",
			render: (text, record, index) => {
				return (
					<MoreOutlined
						onClick={() => {
							setUser(record);
							setOpen(true);
						}}
						className="cursor-pointer"
					/>
				);
			},
		},
	];
	return (
		<div className="w-full">
			<div>
				<h1 className="font-bold text-2xl">All Users</h1>
			</div>
			<div className="w-full">
				<Table
					dataSource={users?.users}
					columns={columns}
					pagination={{ pageSize: 20 }}
				/>
			</div>

			<Modal
				title="User Details"
				visible={open}
				onOk={() => setOpen(false)}
				onCancel={() => setOpen(false)}
				footer={null}
				width={800}
			>
				<br />
				<div className="w-full flex justify-end">
					{contextHolder}
					<Button
						type="primary"
						danger
						onClick={async () => {
							await toggleStatus(user._id);
							messageApi.success({
								content: "Status Toggled",
								key: "toggleStatus",
								duration: 2,
							});
							setOpen(false);
						}}
					>
						{isToggling ? (
							<LoadingOutlined className="text-white" />
						) : (
							"Toggle Status"
						)}
					</Button>
				</div>
				<Descriptions title="Personal Info" column={1}>
					<Descriptions.Item label="Name">
						{" "}
						{user.name}
					</Descriptions.Item>
					<Descriptions.Item label="Bio">
						{" "}
						{user.bio}
					</Descriptions.Item>
					<Descriptions.Item label="Email">
						{" "}
						{user.email}
					</Descriptions.Item>
					<Descriptions.Item label="Phone No.">
						{" "}
						{user.phone}
					</Descriptions.Item>
					<Descriptions.Item label="Date Joined">
						{new Date(user.date).toLocaleDateString()}
					</Descriptions.Item>

					<Descriptions.Item label="Address">
						{user.address}
					</Descriptions.Item>
				</Descriptions>
				<br />
				<Descriptions title="Account Info" column={1}>
					<Descriptions.Item label="Account Status">
						{user.status === "active" ? (
							<Tag color="green">Active</Tag>
						) : (
							<Tag color="red">Inactive</Tag>
						)}
					</Descriptions.Item>
					<Descriptions.Item label="Account Type">
						{user.role?.toUpperCase()}
					</Descriptions.Item>
					<Descriptions.Item label="No. of Screen Alloted">
						{user.screenLimit}
					</Descriptions.Item>
					<Descriptions.Item label="No. of Screen Used">
						{user.screenCount}
					</Descriptions.Item>
				</Descriptions>
			</Modal>
		</div>
	);
};

const AdminUsers = () => {
	return <Admin name="Users" Component={<Users />} />;
};

export default AdminUsers;
