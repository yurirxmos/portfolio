import React from "react";
import "./Navbar.css";
import Moon from "../../assets/imgs/moon.svg";
import us from "../../assets/imgs/us.svg";
import home from "../../assets/imgs/home.svg";
import job from "../../assets/imgs/bag.svg";
import github from "../../assets/imgs/github.svg";
import repos from "../../assets/imgs/repos.svg";
import contact from "../../assets/imgs/contact.svg";

const Navbar = () => {
  return (
    <nav className="navbar">
      <a className="brand">
        <img src={github} />
        yurirxmos dev.
      </a>

      <div className="nav-links">

        <a href="/">
          <img src={home} />
          início
        </a>

        <a href="#home-experience">
          <img src={job} />
          experiência
        </a>

        <a href="#home-repos">
          <img src={repos} />
          repositórios
        </a>
        <a href="#home-contact">
        <img src={contact} />
          contato
          </a>
      </div>

      <div className="nav-buttons">
        <a href="#">
          <img src={us} />
          eng version
        </a>
        |
        <a href="#">
          <img src={Moon} />
          dark mode
        </a>
      </div>
    </nav>
  );
};

export default Navbar;