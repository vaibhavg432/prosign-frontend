import React from "react";
import { Button, Space } from "antd";
import { useNavigate } from "react-router-dom";

import { navLinks } from "../constants/data";

const Navbar = () => {
	const navigate = useNavigate();
	return (
		<div className="w-full flex justify-between bg-white px-8 py-4 items-center shadow-2xl">
			<div className="w-2/12 flex justify-center items-center">
				<h1>Company</h1>
			</div>
			<ul className="w-8/12 justify-center flex gap-8 items-center">
				{navLinks.map((link, index) => (
					<li
						key={index}
						onClick={() => navigate(link.path)}
						className="cursor-pointer"
					>
						{link.name}
					</li>
				))}
			</ul>
			<div className="w-2/12 flex justify-center items-center">
				<Space direction="vertical" style={{ width: "50%" }}>
					<Button
						type="primary"
						block
						className="bg-[#598392]"
						onClick={() => navigate("/login")}
					>
						Login
					</Button>
				</Space>
			</div>
		</div>
	);
};

export default Navbar;
