import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// eslint-disable-next-line
import { userLogin, adminLogin } from "../../features/Login";
import { User } from "../../components";

const UserDashboard = () => {
	const dispatch = useDispatch();
	const userLog = useSelector((state) => state.auth.userLoggedIn);
	// const adminLog = useSelector((state) => state.auth.adminLoggedIn);
	useEffect(() => {
		if (localStorage.getItem("token")) {
			dispatch(userLogin());
		}
		console.log(userLog);
		// eslint-disable-next-line
	}, []);
	return <User name="Dashboard" />;
};

export default UserDashboard;
