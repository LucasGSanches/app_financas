import { StyleSheet, Text, View, Pressable } from 'react-native';
import { category_label } from '../constants/categories';

export default function Transaction({ transaction, on_edit }) {
  const is_income = transaction.type === "entrada";

  return (
    <View style={[styles.container, is_income ? styles.border_income : styles.border_expense]}>
      <View style={styles.info}>
        <Text style={styles.description}>{transaction.description}</Text>
        <Text style={styles.details}>
          {category_label(transaction.category)} • {new Date(transaction.date).toLocaleDateString('pt-BR')}
        </Text>
      </View>

      <View style={styles.right}>
        <Text style={[styles.value, is_income ? styles.income : styles.expense]}>
          {is_income ? "+" : "-"} R$ {transaction.value.toFixed(2)}
        </Text>
        <Pressable
          style={({ pressed }) => [styles.edit_button, pressed && { opacity: 0.6 }]}
          onPress={on_edit}
        >
          <Text style={styles.edit_text}>Editar</Text>
        </Pressable>
      </View>
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderLeftWidth: 6,
    elevation: 2, // sombra no Android
    shadowColor: '#000', // sombra no iOS
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  border_income: {
    borderLeftColor: '#2e9e5b',
  },
  border_expense: {
    borderLeftColor: '#d64545',
  },
  info: {
    flex: 1,
    marginRight: 10,
  },
  description: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
  },
  details: {
    fontSize: 12,
    color: '#777',
    marginTop: 4,
  },
  right: {
    alignItems: 'flex-end',
    gap: 6,
  },
  value: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  income: {
    color: '#2e9e5b',
  },
  expense: {
    color: '#d64545',
  },
  edit_button: {
    backgroundColor: '#e8ebff',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  edit_text: {
    color: '#3b4cca',
    fontWeight: 'bold',
    fontSize: 12,
  },
});