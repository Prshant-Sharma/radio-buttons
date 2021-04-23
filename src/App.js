import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import AddFood from './Components/AddFood';
import ItemList from './Components/ItemList';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path='/' component={AddFood}></Route>
          <Route exact path='/food-items-list' component={ItemList}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
