import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "@/app/store.ts";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
// formlarda edit modesa formu degerlerle doldur
// react forma gecebilirsin
// edit islemlerinde route params gonderme edit ile add ayni routeda olsun
// sutunlari parse et orn status true ise completed olacak
