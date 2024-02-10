import React, { useContext, useLayoutEffect, useEffect } from 'react';
import './App.css';
import { Outlet, Link, useRoutes, useNavigate, useParams } from "react-router-dom";
import Routers from './Routers';
import Context from './context/Context';
import { Fragment } from 'react';
function App() {
  const context = useContext(Context);
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  })
  let navigate = useNavigate();
  const Redirectpath = (path) => {
    navigate(path, { replace: true });
  }

  // The useRoutes() hook allows you to define your routes as JavaScript objects
  // instead of <Routes> and <Route> elements. This is really just a style
  // preference for those who prefer to not use JSX for their routes config.
  let element = useRoutes(Routers(Redirectpath));
  // https://www.youtube.com/watch?v=MUrlzF2L_Rc&t=20s
  return (
    <div>
      <Fragment>
      {element}
      </Fragment>
    </div>
  );
}

export default App;
