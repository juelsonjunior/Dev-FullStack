import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Header } from "./components/header/header";
import { FormLogin } from "./components/form_login/form";
import { SwitchLang } from "./components/switch_language/swhitchLang";

function App() {
  const { t } = useTranslation();

  return (
    <>
      <Header />
      <div className="flex flex-col mx-auto max-w-4xl h-lvh gap-10 mt-10">
        <div className="flex md:justify-between">
          <h5 className="text-blue-950  text-md md:text-2xl mr-10 md:mr-0">
            {t("loginToSchedule")}
          </h5>

          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-800 hidden md:flex">
              {t("selectLanguage")}
            </span>

            <SwitchLang />
          </div>
        </div>
        <p className="text-blue-950 text-md md:text-2xl w-full md:w-3/5 text-center md:text-left">
          {t("firstUsingService")}
        </p>

        <FormLogin />
      </div>
    </>
  );
}

export default App;
