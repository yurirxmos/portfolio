import React, { useEffect, useState } from "react";
import "./Home.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Separator from "../../components/Separator/Separator";
import Brand from "../../components/Brand/Brand";
import job from "../../assets/imgs/bag.svg";
import repos from "../../assets/imgs/repos.svg";
import contact from "../../assets/imgs/contact.svg";
import wpp from "../../assets/imgs/wpp.svg";
import linkedin from "../../assets/imgs/linkedin.svg";
import gmail from "../../assets/imgs/gmail.svg";
import profile from "../../assets/imgs/profile.png";
import html from "../../assets/imgs/html.svg";
import css from "../../assets/imgs/css.svg";
import js from "../../assets/imgs/javascript.svg";
import vue from "../../assets/imgs/vue.svg";
import ts from "../../assets/imgs/ts.svg";
import vite from "../../assets/imgs/vite.svg";
import react from "../../assets/imgs/react.svg";
import git from "../../assets/imgs/git.svg";
import node from "../../assets/imgs/nodejs.svg";
import firebase from "../../assets/imgs/firebase.svg";
import docker from "../../assets/imgs/docker.svg";
import project from "../../assets/imgs/project.svg";
import githubcardgif from "../../assets/imgs/githubcardgif.gif";
import caplolgif from "../../assets/imgs/caplolgif.gif";
import clock from "../../assets/imgs/clock.png";
import moon from "../../assets/imgs/moon.svg";
import sun from "../../assets/imgs/sun.svg";
import forgetgif from "../../assets/imgs/4getgif.gif";
import idezgif from "../../assets/imgs/ideztelecomgif.gif";
import contaslolgif from "../../assets/imgs/repocontaslolgif.gif";
import jsonviewergif from "../../assets/imgs/jsonviewergif.gif";

