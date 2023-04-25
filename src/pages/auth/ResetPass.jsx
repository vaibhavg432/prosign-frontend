import React, { useState } from "react";
import { Input, Button, message } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useParams, useNavigate } from "react-router-dom";

import { COLORS as color, styles } from "../../constants";
import { useChangePasswordMutation } from "../../services/AuthApi"

const ResetPass = () => {
    const [changed, setChanged] = useState(false);
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();
	const [form, setForm] = useState({
        token: "",
		password: "",
		confirmPassword: "",
	});
    const [changePassword, { isLoading : isChanging }] = useChangePasswordMutation();
	const id = useParams().id;
    form.token = id;

    const handleResetPass = async (e) => {
        e.preventDefault();
        const { data } = await changePassword(form);
        if(!data.success){
            messageApi.error(data.message);
        }else{
            messageApi.success(data.message);
        }
        setTimeout(()=>{
            setChanged(true);
        }, 2000);
        await setTimeout(()=>{
            navigate("/login");
        }, 5000);
    }
	return (
		<div
			className={`w-full h-[100vh] ${color.btnSecondary} flex justify-center items-center   `}
		>
			<div className="w-[85%] sm:w-[45%] py-8 bg-white rounded-md">
				<div className="w-full flex flex-col justify-center items-center">
					<h1 className="text-2xl">Reset Password</h1>
					{!changed ? <div className = "w-[80%] flex flex-col gap-12 sm:gap-4 mt-8">
						<div>
							<label className={styles.label}>Password</label>
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
							<label className={styles.label}>Confirm Password</label>
                            <Input.Password
                                className={styles.input}
                                placeholder="Enter your password"
                                value={form.confirmPassword}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        confirmPassword: e.target.value,
                                    })
                                }
                            />
						</div>

                        <div className = "w-full flex justify-center">
                            {contextHolder}
                            <Button type = "primary" danger onClick={handleResetPass} >{isChanging ? <LoadingOutlined className = "text-white"/> : "Reset Password"}</Button>
                        </div>
					</div> : 
                    <div className = "mt-8">
                        <h1 className = "text-center">Password Changed Successfully</h1>
                        <h1 className = "text-center">Redirecting to Login Page</h1>
                    </div>
                    }
				</div>
			</div>
		</div>
	);
};

export default ResetPass;
