import { useState } from 'react';
import Home from './pages/Home';

export default function App() {
  const [page, setPage] = useState("home");
  return (
    <Home/>
  );
}

