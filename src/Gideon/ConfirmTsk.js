import React from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { app } from "../Base";
import { ViewTaskID } from "../Global/ReduxState";

const ConfirmTsk = () => {
	const { id } = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	return (
		<Container>
			<Card>
				<h4>Are you sure you want to check progress?</h4>
				<ButtonHold>
					<button
						onClick={() => {
							navigate(-1);
							dispatch(ViewTaskID(id));
						}}
						bg='green'>
						Yes
					</button>
					<button
						bg='red'
						onClick={() => {
							navigate(-1);
						}}>
						No
					</button>
				</ButtonHold>
			</Card>
		</Container>
	);
};

export default ConfirmTsk;

const ButtonHold = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;

	width: 300px;

	button {
		height: 40px;
		width: 120px;
		cursor: pointer;
		background-color: ${({ bg }) => bg};
	}
`;

const Container = styled.div`
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	background-color: rgba(0, 0, 0, 0.7);
	height: 100vh;
	position: absolute;
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const Card = styled.div`
	height: 200px;
	width: 350px;
	background-color: white;
	border-radius: 5px;
	display: flex;
	align-items: center;
	flex-direction: column;

	z-index: 1;

	h4 {
		margin-top: 50px;
	}
`;
