import React from "react";
import "./Navbar.css";
import Moon from "../../assets/imgs/moon.svg";
import us from "../../assets/imgs/us.svg";
import home from "../../assets/imgs/home.svg";
import job from "../../assets/imgs/bag.svg";
import projects from "../../assets/imgs/project.svg";
import repos from "../../assets/imgs/repos.svg";
import contact from "../../assets/imgs/contact.svg";
import cv from "../../assets/imgs/download.svg";

const Navbar = () => {
  return (
    <nav className="navbar">

      <div className="nav-links">

        <a href="/">
          <img src={home} />
          <span>início</span>
        </a>

        <a href="#home-experience">
          <img src={job} />
          <span>experiência</span>
        </a>

        <a href="#home-project">
          <img src={projects} />
          <span>projetos</span>
        </a>

        <a href="#home-repos">
          <img src={repos} />
          <span>repositórios</span>
        </a>

        <a href="#home-contact">
          <img src={contact} />
          <span>contato</span>
        </a>

        <a href="#home-cv">
          <img src={cv} />
          <span>download cv</span>
        </a>
      </div>

      {/*
      <div className="nav-buttons">
        <a href="#">
          US VERSION
          <img src={us} />
        </a>
      </div>
      */}
    </nav>
  );
};

export default Navbar;