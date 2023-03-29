import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import { MonitorTable } from "./components";
import { userLogin } from "../../features/Login";
import { User, StatusCard } from "../../components";
import { useGetUserQuery } from "../../services/UserApi";
import { useGetAllDocumentsQuery } from "../../services/UserMediaApi";
import { useGetCurrentPlayingMonitorsQuery } from "../../services/UserMonitorApi";

const Dashboard = () => {
	const { data: userData } = useGetUserQuery();
	const { data: mediaData } = useGetAllDocumentsQuery();
	const { data: monitorData } = useGetCurrentPlayingMonitorsQuery();
	const user = userData?.user;
	const media = mediaData?.documents;
	const monitor = monitorData?.screens;
	const StatusCardData = [
		{
			title: "Total Number of Alloted Screen",
			count: user?.screenLimit,
			color: "bg-blue-500",
		},
		{
			title: "Total Number of Active Screens",
			count: user?.screenCount,
			color: "bg-green-500",
		},
		{
			title: "Total Media Uploaded Conut",
			count: media?.length,
			color: "bg-red-500",
		},
		{
			title: "Total Number of Screen Playing Media",
			count: monitor?.length,
			color: "bg-yellow-500",
		},
	];
	return (
		<div className="w-full flex flex-col gap-2">
			<div>
				<h1>User Statistics</h1>
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
			<div className="mt-8 w-full">
				<h1>Live Monitors</h1>
				<div className="mt-8">
					<MonitorTable />
				</div>
			</div>
		</div>
	);
};

const UserDashboard = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		if (
			localStorage.getItem("token") &&
			localStorage.getItem("role") === "user"
		) {
			dispatch(userLogin());
		}
		// eslint-disable-next-line
	}, []);
	return <User name="Dashboard" Component={<Dashboard />} />;
};

export default UserDashboard;
