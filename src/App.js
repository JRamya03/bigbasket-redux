
import './App.css';
  import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import { Routing } from './Component/Routing';
//import { Provider } from 'react-redux'
import {Store} from './Component/Store/Store';

// import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div >
      <Provider store={Store}>
        <Routing />
       </Provider>
    </div> 
  );
}

export default App;
