import React, {useState, useRef} from 'react';
import {SafeAreaView, View, Button, Animated, PanResponder} from 'react-native';
import StepComponent from './StepComponent';
import styles from './styles';

const steps = [
  {name: 'Update Consent', key: 'update_consent'},
  {name: 'Update Mobile', key: 'update_mobile'},
  {name: 'Paperless Enrol', key: 'paperless_enrol'},
  {name: 'Recurring Payment', key: 'recurring_payment'},
];

const App = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const translateX = useRef(new Animated.Value(0)).current;
  const isAnimating = useRef(false);

  const handleNext = () => {
    if (isAnimating.current) {
      return;
    }
    isAnimating.current = true;
    Animated.timing(translateX, {
      toValue: -1000,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setCurrentStep(prev => (prev + 1) % steps.length);
      translateX.setValue(1000);
      Animated.timing(translateX, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => {
        isAnimating.current = false;
      });
    });
  };

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event([null, {dx: translateX}], {
      useNativeDriver: false,
    }),
    onPanResponderRelease: (e, {dx}) => {
      if (dx < -50) {
        handleNext();
      } else {
        Animated.spring(translateX, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
      }
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View
        {...panResponder.panHandlers}
        style={[styles.step, {transform: [{translateX}]}]}>
        <StepComponent step={steps[currentStep]} />
      </Animated.View>
      <View style={styles.footer}>
        <Button title="Next" onPress={handleNext} />
      </View>
    </SafeAreaView>
  );
};

export default App;
