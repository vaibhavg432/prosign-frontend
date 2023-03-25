import React, { useState } from "react";
import { Segmented, Avatar, Descriptions, Button, Space } from "antd";

import { User } from "../../components";
import styles from "../../constants/styles";
import { useGetUserQuery } from "../../services/UserApi";

const AddressTable = ({ address }) => {
	return (
		<Descriptions title="Address" bordered column={1}>
			<Descriptions.Item label="Street">
				{address.street ? address.street : "NA"}
			</Descriptions.Item>
			<Descriptions.Item label="State">
				{address.state ? address.state : "NA"}
			</Descriptions.Item>
			<Descriptions.Item label="City">
				{address.city ? address.city : "NA"}
			</Descriptions.Item>
			<Descriptions.Item label="Zipcode">
				{address.zip ? address.zip : "NA"}
			</Descriptions.Item>
		</Descriptions>
	);
};

const PersonalInfo = () => {
	const { data, isLoading } = useGetUserQuery();
	const user = data?.user;
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
			{!isLoading && (
				<div className="w-full flex justify-center mt-2">
					<div className="w-full p-8 rounded-md bg-white">
						<Descriptions title="User Info" bordered column={1}>
							<Descriptions.Item label="UserName">
								{user.name}
							</Descriptions.Item>
							<Descriptions.Item label="User Bio">
								{user.bio ? user.bio : "NA"}
							</Descriptions.Item>
							<Descriptions.Item label="Email ID">
								{user.email}
							</Descriptions.Item>
							<Descriptions.Item label="Telephone">
								{user.phone ? user.phone : "NA"}
							</Descriptions.Item>
							<Descriptions.Item label="Address">
								<AddressTable address={user.address} />
							</Descriptions.Item>
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
									Login
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
							console.log(e);
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
