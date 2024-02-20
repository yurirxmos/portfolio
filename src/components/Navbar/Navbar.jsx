import React from "react";
import { saveAs } from "file-saver";
import "./Navbar.css";
import home from "../../assets/imgs/home.svg";
import job from "../../assets/imgs/bag.svg";
import projects from "../../assets/imgs/project.svg";
import repos from "../../assets/imgs/repos.svg";
import contact from "../../assets/imgs/contact.svg";
import cv from "../../assets/imgs/download.svg";

const Navbar = () => {

  const handleDownloadCV = () => {
    const arquivoUrl = 'https://uce0c25e07c6ba74c4bb3b992df9.dl.dropboxusercontent.com/cd/0/get/CNoimYSSRoYA9KLjoL4iW1CC5l21HxCG1MxJSK0XAtgMkSEtQxEtr8I-5ShYgla-z2ch6mtRMLdVRVadpS3KT3octZFYhiob94ak_tHR1v_8x6jJuW3Q9DP4l7Xe_cJWyuYSAU2d5GG73xBNO5_g_FGQaPYZWFJcjoLcEuU_8gxazQ/file#';
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