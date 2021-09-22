import React from "react";
import { NavLink, withRouter } from "react-router-dom";

const Nav = () => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink exact to="/">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to={{
              pathname: "/movies",
            }}
          >
            Movies
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
export default withRouter(Nav);
