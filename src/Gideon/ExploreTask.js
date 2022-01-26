import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, NavLink } from "react-router-dom";
import styled from "styled-components";
import { app } from "../Base";
import { IoMdBriefcase } from "react-icons/io";
import { RiTruckFill } from "react-icons/ri";
import { MdRateReview } from "react-icons/md";
import { AiFillStar } from "react-icons/ai";
import { AuthContext } from "../Global/AuthContext";
import LinearProgress from "@mui/material/LinearProgress";
import { ViewProjectID, ViewTaskID } from "../Global/ReduxState";
const ExploreTask = () => {
	const dispatch = useDispatch();
	const { currentUser } = useContext(AuthContext);
	const [taskData, setTaskData] = React.useState([]);
	const [stepData, setStepData] = React.useState([]);
	const [tskD, setTskD] = React.useState([]);

	const { id } = useParams();

	console.log("drghsfdngdshjhgcfvbhjhg", id);

	const spaceID = useSelector((state) => state.persistedReducer.sideBarID);
	const stpID = useSelector((state) => state.persistedReducer.TaskID);

	const mapTaskData = async () => {
		await app
			.firestore()
			.collection("workspace")
			.doc(spaceID)
			.collection("project")
			.doc(id)
			.collection("task")
			.onSnapshot((snap) => {
				const item = [];
				snap.forEach((doc) => {
					item.push({ ...doc.data(), id: doc.id });
				});
				setTaskData(item);
			});
	};
	const mapmainData = async () => {
		await app
			.firestore()
			.collection("workspace")
			.doc(spaceID)
			.collection("project")
			.doc(id)
			.collection("task")
			.doc(stpID)
			.get()
			.then((doc) => {
				setTskD(doc.data());
			});
	};
	const mapStepData = async () => {
		await app
			.firestore()
			.collection("workspace")
			.doc(spaceID)
			.collection("project")
			.doc(id)
			.collection("task")
			.doc(stpID)
			.collection("mysteps")
			.onSnapshot((snap) => {
				const item = [];
				snap.forEach((doc) => {
					item.push({ ...doc.data(), id: doc.id });
				});
				setStepData(item);
			});
	};

	React.useEffect(() => {
		mapTaskData();
		console.log(taskData);
		console.log("na mefghjggjh", stepData);
		mapStepData();
		mapmainData();
		console.log("fgtjiiurhu", stepData.length);
		// getStepsPecents();
	}, [id, stpID]);

	return (
		// <Container>
		// 	{taskData?.map((props) => (
		// 		<Card key={props.id}>
		// 			<Title>{props.title}</Title>
		// 			{props.userID === currentUser.uid ? (
		// 				<div>
		// 					<NavLink to={`/exploreTask/${id}/steps/${props.id}`}>
		// 						<div>Create Steps</div>
		// 					</NavLink>
		// 				</div>
		// 			) : null}
		// 		</Card>
		// 	))}
		// </Container>
		<Container>
			<HeaderHold>
				<IconHold>
					<IoMdBriefcase />
					<span>project Name</span>
				</IconHold>
				<MainButHold>
					<ButtonHold>Chat Room</ButtonHold>
					<ButtonHold>Project Overview</ButtonHold>
				</MainButHold>
			</HeaderHold>
			<ContentBox>
				<TodoBox>
					<MainHead bg='#377dff'>
						{" "}
						<IoMdBriefcase />
						<span>Todo</span>
					</MainHead>
					<CardHold>
						{taskData?.map((props) => (
							<Card>
								<TitleHold>
									<span>set up the redux state</span>
									<PriorHold>high</PriorHold>
								</TitleHold>
								<p>
									The Richfield Studios 2.5” Cordless Faux Wood Blinds feature.
								</p>
								<ImageAndButtonHold>
									<UserAvatar />
									<div>
										{props.userID === currentUser.uid ? (
											<NavLink
												style={{ textDecoration: "none" }}
												to={`/exploreTask/${id}/steps/${props.id}`}>
												<StartButton
													onClick={() => {
														dispatch(ViewProjectID(id));
													}}>
													Start
												</StartButton>
											</NavLink>
										) : (
											<NavLink
												style={{ textDecoration: "none" }}
												to={`/progress/${props.id}`}>
												<StartButton>View Progress</StartButton>
											</NavLink>
										)}
									</div>
								</ImageAndButtonHold>
							</Card>
						))}
					</CardHold>
				</TodoBox>
				<ProgressBox>
					{" "}
					<MainHead bg='#7a5af2'>
						{" "}
						<RiTruckFill />
						<span>In Progress</span>
					</MainHead>
					{stepData ? (
						<CardHold>
							{taskData?.map((props) => (
								<Card>
									<TitleHold>
										<span>{props.title}</span>
										<PriorHold>high</PriorHold>
									</TitleHold>
									<p>
										The Richfield Studios 2.5” Cordless Faux Wood Blinds
										feature.
									</p>
									<ImageAndButtonHold>
										<UserAvatar />
										<div>{stepData.length}</div>
									</ImageAndButtonHold>
								</Card>
							))}
						</CardHold>
					) : (
						<div>no progress yet</div>
					)}
				</ProgressBox>
				<ReviewBox>
					{" "}
					<MainHead bg='#ff6600'>
						{" "}
						<MdRateReview />
						<span>Review</span>
					</MainHead>
				</ReviewBox>
				<CompleteBox>
					{" "}
					<MainHead bg='#14df44'>
						{" "}
						<AiFillStar />
						<span>Completed</span>
					</MainHead>
				</CompleteBox>
			</ContentBox>
		</Container>
	);
};

