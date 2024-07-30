import React, {createContext, useContext} from 'react';

const NavigationContext = createContext();

export const NavigationProvider = ({children, value}) => (
  <NavigationContext.Provider value={value}>
    {children}
  </NavigationContext.Provider>
);

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};
