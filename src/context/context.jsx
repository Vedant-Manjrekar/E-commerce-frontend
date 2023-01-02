import React, { useState, useContext } from "react";
const AccountContext = React.createContext();
const AccountVisibilityContext = React.createContext();

// custom hook
export function useAccountVisibility() {
  return useContext(AccountContext);
}

// custom hook
export function useToggleAccountVisibility() {
  return useContext(AccountVisibilityContext);
}

// wrapper
export function ContextProvider({ children }) {
  // account state.
  const [toggleAccount, setToggleAccount] = useState(false);

  return (
    <AccountVisibilityContext.Provider value={setToggleAccount}>
      <AccountContext.Provider value={toggleAccount}>
        {children}
      </AccountContext.Provider>
    </AccountVisibilityContext.Provider>
  );
}
