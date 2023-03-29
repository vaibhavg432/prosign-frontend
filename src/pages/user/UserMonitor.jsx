import React, { useState } from "react";
import { message, Button, Space, Modal, Input, Spin } from "antd";
import { MonitorTable } from "./components";
import { User } from "../../components";
import { useAddMonitorMutation } from "../../services/UserMonitorApi";
import { useGetUserQuery } from "../../services/UserApi";

const Monitors = () => {
	const [addMonitor] = useAddMonitorMutation();
	const { data: userData, isLoading } = useGetUserQuery();
	const user = userData?.user;
	const [messageApi, contextHolder] = message.useMessage();
	const [count, setCount] = useState(0);
	const [isOpen, setIsOpen] = useState(false);

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

	return (
		<div className="w-full flex flex-col gap-8">
			<div className="w-full flex justify-between">
				<h1>All Monitors</h1>
				<div>
					<Space direction="vertical" style={{ width: "100%" }}>
						<Button
							type="primary"
							block
							className="bg-[#598392]"
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
											user.screenLimit - user.screenCount
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

			<div>
				<MonitorTable />
			</div>
		</div>
	);
};

const UserMonitor = () => {
	return <User name="Monitors" Component={<Monitors />} />;
};

export default UserMonitor;
