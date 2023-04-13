import React, { useState } from "react";
import { message, Button, Space, Modal, Input, Segmented, Select } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import {
	MonitorTable,
	AloneMonitorTable,
	GroupMonitorTable,
} from "./components";
import { User } from "../../components";
import {
	useAddMonitorMutation,
	useGetUngroupedScreensQuery,
	useCreateAScreenGroupMutation,
} from "../../services/UserMonitorApi";
import { useGetUserQuery } from "../../services/UserApi";

const Monitors = () => {
	const [createAScreenGroup, { isLoading: isCreating }] =
		useCreateAScreenGroupMutation();
	const [addMonitor] = useAddMonitorMutation();
	const { data: ungroupedData } = useGetUngroupedScreensQuery({},{ pollingInterval: 1000, });
	const ungrouped = ungroupedData?.screens;
	const { data: userData, isLoading } = useGetUserQuery({},{ pollingInterval: 1000, });
	const user = userData?.user;
	const [messageApi, contextHolder] = message.useMessage();
	const [count, setCount] = useState(0);
	const [isOpen, setIsOpen] = useState(false);
	const [group, setGroup] = useState(false);
	const options = [];
	ungrouped?.forEach((screen) => {
		options.push({
			label: screen.username,
			value: screen._id,
		});
	});
	const [newGroup, setNewGroup] = useState({
		name: "",
		screens: [],
	});

	const showMessage = (text) => {
		messageApi.open({
			type: "success",
			content: text,
		});
	};

	const showError = (text) => {
		messageApi.open({
			type: "error",
			content: text,
		});
	};
	const [tab, setTab] = useState(0);
	return (
		<div className="w-full flex flex-col gap-4">
			<div className="w-full flex justify-between items-end">
				<h1>All Monitors</h1>
				<div>
					<div className="flex gap-2">
						<Space direction="vertical" style={{ width: "100%" }}>
							<Button
								type="primary"
								block
								// className="bg-[#598392]"
								danger
								onClick={() => setGroup(true)}
							>
								Create Monitor Group
							</Button>
							<Modal
								title="Create Monitor Group"
								visible={group}
								okButtonProps={{ style: { display: "none" } }}
								onCancel={() => setGroup(false)}
							>
								<div>
									<div>
										<label>Name*</label>
										<br />
										<input
											type="text"
											value={newGroup.name}
											onChange={(e) => {
												setNewGroup({
													...newGroup,
													name: e.target.value,
												});
											}}
											className="w-full border border-gray-300 rounded-md px-2 py-[4px]"
											placeholder="Enter Group Name"
										/>
									</div>
									<br />
									<div>
										<label>Select Monitor*</label>
										<Select
											mode="multiple"
											allowClear
											style={{
												width: "100%",
											}}
											value={newGroup.screens}
											placeholder="Please select"
											onChange={(value) => {
												setNewGroup({
													...newGroup,
													screens: value,
												});
											}}
											options={options}
										/>
									</div>
								</div>
								{contextHolder}
								<Button
									type="primary"
									danger
									className="bg-[#598392] mt-4"
									onClick={async (e) => {
										e.preventDefault();
										const { data } =
											await createAScreenGroup(newGroup);
										if (data.success) {
											setGroup(false);
											setNewGroup({
												name: "",
												screens: [],
											});
											showMessage(
												"Monitor Group Created",
											);
										} else {
											showError(data.message);
										}
									}}
								>
									{isCreating ? (
										<LoadingOutlined className="text-white" />
									) : (
										"Create Group"
									)}
								</Button>
							</Modal>
						</Space>
						<Space direction="vertical" style={{ width: "100%" }}>
							<Button
								type="primary"
								block
								// className="bg-[#598392]"
								danger
								onClick={() => setIsOpen(true)}
							>
								Add Monitor User
							</Button>
							<Modal
								title="Add Monitor User"
								visible={isOpen}
								okButtonProps={{ style: { display: "none" } }}
								onCancel={() => setIsOpen(false)}
							>
								{!isLoading && (
									<p>
										No. of Vacant Users Left :{" "}
										{user.screenLimit - user.screenCount}
									</p>
								)}
								{!isLoading && (
									<div className="mt-4">
										<label>
											How many Users you want to add ?*
										</label>
										<Input
											type="number"
											max={
												user.screenLimit -
												user.screenCount
											}
											min={0}
											value={count}
											onChange={(e) => {
												setCount(e.target.value);
											}}
										/>
									</div>
								)}
								{contextHolder}
								<Button
									type="primary"
									danger
									className="bg-[#598392] mt-4"
									onClick={() => {
										if (
											count >
											user.screenLimit - user.screenCount
										) {
											showError(
												"You can't add more than " +
													(user.screenLimit -
														user.screenCount) +
													" users",
											);
											return;
										}
										addMonitor(count);
										setIsOpen(false);
										showMessage(count + " Monitor Added");
										setCount(0);
									}}
								>
									Add
								</Button>
							</Modal>
						</Space>
					</div>
				</div>
			</div>
			<div className="">
				<Segmented
					block
					options={[
						{
							label: <h1>All Monitors</h1>,
							value: 0,
						},
						{
							label: <h1>Grouped Monitors</h1>,
							value: 1,
						},
						{
							label: <h1>Un - Grouped Monitors</h1>,
							value: 2,
						},
					]}
					value={tab}
					onChange={(e) => setTab(e)}
				/>
			</div>
			{tab === 0 ? (
				<MonitorTable />
			) : tab === 1 ? (
				<GroupMonitorTable />
			) : (
				<AloneMonitorTable />
			)}
		</div>
	);
};

const UserMonitor = () => {
	return <User name="Monitors" Component={<Monitors />} />;
};

export default UserMonitor;
