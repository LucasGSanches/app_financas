import { StyleSheet, Text, View, Pressable, FlatList } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Transaction from '../components/Transaction';

export default function Home({ transactions, new_transaction, edit_transaction }) {
  function calculate_balance() {
    let balance = 0;
    for (const t of transactions) {
      if (t.type === "entrada") {
        balance = balance + t.value;
      } else {
        balance = balance - t.value;
      }
    }
    return balance;
  }

  const balance = calculate_balance();

  // mais recentes primeiro (cópia com [...] para não alterar o estado)
  const sorted_transactions = [...transactions].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <View style={styles.header}>
        <Text style={styles.header_label}>Saldo atual</Text>
        <Text style={[styles.balance, balance < 0 && styles.balance_negative]}>
          R$ {balance.toFixed(2)}
        </Text>
      </View>

      <Pressable
        style={({ pressed }) => [styles.add_button, pressed && styles.pressed]}
        onPress={new_transaction}
      >
        <Text style={styles.add_button_text}>+ Adicionar Transação</Text>
      </Pressable>

      <FlatList
        data={sorted_transactions}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <Transaction transaction={item} on_edit={() => edit_transaction(item)} />
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>Nenhuma transação ainda.</Text>
        }
      />
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f4f8',
  },
  header: {
    backgroundColor: '#3b4cca',
    paddingTop: 60,
    paddingBottom: 30,
    alignItems: 'center',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  header_label: {
    color: '#dfe3ff',
    fontSize: 14,
  },
  balance: {
    color: '#fff',
    fontSize: 34,
    fontWeight: 'bold',
    marginTop: 4,
  },
  balance_negative: {
    color: '#ffb4b4',
  },
  add_button: {
    backgroundColor: '#2e9e5b',
    marginHorizontal: 20,
    marginTop: 20,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  add_button_text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  pressed: {
    opacity: 0.7,
  },
  list: {
    padding: 20,
    gap: 12,
  },
  empty: {
    textAlign: 'center',
    color: '#888',
    marginTop: 30,
  },
});