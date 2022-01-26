import React, { useContext } from "react";
import styled from "styled-components";
import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import { ImCancelCircle } from "react-icons/im";
import { SiTodoist } from "react-icons/si";
import { FaUserCircle } from "react-icons/fa";
import { MdTaskAlt } from "react-icons/md";
import { MdAddBox } from "react-icons/md";
import FormControl from "@mui/material/FormControl";
import { Checkbox } from "@mui/material";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import { FormControlLabel } from "@mui/material";
import { app } from "../Base";
import { AuthContext } from "../Global/AuthContext";
import firebase from "firebase";
import { useDispatch, useSelector } from "react-redux";
import ConfirmModal from "./ConfirmModal";
import { ViewTaskID } from "../Global/ReduxState";
const TaskOverview = () => {
	const { currentUser } = useContext(AuthContext);
	const [checked, setChecked] = React.useState(false);
	const [progress, setProgress] = React.useState(0);
	const [total, setTotal] = React.useState(0);
	const [steps, setSteps] = React.useState("");
	const [project, setProject] = React.useState([]);
	const [singleData, setSingleData] = React.useState([]);
	const [taskItem, setTaskItem] = React.useState([]);

	const [togCheck, setTogCheck] = React.useState(false);

	const handtogCheck = () => {
		setTogCheck(!togCheck);
	};
	const { id } = useParams();
	const dispatch = useDispatch();

	const spaceID = useSelector((state) => state.persistedReducer.sideBarID);
	const proID = useSelector((state) => state.persistedReducer.ProjectID);

	const navigate = useNavigate();

	const handleChanges = (event) => {
		setChecked(event.target.checked);
	};

	const CreateTaskSteps = async () => {
		await app
			.firestore()
			.collection("workspace")
			.doc(spaceID)
			.collection("project")
			.doc(proID)
			.collection("task")
			.doc(id)
			.collection("mysteps")
			.doc()
			.set({
				steps,
				confirm: false,
				createdBy: currentUser?.uid,
				createdAt: firebase.firestore.FieldValue.serverTimestamp(),
			});
		setSteps("");
	};

	const viewSingleData = async () => {
		await app
			.firestore()
			.collection("workspace")
			.doc(spaceID)
			.collection("project")
			.doc(proID)
			.get()
			.then((doc) => {
				setSingleData(doc.data());
			});
	};
	const viewTaskItems = async () => {
		await app
			.firestore()
			.collection("workspace")
			.doc(spaceID)
			.collection("project")
			.doc(proID)
			.collection("task")
			.doc(id)
			.get()
			.then((doc) => {
				setTaskItem(doc.data());
			});
	};
	const viewWrokStation = async () => {
		await app
			.firestore()
			.collection("workspace")
			.doc(spaceID)
			.collection("project")
			.doc(proID)
			.collection("task")
			.doc(id)
			.collection("mysteps")
			.onSnapshot((snapshot) => {
				const r = [];
				snapshot.forEach((doc) => {
					r.push({ ...doc.data(), id: doc.id });
				});
				setProject(r);
			});
	};

	const getDone = () => {
		let checked = project.filter((el) => el.confirm === true).length;
		setProgress(checked);
		setTotal(project.length);
	};

	React.useEffect(() => {
		viewWrokStation();
		getDone();
		viewSingleData();
		viewTaskItems();
		console.log(singleData);
	}, [id]);

	return (
		<Container>
			<Card>
				<HeaderPart>
					<Title>{singleData.ProjectName}</Title>
					<CancelHold>
						<ImCancelCircle
							onClick={() => {
								navigate(-1);
							}}
						/>
					</CancelHold>
				</HeaderPart>
				<BoxHold>
					<Box1>
						<TitleHold>{taskItem.title}</TitleHold>
						<ContentHold>
							{project?.map((props) => (
								<Div key={props.id}>
									<br />

									{props.confirm ? (
										<Boxs type='checkbox' checked />
									) : (
										<Link to={`/questionstep/${props.id}`}>
											{" "}
											<Boxs
												onClick={() => {
													dispatch(ViewTaskID(id));
													handtogCheck();
												}}
												type='checkbox'
											/>
										</Link>
									)}
									<Text>{props.steps} </Text>
								</Div>
							))}
							<AddHolder>
								<span>
									<MdAddBox onClick={CreateTaskSteps} />
								</span>
								<input
									onChange={(e) => {
										setSteps(e.target.value);
									}}
									placeholder='Set your progerss /  milestones'
								/>
							</AddHolder>
						</ContentHold>
						{project ? (
							<But>
								<ButtonHold bg='#0F9D58'>
									{" "}
									<span style={{ marginTop: "5px", marginRight: "10px" }}>
										<MdTaskAlt />
									</span>
									Add to Progress
								</ButtonHold>
							</But>
						) : null}
					</Box1>

					<Box2>
						<TwoHold>
							<Holding>
								<FirstHold>status:</FirstHold>
								<FirstHold>AssignedTo:</FirstHold>
								<FirstHold>Priority:</FirstHold>
								<FirstHold>Progress:</FirstHold>
								<FirstHold>Deadline:</FirstHold>
								<FirstHold>Start/End:</FirstHold>
								<FirstHold>Description:</FirstHold>
							</Holding>
							<Holder>
								<SecondHold>
									{" "}
									<ButtonHold3 bg='#377dff'>
										{" "}
										<span
											style={{
												marginRight: "20px",
												fontSize: "20px",
												marginTop: "5px",
											}}>
											<SiTodoist />
										</span>
										Todo
									</ButtonHold3>
									<SecondText>
										<span>
											<FaUserCircle />
										</span>{" "}
										<span style={{ marginLeft: "10px" }}>
											{" "}
											GideonEkeke@gmail.com
										</span>
									</SecondText>
									<SecondText>
										<Prior></Prior>
										<span style={{ marginLeft: "10px" }}>
											{" "}
											{singleData.priority}
										</span>
									</SecondText>
									<SecondText>
										<div>
											{
												<Rating
													onClick={() => {
														const checked = project.filter(
															(el) => el.confirm === true,
														).length;
														const totalRate = project.length;
														console.log((checked / totalRate) * 100);
													}}>
													<LinearProgress
														variant='determinate'
														value={
															(project.filter((el) => el.confirm === true)
																.length /
																project.length) *
															100
														}
													/>
													{Math.ceil(
														(project.filter((el) => el.confirm === true)
															.length /
															project.length) *
															100,
													)}
													%
												</Rating>
											}
										</div>
									</SecondText>
									<SecondText>Dec 04, 2021</SecondText>
									<SecondText>Nov 23 - Nov 27</SecondText>
									<SecondText>{taskItem.description}</SecondText>
								</SecondHold>
							</Holder>
						</TwoHold>
					</Box2>
				</BoxHold>
			</Card>
		</Container>
	);
};

