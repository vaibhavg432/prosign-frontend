import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Space, message, Modal, Input } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

import "../index.css";
import logo from "../assets/images/logo.png";
import { COLORS, styles } from "../constants";
import logins from "../assets/images/login.svg";
import { useLoginMutation } from "../services/AuthApi";
import { userLogin, adminLogin } from "../features/Login";

const Login = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [messageApi, contextHolder] = message.useMessage();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [login, { isLoading: isLogging }] = useLoginMutation();
	const [form, setForm] = useState({
		email: "",
		password: "",
	});
	const [resetForm, setResetForm] = useState({
		email: "",
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
		const { data } = await login(form);
		if (!data.success) {
			error(data.message);
		} else {
			success(data.message);
			localStorage.setItem("token", data.token);

			if (data.role === "admin") {
				localStorage.setItem("admin", true);
				if (localStorage.getItem("user")) {
					localStorage.removeItem("user");
				}
				dispatch(adminLogin());
				navigate("/admin");
			} else if (data.role === "user") {
				localStorage.setItem("user", true);
				if (localStorage.getItem("admin")) {
					localStorage.removeItem("admin");
				}
				dispatch(userLogin());
				navigate("/user");
			}
			// window.location.reload();
		}
	};
	return (
		<div className={`w-full max-h-[100vh]  ${color.primary}`}>
			<div className="h-[10vh] flex items-center px-8 gap-2">
				<IoIosArrowBack
					className="text-xl cursor-pointer"
					onClick={() =>
						(window.location.href = "https://digisigns.in/")
					}
				/>
				<h1
					className="cursor-pointer"
					onClick={() =>
						(window.location.href = "https://digisigns.in/")
					}
				>
					Back To Home
				</h1>
			</div>
			<div className="flex h-[90vh] ">
				<div className="w-1/2 sm:flex hidden justify-center items-center">
					<img src={logins} alt="login" className="w-[75%] h-[75%]" />
				</div>
				<div className="sm:w-1/2 w-full flex justify-center items-center">
					<div
						className={` w-[90%] sm:w-[65%] h-[90%] sm:h-[80%] flex flex-col items-center justify-between py-12 bg-white rounded-md`}
					>
						<div className="px-4 w-full flex justify-center items-center gap-4">
							<img src = {logo} alt="logo" className="w-8 h-8" />
							<h1 className="text-xl">Enter Your Credentials</h1>
						</div>
						<div className="w-full flex flex-col px-8 mt-4 gap-4 ">
							<div>
								<label className={styles.label}>Email*</label>
								<input
									type="email"
									className={styles.input}
									placeholder="Enter your email"
									value={form.email}
									onChange={(e) =>
										setForm({
											...form,
											email: e.target.value,
										})
									}
								/>
							</div>
							<div>
								<label className={styles.label}>
									Password*
								</label>
								<Input.Password
									className={styles.input}
									placeholder="Enter your password"
									value={form.password}
									onChange={(e) => { 
										setForm({
											...form,
											password: e.target.value,
										});
									}}
								/>
								{/* //forgot Password */}
								<h1
									className="text-sm text-gray-600 mt-2 cursor-pointer"
									onClick={() => setIsOpen(true)}
								>
									Forgot Password ?{" "}
								</h1>
							</div>
							<Modal
								title="Forgot Password"
								visible={isOpen}
								onCancel={() => setIsOpen(false)}
								footer={null}
							>
								<div className="w-full py-8">
									<label className={styles.label}>
										Email*
									</label>
									<input
										type="email"
										className={styles.input}
										placeholder="Enter your email"
										value={resetForm.email}
										onChange={(e) =>
											setResetForm({
												...resetForm,
												email: e.target.value,
											})
										}
									/>
									<div className="w-full flex justify-between items-center mt-4">
										<Button
											type="primary"
											danger
											className={`${color.btnPrimary}`}
										>
											Send Mail
										</Button>
									</div>
								</div>
							</Modal>
							<div>
								<Space
									direction="vertical"
									style={{ width: "100%" }}
								>
									{contextHolder}
									<Button
										type="primary"
										danger
										block
										className={`${color.btnPrimary}`}
										onClick={onSubmit}
									>
										{isLogging ? (
											<LoadingOutlined className="text-white" />
										) : (
											"Login"
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
									onClick={() => navigate("/signup")}
								>
									Sign Up
								</span>
							</h1>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
