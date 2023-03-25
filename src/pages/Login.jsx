import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Space, message } from "antd";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

import "../index.css";
import { COLORS, styles } from "../constants";
import logins from "../assets/images/login.svg";
import { useLoginMutation } from "../services/AuthApi";
import { userLogin, adminLogin } from "../features/Login";

const Login = () => {
	const [messageApi, contextHolder] = message.useMessage();
	// eslint-disable-next-line
	const userLog = useSelector((state) => state.auth.userLoggedIn);// eslint-disable-next-line
	const adminLog = useSelector((state) => state.auth.adminLoggedIn);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [login] = useLoginMutation();
	const [form, setForm] = useState({
		email: "",
		password: "",
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
		console.log(data);
		if (!data.success) {
			error(data.message);
		} else {
			success(data.message);
			localStorage.setItem("token", data.token);
			if (data.role === "admin") {
				localStorage.setItem("admin", true);
				dispatch(adminLogin());
				navigate("/admin");
			} else if (data.role === "user") {
				localStorage.setItem("user", true);
				dispatch(userLogin());
				navigate("/user");
			}
		}
	};
	return (
		<div className={`w-full max-h-[100vh]  ${color.primary}`}>
			<div className="h-[10vh] flex items-center px-8 gap-2">
				<IoIosArrowBack
					className="text-xl cursor-pointer"
					onClick={() => navigate("/")}
				/>
				<h1 className="cursor-pointer" onClick={() => navigate("/")}>
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
						<div className="px-4 w-full flex flex-col items-center gap-4">
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
								<input
									type="password"
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
								<Space
									direction="vertical"
									style={{ width: "100%" }}
								>
									{contextHolder}
									<Button
										type="primary"
										block
										className="bg-[#598392]"
										onClick={onSubmit}
									>
										Login
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
