import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { adminLinks } from "../constants/data";
import { styles } from "../constants";

const AdminNavnar = () => {
	const location = useLocation();
	const navigate = useNavigate();

	return (
		<div className="w-full py-12 h-[100vh] shadow-xl">
			<div className="w-full flex flex-col items-center gap-4">
				<h1
					className="font-extrabold text-3xl text-[#FF4D4F]  text-center cursor-pointer"
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
					{adminLinks.map((link, index) => (
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

export default AdminNavnar;
