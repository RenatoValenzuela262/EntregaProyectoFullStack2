import AdmNav, { LogoHomeAdm } from "./AdmNav";
import "./AdmNav.css";

function AdmLayout({ children }) {
  return (
    <div className="d-flex min-vh-100">
      <div className="sidebar barra-lateral">
        <LogoHomeAdm />
        <AdmNav />
      </div>

      <div className="flex-grow-1 vista-cliente">
        <main className="container my-4">{children}</main>
      </div>
    </div>
  );
}

export default AdmLayout;
