import { StyleSheet, Text, View, TextInput, Pressable, Platform, Alert, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from 'react';
import { CATEGORIES } from '../constants/categories';

export default function TransactionManagement({ return_home, save_transaction, delete_transaction, transaction }) {
  const is_editing = transaction !== undefined;

  // Se estiver editando, os campos começam com os dados da transação;
  // senão, começam vazios.
  const [description, setDescription] = useState(is_editing ? transaction.description : "");
  const [value, setValue] = useState(is_editing ? transaction.value.toString() : "");
  const [selectedType, setSelectedType] = useState(is_editing ? transaction.type : "");
  const [selectedCategory, setSelectedCategory] = useState(is_editing ? transaction.category : "");
  const [date, setDate] = useState(is_editing ? new Date(transaction.date) : new Date());
  const [showDate, setShowDate] = useState(false);

  const title = is_editing ? "Editar Transação" : "Adicionar Transação";

  const atChange = (event, choosen_date) => {
    setShowDate(Platform.OS === "ios");
    if (choosen_date) {
      setDate(choosen_date);
    }
  };

  function create_transaction() {
    // aceita tanto "10.50" quanto "10,50"
    const value_number = parseFloat(value.replace(",", "."));

    if (!description.trim()) {
      Alert.alert("Atenção", "Coloque uma descrição");
      return;
    }
    if (isNaN(value_number) || value_number <= 0) {
      Alert.alert("Atenção", "Coloque um valor válido");
      return;
    }
    if (!selectedType) {
      Alert.alert("Atenção", "Selecione um tipo de transação");
      return;
    }
    if (!selectedCategory) {
      Alert.alert("Atenção", "Selecione uma categoria");
      return;
    }

    save_transaction({
      // editando: mantém o mesmo id, para o save_transaction substituir a antiga
      id: is_editing ? transaction.id : Date.now().toString(),
      description: description.trim(),
      value: value_number,
      type: selectedType,
      category: selectedCategory,
      date: date.toISOString(),
    });

    return_home();
  }

  function confirm_delete() {
    Alert.alert("Excluir transação", "Deseja mesmo excluir esta transação?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        style: "destructive",
        onPress: () => {
          delete_transaction(transaction.id);
          return_home();
        },
      },
    ]);
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={return_home} hitSlop={10}>
          <Text style={styles.back}>‹ Voltar</Text>
        </Pressable>
        <Text style={styles.title}>{title}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.form}>
        <Text style={styles.label}>Descrição</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex.: Mercado"
          value={description}
          onChangeText={setDescription}
        />

        <Text style={styles.label}>Valor (R$)</Text>
        <TextInput
          style={styles.input}
          placeholder="0.00"
          value={value}
          onChangeText={setValue}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Tipo</Text>
        <View style={styles.picker}>
          <Picker
            selectedValue={selectedType}
            onValueChange={(itemValue) => setSelectedType(itemValue)}
          >
            <Picker.Item label="Selecione o tipo" value="" />
            <Picker.Item label="Entrada" value="entrada" />
            <Picker.Item label="Saída" value="saida" />
          </Picker>
        </View>

        <Text style={styles.label}>Categoria</Text>
        <View style={styles.picker}>
          <Picker
            selectedValue={selectedCategory}
            onValueChange={(itemValue) => setSelectedCategory(itemValue)}
          >
            <Picker.Item label="Selecione a categoria" value="" />
            {CATEGORIES.map((c) => (
              <Picker.Item key={c.value} label={c.label} value={c.value} />
            ))}
          </Picker>
        </View>

        <Text style={styles.label}>Data</Text>
        <Pressable
          style={({ pressed }) => [styles.input, pressed && { opacity: 0.6 }]}
          onPress={() => setShowDate(true)}
        >
          <Text style={styles.date_text}>{date.toLocaleDateString('pt-BR')}</Text>
        </Pressable>
        {showDate && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onValueChange={atChange}
            onDismiss={() => setShowDate(false)}
          />
        )}

        <Pressable
          style={({ pressed }) => [styles.button, styles.save_button, pressed && { opacity: 0.7 }]}
          onPress={create_transaction}
        >
          <Text style={styles.button_text}>Salvar</Text>
        </Pressable>

        {is_editing && (
          <Pressable
            style={({ pressed }) => [styles.button, styles.delete_button, pressed && { opacity: 0.7 }]}
            onPress={confirm_delete}
          >
            <Text style={styles.button_text}>Excluir</Text>
          </Pressable>
        )}
      </ScrollView>
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
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  back: {
    color: '#dfe3ff',
    fontSize: 16,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 8,
  },
  form: {
    padding: 20,
  },
  label: {
    fontSize: 14,
    color: '#555',
    marginTop: 14,
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#fff',
    borderColor: '#d0d4e0',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
  },
  date_text: {
    fontSize: 16,
    color: '#222',
  },
  picker: {
    backgroundColor: '#fff',
    borderColor: '#d0d4e0',
    borderWidth: 1,
    borderRadius: 8,
  },
  button: {
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  save_button: {
    backgroundColor: '#2e9e5b',
    marginTop: 28,
  },
  delete_button: {
    backgroundColor: '#d64545',
    marginTop: 12,
  },
  button_text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});