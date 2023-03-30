import COLORS from "./colors";
const styles = {
	label: " text-sm",
	input: "bg-white border-none rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-[#F5EDF0] focus:ring-opacity-50 focus:border-[#F5EDF0] focus:border-opacity-50 placeholder-[#A0AEC0] text-[#2D3748] text-sm font-medium border-[#CBD5E0] border-opacity-50 shadow-sm hover:border-[#A0AEC0] hover:border-opacity-50 hover:shadow-none active:border-[#A0AEC0] active:border-opacity-50 active:shadow-none",
	normalNavClass: `px-4 py-2 hover:${COLORS.btnSecondary} hover:bg-opacity-50 rounded-md`,
	activeNavClass: `text-[#FFF] ${COLORS.btnSecondary} border-[#F5EDF0] border-opacity-50 px-4 py-2 rounded-md`,
};

export default styles;
