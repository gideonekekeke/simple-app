import React from "react";
import styled from "styled-components";
import { IoLogoGoogle } from "react-icons/io";
import { FaGithub } from "react-icons/fa";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import SignupPage from "./SignupPage";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { NavLink, useNavigate } from "react-router-dom";
import * as yup from "yup";
import imagee from "./10.png";
import { app } from "../../Base";

const mySchema = yup.object().shape({
	email: yup.string().email().required(),
	password: yup.string().required().min(6),
});
const SignIn = () => {
	const Navigate = useNavigate();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(mySchema),
	});
	const submitUser = async (value) => {
		console.log(value);
		const { email, password } = value;
		const newUser = await app
			.auth()
			.signInWithEmailAndPassword(email, password);

		if (newUser) {
			Navigate("/");
		}
	};

	const [toggle, setToggle] = React.useState(false);

	const onToggle = () => {
		setToggle(!toggle);
	};

	return (
		<Container>
			<Right>
				<Holder>
					<Image src={imagee} />
					<Head to='/signin'>Sign in</Head>
					<Alt>
						Don't have an account?{" "}
						<NavLink to='/signup' style={{ textDecoration: "none" }}>
							<span>Sign up</span>
						</NavLink>
					</Alt>
					<form onSubmit={handleSubmit(submitUser)}>
						<Inputs>
							<Inputer>
								<span>
									Email:
									<span style={{ color: "red" }}>
										{" "}
										{errors.email?.message}
									</span>{" "}
								</span>
								<Input placeholder='example@gmail.com' {...register("email")} />
							</Inputer>
							<Inputer>
								<span>
									Password:{" "}
									<span style={{ color: "red" }}>
										{errors.password?.message}
									</span>
								</span>
								{toggle ? (
									<PassHolder>
										<PasswordInput
											placeholder='*************'
											{...register("password")}
											type='text'
										/>
										<AiFillEyeInvisible
											style={{
												fontSize: "20px",
												opacity: "0.7",
												cursor: "pointer",
											}}
											onClick={onToggle}
										/>
									</PassHolder>
								) : (
									<PassHolder>
										<PasswordInput
											placeholder='*************'
											{...register("password")}
											type='password'
										/>
										<AiFillEye
											style={{
												fontSize: "20px",
												opacity: "0.7",
												cursor: "pointer",
											}}
											onClick={onToggle}
										/>
									</PassHolder>
								)}
							</Inputer>
						</Inputs>
						<ButtonHolder type='submit' placeholder='Sign in' />
					</form>
					<Span>
						<span>Or continue with</span>
						<Line />
					</Span>
					<Provider>
						<Hold
							style={{
								border: "1px solid gray",
								backgroundColor: "gray",
								cursor: "pointer",
							}}>
							<IoLogoGoogle
								style={{
									color: "white",
									cursor: "pointer",
								}}
							/>
						</Hold>

						<Hold
							style={{
								border: "1px solid gray",
								backgroundColor: "gray",
								cursor: "pointer",
							}}>
							<FaGithub
								style={{
									color: "white",
									cursor: "pointer",
								}}
							/>
						</Hold>
					</Provider>
				</Holder>
			</Right>
			<Left>
				<SignupPage />
			</Left>
		</Container>
	);
};

export default SignIn;

const Container = styled.div`
	width: 100%;
	min-height: 100vh;
	background: #1c253c;
	height: 100%;
	display: flex;
`;

const Right = styled.div`
	width: 50%;
	min-height: 100vh;
	height: 100%;
	background: white;
	display: flex;
	justify-content: center;
	padding-bottom: 20px;

	@media screen and (max-width: 768px) {
		width: 100%;
	}
`;

const Holder = styled.div`
	/* background: green; */
	width: auto;
	/* width: 70%; */
	height: auto;
	padding-top: 20px;
	@media screen and (max-width: 768px) {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
`;

const Image = styled.img`
	height: 50px;
`;

const Head = styled(NavLink)`
	margin-top: 15px;
	font-size: 35px;
	font-weight: bold;
	color: rgba(0, 0, 0, 0.6);
	text-decoration: none;
`;

const Alt = styled.div`
	color: rgba(0, 0, 0, 0.6);
	font-weight: 500;
	font-size: 16px;
	margin-top: 5px;
	span {
		color: #377dff;
		cursor: pointer;
	}
`;

const Inputs = styled.div`
	margin-top: 10px;
	@media screen and (max-width: 768px) {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
`;

const PassHolder = styled.div`
	display: flex;
	align-items: center;
	border: 1px solid rgba(0, 0, 0, 0.2);
	margin-top: 5px;
	height: 45px;
	border-radius: 5px;
	@media screen and (max-width: 768px) {
		width: 300px;
	}
`;

const Inputer = styled.div`
	display: flex;
	margin-top: 20px;
	flex-direction: column;
	width: 365px;
	@media screen and (max-width: 768px) {
		width: 100%;
	}

	span {
		font-size: 13px;
		color: rgba(0, 0, 0, 0.6);
		font-weight: 500;
	}
`;

const Input = styled.input`
	width: 350px;
	height: 45px;
	border-radius: 5px;
	border: 1px solid rgba(0, 0, 0, 0.2);
	margin-top: 5px;
	background: transparent;
	padding-left: 10px;
	outline: none;
	@media screen and (max-width: 768px) {
		width: 290px;
	}
`;
const PasswordInput = styled.input`
	width: 320px;
	height: 45px;
	border-radius: 5px;
	border: none;
	margin-top: 5px;
	background: transparent;
	padding-left: 10px;
	outline: none;
	@media screen and (max-width: 768px) {
		width: 250px;
	}
`;

const ButtonHolder = styled.input`
	width: 363px;
	height: 45px;
	display: flex;
	border: none;
	justify-content: center;
	background: #1c253c;
	align-items: center;
	color: white;
	margin-top: 50px;
	border-radius: 50px;
	cursor: pointer;
	opacity: 1;
	transition: 250ms;
	outline: none;
	:hover {
		opacity: 0.9;
	}
	@media screen and (max-width: 768px) {
		width: 290px;
	}
`;

const Span = styled.div`
	width: 100%;
	height: 30px;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-top: 20px;
	position: relative;

	span {
		position: absolute;
		background: white;
		color: rgba(0, 0, 0, 0.5);
		top: 2px;
		padding-left: 5px;
		padding-right: 5px;
	}
`;

const Line = styled.div`
	height: 1px;
	background: rgba(0, 0, 0, 0.5);
	width: 100%;
`;

const Provider = styled.div`
	width: 100%;
	height: 40px;
	display: flex;
	justify-content: space-around;
	margin-top: 10px;
`;

const Hold = styled.div`
	width: 80px;
	height: 100%;
	/* background: lavender; */
	border-radius: 50px;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 20px;
	color: rgba(0, 0, 0, 0.6);
	/* border: 1px solid rgba(0, 0, 0, 0.5); */
`;

const Left = styled.div`
	@media screen and (max-width: 768px) {
		display: none;
	}
`;

// const Holder = styled.div``
