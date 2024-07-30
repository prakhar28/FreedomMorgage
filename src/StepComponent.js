import React from 'react';
import {View, Text} from 'react-native';
import styles from './styles';

const StepComponent = ({step}) => {
  return (
    <View style={styles.stepContent}>
      <Text style={styles.text}>{step.name}</Text>
      {/*Add More Data according to need*/}
    </View>
  );
};

export default StepComponent;
