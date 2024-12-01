import { useTranslation } from "react-i18next";
const switchLanguages = [
    {
        name: "Portugues",
        value: "pt"
    },
    {
        name: "Inglês",
        value: "en"
    },
    {
        name: "Francês",
        value: "fr"
    }
]

export function SwitchLang(){

    const { i18n } = useTranslation();

    const handleChangeLanguage = (event) =>{
        i18n.changeLanguage(event.target.value)
    }
    return (
        <div>
            <select
              defaultValue={i18n.language}
              className="border border-slate-600 rounded-md pr-6"

              onChange={handleChangeLanguage}
            >
              {
                switchLanguages.map((langs) => (
                    <option key={langs.value} value={langs.value}>{langs.name}</option>
                ))
              }
            </select>
        </div>
    )
}
