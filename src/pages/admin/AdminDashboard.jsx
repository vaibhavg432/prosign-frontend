import React from "react";

import {
	useGetUsersQuery,
	useTotalScreensQuery,
	useCurrentPlayingScreensQuery,
} from "../../services/AdminApi";
import { Admin, StatusCard } from "../../components";

const Dashboard = () => {
	const { data: users } = useGetUsersQuery();
	const { data: screens } = useTotalScreensQuery();
	const { data: playingScreens } = useCurrentPlayingScreensQuery();
	console.log(users, screens);
	const StatusCardData = [
		{
			title: "Total Number of Users",
			count: users?.users.length,
			color: "bg-white",
		},
		{
			title: "Total Number of Screens",
			count: screens?.screens?.length,
			color: "bg-white",
		},
		{
			title: "Total Number of Playing Screens",
			count: playingScreens?.screens?.length,
			color: "bg-white",
		},
	];
	return (
		<div>
			<div>
			<h1 className="font-bold text-2xl">Admin Statistics</h1>
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
