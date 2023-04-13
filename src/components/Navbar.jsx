import React, { useEffect } from "react";
import { Button, Space } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { navLinks } from "../constants/data";
import { COLORS as color } from "../constants";
import { userLogin, adminLogin, logout } from "../features/Login";

const Navbar = () => {
	const userLog = useSelector((state) => state.auth.userLoggedIn);
	const adminLog = useSelector((state) => state.auth.adminLoggedIn);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	useEffect(() => {
		if (localStorage.getItem("token")) {
			if (localStorage.getItem("user")) {
				dispatch(userLogin());
			} else if (localStorage.getItem("admin")) {
				dispatch(adminLogin());
			}
		} else {
			dispatch(logout());
			window.location.href = "https://digisigns.in/";
		}
		// eslint-disable-next-line
	}, []);

	return (
		<div className="w-full flex justify-between bg-white px-8 py-4 items-center shadow-2xl">
			<div className="w-2/12 flex justify-center items-center">
				<h1
					className="font-extrabold text-3xl text-[#FF4D4F]  text-center cursor-pointer"
					onClick={() =>
						(window.location.href = "https://digisigns.in/")
					}
				>
					DIGISIGNS
				</h1>
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
					{!userLog && !adminLog ? (
						<Button
							type="primary"
							block
							danger
							className={`${color.btnPrimary}`}
							onClick={() => navigate("/login")}
						>
							Login
						</Button>
					) : userLog ? (
						<Button
							type="primary"
							block
							danger
							className={`${color.btnPrimary}`}
							onClick={() => navigate("/user")}
						>
							Dashboard
						</Button>
					) : (
						<Button
							type="primary"
							block
							danger
							className={`${color.btnPrimary}`}
							onClick={() => navigate("/admin")}
						>
							Dashboard
						</Button>
					)}
				</Space>
			</div>
		</div>
	);
};

export default Navbar;
