import React from "react";
import { Dropdown, Space, Tag, Modal, Button } from "antd";
import { AiOutlineDown, AiOutlineMenu } from "react-icons/ai";
import { CgProfile, CgLogOut } from "react-icons/cg";
import { FaUserAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import { UserNavbar } from "../components";
import { userLinks } from "../constants/data";
import { COLORS as color } from "../constants";
import { useGetUserQuery } from "../services/UserApi";

import "../index.css";

const User = ({ name, Component }) => {
	const { data: userData } = useGetUserQuery({}, { pollingInterval: 1000 });
	const user = userData?.user;
	const navigate = useNavigate();
	const items = [
		{
			key: "1",
			label: (
				<div
					className="flex items-center gap-2"
					onClick={() => navigate("/user/profile")}
				>
					<CgProfile />
					Profile & Settings
				</div>
			),
		},
		// {
		// 	key: "2",
		// 	label: (
		// 		<div className="flex items-center gap-2">
		// 			<FaUsers />
		// 			Users
		// 		</div>
		// 	),
		// },
		{
			key: "4",
			label: (
				<div
					className="flex items-center gap-2"
					onClick={() => {
						localStorage.removeItem("token");
						localStorage.removeItem("user");
						navigate("/login");
					}}
				>
					<CgLogOut />
					Logout
				</div>
			),
		},
	];

	const userNav = [];
	for (let i = 0; i < userLinks.length; i++) {
		userNav.push({
			key: i,
			label: (
				<div
					className="flex items-center gap-2"
					onClick={() => navigate(userLinks[i].link)}
				>
					{userLinks[i].icon}
					{userLinks[i].name}
				</div>
			),
		});
	}
	return (
		<div className={`${color.primary} w-full flex`}>
			<div className="sm:w-2/12 sm:flex hidden flex-col gap-4 fixed bg-white">
				<UserNavbar />
			</div>
			<div className="sm:hidden fixed bottom-2 left-2 z-[10]">
				<Dropdown
					menu={{ items: userNav }}
					trigger={["click"]}
					className="cursor-pointer"
				>
					<div onClick={(e) => e.preventDefault()}>
						<div className="w-12 h-12 bg-white rounded-full p-4 flex justify-center items-center">
							<AiOutlineMenu className="text-xl cursor-pointer" />
						</div>
					</div>
				</Dropdown>
			</div>
			<div
				className={`${
					color.primary
				} min-h-[100vh] w-full sm:w-10/12 flex flex-col gap-4  p-4 absolute right-[0px] ${
					user?.status === "inactive" &&
					"opacity-50 pointer-events-none"
				}`}
			>
				<div className="w-full flex justify-between">
					<div>
						<h1 className="text-xl bold text-red-700">{name}</h1>
					</div>
					<div className="flex gap-4">
						<Tag
							color={`${
								user?.status === "active" ? "green" : "red"
							}`}
						>
							{user?.status === "active" ? "Active" : "Inactive"}
						</Tag>

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
				{Component}
				<Modal
					visible={user?.status === "inactive"}
					footer={null}
					closable={false}
					maskClosable={false}
					width={400}
				>
					<div className="flex flex-col gap-4">
						<h1 className="text-xl bold text-red-700">
							Account Inactive
						</h1>
						<p className="text-gray-500">
							Your account is inactive. Please contact admin to
							activate your account or renew your subscription.
						</p>
						<div className = "w-full flex flex-col gap-2">
							<Button
								type="primary"
								danger
								onClick={() => {window.open(`https://wa.me/8826271548?text=Hello%20Admin%2C%20I%20want%20to%20activate%20my%20account.\n%20My%20email%20is%20${user?.email}`,);}}
							>
								Contact Admin
							</Button>
							<Button
								type="primary"
								danger
								onClick={() => { localStorage.removeItem("token"); localStorage.removeItem("user"); navigate("/login"); }}
							>
								Logout
							</Button>
						</div>
					</div>
				</Modal>
			</div>
		</div>
	);
};

export default User;
