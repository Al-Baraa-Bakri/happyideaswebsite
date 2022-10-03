import axios from "axios";
import { useState, useEffect } from "react";
import Dashboard from "./Dashboard";
import Login from "./Login";
import "./style/app.css";
function App() {
  const [admin, setAdmin] = useState(false);
  useEffect(() => {
    const adminPassword = localStorage.getItem("admin");
    console.log(adminPassword);
    const isPassowrdTrue = async () => {
      try {
        const { data } = await axios.post(
          `${import.meta.env.VITE_APP_ROOT}/api/admin/login`,
          {
            password: adminPassword,
          }
        );

        setAdmin(true);
      } catch (error) {
        console.log(error);
        setAdmin(false);
      }
    };
    isPassowrdTrue();
  }, []);

  return <>{admin ? <Dashboard /> : <Login />}</>;
}

export default App;
