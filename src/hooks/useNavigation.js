import React, {createContext, useContext, useState} from 'react';

const NavigationContext = createContext();

export const NavigationProvider = ({children}) => {
  const steps = [
    {name: 'Update Consent', key: 'update_consent'},
    {name: 'Update Mobile', key: 'update_mobile'},
    {name: 'Paperless Enrol', key: 'paperless_enrol'},
    {name: 'Recurring Payment', key: 'recurring_payment'},
  ];
  const [currentStep, setCurrentStep] = useState(0);
  const onNext = () => {
    console.log('inside curr', currentStep);
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
      console.log('after update curr', currentStep);
    }
  };

  const onPrev = () => {
    console.log('prev', currentStep);
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  const value = {
    steps,
    onNext,
    onPrev,
    currentStep,
  };

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};
