import React from "react";
import { Table, Tag } from "antd";

import { Admin } from "../../components";
import { useGetUsersQuery } from "../../services/AdminApi";

const Users = () => {
	const { data, isLoading } = useGetUsersQuery();
	const users = isLoading ? [] : data;
	// const users = [
	// 	{
	// 		_id: {
	// 			$oid: "64168c5d5271f671a2a96cd1",
	// 		},
	// 		name: "Vaibhav Gupta",
	// 		email: "guptavaibhav01@gmail.com",
	// 		role: "user",
	// 		status: "active",
	// 		date: 1679199325310,
	// 		__v: 12,
	// 		screenLimit: 10,
	// 		screenCount: 3,
	// 		bio: "I am a user\n",
	// 		address: {
	// 			street: "13",
	// 			state: "Delhi\n",
	// 			city: "Delhi",
	// 			zip: "110094",
	// 		},
	// 		phone: "8826271548",
	// 		screens: [
	// 			{
	// 				$oid: "641e7d87a5b6a018d8419af6",
	// 			},
	// 			{
	// 				$oid: "641e7d87a5b6a018d8419af8",
	// 			},
	// 			{
	// 				$oid: "641e844aa98b2f8dc6b98d2a",
	// 			},
	// 		],
	// 	},
	// ];
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
		Table.EXPAND_COLUMN,
	];
	return (
		<div className="w-full">
			<div>
				<h1>All Users</h1>
			</div>
			<div className="w-full">
				<Table
					dataSource={users}
					columns={columns}
					pagination={{ pageSize: 20 }}
					expandable={{
						expandedRowRender: (record) => (
							<p
								style={{
									margin: 0,
								}}
							>
								{record.bio}
							</p>
						),
					}}
				/>
			</div>
		</div>
	);
};

const AdminUsers = () => {
	return <Admin name="Users" Component={<Users />} />;
};

export default AdminUsers;