export default ExploreTask;

const Rating = styled.div`
	width: 100px;
`;

const ImageAndButtonHold = styled.div`
	margin: 10px;
	display: flex;
	justify-content: space-between;
	align-items: center;
`;
const UserAvatar = styled.div`
	height: 40px;
	width: 40px;
	border-radius: 50%;
	background-color: silver;
`;
const StartButton = styled.button`
	height: 40px;
	width: 120px;
	background-color: #0f9d58;
	border-radius: 5px;
	display: flex;
	justify-content: center;
	align-items: center;
	color: white;
	font-size: 17px;
	font-weight: bold;
	cursor: pointer;
	border: none;
`;

const TitleHold = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin: 5px;

	span {
		font-weight: bold;
	}
`;
const PriorHold = styled.div`
	height: 30px;
	width: 80px;
	background-color: #ffd700;
	display: flex;
	justify-content: center;
	align-items: center;
	color: white;
	font-weight: bold;
	border-radius: 20px;
`;

const Card = styled.div`
	width: 350px;
	background: white;
	box-shadow: 0px 5px 7px 0px rgba(0, 0, 0, 0.35);
	min-height: 150px;
	display: flex;
	flex-direction: column;
	border-radius: 5px;
	margin: 10px;
	p {
		font-size: 13px;
		margin: 10px;
	}
`;

const CardHold = styled.div`
	margin: 5px;
	margin-top: 20px;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
`;

const MainHead = styled.div`
	padding: 10px;
	font-size: 20px;
	display: flex;
	background: ${({ bg }) => bg};
	align-items: center;
	color: white;
	font-weight: bold;
	height: 40px;

	span {
		margin-left: 10px;
	}
`;

const TodoBox = styled.div`
	width: 400px;

	border: 1px solid silver;
`;
const ProgressBox = styled.div`
	width: 400px;

	border: 1px solid silver;
`;
const ReviewBox = styled.div`
	width: 400px;

	border: 1px solid silver;
`;
const CompleteBox = styled.div`
	width: 400px;

	border: 1px solid silver;
`;

const ContentBox = styled.div`
	/* background: red; */
	min-height: 80vh;
	width: 95%;

	display: flex;
	margin-top: 20px;
`;

const MainButHold = styled.div`
	display: flex;
`;

const ButtonHold = styled.div`
	width: 170px;
	height: 45px;
	display: flex;
	justify-content: center;
	align-items: center;
	background: #eaf1fb;
	color: black;
	border-radius: 5px;
	font-weight: bold;
	text-decoration: none;
	cursor: pointer;

	margin-right: 100px;
`;

const IconHold = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 20px;
	font-weight: bold;

	span {
		margin-left: 10px;
	}
`;

const Container = styled.div`
	display: flex;
	margin-top: 20px;
	flex-direction: column;
`;
const HeaderHold = styled.div`
	/* background-color: red; */
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
`;
