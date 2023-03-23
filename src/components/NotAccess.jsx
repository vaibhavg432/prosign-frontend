import React from "react";
import { useNavigate } from "react-router-dom";

import not_access from "../assets/images/not_access.svg";

const NotAccess = () => {
	const navigate = useNavigate();
	return (
		<div className="w-full h-[100vh] flex justify-center items-center flex-col gap-4">
			<img src={not_access} alt="not found" className="w-1/2 sm:w-1/3" />
			<h1 className="text-2xl font-light">Access Denied</h1>
			<button
				className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 focus:ring-offset-2 	"
				onClick={() => navigate("/login")}
			>
				Go to Login
			</button>
		</div>
	);
};

export default NotAccess;
