import './App.css'
import Header from './Components/Header/Header';
import CarList from './Components/CarList/carList';

const App: React.FC = () => {
  return (
    <div>
      <Header title="Async Race" />
      <CarList />
    </div>
  );
}


export default App
