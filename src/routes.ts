import { createElement } from "react";
import { createBrowserRouter, useOutletContext } from "react-router-dom";
import App, { type AppOutletContext } from "./App";
import Home from "./pages/Home";
import Products from "./pages/Products";
import UseCases from "./pages/UseCases";
import Algorithm from "./pages/Algorithm";
import LegalPage from "./pages/LegalPage";
import NotFound from "./pages/NotFound";

function HomeRoute() {
  const { localUseCases } = useOutletContext<AppOutletContext>();
  return createElement(Home, { localUseCases });
}

function UseCasesRoute() {
  const { localUseCases, setLocalUseCases } =
    useOutletContext<AppOutletContext>();
  return createElement(UseCases, {
    localUseCases,
    setLocalUseCases,
  });
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: createElement(App),
    children: [
      { index: true, element: createElement(HomeRoute) },
      { path: "products", element: createElement(Products) },
      { path: "usecases", element: createElement(UseCasesRoute) },
      { path: "algoritmo", element: createElement(Algorithm) },
      { path: "privacy", element: createElement(LegalPage) },
      { path: "cookie", element: createElement(LegalPage) },
      { path: "termini", element: createElement(LegalPage) },
      { path: "*", element: createElement(NotFound) },
    ],
  },
]);
