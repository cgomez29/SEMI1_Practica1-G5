import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../../hooks/useRedux';

import { logout } from '../../redux/actions/auth';

export const Navbar = () => {
  const dispatch = useDispatch();
  const { userName } = useAppSelector((state) => state.auth);
  const onClick = () => {
    dispatch(logout());
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark shadow-5-strong">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/dashboard">
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
                  to="/dashboard"
                >
                  {userName}
                </NavLink>
              </li>
            </ul>
            <ul className="navbar-nav d-flex">
              <li className="nav-item ">
                <button className="nav-link button-link" onClick={onClick}>
                  <i className="fa-solid fa-right-from-bracket me-2"></i>
                  Cerrar Sesión
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};
