import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { userLogin, adminLogin, logout } from "./features/Login";
import { Home, Login, SignUp } from "./pages";
import { NotFound, NotAccess } from "./components";
import {
	UserDashboard,
	UserMedia,
	UserMonitor,
	UserSchedule,
	UserProfile,
	UserSettings,
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

				<Route
					path="/user"
					element={userLog ? <UserDashboard /> : <NotAccess />}
				/>
				<Route
					path="/user/monitors"
					element={userLog ? <UserMonitor /> : <NotAccess />}
				/>
				<Route
					path="/user/media"
					element={userLog ? <UserMedia /> : <NotAccess />}
				/>
				<Route
					path="/user/schedule"
					element={userLog ? <UserSchedule /> : <NotAccess />}
				/>
				<Route
					path="/user/profile"
					element={userLog ? <UserProfile /> : <NotAccess />}
				/>
				<Route
					path="/user/settings"
					element={userLog ? <UserSettings /> : <NotAccess />}
				/>
				
				{adminLog && (
					<Route path="/admin" element={<AdminDashboard />} />
				)}
				<Route path="/admin/users" element={<AdminUsers />} />
				<Route path="/admin/profile" element={<AdminProfile />} />
				<Route path="/admin/settings" element={<AdminSettings />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</Router>
	);
};

export default App;
