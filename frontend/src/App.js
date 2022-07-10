import 'antd/dist/antd.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from './Components/Navbar/Navbar';
import Home from './Pages/Home/Home';
import Dashboard from './Pages/Dashboard/Post/Post';
import Create from './Pages/Dashboard/Create/Create';
import ContractProvider from './Provider/contractProvider'
import Feed from './Pages/Feed/Feed'

const App = () => {
  return (
    <div>
      <ContractProvider>
        <Router>
        <Navbar />
          <Switch>
            <Route exact path = "/" component = {Home} />
            <Route exact path = "/dashboard/create" component = {Create} />
            <Route exact path = "/dashboard" component={Dashboard} />
            <Route exact path= "/feed" component={Feed} />
          </Switch>
        </Router>
      </ContractProvider>
    </div>
  );
}

export default App;
