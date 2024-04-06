import { createContext } from "react";

interface GlobalContextType {
    monthIndex: number;
    setMonthIndex: (index: number) => void; 
}

const GlobalContext = createContext<GlobalContextType>({
    monthIndex: 0,
    setMonthIndex: () => {},
});

export default GlobalContext;
