import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { userLogin, adminLogin, logout } from "./features/Login";
import { Home } from "./pages";
import { NotFound, NotAccess } from "./components";
import { Login, SignUp, ResetPass } from "./pages/auth";
import {
	UserDashboard,
	UserMedia,
	UserMonitor,
	UserSchedule,
	UserProfile,
	UserPlaylist
} from "./pages/user";
import {
	AdminDashboard,
	AdminUsers,
	AdminProfile,
	AdminSettings,
} from "./pages/admin";

const App = () => {
	const userLog = useSelector((state) => state.auth.userLoggedIn);
	const adminLog = useSelector((state) => state.auth.adminLoggedIn);
	const dispatch = useDispatch();

	useEffect(() => {
		const user = localStorage.getItem("user");
		const admin = localStorage.getItem("admin");
		const token = localStorage.getItem("token");
		if (user && token) {
			dispatch(userLogin());
		} else if (admin && token) {
			dispatch(adminLogin());
		} else {
			dispatch(logout());
		}
	}, [dispatch]);

	return (
		<Router>
			<Routes>
				<Route path="/" element={<Home />} />

				<Route path="/login" element={<Login />} />
				<Route path="/signup" element={<SignUp />} />
				<Route path="/reset-password/:id" element={<ResetPass />} />

				<Route path="/user" element={userLog ? <UserDashboard /> : <NotAccess />} />
				<Route path="/user/monitors" element={userLog ? <UserMonitor /> : <NotAccess />} />
				<Route path="/user/media" element={userLog ? <UserMedia /> : <NotAccess />} />
				<Route path="/user/schedule" element={userLog ? <UserSchedule /> : <NotAccess />} />
				<Route path="/user/profile" element={userLog ? <UserProfile /> : <NotAccess />} />
				<Route path="/user/playlists" element={userLog ? <UserPlaylist /> : <NotAccess />} />
				
				<Route path="/admin" element={adminLog ? <AdminDashboard /> : <NotAccess/>} />
				<Route path="/admin/users" element={adminLog ? <AdminUsers /> : <NotAccess/>} />
				<Route path="/admin/profile" element={adminLog ? <AdminProfile /> : <NotAccess/>} />
				<Route path="/admin/settings" element={adminLog ? <AdminSettings /> : <NotAccess/>} />
				
				<Route path="*" element={<NotFound />} />
			</Routes>
		</Router>
	);
};

export default App;
