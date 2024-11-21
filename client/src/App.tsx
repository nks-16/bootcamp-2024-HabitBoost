import React, { useEffect, useState } from 'react';
import { fetchSampleData } from './services/apiService';
import Login from './login'

interface SampleData {
  id: number;
  name: string;
}

const App: React.FC = () => {
  const [data, setData] = useState<SampleData[]>([]);

  useEffect(() => {
    fetchSampleData().then(response => setData(response.data));
  }, []);

  return (
    <div>
      <Login/>
    </div>
    
  );
};

export default App;
