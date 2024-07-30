import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#f0f0f0',
  },
  step: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepContent: {
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0ff',
    flex: 1,
    width: '100%',
    paddingVertical: 20,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  footer: {
    padding: 20,
    backgroundColor: '#fff',
  },
});

export default styles;
