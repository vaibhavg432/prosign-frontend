import React from "react";
import { Table, Tag, Select, Button } from "antd";

import { User } from "../../components";
import { documents } from "../../constants/data";

const Schedule = () => {
	const current = [
		{
			_id: "641734dd91edc793ca41b95e",

			link: "https://5.imimg.com/data5/UC/ZI/DA/SELLER-3769111/godrej-stylo-office-tabl-1000x1000.jpg",
			userId: {
				$oid: "64168c5d5271f671a2a96cd1",
			},
			date: "2023-03-19T16:14:21.805+00:00",
			__v: 0,
		},
	];

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
						<Tag color="blue">Stop Playing</Tag>
					</div>
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
				<h1 className="py-4">Current Playing Media</h1>
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
					<Select
						defaultValue="lucy"
						style={{
							width: "100%",
						}}
						options={documents.map((doc) => {
							return {
								value: doc._id,
								label: doc._id,
							};
						})}
					/>
					<br />
					<Button
						type="primary"
						className="bg-[#598392] mt-4"
						onClick={() => {
							console.log("Play");
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
