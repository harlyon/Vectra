import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import bg from '../../images/image.jpg'
import userContext from "../../context/userContext";

const Nav = () => {
  const { userData } = useContext(userContext);

  const history = useHistory();
  const logout = () => {
    userData({
      token: undefined,
      user: undefined,
    });
    localStorage.setItem("auth-token", "");
    history.push('/')
  };

  return (
      <nav id="sidebar">
        <div className="p-4 pt-5">
          <a
            href="#"
            className="img logo rounded-circle mb-5"
            style={{ backgroundImage: `url(${bg})` }}
          />
          <ul className="list-unstyled components mb-5">
            <li>
              <a href="#">Task Page</a>
            </li>
            <li>
              <a href="#">New Task</a>
            </li>
            <li>
              <a href="#">Finished Tasks</a>
            </li>
            <li>
              <a href="" onClick={logout}>Log out</a>
            </li>
          </ul>
        </div>
      </nav>
  );
};

export default Nav;