import React, { useEffect, useState } from 'react';
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
import react from "../../assets/imgs/react.svg";
import git from "../../assets/imgs/git.svg";
import node from "../../assets/imgs/nodejs.svg";
import firebase from "../../assets/imgs/firebase.svg";
import project from "../../assets/imgs/project.svg";
import githubcardgif from "../../assets/imgs/githubcardgif.gif";
import caplolgif from "../../assets/imgs/caplolgif.gif";
import clock from "../../assets/imgs/clock.png";
import moon from "../../assets/imgs/moon.svg";
import sun from "../../assets/imgs/sun.svg";


const Home = () => {
    const [repositories, setRepositories] = useState([]);
    const [typedText, setTypedText] = useState('');
    const text = "Olá, seja bem vindo ao meu portfólio!";
    const [buttonImage, setButtonImage] = useState(sun);
    const [isWhiteMode, setIsWhiteMode] = useState(false);

    useEffect(() => {
        fetch('https://api.github.com/users/yurirxmos/repos')
            .then(response => response.json())
            .then(data => setRepositories(data))
            .catch(error => console.error('Erro ao buscar repositórios:', error));
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
            document.body.classList.add('white-mode');
        } else {
            document.body.classList.remove('white-mode');
        }
    }, [isWhiteMode]);

    return (
        <div className={`main ${isWhiteMode ? 'white-mode' : ''}`}>

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
                        <p>Meu nome é Yuri Ramos, tenho 22 anos e sou um estudante entusiasmado de Ciências da Computação na Universidade Federal de Jataí. Minha paixão pela tecnologia e pela resolução de problemas me levou a explorar diversas áreas dentro da computação, que me levou ao desenvolvimento de software.</p>
                    </div>

                    <div className="skills">
                        <h2>/ front-end</h2>
                        <img src={html} alt="html" />
                        <img src={css} alt="css" />
                        <img src={js} alt="javascript" />
                        <img src={react} alt="react" />
                    </div>

                    <div className="skills">
                        <h2>/ back-end</h2>
                        <img src={node} alt="node" />
                        <img src={firebase} alt="firebase" />
                    </div>

                    <div className="skills">
                        <h2>/ dev-ops</h2>
                        <img src={git} alt="git" />
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


                <div className="exp-list">
                    <div className="exp">
                        <h1>
                            <img src={job} />
                            Desenvolvedor Front-End
                        </h1>
                        <h2>Freelancer</h2>
                        <h2>abril de 2023 até o momento</h2>
                        <p>• HTML, CSS e Bootstrap para o desenvolvimento de interfaces responsivas e atrativas ao usuário.</p>
                        <p>• JavaScript, React, React Router para criação dinâmica de websites.</p>
                    </div>

                    <div className="exp">
                        <h1>
                            <img src={job} />
                            Desenvolvedor Web
                        </h1>
                        <h2>Universidade Federal de Jataí</h2>
                        <h2>fevereiro de 2023 até abril de 2023</h2>
                        <p>• Desenvolvimento de sites com low code (Google Sites, WordPress).</p>
                        <p>• Experiência em integração de gráficos do Power BI via iframe para visualizações dinâmicas.</p>
                    </div>

                    <div className="exp">
                        <h1>
                            <img src={job} />
                            Assistente de TI
                        </h1>
                        <h2>Terram Soluções Agronômicas</h2>
                        <h2>novembro de 2021 até janeiro de 2022</h2>
                        <p>• Automação de atividades com utilização de scripts em Python.</p>
                        <p>• Manutenção do servidor utilizado via nuvem e localmente.</p>
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
                            <img src={githubcardgif} />
                            <h2>GitHub Card</h2>
                            <p>Um card que mostra as informações do perfil do Github atráves da inserção do nome de usuário.</p>
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
                                    <p id='javascript'>js</p>
                                </div>
                                <div className="project-time">
                                    <img src={clock} />
                                    <p>1 dia.</p>
                                </div>
                            </div>
                        </div>
                        <a href="https://yurirxmos.github.io/github-card/" target="_blank">ver projeto</a>
                    </div>

                    <div>
                        <div className="project">
                            <img src={caplolgif} />
                            <h2>CAPLOL</h2>
                            <p>Um site multiabas pra visualizar informações de um campeonato, assim como tabela, jogos e transmissão.</p>
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
                                    <p id='javascript'>js</p>
                                </div>
                                <div className="project-time">
                                    <img src={clock} />
                                    <p>1 mês.</p>
                                </div>
                            </div>
                        </div>
                        <a href="https://caplol-site.vercel.app/" target="_blank">ver projeto</a>
                    </div>
                </div>
            </div>

            <Separator />

            <div className="home-repos" id="home-repos">
                <img src={repos} alt="Repos" />
                <h1>REPOSITÓRIOS</h1>
                <div className="repo-list">
                    {repositories.map(repo => (
                        <a key={repo.id} href={repo.html_url} target="_blank" rel="noopener noreferrer" className="repo-item">
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
                    <a href="https://api.whatsapp.com/send?phone=5564999678964&text=Ol%C3%A1,%20vi%20seu%20portf%C3%B3lio%20e%20gostaria%20de%20conversar%20mais!" target="_blank">
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