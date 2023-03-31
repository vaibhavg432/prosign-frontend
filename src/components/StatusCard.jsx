import React from "react";
import { useNavigate } from "react-router-dom";

const StatusCard = ({ title, count, color, path }) => {
	const navigate = useNavigate();
	return (
		<div
			className={`${color} w-[10rem] min-h-[6rem] rounded-xl p-4 flex flex-col gap-2 shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 cursor-pointer hover:opacity-90 opacity-100 }`}
		>
			<div
				className="w-full flex flex-col items-betweem justify-center gap-4"
				onClick={() => navigate(path)}
			>
				<h1 className="mt-4">
					<span className={`text-3xl font-extrabold`}>{count}</span>
				</h1>
				<h1 className="text-sm">{title}</h1>
			</div>
		</div>
	);
};

export default StatusCard;
