import './App.css';
import {BrowserRouter , Route, Switch} from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import Home from './components/Home/Home';
import DetailGame from './components/DetailsGame/DetailsGame';
import CreateGame from './components/CreateGame/CreateGame';



function App() {
  return (
    <BrowserRouter>
      <Switch>
      <Route exact path = '/' component={LandingPage}/> 
      <Route exact path = '/home' component={Home}/> 
      <Route exact path = '/details/:id' component = {DetailGame}/>
      <Route exact path = '/creategame' component = {CreateGame}/>
      </Switch>
      </BrowserRouter>
  );
}

export default App;
