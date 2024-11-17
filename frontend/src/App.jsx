import { } from 'react';
import Home from './pages/Home';
import './assets/styles/main.scss';
import './App.css';
import { ReactFlowProvider } from '@xyflow/react';
import { ReactFlowContextProvider } from './context/ReactFlowProvider';

function App() {

  return (
    <ReactFlowProvider>
      <ReactFlowContextProvider>
        <Home />
      </ReactFlowContextProvider>
    </ReactFlowProvider >
  );
}

export default App;
