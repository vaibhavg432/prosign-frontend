import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

import logo from "../assets/images/logo.jpg";
import { userLinks } from "../constants/data";
import { styles } from "../constants";

const UserNavbar = () => {
	const location = useLocation();
	const navigate = useNavigate();

	return (
		<div className="w-full py-4 h-[100vh] shadow-xl">
			<div className="w-full flex flex-col justify-center items-center gap-4">
				<h1
					className="font-black text-3xl text-[#FF4D4F] italic text-center cursor-pointer"
					onClick={() =>
						(window.location.href = "https://digisigns.in/")
					}
				>
					DIGISIGNS
				</h1>
				<div className="w-[90%] h-[1px] bg-gray-400"></div>
			</div>
			<div className="w-full px-4 flex justify-center">
				<ul className="w-[80%] flex flex-col gap-4 mt-8 justify-center items-center">
					{userLinks.map((link, index) => (
						<li
							key={index}
							className={`w-full flex items-center cursor-pointer gap-4 ${
								location.pathname === link.link
									? styles.activeNavClass
									: styles.normalNavClass
							}`}
							onClick={() => navigate(link.link)}
						>
							{link.icon}
							{link.name}
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default UserNavbar;
