import { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashHeader from "./DashComponents/DashHeader";
import DashHolder from "./DashComponents/DashHolder";
import ConfirmModal from "./Gideon/ConfirmModal";
import ConfirmTsk from "./Gideon/ConfirmTsk";

import CreateProjects from "./Gideon/CreateProjects";
import CreateTask from "./Gideon/CreateTask";
import ExploreTask from "./Gideon/ExploreTask";
import React, { useState, useEffect } from "react";
import HomeScreen from "./Components/HomeScreen";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import ProjectsFile from "./Gideon/ProjectsFile";
import TaskOverview from "./Gideon/TaskOverview";
import WorkSpace from "./Gideon/WorkSpace";
import { AuthContext } from "./Global/AuthContext";
import { PrivateRoute } from "./Global/PrivateRoute";
import storage from "local-storage-fallback";
import AllUsersPage from "./GoodLuck/AllUsersPage";
// import SignUp from "./Components/AllSign/SignUp";
import SignIn from "./Components/AllSign/SignIn";
import HomePage from "./HomePage.js/HomePage";
import LandingPage from "./HomePage.js/LandingPage";
import SignUp from "./HomePage.js/SignUp";
import NotificationPage from "./Judith/NotificationPage";
import ActivityPage from "./Olorunda/ActivityPage";
import NowActive from "./Olorunda/NowActive";
import SettingsPage from "./Romanus/SettingsPage";
import ScrolllBoarding from "./Components/Onboarding/ScrolllBoarding";

const GlobalStyled = createGlobalStyle`
body{
  background-color: ${({ theme }) =>
		theme.myTheme === "dark" ? "#212429" : "white"};
  color: ${({ theme }) => (theme.myTheme === "dark" ? "#edfafe" : "#091e42")};
}
`;

function App() {
	const storeThemeChoice = () => {
		const saveTheme = storage.getItem("toggle");
		return saveTheme ? JSON.parse(saveTheme) : { myTheme: "light" };
	};

	const [toggle, setToggle] = useState(storeThemeChoice);
	useEffect(() => {
		storage.setItem("toggle", JSON.stringify(toggle));
	}, [toggle]);
	const { currentUser } = useContext(AuthContext);

	return (
		<>
			<Router>
				{currentUser ? (
					<div>
						<DashHeader />
						<DashHolder />
					</div>
				) : (
					<div>
						<ThemeProvider theme={toggle}>
							<GlobalStyled />

							<Routes>
								<Route
									path=''
									element={
										<HomeScreen
											bclr={() => {
												setToggle(
													toggle.myTheme === "dark"
														? { myTheme: "y" }
														: { myTheme: "dark" },
												);
											}}
										/>
									}
								/>
								<Route path='/signup' element={<SignUp />} />
								<Route path='/signin' element={<SignIn />} />
								<Route path='/onboard' element={<ScrolllBoarding />} />
							</Routes>
						</ThemeProvider>
					</div>
				)}

				<div style={{ marginLeft: "300px" }}>
					{" "}
					<Routes>
						<Route
							path='/'
							element={
								<PrivateRoute>
									<NowActive />
								</PrivateRoute>
							}
						/>
						<Route
							path='/workspace'
							element={
								<PrivateRoute>
									<WorkSpace />
								</PrivateRoute>
							}
						/>

						<Route
							path='/progress/:id'
							element={
								<PrivateRoute>
									<ConfirmTsk />
								</PrivateRoute>
							}
						/>

						<Route
							path='/project/:id'
							element={
								<PrivateRoute>
									<ProjectsFile />
								</PrivateRoute>
							}
						/>
						<Route
							path='/notification'
							element={
								<PrivateRoute>
									<NotificationPage />
								</PrivateRoute>
							}
						/>
						<Route
							path='/users'
							element={
								<PrivateRoute>
									<AllUsersPage />
								</PrivateRoute>
							}
						/>
						<Route
							path='/exploreTask/:id'
							element={
								<PrivateRoute>
									<ExploreTask />
								</PrivateRoute>
							}
						/>

						<Route
							path='/settings'
							element={
								<PrivateRoute>
									<SettingsPage />
								</PrivateRoute>
							}
						/>
						<Route
							path='/proj/:id'
							element={
								<PrivateRoute>
									<CreateProjects />
								</PrivateRoute>
							}
						/>
						<Route
							path='/task/:id'
							element={
								<PrivateRoute>
									<CreateTask />
								</PrivateRoute>
							}
						/>
						<Route
							path='/exploreTask/:id/steps/:id'
							element={
								<PrivateRoute>
									<TaskOverview />
								</PrivateRoute>
							}
						/>
						<Route
							path='/questionstep/:id'
							element={
								<PrivateRoute>
									<ConfirmModal />
								</PrivateRoute>
							}
						/>
					</Routes>
				</div>
			</Router>
		</>
	);
}

export default App;
