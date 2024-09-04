//import { CiLogout } from "react-icons/ci";
import { BiLogOutCircle } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useAuth } from "./context/auth";

function Navbar1() {
  const [auth] = useAuth();
  return (
    <>
      <div className="navbar" style={{position:"inherit"}}>
        <div>
        <Link to="/" style={{ textDecoration: "none" }}>
          <h2 className="logo">
            <span className="span">
              <img src="home.svg" style={{ paddingTop: "0.4rem" }} />
            </span>
            Order Mangement
          </h2>
        </Link>
        </div>
        <div className="logout">
          <h3>Gravitas Technosoft</h3>
        <h3>{auth?.user?.name}</h3>
        <Link to="/"><BiLogOutCircle style={{ fontSize: '2em' }}/></Link>
        </div>
      </div>
    </>
  );
}

export default Navbar1;
