import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateRight } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

export function FormLogin() {
  const { t } = useTranslation();
  const [captcha, setCaptcha] = useState("");

  const generateCaptcha = () => {
    const randomCaptcha = Math.random().toString(36).slice(8).toUpperCase();

    setCaptcha(randomCaptcha);
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  return (
    <div className="w-full md:w-3/5 flex flex-col gap-5 md:gap-10">
      <div className="flex flex-col gap-3">
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-2 md:gap-5 w-full">
          <label htmlFor="" className="font-bold w-80 md:w-80">
            {t("emailIdent")} <span className="text-red-600">*</span>
          </label>
          <input
            type="email"
            className="border border-slate-600 outline-none rounded-md px-3 py-2 focus:border-blue-500 focus:drop-shadow-lg text-sm w-full"
            placeholder="Identificação de email"
          />
        </div>
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-2 md:gap-5 w-full">
          <label htmlFor="" className="font-bold w-80 md:w-80">
            {t("password")} <span className="text-red-600">*</span>
          </label>
          <input
            type="email"
            className="border border-slate-600 outline-none rounded-md px-3 py-2 focus:border-blue-500 focus:drop-shadow-lg text-sm w-full"
            placeholder="Palavra passe"
          />
        </div>
      </div>

      <div className="flex items-center gap-5 w-full border border-slate-600 rounded-md p-1">
        <div className="w-4/6 h-full flex items-center justify-center">
          <span className="text-blue-950 text-5xl">{captcha}</span>
        </div>
        <div className="flex flex-col w-full">
          <div className="flex items-center gap-1">
            <span
              className="cursor-pointer active:rotate-180 duration-300 transition-all ease-in-out"
              onClick={generateCaptcha}
            >
              <FontAwesomeIcon icon={faRotateRight} />
            </span>
            <p>{t("insertextImg")}</p>
          </div>
          <div>
            <input
              type="text"
              className="border border-slate-600 outline-none rounded-md px-3 py-2 w-full focus:border-blue-500 focus:drop-shadow-lg"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-center w-full">
        <button className="bg-blue-950 w-32 p-3 text-white hover:text-yellow-300 rounded-md text-md scale-75">
          {t("continue")}
        </button>
      </div>

      <div className="flex justify-between md:justify-normal w-full md:w-5/6 gap-14">
        <span className="text-sm cursor-pointer hover:text-orange-500">
          {t("forgotPassword")}?
        </span>
        <span className="text-sm cursor-pointer hover:text-orange-500">
          {t("newUser")}?
        </span>
      </div>

      <p className="text-center text-sm">{t("registrationExpire")}</p>
    </div>
  );
}
