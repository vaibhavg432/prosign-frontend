import React, { useState } from "react";
import { Button, Space, message, Input } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import "../index.css";
import { COLORS, styles } from "../constants";
import signup from "../assets/images/signup.svg";
import { useRegisterMutation } from "../services/AuthApi";

const SignUp = () => {
	const [messageApi, contextHolder] = message.useMessage();
	const [register, { isLoading: isRegistering }] = useRegisterMutation();
	const navigate = useNavigate();
	const [form, setForm] = useState({
		name: "",
		email: "",
		password: "",
		confirmPassword: "",
	});
	const color = COLORS;
	const error = (text) => {
		messageApi.open({
			type: "error",
			content: text,
		});
	};

	const success = (text) => {
		messageApi.open({
			type: "success",
			content: text,
		});
	};
	const onSubmit = async (e) => {
		e.preventDefault();
		const { data } = await register(form);
		if (!data.success) {
			error(data.message);
			return;
		} else {
			success(data.message);
			setTimeout(() => {
				navigate("/login");
			}, 2000);
		}
		console.log(data);
	};
	return (
		<div className={`w-full h-[100vh] flex ${color.primary}`}>
			<div className="w-1/2 sm:flex hidden justify-center items-center">
				<img src={signup} alt="signup" className="w-[70%] h-[70%]" />
			</div>
			<div className="sm:w-1/2 w-full flex justify-center items-center">
				<div
					className={` w-[90%] sm:w-[65%] h-[90%] sm:h-[80%] flex flex-col items-center justify-between py-8 bg-white rounded-md`}
				>
					<div className="px-4 w-full flex flex-col items-center gap-4">
						<h1 className="text-xl">Enter Your Credentials</h1>
					</div>
					<div className="w-full flex flex-col px-8 mt-4 gap-4 ">
						<div>
							<label className={styles.label}>Name*</label>
							<input
								type="name"
								className={styles.input}
								placeholder="Enter your Name"
								value={form.name}
								onChange={(e) =>
									setForm({
										...form,
										name: e.target.value,
									})
								}
							/>
						</div>
						<div>
							<label className={styles.label}>Email*</label>
							<input
								type="email"
								className={styles.input}
								placeholder="Enter your email"
								value={form.email}
								onChange={(e) =>
									setForm({ ...form, email: e.target.value })
								}
							/>
						</div>
						<div>
							<label className={styles.label}>Password*</label>
							<Input.Password
								className={styles.input}
								placeholder="Enter your password"
								value={form.password}
								onChange={(e) =>
									setForm({
										...form,
										password: e.target.value,
									})
								}
							/>
						</div>
						<div>
							<label className={styles.label}>
								Confirm Password *
							</label>
							<Input.Password
								className={styles.input}
								placeholder="Re - Enter your password"
								value={form.confirmPassword}
								onChange={(e) =>
									setForm({
										...form,
										confirmPassword: e.target.value,
									})
								}
							/>
						</div>
						<div>
							<Space
								direction="vertical"
								style={{ width: "100%" }}
							>
								{contextHolder}
								<Button
									type="primary"
									block
									danger
									onClick={onSubmit}
								>
									{isRegistering ? (
										<LoadingOutlined className="text-white" />
									) : (
										"Sign Up"
									)}
								</Button>
							</Space>
						</div>
					</div>
					<div>
						<h1>
							Don't have an account?{" "}
							<span
								className="text-[#598392] cursor-pointer"
								onClick={() => navigate("/login")}
							>
								Log In
							</span>
						</h1>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SignUp;
