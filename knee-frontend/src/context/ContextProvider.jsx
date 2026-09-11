import { useState } from "react";
import context from "./context";

const ContextProvider = ({ children }) => {
const [name,setName] = useState("")
  const [email, setEmail] = useState("");

  return (
    <context.Provider
      value={{
        name,
        setName,
        email,
        setEmail,
      }}
    >
      {children}
    </context.Provider>
  );
};

export default ContextProvider;
