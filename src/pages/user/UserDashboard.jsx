import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import { MonitorTable } from "./components";
import { userLogin } from "../../features/Login";
import { User, StatusCard } from "../../components";
import { useGetUserQuery } from "../../services/UserApi";
import { useGetAllDocumentsQuery } from "../../services/UserMediaApi";
import { useGetPlaylistsQuery } from "../../services/PlaylistApi";

const Dashboard = () => {
	const { data: userData } = useGetUserQuery({},{ pollingInterval: 1000, });
	const { data: mediaData } = useGetAllDocumentsQuery({},{ pollingInterval: 1000, });
	const { data: playlistData } = useGetPlaylistsQuery({},{ pollingInterval: 1000, });
	const user = userData?.user;
	const media = mediaData?.documents;
	const playlist = playlistData?.playlist;
	const StatusCardData = [
		{
			title: "Alloted Screen",
			count: user?.screenLimit,
			color: "bg-white",
			path: "/user/monitors",
		},
		{
			title: "Active Screens",
			count: user?.screenCount,
			color: "bg-white",
			path: "/user/monitors",
		},
		{
			title: "Media Uploaded",
			count: media?.length,
			color: "bg-white",
			path: "/user/media",
		},
		{
			title: "Playlist",
			count: playlist?.length,
			color: "bg-white",
			path: "/user/playlists",
		},
	];
	return (
		<div className="w-full flex flex-col gap-2">
			<div> <h1 className="font-bold text-2xl">Analytics Overview</h1> </div>
			<div className="w-full flex flex-wrap mt-2 gap-4">
				{StatusCardData.map((data, index) => (
					<StatusCard title={data.title} count={data.count} color={data.color} key={index} path = {data.path} />
				))}
			</div>
			<div className="mt-8 w-full">
				<h1 className="font-bold text-2xl">Live Monitors</h1>
				<div className="mt-2"> <MonitorTable /> </div>
			</div>
		</div>
	);
};

const UserDashboard = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		if ( localStorage.getItem("token") && localStorage.getItem("role") === "user" ) { dispatch(userLogin()); }
		// eslint-disable-next-line
	}, []);
	return <User name="Dashboard" Component={<Dashboard />} />;
};

export default UserDashboard;
