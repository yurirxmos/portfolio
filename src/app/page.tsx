"use client";

import { useEffect, useState } from "react";
import { GiBrazilFlag, GiSharpShuriken } from "react-icons/gi";
import { LiaFlagUsaSolid } from "react-icons/lia";

type Language = "pt" | "en";

const translations = {
  pt: {
    description1:
      "Sou engenheiro de software, com {years} anos de experiência. Atuei em projetos voltados para o setor agronômico, onde aprendi a aplicar tecnologias para otimização de processos e implantação de soluções com inteligência artificial.",
    description2:
      "Minha rotina profissional gira em torno de tornar a tecnologia acessível e intuitiva, o que explica minha paixão pelo desenvolvimento front-end — acredito que a internet precisa de mais vida, arte e experiências envolventes que sejam agradáveis durante o uso cotidiano dos usuários. Sou marido, futuro pai e um grande fã de jogos — inclusive, enquanto escrevo isto, estou ouvindo a trilha sonora de Cyberpunk 2077.",
    description3:
      "Neste ano, já realizei {contributions} contribuições no GitHub, sempre buscando evoluir como desenvolvedor e criar soluções que realmente façam diferença.",
    footer1: "Você pode checar minhas",
    experiences: "experiências profissionais",
    footer2: "no meu",
    and: "e se quiser ver",
    myCode: "meu código",
    footer3: "fique a vontade pra acessar meu",
    footer4: "Caso queira conhecer mais do Yuri como pessoa você pode também me seguir no",
    footer5: "Se tiver interesse em me conhecer mais me mande um e-mail :)",
    or: "ou",
  },
  en: {
    description1:
      "I'm a software engineer with {years} years of experience. I've worked on projects focused on the agricultural sector, where I learned to apply technologies for process optimization and implementation of artificial intelligence solutions.",
    description2:
      "My professional routine revolves around making technology accessible and intuitive, which explains my passion for front-end development — I believe the internet needs more life, art, and engaging experiences that are enjoyable during users' daily use. I'm a husband, soon-to-be father, and a huge gaming fan — in fact, as I write this, I'm listening to the Cyberpunk 2077 soundtrack.",
    description3:
      "This year, I've already made {contributions} contributions on GitHub, always seeking to evolve as a developer and create solutions that really make a difference.",
    footer1: "You can check my",
    experiences: "professional experiences",
    footer2: "on my",
    and: "and if you want to see",
    myCode: "my code",
    footer3: "feel free to access my",
    footer4: "If you want to know more about Yuri as a person, you can also follow me on",
    footer5: "If you're interested in getting to know me better, send me an email :)",
    or: "or",
  },
};

export default function Home() {
  const calculateExperienceYears = () => {
    const startYear = 2021;
    const currentYear = new Date().getFullYear();
    return currentYear - startYear;
  };

  const years = calculateExperienceYears();

  const [contributions, setContributions] = useState(0);
  const [loading, setLoading] = useState(true);
  const [language, setLanguage] = useState<Language>("pt");

  // Detecta o idioma do navegador do usuário
  useEffect(() => {
    const browserLang = navigator.language.toLowerCase();
    setLanguage(browserLang.startsWith("en") ? "en" : "pt");
  }, []);

  useEffect(() => {
    const fetchContributions = async () => {
      const currentYear = new Date().getFullYear();
      const from = `${currentYear}-01-01T00:00:00Z`;
      const to = `${currentYear}-12-31T23:59:59Z`;
      const query = `{
        user(login: "yurirxmos") {
          contributionsCollection(from: "${from}", to: "${to}") {
            totalCommitContributions
            totalIssueContributions
            totalPullRequestContributions
            totalPullRequestReviewContributions
            totalRepositoryContributions
          }
        }
      }`;
      try {
        const response = await fetch("https://api.github.com/graphql", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
          },
          body: JSON.stringify({ query }),
        });
        const data = await response.json();
        if (data.data) {
          const coll = data.data.user.contributionsCollection;
          const total =
            coll.totalCommitContributions +
            coll.totalIssueContributions +
            coll.totalPullRequestContributions +
            coll.totalPullRequestReviewContributions +
            coll.totalRepositoryContributions;
          setContributions(total);
          setLoading(false);
        }
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchContributions();
  }, []);

  const t = translations[language];

  const replaceTemplate = (text: string, values: Record<string, string | number>) => {
    return text.replace(/{(\w+)}/g, (_, key) => String(values[key] || ""));
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-24">
      <div className="text-left text-md w-2xl">
        <div className="flex items-center justify-between w-full mb-5">
          <div className="flex items-center gap-2">
            <GiSharpShuriken />
            <h1 className="font-semibold">Yuri Ramos</h1>
          </div>

          <div>
            {language === "pt" ? (
              <button
                type="button"
                className="hover:opacity-50 flex items-center gap-1 text-xs hover:cursor-pointer"
                onClick={() => setLanguage("en")}
              >
                EN
                <LiaFlagUsaSolid size={18} />
              </button>
            ) : (
              <button
                type="button"
                className="hover:opacity-50 flex items-center gap-1 text-xs hover:cursor-pointer"
                onClick={() => setLanguage("pt")}
              >
                PT
                <GiBrazilFlag size={18} />
              </button>
            )}
          </div>
        </div>

        <p className="text-md mb-5">
          {replaceTemplate(t.description1, { years: String(years) })}
          <br></br>
          <br></br>
          {t.description2}
          <br></br>
          <br></br>
          {replaceTemplate(t.description3, { contributions: loading ? "...." : String(contributions) })}
        </p>

        <p className="text-md mt-10">
          {t.footer1} <b>{t.experiences}</b> {t.footer2}{" "}
          <a
            href="https://www.linkedin.com/in/yurirxmos/"
            rel="noopener noreferrer"
            target="_blank"
            className="underline"
          >
            linkedin
          </a>
          , {t.and} <b>{t.myCode}</b> {t.footer3}{" "}
          <a
            href="https://github.com/yurirxmos"
            rel="noopener noreferrer"
            target="_blank"
            className="underline"
          >
            GitHub
          </a>
          . {t.footer4}{" "}
          <a
            href="https://twitter.com/rxmosdev"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            twitter
          </a>
          .<br></br>
          <br></br>
          {t.footer5}
          <br></br>
          <a
            href="mailto:yuriramos2406@gmail.com"
            className="underline"
          >
            yuriramos2406@gmail.com
          </a>{" "}
          {t.or}{" "}
          <a
            href="mailto:yuri@rxmos.dev.br"
            className="underline"
          >
            yuri@rxmos.dev.br
          </a>
        </p>
      </div>
    </div>
  );
}