const Home = () => {
    const [repositories, setRepositories] = useState([]);
    const [typedText, setTypedText] = useState("");
    const text = "Olá, seja bem vindo ao meu portfólio!";
    const [buttonImage, setButtonImage] = useState(sun);
    const [isWhiteMode, setIsWhiteMode] = useState(false);

    useEffect(() => {
        fetch("https://api.github.com/users/yurirxmos/repos")
            .then((response) => response.json())
            .then((data) => setRepositories(data))
            .catch((error) => console.error("Erro ao buscar repositórios:", error));
    }, []);

    useEffect(() => {
        let currentIndex = 0;
        const interval = setInterval(() => {
            if (currentIndex <= text.length) {
                setTypedText(text.slice(0, currentIndex));
                currentIndex++;
            } else {
                clearInterval(interval);
            }
        }, 100);

        return () => clearInterval(interval);
    }, []);

    const handleToggleMode = () => {
        setIsWhiteMode(!isWhiteMode);
        setButtonImage(isWhiteMode ? sun : moon);
    };

    useEffect(() => {
        if (isWhiteMode) {
            document.body.classList.add("white-mode");
        } else {
            document.body.classList.remove("white-mode");
        }
    }, [isWhiteMode]);

    return (
        <div className={`main ${isWhiteMode ? "white-mode" : ""}`}>
            <button type="button" onClick={handleToggleMode} className="addons">
                <img src={buttonImage} />
            </button>

            <Navbar />

            <Separator />

            <Brand />

            <Separator />

            <div className="home-title">
                <div>
                    <div className="text">
                        <h1>{typedText}</h1>
                        <p>
                            Meu nome é Yuri Ramos, tenho 22 anos e sou um formando em Bacharelado em Ciências da
                            Computação na Universidade Federal de Jataí. Minha paixão pela tecnologia e pela resolução
                            de problemas me levou a explorar diversas áreas dentro da computação, que me levou ao
                            desenvolvimento de software.
                        </p>
                    </div>

                    <div className="skills">
                        <h2>/ front-end</h2>
                        <img src={html} alt="html" />
                        <img src={css} alt="css" />
                        <img src={js} alt="javascript" />
                        <img src={ts} alt="ts" />
                        <img src={react} alt="react" />
                        <img src={vue} alt="vue" />
                    </div>

                    <div className="skills">
                        <h2>/ back-end</h2>
                        <img src={node} alt="node" />
                        <img src={firebase} alt="firebase" />
                    </div>

                    <div className="skills">
                        <h2>/ dev-ops</h2>
                        <img src={git} alt="git" />
                        <img src={docker} alt="docker" />
                    </div>
                </div>

                <div>
                    <img src={profile} alt="profilepic" />
                </div>
            </div>

            <Separator />

            <div className="home-experience" id="home-experience">
                <img src={job} />
                <h1>EXPERIÊNCIA PROFISSIONAL</h1>

                <div className="exp-details">
                    <img src={linkedin} />
                    <a
                        className="exp-button"
                        href="https://www.linkedin.com/in/yurirxmos/"
                        target="_blank"
                        rel="noreferrer"
                    >
                        VER TUDO
                    </a>
                </div>

                <div className="exp-list">
                    <div className="exp">
                        <h1>
                            <img src={job} />
                            Desenvolvedor front-end
                        </h1>
                        <h2>Terram Soluções Agronômicas</h2>
                        <h2>abril de 2024 até o momento</h2>
                    </div>

                    <div className="exp">
                        <h1>
                            <img src={job} />
                            Desenvolvedor full-stack
                        </h1>
                        <h2>Vizantu Agência de Publicidade</h2>
                        <h2>fevereiro de 2024 até fevereiro de 2025</h2>
                    </div>

                    <div className="exp">
                        <h1>
                            <img src={job} />
                            Desenvolvedor Front-End
                        </h1>
                        <h2>Freelancer</h2>
                        <h2>abril de 2023 até o momento</h2>
                    </div>

                    <div className="exp">
                        <h1>
                            <img src={job} />
                            Desenvolvedor Web
                        </h1>
                        <h2>Universidade Federal de Jataí</h2>
                        <h2>fevereiro de 2023 até abril de 2023</h2>
                    </div>

                    <div className="exp">
                        <h1>
                            <img src={job} />
                            Assistente de TI
                        </h1>
                        <h2>Terram Soluções Agronômicas</h2>
                        <h2>novembro de 2021 até janeiro de 2022</h2>
                    </div>
                </div>
            </div>

            <Separator />

            <div className="home-project" id="home-project">
                <img src={project} alt="project" />
                <h1>PROJETOS</h1>

                <div className="project-list">
                    <div>
                        <div className="project">
                            <img src={idezgif} />
                            <h2>Idez Telecom</h2>
                            <p>
                                Site desenvolvido para uma empresa provedora de internet, com área do cliente + landing
                                page.
                            </p>
                            <div className="project-info">
                                <div className="project-skills">
                                    <img src={react} />
                                    <p>react</p>
                                </div>
                                <div className="project-skills">
                                    <img src={css} />
                                    <p>css</p>
                                </div>
                                <div className="project-skills">
                                    <img src={node} />
                                    <p>node</p>
                                </div>
                                <div className="project-skills">
                                    <img src={js} />
                                    <p id="javascript">js</p>
                                </div>
                                <div className="project-time">
                                    <img src={clock} />
                                    <p>2m</p>
                                </div>
                            </div>
                        </div>
                        <a href="https://idez-telecom.vercel.app/" target="_blank">
                            ver projeto
                        </a>
                    </div>

                    <div>
                        <div className="project">
                            <img src={jsonviewergif} />
                            <h2>JSON Viewer</h2>
                            <p>
                                Projeto para converter jsons de uma forma mais visual e agradável ao programador.
                            </p>
                            <div className="project-info">
                                <div className="project-skills">
                                    <img src={vue} />
                                    <p>vue</p>
                                </div>
                                <div className="project-skills">
                                    <img src={vite} />
                                    <p>vite</p>
                                </div>
                                <div className="project-skills">
                                    <img src={ts} />
                                    <p>ts</p>
                                </div>
                                

                                <div className="project-time">
                                    <img src={clock} />
                                    <p>2m</p>
                                </div>
                            </div>
                        </div>
                        <a href="https://project-json-viewer.vercel.app/" target="_blank">
                            ver projeto
                        </a>
                    </div>

                    <div>
                        <div className="project">
                            <img src={githubcardgif} />
                            <h2>GitHub Card</h2>
                            <p>
                                Um card que mostra as informações do perfil do Github atráves da inserção do nome de
                                usuário.
                            </p>
                            <div className="project-info">
                                <div className="project-skills">
                                    <img src={html} />
                                    <p>html</p>
                                </div>
                                <div className="project-skills">
                                    <img src={css} />
                                    <p>css</p>
                                </div>
                                <div className="project-skills">
                                    <img src={js} />
                                    <p id="javascript">js</p>
                                </div>
                                <div className="project-time">
                                    <img src={clock} />
                                    <p>1d</p>
                                </div>
                            </div>
                        </div>
                        <a href="https://yurirxmos.github.io/github-card/" target="_blank">
                            ver projeto
                        </a>
                    </div>

                    <div>
                        <div className="project">
                            <img src={caplolgif} />
                            <h2>CAPLOL</h2>
                            <p>
                                Site multiabas pra visualizar informações de um campeonato, assim como tabela, jogos
                                e transmissão.
                            </p>
                            <div className="project-info">
                                <div className="project-skills">
                                    <img src={html} />
                                    <p>html</p>
                                </div>
                                <div className="project-skills">
                                    <img src={css} />
                                    <p>css</p>
                                </div>
                                <div className="project-skills">
                                    <img src={js} />
                                    <p id="javascript">js</p>
                                </div>
                                <div className="project-time">
                                    <img src={clock} />
                                    <p>1m</p>
                                </div>
                            </div>
                        </div>
                        <a href="https://caplol-site.vercel.app/" target="_blank">
                            ver projeto
                        </a>
                    </div>

                    <div>
                        <div className="project">
                            <img src={forgetgif} />
                            <h2>/4get List</h2>
                            <p>Uma to-do list simples em que as tasks são armazenadas em local storage.</p>
                            <div className="project-info">
                                <div className="project-skills">
                                    <img src={react} />
                                    <p>react</p>
                                </div>
                                <div className="project-skills">
                                    <img src={css} />
                                    <p>css</p>
                                </div>
                                <div className="project-skills">
                                    <img src={js} />
                                    <p id="javascript">js</p>
                                </div>
                                <div className="project-time">
                                    <img src={clock} />
                                    <p>1d</p>
                                </div>
                            </div>
                        </div>
                        <a href="https://4get-list.vercel.app/" target="_blank">
                            ver projeto
                        </a>
                    </div>

                    <div>
                        <div className="project">
                            <img src={contaslolgif} />
                            <h2>Repo ContasLOL</h2>
                            <p>
                                Uma aplicação web intuitiva para organizar e gerenciar suas contas de League of Legends.
                            </p>
                            <div className="project-info">
                                <div className="project-skills">
                                    <img src={react} />
                                    <p>react</p>
                                </div>
                                <div className="project-skills">
                                    <img src={css} />
                                    <p>css</p>
                                </div>
                                <div className="project-skills">
                                    <img src={js} />
                                    <p id="javascript">js</p>
                                </div>
                                <div className="project-time">
                                    <img src={clock} />
                                    <p>2m</p>
                                </div>
                            </div>
                        </div>
                        <a href="https://repo-contaslol.vercel.app/" target="_blank">
                            ver projeto
                        </a>
                    </div>
                </div>
            </div>

            <Separator />

            <div className="home-repos" id="home-repos">
                <img src={repos} alt="Repos" />
                <h1>REPOSITÓRIOS</h1>
                <div className="repo-list">
                    {repositories.map((repo) => (
                        <a
                            key={repo.id}
                            href={repo.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="repo-item"
                        >
                            <img src={repos} />
                            <b>{repo.name}</b>
                            {repo.description && <p>{repo.description}</p>}
                        </a>
                    ))}
                </div>
            </div>

            <Separator />

            <div className="home-contact" id="home-contact">
                <img src={contact} alt="Repos" />
                <h1>CONTATO</h1>

                <div>
                    <a
                        href="https://api.whatsapp.com/send?phone=5564999678964&text=Ol%C3%A1,%20vi%20seu%20portf%C3%B3lio%20e%20gostaria%20de%20conversar%20mais!"
                        target="_blank"
                    >
                        <img src={wpp} />
                        WhatsApp
                    </a>

                    <a href="https://www.linkedin.com/in/yurirxmos/" target="_blank">
                        <img src={linkedin} />
                        LinkedIn
                    </a>

                    <a href="mailto:yuriramos2406@gmail.com" target="_blank">
                        <img src={gmail} />
                        Gmail
                    </a>
                </div>
            </div>

            <Separator />

            <Footer />
        </div>
    );
};

export default Home;
