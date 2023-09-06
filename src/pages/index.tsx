import React, { useState, useEffect } from "react";
import { BiSolidUserCircle } from "react-icons/bi";
import { MdEmail } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../firebase";

const Login = () => {
  const [login, setLogin] = useState<"login" | "cadastro">("login");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msgError, setMsgError] = useState<string | null>(null);
  const [msgSucess, setMsgSucess] = useState<string | null>(null);

  const router = useRouter();

  function ExibirError(msg: string, tempo: number = 5000) {
    setMsgError(msg);
    setTimeout(() => {
      setMsgError(null);
    }, tempo);
  }

  function ExibirSucess(msg: string, tempo: number = 5000) {
    setMsgSucess(msg);
    setTimeout(() => setMsgSucess(null), tempo);
  }

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (email === "" || password === "") {
      let msg = `Email ou Password Invalido!`;
      ExibirError(msg, 5000);
      return;
    }
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(`Login Realizado com sucesso! ${user.email}`);
        setNome("");
        setEmail("");
        setPassword("");
        router.push("https://github.com/DarlanDuarte");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }

  async function handleCadastro(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (nome === "" || email === "" || password === "") {
      let msg = `Credenciais invalidas`;
      ExibirError(msg, 5000);
      return;
    }

    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(`Cadastro Realizado com sucesso! ${user.email}`);
        setNome("");
        setEmail("");
        setPassword("");
        setLogin("login");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }

  return login === "cadastro" ? (
    <div
      className={`w-screen h-screen bg-[#0C134F] flex justify-center items-center`}
    >
      <motion.div
        key={"cadastro"}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.5 }}
        transition={{ duration: 1 }}
        className={` flex w-8/12 h-3/5 bg-white rounded-lg shadow-4xl
        md:w-11/12
        sm:w-full
      `}
      >
        <div
          className={`flex flex-col w-7/12 h-full bg-[#5C469C] justify-center items-center rounded-lg `}
        >
          <h2 className={`text-white text-4xl font-extrabold mb-4`}>
            Seja Bem Vindo!
          </h2>
          <p className={`text-white text-lg font-bold`}>
            Acesse sua conta agora mesmo.
          </p>
          <button
            onClick={() =>
              setLogin(login === "cadastro" ? "login" : "cadastro")
            }
            className={`mt-4 w-56 h-10 rounded-3xl bg-[#1D267D] text-lg font-medium text-white
            hover:bg-[#0C134F] duration-500
          `}
          >
            Entrar
          </button>
        </div>
        <div className={`w-full flex flex-col justify-center  `}>
          <h2 className={`text-center  text-5xl font-extrabold text-black`}>
            Crie Sua Conta
          </h2>
          <p className={`text-center text-black font-bold text-lg`}>
            Preencha o formulário
          </p>
          <form onSubmit={(e) => handleCadastro(e)}>
            <div className={` w-full mt-4 flex justify-center items-center `}>
              <label
                htmlFor="nome"
                className="relative w-3/4 shadow-4xl rounded-xl"
              >
                <BiSolidUserCircle
                  size={40}
                  color={`#fff`}
                  className={`absolute left-1  top-1`}
                />
                <input
                  type="text"
                  placeholder={`Digite seu nome`}
                  className={` w-full py-2 pl-[3.2rem] text-2xl font-medium bg-[#0C134F]
                text-white outline-none rounded-xl
              `}
                  id="nome"
                  value={nome}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setNome(e.target.value)
                  }
                />
              </label>
            </div>
            <div className={` w-full mt-4 flex justify-center items-center `}>
              <label
                htmlFor="email"
                className="relative w-3/4 shadow-4xl rounded-xl"
              >
                <MdEmail
                  size={40}
                  color={`#fff`}
                  className={`absolute  left-1  top-1`}
                />
                <input
                  type="email"
                  placeholder={`Digite seu email`}
                  className={` w-full py-2 pl-[3.2rem] text-2xl font-medium bg-[#0C134F]
                text-white outline-none rounded-xl
              `}
                  id="email"
                  value={email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setEmail(e.target.value)
                  }
                />
              </label>
            </div>
            <div className={` w-full mt-4 flex justify-center items-center `}>
              <label
                htmlFor="senha"
                className="relative w-3/4 shadow-4xl rounded-xl"
              >
                <RiLock2Fill
                  size={40}
                  color={`#fff`}
                  className={`absolute left-1  top-1`}
                />
                <input
                  type="password"
                  placeholder={`Digite sua senha`}
                  className={` w-full py-2 pl-[3.2rem] text-2xl font-medium bg-[#0C134F]
                text-white outline-none rounded-xl
              `}
                  id="senha"
                  value={password}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setPassword(e.target.value)
                  }
                />
              </label>
            </div>

            {msgError ? (
              <div className={`flex flex-col justify-center items-center `}>
                <div
                  className={`w-10/12 mt-4 text-xl font-bold bg-red-500 rounded-xl text-white border-2 border-red-700 text-center p-1 `}
                >
                  {msgError}
                </div>
              </div>
            ) : msgSucess ? (
              <div className={`flex flex-col justify-center items-center `}>
                <div
                  className={`w-10/12 mt-4 text-xl font-bold bg-green-500 rounded-xl text-white border-2 border-green-700 text-center p-1 `}
                >
                  {msgSucess}
                </div>
              </div>
            ) : (
              false
            )}
            <div className={`flex justify-center items-center`}>
              <button
                className={`w-4/12 h-12  ${
                  msgError ? "mt-2" : "mt-6"
                } rounded-full text-white font-medium text-xl bg-[#1D267D]
                hover:bg-green-600 duration-700 shadow-4xl
              `}
              >
                Cadastrar
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  ) : (
    <div
      className={`w-screen h-screen bg-[#0C134F] flex justify-center items-center `}
    >
      <motion.div
        key={"login"}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.5 }}
        transition={{ duration: 1 }}
        className={` flex w-8/12 h-3/5 bg-white rounded-lg shadow-4xl`}
      >
        <div
          className={`flex flex-col w-7/12 h-full bg-[#5C469C] justify-center items-center rounded-lg `}
        >
          <h2 className={`text-white text-4xl font-extrabold mb-4`}>
            Já é Cadastrado?
          </h2>
          <p className={`text-white text-lg font-bold`}>
            Faça seu cadastro agora mesmo.
          </p>
          <button
            onClick={() => setLogin(login === "login" ? "cadastro" : "login")}
            className={`mt-4 w-56 h-10 rounded-3xl bg-[#1D267D] text-lg font-medium text-white
            hover:bg-[#0C134F] duration-500
          `}
          >
            Cadastrar
          </button>
        </div>
        <div className={`w-full flex flex-col justify-center `}>
          <h2 className={`text-center  text-5xl font-extrabold text-black`}>
            Faça Seu Login
          </h2>
          <p className={`text-center font-bold text-lg text-black`}>
            Preencha o formulário
          </p>
          <form onSubmit={(e) => handleLogin(e)}>
            <div className={` w-full mt-4 flex justify-center items-center  `}>
              <label
                htmlFor="email"
                className="relative w-3/4 shadow-4xl rounded-xl"
              >
                <MdEmail
                  size={40}
                  color={`#fff`}
                  className={`absolute left-1  top-1`}
                />
                <input
                  type="email"
                  placeholder={`Digite seu email`}
                  className={` w-full py-2 pl-[3.2rem] text-2xl font-medium bg-[#0C134F]
                text-white outline-none rounded-xl
              `}
                  id="email"
                  value={email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setEmail(e.target.value)
                  }
                />
              </label>
            </div>
            <div className={` w-full mt-4 flex justify-center items-center `}>
              <label
                htmlFor="senha"
                className="relative w-3/4 shadow-4xl rounded-xl"
              >
                <RiLock2Fill
                  size={40}
                  color={`#fff`}
                  className={`absolute left-1  top-1`}
                />
                <input
                  type="password"
                  placeholder={`Digite sua senha`}
                  className={` w-full py-2 pl-[3.2rem] text-2xl font-medium bg-[#0C134F]
                text-white outline-none rounded-xl
              `}
                  id="senha"
                  value={password}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setPassword(e.target.value)
                  }
                />
              </label>
            </div>

            {msgError ? (
              <div className={`flex flex-col justify-center items-center `}>
                <div
                  className={`w-10/12 mt-4 text-xl font-bold bg-red-500 rounded-xl text-white border-2 border-red-700 text-center p-1`}
                >
                  {msgError}
                </div>
              </div>
            ) : (
              false
            )}

            <div className={`flex justify-center items-center `}>
              <button
                className={`w-4/12 h-12 ${
                  msgError ? "mt-2" : "mt-6"
                } rounded-full text-white font-medium text-xl bg-[#1D267D]
                hover:bg-green-600 duration-700 shadow-4xl
              `}
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
