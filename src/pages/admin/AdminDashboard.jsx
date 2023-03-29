import React from "react";

import { Admin, StatusCard } from "../../components";

const Dashboard = () => {
	const StatusCardData = [
		{
			title: "Total Number of Alloted Screen",
			count: 0,
			color: "bg-blue-500",
		},
		{
			title: "Total Number of Alloted Screen",
			count: 0,
			color: "bg-green-500",
		},
		{
			title: "Total Number of Alloted Screen",
			count: 0,
			color: "bg-red-500",
		},
		{
			title: "Total Number of Alloted Screen",
			count: 0,
			color: "bg-yellow-500",
		},
		{
			title: "Total Number of Alloted Screen",
			count: 0,
			color: "bg-pink-500",
		},
	];
	return (
		<div>
			<div>
				<h1>Admin Statistics</h1>
			</div>
			<div className="w-full flex flex-wrap mt-8 gap-4">
				{StatusCardData.map((data, index) => (
					<StatusCard
						title={data.title}
						count={data.count}
						color={data.color}
						key={index}
					/>
				))}
			</div>
		</div>
	);
};

const AdminDashboard = () => {
	return <Admin name="Dashboard" Component={<Dashboard />} />;
};

export default AdminDashboard;
