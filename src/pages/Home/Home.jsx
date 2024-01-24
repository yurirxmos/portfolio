import React, { useEffect, useState } from 'react';
import "./Home.css";
import Navbar from "../../components/Navbar/Navbar";
import Separator from "../../components/Separator/Separator";
import job from "../../assets/imgs/bag.svg";
import repos from "../../assets/imgs/repos.svg";
import contact from "../../assets/imgs/contact.svg";
import wpp from "../../assets/imgs/wpp.svg";
import linkedin from "../../assets/imgs/linkedin.svg";
import gmail from "../../assets/imgs/gmail.svg";

const Home = () => {
    const [text, setText] = useState('');
    const [repositories, setRepositories] = useState([]);

    useEffect(() => {
        const originalText = "Olá! Meu nome é Yuri, esse é o meu portfólio fique à vontade para explorar e me conhecer melhor!";
        let index = 0;

        const intervalId = setInterval(() => {
            setText(originalText.substring(0, index));
            index++;

            if (index > originalText.length) {
                clearInterval(intervalId);
            }
        }, 60);

        fetch('https://api.github.com/users/yurirxmos/repos')
            .then(response => response.json())
            .then(data => setRepositories(data))
            .catch(error => console.error('Erro ao buscar repositórios:', error));

        return () => {
            clearInterval(intervalId);
        };
    }, []);



    return (
        <div className="main">

            <Navbar />

            <Separator />

            <div className="home-title">
                <h1>{text}</h1>
            </div>

            <Separator />

            <div className="home-experience" id="home-experience">
                <img src={job} />
                <h1>EXPERIÊNCIA</h1>
                <p>
                    <h2>Desenvolvedor de front-end</h2>
                    <h3>Freelancer</h3>
                    <h3>abril de 2023 até o momento </h3> <br />
                    <b>•</b> HTML, CSS e Bootstrap para o desenvolvimento de interfaces responsivas e atrativas ao usuário. <br />
                    <b>•</b> JavaScript, React, React Router para criação dinâmica de websites. <br />
                    <b>•</b> Git e GitHub para controle de versão, colaboração e organização de projetos. <br />
                    <b>•</b> Boas práticas de desenvolvimento e metodologias ágeis. <br />
                </p>

                <p>
                    <h2>Desenvolvedor web</h2>
                    <h3>Universidade Federal de Jataí</h3>
                    <h3>fevereiro de 2023 até abril de 2023 </h3> <br />
                    <b>•</b> Desenvolvimento de sites com low code (Google Sites, WordPress).  <br />
                    <b>•</b> Experiência em integração de gráficos do Power BI via iframe para visualizações dinâmicas. <br />
                </p>

                <p>
                    <h2>Assistente de TI</h2>
                    <h3>Terram Soluções Agronômicas</h3>
                    <h3>novembro de 2021 até janeiro de 2022 </h3> <br />
                    <b>•</b> Automação de atividades com utilização de scripts em Python.  <br />
                    <b>•</b> Manutenção do servidor utilizado via nuvem e localmente. <br />
                    <b>•</b> Manutenção de equipamentos e dispositivos utilizados. <br />
                </p>
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
                    |
                    <a href="https://www.linkedin.com/in/yurirxmos/" target="_blank">
                        <img src={linkedin} />
                        LinkedIn
                    </a>
                    |
                    <a href="mailto:yuriramos2406@gmail.com" target="_blank">
                        <img src={gmail} />
                        Gmail
                    </a>
                </div>
            </div>

            <Separator />



        </div>
    );
};

export default Home;