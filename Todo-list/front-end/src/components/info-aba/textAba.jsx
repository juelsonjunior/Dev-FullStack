import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function TextAba({icon, text}) {
  return (
    <>
      <div className="flex items-center gap-3">
        <FontAwesomeIcon icon={icon} className="text-xl text-white" />
        <span className="text-white text-xl">{text}</span>
      </div>
    </>
  );
}

export default TextAba
