import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	workspaceID: [],
	sideBarID: [],
	ProjectID: [],
	TaskID: [],
	stepsID: [],
};

const ReduxState = createSlice({
	name: "simple",
	initialState,
	reducers: {
		ViewWorkSpace: (state, { payload }) => {
			state.workspaceID = payload;
		},
		ViewsideBarID: (state, { payload }) => {
			state.sideBarID = payload;
		},
		ViewProjectID: (state, { payload }) => {
			state.ProjectID = payload;
		},
		ViewTaskID: (state, { payload }) => {
			state.TaskID = payload;
		},
	},
});

export const { ViewWorkSpace, ViewsideBarID, ViewProjectID, ViewTaskID } =
	ReduxState.actions;
export default ReduxState.reducer;
