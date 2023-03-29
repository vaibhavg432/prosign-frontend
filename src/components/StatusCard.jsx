import React from "react";

const StatusCard = ({ title, count, color }) => {
	return (
		<div
			className={`${color} w-[20rem] h-[10rem] rounded-md p-4 flex flex-col gap-2 shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 cursor-pointer hover:opacity-90 opacity-100 }`}
		>
			<div>
				<h1 className="font-bold">{title}</h1>
				<h1 className="mt-4">
					<span className="text-3xl font-bold">{count}</span>
				</h1>
			</div>
		</div>
	);
};

export default StatusCard;
