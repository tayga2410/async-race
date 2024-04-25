import './App.css'
import Header from './Components/Header/Header';
import Garage from './Components/Garage/Garage';

const App: React.FC = () => {
  return (
    <div>
      <Header title="Async Race" />
      <Garage />
    </div>
  );
}


export default App
