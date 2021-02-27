import "./App.css";

import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import logo from "./logo.svg";

export const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
};
export const Thing: React.FC = () => {
  const count = useSelector((state: any) => state.totalThumnailsHidden);
  const dispatch = useDispatch();
  return (
    <div>
      <button
        onClick={() => {
          dispatch({type: "SHOW_THUMBNAIL"});
        }}
      >
        open
      </button>
      <br />
      {count}
    </div>
  );
};
export const Thing2: React.FC = () => {
  const count = useSelector((state: any) => state.totalThumnailsHidden);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({type: "HIDE_THUMBNAIL"});
    return;
  }, [dispatch]);
  return (
    <div>
      <button
        onClick={() => {
          dispatch({type: "HIDE_THUMBNAIL"});
        }}
      >
        increase
      </button>
    </div>
  );
};
