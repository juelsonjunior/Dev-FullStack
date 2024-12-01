import { ActionPass } from "../../components/actionPass";
import { Navbar } from "../../components/navBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faDice, faSave } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import api from "../../service/api";

function Home() {
  const [sizePass, setSizePass] = useState(5);
  const [textSizePass, setTextSizePass] = useState(5);
  const [msgCopy, setMsgCopy] = useState(false);
  const [passGenerate, setPassGenerate] = useState(
    "Sua senha vai aparecer aqui!!"
  );
  const [typePass, setTypePass] = useState([]);
  const [isLoadingSave, setIsLoadingSave] = useState(false);
  const [messageAlert, setMessageAlert] = useState();

  function handleInputRange(event) {
    setSizePass(event.target.value);
    
    setTextSizePass(event.target.value);
  }

  async function copyTextCamp() {
    try {
      await navigator.clipboard.writeText(passGenerate);

      setMsgCopy("Copiado", true);

      setTimeout(() => {
        setMsgCopy(false);
      }, 1000);
    } catch (error) {
      console.log(`Erro: falha ao copiar o texto ${error}`);
    }
  }

  function generatePass(types, size) {
    if (types.length > 0) {
      const typePass = {
        simbol: "!@#$%&",
        number: "123456789",
        maiusc: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
        minusc: "abcdefghijklmnopqrstuvwxyz",
      };

      let pass = "";
      types.forEach((type) => {
        pass += typePass[type];
      });

      let randomPass = "";
      for (let i = 0; i < size; i++) {
        const ramdonIndex = Math.floor(Math.random() * pass.length);
        randomPass += pass[ramdonIndex];
      }
      setPassGenerate(randomPass);
    } else {
      setMessageAlert("Precisa personalizar a sua senha primeiro", true);
    }
  }

  function handleChecked(event) {
    const { value, checked } = event.target;
    setTypePass((prevTypes) =>
      checked
        ? [...prevTypes, value]
        : prevTypes.filter((type) => type != value)
    );
  }

  async function saveDataPassBd(pass) {
    if (pass != "Sua senha vai aparecer aqui!!") {
      
      setIsLoadingSave(true);
      setMessageAlert("Salvando a senha, aguarde...");

      try {
        const insert = await api.post("/insert-passwords", {
          senha: pass,
        });

        setMessageAlert(insert.data.message);
      } catch (error) {
        console.log(`Houve um problema ${error}`);
      } finally {
        setIsLoadingSave(false);
      }
    } else {
      console.log("Precisa gerar uma senha primeiro");
    }
  }

  return (
    <div className="flex items-center mx-auto max-w-7xl h-lvh flex-col gap-32">
      <Navbar />

      <div className="max-w-5xl flex flex-col gap-5">
        {messageAlert && (
          <div className="bg-purple-500 text-slate-50 p-2 rounded-md text-center">
            {messageAlert}
          </div>
        )}

        <div className="w-full bg-slate-900 p-8 flex items-center justify-center gap-5 rounded-md">
          <div className="relative w-full h-10 text-center rounded-md outline-none text-slate-950 bg-slate-50 flex items-center justify-between p-3">
            {msgCopy && (
              <div className="absolute -top-5 -right-3 bg-slate-50 p-1 rounded-sm scale-75 shadow-lg shadow-slate-950/40">
                <span className="text-xs font-medium text-purple-500">
                  {msgCopy}
                </span>
              </div>
            )}

            <span value={passGenerate}>{passGenerate}</span>

            <span
              className="text-purple-500 cursor-pointer active:scale-90 transition duration-200 ease-in-out"
              onClick={copyTextCamp}
            >
              <FontAwesomeIcon icon={faCopy} />
            </span>
          </div>
          <button
            onClick={() => generatePass(typePass, sizePass)}
            className="w-14 h-10 bg-slate-50 rounded-md text-purple-500 hover:text-purple-600 text-lg active:scale-90 transition duration-200 ease-in-out"
          >
            <FontAwesomeIcon icon={faDice} />
          </button>
        </div>

        <div className="bg-slate-900 p-8 flex items-center justify-center flex-col gap-5 rounded-md">
          <h3 className="text-center">Personalize sua senha</h3>
          <div className="flex items-center justify-center gap-2 w-full">
            <input
              type="range"
              min="5"
              max="32"
              value={sizePass}
              onChange={handleInputRange}
              className="w-full accent-purple-500 border-purple-500"
            />
            <span value={textSizePass}>{textSizePass}</span>
          </div>

          <div className="flex gap-5">
            <ActionPass
              text={"Letras minusculas"}
              value="minusc"
              onChange={handleChecked}
            />
            <ActionPass
              text={"Letras maiusculas"}
              value="maiusc"
              onChange={handleChecked}
            />
            <ActionPass
              text={"Simbolos"}
              value="simbol"
              onChange={handleChecked}
            />
            <ActionPass
              text={"Números"}
              value="number"
              onChange={handleChecked}
            />
          </div>
        </div>

        <div className="flex items-center justify-center w-full">
          <button
            className="bg-purple-700 hover:bg-purple-600 transition duration-200 ease-in-out rounded-full w-36 h-10 text-sm flex items-center justify-center gap-1 active:scale-90 btn-disabled disabled:animate-pulse"
            onClick={() => saveDataPassBd(passGenerate)}
            disabled={isLoadingSave}
          >
            <span>{isLoadingSave ? "Salvando..." : "Salvar senha"}</span>
            <span>
              <FontAwesomeIcon icon={faSave} />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
