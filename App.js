import { useState } from 'react';
import Home from './pages/Home';
import TransactionManagement from './pages/TransactionManagement';

export default function App() {
  const [page, setPage] = useState("home");
  const [transactions, setTransactions] = useState([]);
  // transação sendo editada (undefined = criando uma nova)
  const [editingTransaction, setEditingTransaction] = useState(undefined);

  function save_transaction(new_transaction) {
    setTransactions((old_transactions) => {
      if (old_transactions.some((t) => t.id === new_transaction.id)) {
        return old_transactions.map((t) => (t.id === new_transaction.id ? new_transaction : t));
      }
      return [...old_transactions, new_transaction];
    });
  }

  function delete_transaction(id) {
    setTransactions((old_transactions) => old_transactions.filter((t) => t.id !== id));
  }

  function open_new_transaction() {
    setEditingTransaction(undefined);
    setPage("transactionManagement");
  }

  function open_edit_transaction(transaction) {
    setEditingTransaction(transaction);
    setPage("transactionManagement");
  }

  function return_home() {
    setEditingTransaction(undefined);
    setPage("home");
  }

  if (page === "home") {
    return (
      <Home
        transactions={transactions}
        new_transaction={open_new_transaction}
        edit_transaction={open_edit_transaction}
      />
    );
  }

  return (
    <TransactionManagement
      transaction={editingTransaction}
      return_home={return_home}
      save_transaction={save_transaction}
      delete_transaction={delete_transaction}
    />
  );
}