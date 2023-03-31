import React, { useState } from "react";
import { Segmented, Avatar, Descriptions, Button, Space, message } from "antd";
import { EditOutlined } from "@ant-design/icons";

import { User } from "../../components";
import styles from "../../constants/styles";
import {
	useGetUserQuery,
	useEditUserProfileMutation,
} from "../../services/UserApi";

const PersonalInfo = () => {
	const [edit, setEdit] = useState(false);
	const [messageApi, contextHolder] = message.useMessage();
	const { data, isLoading } = useGetUserQuery();
	const [editProfile] = useEditUserProfileMutation();
	const user = data?.user;
	const [editData, setEditData] = useState(data?.user);
	console.log(data, isLoading);
	return (
		<div className="w-full flex flex-col gap-4">
			{!isLoading && (
				<div className="w-full flex justify-center mt-12">
					<Avatar size={100} className="bg-[#7265E6]">
						{user.name[0]}
					</Avatar>
				</div>
			)}
			<div className="w-full flex justify-end gap-2">
				<Button
					type="primary"
					className="bg-[#228B22]"
					onClick={() => {
						if (edit) {
							setTimeout(() => {
								messageApi.success("Profile Updated");
							}, 1000);
						}

						if (edit) {
							editProfile(editData).unwrap();
						}
						setEdit(!edit);
					}}
				>
					{edit ? "Save" : "Edit"}
				</Button>
				{edit && (
					<Button
						type="primary"
						danger
						className="bg-[#598392]"
						onClick={() => {
							setEdit(!edit);
						}}
					>
						Cancel
					</Button>
				)}
			</div>
			{!isLoading && (
				<div className="w-full flex justify-center mt-2">
					<div className="w-full p-8 rounded-md bg-white">
						<Descriptions title="User Info" bordered column={1}>
							<Descriptions.Item label="Name">
								{!edit ? (
									user.name
								) : (
									<input
										type="text"
										className={
											styles.input + " border-black"
										}
										value={editData?.name}
										onChange={(e) => {
											setEditData({
												...editData,
												name: e.target.value,
											});
										}}
									/>
								)}
							</Descriptions.Item>
							{user.bio && (
								<Descriptions.Item label="User Bio">
									{!edit ? (
										user.bio
									) : (
										<input
											type="text"
											className={
												styles.input + " border-black"
											}
											value={editData?.bio}
											onChange={(e) => {
												setEditData({
													...editData,
													bio: e.target.value,
												});
											}}
										/>
									)}
								</Descriptions.Item>
							)}
							<Descriptions.Item label="Email ID">
								{!edit ? (
									user.email
								) : (
									<input
										type="text"
										className={
											styles.input + " border-black"
										}
										value={editData.email}
										onChange={(e) => {
											setEditData({
												...editData,
												email: e.target.value,
											});
										}}
									/>
								)}
							</Descriptions.Item>
							<Descriptions.Item label="Telephone">
								{!edit ? (
									user.phone
								) : (
									<input
										type="text"
										className={styles.input}
										value={editData.phone}
										onChange={(e) => {
											setEditData({
												...editData,
												phone: e.target.value,
											});
										}}
									/>
								)}
							</Descriptions.Item>
							{user.address && (
								<Descriptions.Item label="Address">
									{!edit ? (
										user.address
									) : (
										<input
											type="text"
											className={styles.input}
											value={editData.address}
											onChange={(e) => {
												setEditData({
													...editData,
													address: e.target.value,
												});
											}}
										/>
									)}
								</Descriptions.Item>
							)}
							<Descriptions.Item label="Screens Alloted">
								{user.screenLimit}
							</Descriptions.Item>
							<Descriptions.Item label="Screens Active">
								{user.screenCount}
							</Descriptions.Item>
						</Descriptions>
					</div>
				</div>
			)}
		</div>
	);
};

const AccountSettings = () => {
	const [resetPass, setResetPass] = useState({
		currentPassword: "",
		password: "",
		confirmPassword: "",
	});
	return (
		<div className="w-full flex flex-col gap-4">
			<div className="w-full flex flex-col gap-2 mt-12">
				<h1>Password Settings</h1>
				<div className="w-full flex justify-center">
					<div className="w-[95%] sm:w-[80%] p-8 bg-white rounded-md">
						<div>
							<label className={styles.label}>
								Current Password*
							</label>
							<input
								className={styles.input}
								type="password"
								value={resetPass.currentPassword}
								placeholder="Enter your current password"
								onChange={(e) => {
									setResetPass({
										...resetPass,
										currentPassword: e.target.value,
									});
								}}
							/>
						</div>
						<div className="mt-4">
							<label className={styles.label}>
								New Password*
							</label>
							<input
								className={styles.input}
								type="password"
								value={resetPass.password}
								placeholder="Enter your new password"
								onChange={(e) => {
									setResetPass({
										...resetPass,
										password: e.target.value,
									});
								}}
							/>
						</div>
						<div className="mt-4">
							<label className={styles.label}>
								Confirm New Password*
							</label>
							<input
								className={styles.input}
								type="password"
								value={resetPass.confirmPassword}
								placeholder="Confirm your new password"
								onChange={(e) => {
									setResetPass({
										...resetPass,
										confirmPassword: e.target.value,
									});
								}}
							/>
						</div>
						<div className="w-full flex justify-center mt-8">
							<Space
								direction="vertical"
								className="w-3/4 sm:w-1/2"
							>
								<Button
									type="primary"
									block
									className="bg-[#598392]"
								>
									Change Password
								</Button>
							</Space>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

const ProfileAndSettings = () => {
	const tabClass = "py-2";
	const [tabValue, setTabValue] = useState(0);
	const tabs = [
		{
			label: (
				<div className={tabClass}>
					<h1>Personal Information</h1>
				</div>
			),
			value: 0,
		},
		{
			label: (
				<div className={tabClass}>
					<h1>Account Settings</h1>
				</div>
			),
			value: 1,
		},
	];
	return (
		<div className="w-full py-4">
			<div className="w-full flex justify-center">
				<div className="w-[90%] sm:w-[60%]">
					<Segmented
						block
						options={tabs}
						value={tabValue}
						onChange={(e) => {
							setTabValue(e);
						}}
					/>
				</div>
			</div>
			<div className="w-full">
				{tabValue === 0 ? <PersonalInfo /> : <AccountSettings />}
			</div>
		</div>
	);
};

const UserProfile = () => {
	return (
		<User name="Profile & Settings" Component={<ProfileAndSettings />} />
	);
};

export default UserProfile;
