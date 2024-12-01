import logoLogin from "../../assets/login.svg";

export function Header() {
  return (
    <div className="bg-blue-950 w-lvw">
      <div className="mx-auto max-w-4xl">
      <img src={logoLogin} alt="" className="w-44 h-24" />
      </div>
    </div>
  );
}
