
import './App.css';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import SignUp from './signup/SignUpPage';
import Login from './Login/LoginPage';
import BookFlight from './BookFlight/bookFlight';
import PageNotFound from './404/pagenotfound';

function App() {
  return (
    <div className="App">
    <BrowserRouter>
    <Routes>
     <Route path='/' element={<SignUp/>}/>
     <Route path='/login' element={<Login/>}/>
    <Route path='/book' element={<BookFlight/>}/>
    <Route path='*' element={<PageNotFound />} />
    
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
