import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Navigation } from "react-minimal-side-navigation";

import "react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css";

import {
  AiFillTags,
  AiFillFileImage,
  AiOutlineIdcard,
  AiFillMail,
  AiFillPicture,
} from "react-icons/ai";

import LogoNova from "../../assets/images/logo-nova.png";

import { Container } from "./styles";

import Header from "../Header";

export default function Sidebar() {
  let history = useHistory();
  let location = useLocation();

  return (
    <Container>
      <img src={LogoNova} alçt="logo" alt="" />
      <Header />
      <Navigation
        // you can use your own router's api to get pathname
        activeItemId={location.pathname}
        onSelect={({ itemId }) => {
          history.push(itemId);
        }}
        items={[
          {
            title: "Produtos",
            itemId: "/produtos",
            elemBefore: () => <AiFillTags />,
          },
          {
            title: "Banner",
            itemId: "/banner",
            elemBefore: () => <AiFillFileImage />,
          },
          {
            title: "Arquitetos",
            itemId: "/arquitetos",
            elemBefore: () => <AiOutlineIdcard />,
          },
          {
            title: "Contatos",
            itemId: "/contatos",
            elemBefore: () => <AiFillMail />,
          },
          {
            title: "Ambientes",
            itemId: "/ambientes",
            elemBefore: () => <AiFillPicture />,
          },
        ]}
      />
    </Container>
  );
}
