import { StyleSheet } from 'react-native';

export const COLORS = {
  primary: '#007AFF',
  secondary: '#5856D6',
  white: '#FFFFFF',
  black: '#000000',
  background: '#F2F2F7',
};

export const COMMON_STYLES = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    color: COLORS.black,
  },
});
