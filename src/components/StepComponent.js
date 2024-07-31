import React, {useRef, useEffect} from 'react';
import {View, Animated, PanResponder, StyleSheet, Text} from 'react-native';
import {useNavigation} from '../hooks/useNavigation';

const StepComponent = ({animateTransition, translateX}) => {
  const {currentStep, steps} = useNavigation();
  const isLastStep = currentStep === steps.length - 1;
  const isFirstStep = currentStep === 0;

  const handlePanResponderRelease = (e, {dx}) => {
    if (dx < -50 && !isLastStep) {
      animateTransition('next');
    } else if (dx > 50 && isFirstStep === false) {
      animateTransition('prev');
    } else {
      Animated.spring(translateX, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
    }
  };

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, {dx: translateX}], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: handlePanResponderRelease,
    }),
  ).current;

  return (
    <View style={styles.container}>
      {!isLastStep ? (
        <Animated.View
          {...panResponder.panHandlers}
          style={[styles.step, {transform: [{translateX}]}]}>
          <View style={styles.screen}>
            <Text style={styles.text}>{steps[currentStep].name}</Text>
          </View>
        </Animated.View>
      ) : (
        <View style={styles.container}>
          <Text style={styles.text}>Thank you for completing all steps</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  step: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  screen: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
    // backgroundColor: '#0ff',
    width: '100%',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
});

export default StepComponent;
