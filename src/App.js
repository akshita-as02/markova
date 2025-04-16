import { ThemeProvider } from "styled-components";
import Login from "./components/auth/login";
import Register from "./components/auth/register";
import Home from "./components/home";
import Navbar from "./components/navbar";

// import Header from "./components/header";
// import Home from "./components/home";

import { AuthProvider } from "./contexts/authContext";
import { useRoutes } from "react-router-dom";
import { theme } from "./theme/theme";
import GenerateForm from "./components/generateForm";
import ResultsPage from "./components/results";

function App() {
  const routesArray = [
    {
      path: "*",
      element: <Home />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/home",
      element: <Home />,
    },
    {
      path: "/generate",
      element: <GenerateForm />,
    },
    {
      path: "/results",
      element: <ResultsPage />,
    },
  ];
  let routesElement = useRoutes(routesArray);
  return (
    <AuthProvider>
      {/* <ThemeProvider theme={theme}> */}
      <Navbar />
      <div className="w-full h-screen flex flex-col">{routesElement}</div>
      {/* </ThemeProvider> */}
    </AuthProvider>
  );
}

export default App;
