import React from "react";
import styled from "styled-components";
import {NavLink} from "react-router-dom"

const GlobalButtton = ({ children }) => {
  return <Container to="/signup">{children}</Container>;
};

export default GlobalButtton;

const Container = styled(NavLink)`
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
`;
