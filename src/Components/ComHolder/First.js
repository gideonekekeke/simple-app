import React from "react";
import styled from "styled-components";
import GlobalButtton from "../GlobalButtton";
import {NavLink} from "react-router-dom"

const First = () => {
  return (
    <Container>
      <Left>
        <Title>
          One App To Oversee
          <br /> <b>Your Workflow</b>
        </Title>
        <Sub>
          Collaborate, manage projects, and reach new productivity peaks. From
          high rises to the home office, the way your team works is
          unique—accomplish it all with Develop.
        </Sub>
        <Buttons>
          <GlobalButtton >Sign Up</GlobalButtton>
          <GlobalButtton1 to ="/signin">Login</GlobalButtton1>
        </Buttons>
      </Left>
      <Image src="/images/Group 8.png" />
    </Container>
  );
};

export default First;

const GlobalButtton1 = styled(NavLink)`
  background: #377dff;
  color: white;
  border-radius: 5px;
  font-weight: 500;
  transition: all 350ms;
  cursor: pointer;
  width: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration:none;
  height: 35px;
  :hover {
    opacity: 0.9;
  }

`

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  min-height: 70vh;
  height: 100%;
  z-index: 1;
  margin-bottom: 20px;
  margin-top: 50px;
`;

const Left = styled.div`
  width: 600px;

  @media screen and (max-width: 1000px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    margin: 30px 0px;
    margin-bottom: 20px;
  }
`;

const Title = styled.div`
  font-size: 40px;
  font-weight: 400;
  line-height: 1;

  b {
    font-size: 60px;
  }
  @media screen and (max-width: 768px) {
    font-size: 20px;
    line-height: 1.2;
    b {
      font-size: 30px;
    }
  }
`;

const Sub = styled.div`
  line-height: 1.7;
  margin-top: 20px;
  max-width: 95%;
  font-size: 17px;
  line-height: 1.4;
`;

const Buttons = styled.div`
  display: flex;
  margin-top: 30px;
  width: 270px;
  justify-content: space-between;
`;

const Image = styled.img`
  height: 500px;
  @media screen and (max-width: 768px) {
    width: 80%;
    height: unset;
  }
`;
