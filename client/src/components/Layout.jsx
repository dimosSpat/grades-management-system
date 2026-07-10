import Header from "./Header";
import Sidebar from "./Sidebar";
import "../styles/layout.css";

function Layout({ children }) {
  return (
    <>
      <Header />

      <div className="container">
        <Sidebar />

        {children}
      </div>
    </>
  );
}

export default Layout;