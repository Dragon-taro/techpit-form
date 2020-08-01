import React from "react";
import ReactDOM from "react-dom";
import firebase from "firebase";
import { Provider } from "react-redux";
import App from "./components/App";
import store from "./store";

const firebaseConfig = {
  apiKey: "AIzaSyC9azIYgJ0OVw_T8JHjqtsoy1ZDxxTbZVc",
  authDomain: "techpit-form-4e462.firebaseapp.com",
  databaseURL: "https://techpit-form-4e462.firebaseio.com",
  projectId: "techpit-form-4e462",
  storageBucket: "techpit-form-4e462.appspot.com",
  messagingSenderId: "99891951478",
  appId: "1:99891951478:web:a1cea43dc009d6b9e12c57"
};

firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
