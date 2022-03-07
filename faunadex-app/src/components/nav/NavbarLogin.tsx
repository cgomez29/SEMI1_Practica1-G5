import { NavLink } from 'react-router-dom';
export const NavbarLogin = () => {
  const navigateTo = () => {
    window.open('https://github.com/cgomez29/SEMI1_Practica1-G5');
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark shadow-5-strong">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/auth/login">
            <i className="fa-solid fa-paw me-2"></i>
            Faunadex
          </NavLink>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? 'nav-link active' : 'nav-link'
                  }
                  to="/auth/login"
                >
                  Login
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? 'nav-link active' : 'nav-link'
                  }
                  to="/auth/register"
                >
                  Registro
                </NavLink>
              </li>
            </ul>
            <ul className="navbar-nav d-flex">
              <li className="nav-item ">
                <button className="nav-link button-link" onClick={navigateTo}>
                  <i className="fa-brands fa-github me-2"></i>
                  GITHUB
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};
