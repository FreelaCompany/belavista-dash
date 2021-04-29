import React, { useState, useEffect } from "react";
import {
  AiOutlineUser,
  AiOutlinePlus,
  AiOutlineCheckCircle,
} from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";

import { PageContainer, WhiteBox } from "../../styles/components";

import {
  Container,
  Avatar,
  Name,
  Quantity,
  Button,
  CodReserva,
  Confirma,
} from "./styles";

import Sidebar from "../../components/Sidebar";

export default function Dashboard() {
  const { data } = useSelector((state) => state.auth);

  return (
    <PageContainer>
      <Sidebar />
      <Container></Container>
    </PageContainer>
  );
}