export default TaskOverview;

const Rating = styled.div`
	width: 200px;
`;

const Text = styled.div`
	font-size: ${({ fs }) => (fs ? "30px" : "15px")};
	min-width: 300px;
	/* text-align: center; */
	span {
		text-transform: capitalize;
		font-weight: bold;
	}
`;

const Boxs = styled.input`
	width: 20px;
	height: 20px;
	margin-right: 5px;
`;
const Div = styled.div`
	display: flex;
	align-items: center;
	margin: 10px;
`;

const TitleHold = styled.div`
	margin: 10px;
	font-weight: bold;
	border-bottom: 1px solid silver;
`;

const CheckBoxHolder = styled.div`
	margin: 10px;
	padding-bottom: 20px;
`;

const But = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;

	width: 500px;
`;

const ContentHold = styled.div`
	flex: 1;

	width: 100%;

	height: 350px;
	overflow-y: scroll;
`;

const AddHolder = styled.div`
	display: flex;
	margin: 10px; /* align-items: center; */ /* justify-content: center; */
	span {
		font-size: 20px;

		color: #377dff;
		cursor: pointer;
		padding: 0px 10px;
		border-radius: 5px;
		display: flex;
		justify-content: center;
		align-items: center;

		:hover {
			background-color: rgba(225, 225, 225, 0.9);
		}
	}

	input {
		height: 20px;
		margin-left: 10px;
		width: 400px;
	}
`;
const Prior = styled.div`
	height: 10px;
	width: 10px;
	border-radius: 50%;
	background-color: #ffd700;
`;

const Holder = styled.div``;
const SecondText = styled.div`
	margin-top: 20px;
	font-size: 14px;
	display: flex;
	align-items: center;
`;
const Holding = styled.div``;

const ButtonHold1 = styled.button`
	width: 100px;
	height: 30px;
	display: flex;
	justify-content: center;
	align-items: center;
	background: ${({ bg }) => bg};
	color: white;
	border-radius: 5px;
	font-weight: bold;
	font-size: 12px;
	border: none;
	outline: none;
	/* margin: 10px; */

	margin: 10px;
	margin-top: 30px;

	cursor: pointer;
`;
const ButtonHold = styled.div`
	width: 200px;
	height: 50px;
	display: flex;
	justify-content: center;
	align-items: center;
	background: ${({ bg }) => bg};
	color: white;
	border-radius: 5px;
	font-weight: bold;
	font-size: 15px;
	/* margin: 10px; */
	margin-top: 10px;

	cursor: pointer;
`;
const ButtonHold3 = styled.div`
	width: 170px;
	height: 40px;
	display: flex;
	justify-content: center;
	align-items: center;
	background: ${({ bg }) => bg};
	color: white;
	border-radius: 5px;
	font-weight: bold;
	font-size: 12px;
	/* margin: 10px; */
	margin-top: 10px;

	cursor: pointer;
`;

const TwoHold = styled.div`
	display: flex;
	width: 300px;
	margin: 10px;
	/* align-items: center; */
`;
const FirstHold = styled.div`
	margin: 10px;
	margin-top: 20px;
	color: gray;
`;
const SecondHold = styled.div`
	margin: 10px;
	margin-left: 50px;
`;

const BoxHold = styled.div`
	display: flex;
	width: 100%;
	justify-content: space-between;
`;
const Box1 = styled.div`
	flex: 1;
`;
const Box2 = styled.div`
	width: 540px;
	background-color: #eaf1fb;
	height: 500px;
	border-bottom-right-radius: 10px;
	border: 1px solid silver;
`;

const CancelHold = styled.div`
	margin-right: 40px;
	font-size: 20px;
	cursor: pointer;
`;
const Title = styled.div`
	margin-left: 10px;
	color: gray;
	font-weight: bold;
`;

const HeaderPart = styled.div`
	height: 50px;
	background: #eaf1fb;
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	border-top-right-radius: 10px;
	border-top-left-radius: 10px;
`;

const Container = styled.div`
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	background-color: rgba(0, 0, 0, 0.5);
	height: 100vh;
	position: absolute;
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	backdrop-filter: blur(2px);
`;

const Card = styled.div`
	height: 540px;
	width: 900px;
	background-color: white;
	border-radius: 5px;
	display: flex;
	align-items: center;
	flex-direction: column;
`;

// TaskOverview;
