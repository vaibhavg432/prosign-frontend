import React from "react";
import { Home, Login, SignUp } from "./pages";
import { NotFound } from "./components";
import { UserDashboard } from "./pages/user";
import { AdminDashboard } from "./pages/admin";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="/signup" element={<SignUp />} />

				<Route path="/user" element={<UserDashboard />} />

				<Route path="/admin" element={<AdminDashboard />} />

				<Route path="*" element={<NotFound />} />
			</Routes>
		</Router>
	);
};

export default App;
