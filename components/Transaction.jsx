import { StyleSheet, Text, View } from 'react-native';

export default function Transaction() {
  return (
    <View style={styles.container}>
      <Text>Quantia: R$ 5,00</Text>
      <Text>Entrada</Text>
      <Text>26/09/2026, 21:34</Text>
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'top',
  },
});