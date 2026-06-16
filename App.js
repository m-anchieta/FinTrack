import { useEffect } from 'react';
import Routes from './src/navigation';
import { initializeDatabase } from './src/database/database';

export default function App() {

  useEffect(() => {
    console.log('APP INICIOU');
    initializeDatabase();
  }, []);

  return <Routes />;
}