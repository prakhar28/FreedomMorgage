import React, {useContext, useRef, useState} from 'react';
import {SafeAreaView, View, Button, StyleSheet, Animated} from 'react-native';
import StepComponent from './src/components/StepComponent';
import {NavigationProvider, useNavigation} from './src/hooks/useNavigation';

const App = () => {
  return (
    <NavigationProvider>
      <MainApp />
    </NavigationProvider>
  );
};

const MainApp = () => {
  const {steps, onNext, onPrev, currentStep} = useNavigation();
  const translateX = useRef(new Animated.Value(0)).current;
  const isLastStep = currentStep === steps.length - 1;

  const animateTransition = direction => {
    const toValue = direction === 'next' ? -500 : 500;
    Animated.timing(translateX, {
      toValue,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      direction === 'next' ? onNext() : onPrev();
      translateX.setValue(direction === 'next' ? 1000 : -1000);
      Animated.timing(translateX, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });
  };
  return (
    <SafeAreaView style={styles.container}>
      <StepComponent
        animateTransition={animateTransition}
        translateX={translateX}
      />
      <View style={styles.footer}>
        {/*{!isFirstStep && (*/}
        {/*  <Button title="Previous" onPress={() => animateTransition('prev')} />*/}
        {/*)}*/}
        {!isLastStep && (
          <Button title="Next" onPress={() => animateTransition('next')} />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#f0f0f0',
  },
  footer: {
    padding: 20,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});

export default App;
