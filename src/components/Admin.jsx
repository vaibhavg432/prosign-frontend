import React from "react";
import { Dropdown, Space } from "antd";
import { AiOutlineDown } from "react-icons/ai";
import { CgProfile, CgLogOut } from "react-icons/cg";
import { FaUsers, FaUserAlt } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

import { AdminNavbar } from "../components";
import { COLORS as color } from "../constants";

const Admin = (props) => {
	const navigate = useNavigate();
	const items = [
		{
			key: "1",
			label: (
				<div
					className="flex items-center gap-2"
					onClick={() => {
						navigate("/admin/profile");
					}}
				>
					<CgProfile />
					My Profile
				</div>
			),
		},
		{
			key: "2",
			label: (
				<div className="flex items-center gap-2">
					<FaUsers />
					Users
				</div>
			),
		},
		{
			key: "3",
			label: (
				<div
					className="flex items-center gap-2"
					onClick={() => {
						navigate("/admin/settings");
					}}
				>
					<IoSettingsSharp />
					Settings
				</div>
			),
		},
		{
			key: "4",
			label: (
				<div
					className="flex items-center gap-2"
					onClick={() => {
						localStorage.removeItem("token");
						localStorage.removeItem("admin");
						navigate("/login");
					}}
				>
					<CgLogOut />
					Logout
				</div>
			),
		},
	];
	return (
		<div className={`${color.primary} w-full flex`}>
			<div className="w-2/12 flex flex-col gap-4 relative bg-white">
				<AdminNavbar />
			</div>
			<div className="w-10/12 flex flex-col gap-4  p-4">
				<div className="w-full flex justify-between">
					<div>
						<h1 className="text-2xl font-light">{props.name}</h1>
					</div>
					<div>
						<Dropdown
							menu={{
								items,
							}}
							trigger={["click"]}
							className="cursor-pointer"
						>
							<div onClick={(e) => e.preventDefault()}>
								<Space>
									<FaUserAlt className="text-lg cursor-pointer" />
									<AiOutlineDown />
								</Space>
							</div>
						</Dropdown>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Admin;
