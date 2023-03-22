import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Home, Login, SignUp } from "./pages";
import { NotFound } from "./components";
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
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="/signup" element={<SignUp />} />

				<Route path="/user" element={<UserDashboard />} />
				<Route path="/user/monitors" element={<UserMonitor />} />
				<Route path="/user/media" element={<UserMedia />} />
				<Route path="/user/schedule" element={<UserSchedule />} />
				<Route path="/user/profile" element={<UserProfile />} />
				<Route path="/user/settings" element={<UserSettings />} />

				<Route path="/admin" element={<AdminDashboard />} />
				<Route path="/admin/users" element={<AdminUsers />} />
				<Route path="/admin/profile" element={<AdminProfile />} />
				<Route path="/admin/settings" element={<AdminSettings />} />

				<Route path="*" element={<NotFound />} />
			</Routes>
		</Router>
	);
};

export default App;
