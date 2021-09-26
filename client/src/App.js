import './App.css';
import AddItem from './components/Additem';
import ViewItems from './components/ViewItems';
import UpdateMany from './components/UpdateMany';
import UpdateOne from './components/UpdateOne';
import GetByStatus from './components/GetByStatus';
function App() {
  return (
    <div className="App">
      <AddItem/>
      <ViewItems/>
      <UpdateMany/>
      <UpdateOne/>
      <GetByStatus/>
    </div>
  );
}

export default App;
