import i18 from "i18next";
import { initReactI18next } from "react-i18next";

import ptLang from "./translations/pt.json";
import enLang from "./translations/en.json";
import frLang from "./translations/fr.json";

i18.use(initReactI18next).init({
  fallbackLng: "pt",
  interpolation: {
    scapeValue: false,
  },
  resources: {
    pt: ptLang,
    en: enLang,
    fr: frLang,
  },
});

export default i18;
