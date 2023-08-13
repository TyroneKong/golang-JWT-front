import { useEffect, useState } from "react";

const useToken = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  return { token, setToken };
};

export default useToken;
