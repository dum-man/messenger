import { useContext } from "react";
import { AppContext, Context } from "../context/AppContext";

const useAppContext = () => useContext(AppContext) as Context;

export default useAppContext;
