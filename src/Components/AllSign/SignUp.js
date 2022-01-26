import React from "react";
import styled from "styled-components";
import { IoLogoGoogle } from "react-icons/io";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { NavLink, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { FaGithub } from "react-icons/fa";
import avatar from "./avatar.png";
import { app } from "../../base";
import SignupPage from "./SignupPage";
import firebase from "firebase"
import imgee from "./10.png";


const mySchema = yup.object().shape({
  name: yup.string().required("userName is required"),
  email: yup.string().email().required(),
  password: yup.string().required().min(6),
  confirmpassword: yup.string().oneOf([yup.ref("password"), null]),
});

const SignUp = () => {
  const [displayImg, setDisplayImg] = React.useState(null)
  const [avatar, setAvatar] = React.useState(null)
  const [percent, setPercent] = React.useState(0.00001);
  const Navigate = useNavigate()

  const imageUpload = async (e)=>{
    const file = e.target.files[0]
    const save = URL.createObjectURL(file)
    setDisplayImg(save)

    const fileRef = await app.storage().ref();
    const storeRef = fileRef.child("simpleAvatar/" + file.name).put(file);

    storeRef.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      (snapShot)=>{
        const counter = (snapShot.bytesTransferred / snapShot.totalBytes) * 100
        setPercent(counter)
        console.log(counter)
      },
      (err) => console.log(err.message),
      ()=>{
        storeRef.snapshot.ref.getDownloadURL().then((URL)=>{
          setAvatar(URL)
          console.log(URL)
        })
      }
    )



  }

  const { register,handleSubmit, formState: { errors }, } = useForm({
    resolver: yupResolver(mySchema),
  });
  const submitUser = async (value) => {
    console.log(value);
    const { email, password, name } = value;
    const userID = await app
      .auth()
      .createUserWithEmailAndPassword(email, password);

    if (userID) {
      await app.firestore().collection("usersSimple").doc(userID.user.uid).set({
        avatar,
        email,
        password,
        name,
        createdBy: userID.user.uid
      });
        Navigate("/onboard")
    }
  };
  // const [image, setImage] = React.useState(avatar);
  // const imageUpload = (e) => {
  //   const file = e.target.files[0];
  //   const fileURL = URL.createObjectURL(file);
  //   setImage(fileURL);
  // };
  const [toggle, setToggle] = React.useState(false);

  const onToggle = () => {
    setToggle(!toggle);
  };
  return (
    <Container>
      <Right>
        <Holder>
          <Image src={imgee} />
          <Head to="/signup">Sign up</Head>
          <Alt>
            Already have an account?{" "}
            <NavLink to="/signin" style={{ textDecoration: "none" }}>
              <span>Sign in</span>
            </NavLink>
          </Alt>
          <form onSubmit={handleSubmit(submitUser)}>
            <Inputs>
              <Inputer>
                <span>Image upload</span>

                <Forinput
                  placeholder="upload image"
                  type="file"
                  id="picture"
                  onChange={imageUpload}
                />
                <ImageInput>
                  <ImageUpload src={displayImg} />
                </ImageInput>
                <Div>
                  <ImageButton htmlFor="picture">Click to upload</ImageButton>
                </Div>
              </Inputer>
              <Inputer>
                <span>
                  Name:
                  <span style={{ color: "red" }}> {errors.name?.message}</span>
                </span>
                <Input {...register("name")} />
              </Inputer>
              <Inputer>
                <span>
                  Email:
                  <span style={{ color: "red" }}> {errors.email?.message}</span>
                </span>
                <Input {...register("email")} />
              </Inputer>
              <Inputer>
                <span>
                  Password:{" "}
                  <span style={{ color: "red" }}>
                    {" "}
                    {errors.password?.message}
                  </span>
                </span>
                <Input {...register("password")} type="password" />
              </Inputer>
              <Inputer>
                <span>
                  Confirm Password :
                  <span style={{ color: "red" }}>
                    {errors.confirmpassword && "password did not match"}
                  </span>
                </span>
                {toggle ? (
                  <PassHolder>
                    <PasswordInput
                      {...register("confirmpassword")}
                      type="text"
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
                      {...register("confirmpassword")}
                      type="password"
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
                {/* <Input {...register("confirmpassword")} /> */}
              </Inputer>
            </Inputs>
            <ButtonHolder type="submit">sign up</ButtonHolder>
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
              }}
            >
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
              }}
            >
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

export default SignUp;

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

const Inputer = styled.div`
  display: flex;
  margin-top: 20px;
  flex-direction: column;
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

const ImageInput = styled.div`
  width: 350px;
  height: 250px;
  /* background: #e1e1e1; */
  margin-top: 5px;
  border: 1px dashed rgba(0, 0, 0, 0.5);
  border-radius: 20px;
  /* padding-left: 10px;
  padding-top: 10px;
  padding-bottom: 10px; */
  @media screen and (max-width: 768px) {
    width: 290px;
  }
`;

const ImageUpload = styled.img`
  width: 350px;
  height: 250px;
  object-fit: cover;
  border-radius: 20px;
  @media screen and (max-width: 768px) {
    width: 290px;
  }
`;

const ButtonHolder = styled.button`
  width: 363px;
  height: 45px;
  display: flex;
  border: none;
  justify-content: center;
  background: #1c253c;
  align-items: center;
  outline: none;
  color: white;
  margin-top: 50px;
  border-radius: 50px;
  cursor: pointer;
  opacity: 1;
  transition: 250ms;
  :hover {
    opacity: 0.9;
  }
  @media screen and (max-width: 768px) {
    width: 290px;
  }
`;
const ImageButton = styled.label`
  width: 200px;
  height: 45px;
  display: flex;
  justify-content: center;
  background: #1c253c;
  align-items: center;
  color: white;
  margin-top: 10px;
  margin-bottom: 10px;
  border-radius: 50px;
  cursor: pointer;
  opacity: 1;
  transition: 250ms;
  :hover {
    opacity: 0.9;
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

const Div = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
`;

// const Holder = styled.div``
const Forinput = styled.input`
  display: none;
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
