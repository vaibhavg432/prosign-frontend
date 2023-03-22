import React from "react";

import { Navbar } from "../components";
import { COLORS as color } from "../constants";

const Home = () => {
	return (
		<div className={`${color.primary} w-full min-h-[100vh]`}>
			<Navbar />
		</div>
	);
};

export default Home;
