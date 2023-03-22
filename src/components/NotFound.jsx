import React from "react";
import { useNavigate } from "react-router-dom";

import not_found from "../assets/images/not_found.svg";

const NotFound = () => {
	const navigate = useNavigate();
	return (
		<div className="w-full h-[100vh] flex justify-center items-center flex-col gap-4">
			<img src={not_found} alt="not found" className="w-1/2" />
			<h1 className="text-2xl font-light">Page Not Found</h1>
			<button
				className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 focus:ring-offset-2 	"
				onClick={() => navigate("/")}
			>
				Go to Home
			</button>
		</div>
	);
};

export default NotFound;
