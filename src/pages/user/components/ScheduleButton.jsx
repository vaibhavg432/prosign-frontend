import React, { useState } from "react";
import { Button, Modal, Select, message } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import {
	useGetGroupedScreensQuery,
	useGetUngroupedScreensQuery,
	usePlayPlaylistOnMixedScreensMutation,
} from "../../../services/UserMonitorApi";
import { useGetPlaylistsQuery } from "../../../services/PlaylistApi";

const ScheduleButton = () => {
	const [messageApi, contextHolder] = message.useMessage();
	const [schedule, setSchedule] = useState(false);
	const [selected, setSelected] = useState({
		group: [],
		alone: [],
		playlist: "",
	});

	const { data: groupedData } = useGetGroupedScreensQuery({}, { pollingInterval: 60000, });
	const { data: ungroupedData } = useGetUngroupedScreensQuery({}, { pollingInterval: 60000, });
	const { data: playlist } = useGetPlaylistsQuery({}, { pollingInterval: 60000, });
	const [playPlaylistOnMixedScreens, { isLoading: isScheduling }] =
		usePlayPlaylistOnMixedScreensMutation();
	return (
		<div>
			<Button type="primary" danger onClick={() => setSchedule(true)}>
				Schedule
			</Button>
			<Modal
				title="Schedule Monitors"
				visible={schedule}
				onCancel={() => {
					setSelected({
						group: [],
						alone: [],
						playlist: "",
					});
					setSchedule(false);
				}}
				footer={null}
			>
				<div>
					<div className="flex flex-col gap-4">
						<div>
							<label>Select Groups</label>
							<Select
								mode="multiple"
								allowClear
								style={{ width: "100%" }}
								placeholder="Please select"
								onChange={(value) => {
									setSelected({
										...selected,
										group: value,
									});
								}}
								value={selected.group}
								options={groupedData?.screens.map((group) => {
									return {
										label: group.name,
										value: group._id,
									};
								})}
							/>
						</div>
						<div className="mt-2">
							<label>Select Monitors</label>
							<Select
								mode="multiple"
								allowClear
								style={{ width: "100%" }}
								placeholder="Please select"
								onChange={(value) => {
									setSelected({
										...selected,
										alone: value,
									});
								}}
								value={selected.alone}
								options={ungroupedData?.screens.map((group) => {
									return {
										label: group.name,
										value: group._id,
									};
								})}
							/>
						</div>
						<div className="mt-2">
							<label>Select Playlist</label>
							<Select
								style={{ width: "100%" }}
								placeholder="Please select"
								onChange={(value) => {
									setSelected({
										...selected,
										playlist: value,
									});
								}}
								value={selected.playlist}
								options={playlist?.playlist.map((group) => {
									return {
										label: group.name,
										value: group._id,
									};
								})}
							/>
						</div>
						<div>
							{contextHolder}
							<Button
								type="primary"
								danger
								onClick={async (e) => {
									e.preventDefault();
									const { data } =
										await playPlaylistOnMixedScreens(
											selected,
										);

									if (data?.success) {
										setSchedule(false);
										setSelected({
											group: [],
											alone: [],
											playlist: "",
										});
										messageApi.success(
											"Playlist Scheduled Successfully",
										);
									} else {
										messageApi.error(
											"Playlist Scheduled Failed",
										);
									}
								}}
							>
								{isScheduling ? (
									<LoadingOutlined className="text-white" />
								) : (
									"Schedule"
								)}
							</Button>
						</div>
					</div>
				</div>
			</Modal>
		</div>
	);
};

export default ScheduleButton;
