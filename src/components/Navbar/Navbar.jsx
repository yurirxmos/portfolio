import React from "react";
import { saveAs } from "file-saver";
import "./Navbar.css";
import home from "../../assets/imgs/home.svg";
import job from "../../assets/imgs/bag.svg";
import projects from "../../assets/imgs/project.svg";
import repos from "../../assets/imgs/repos.svg";
import contact from "../../assets/imgs/contact.svg";
import cv from "../../assets/imgs/download.svg";
import moon from "../../assets/imgs/moon.svg";

const Navbar = () => {

  const handleDownloadCV = () => {
    const arquivoUrl = 'src/assets/pdf/cv.pdf';
    saveAs(arquivoUrl, 'cv_yuriramos.pdf');
  };

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

        <a href="#" onClick={handleDownloadCV} download="cv_yuriramos.pdf">
          <img src={cv} />
          <span>download cv</span>
        </a>
        
      </div>
    </nav>
  );
};

export default Navbar;