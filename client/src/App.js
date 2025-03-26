import './App.css';
import ProctectedRoute from './components/ProctectedRoute';
import Home from './pages/Home/home';
import Login from './pages/Login';
import Register from './pages/Register';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {Provider} from "react-redux";
import store from "./redux/store";
import Admin from './pages/Admin';
import Profile from './pages/User';
import Partner from './pages/Partner';
import SingleMovie from './pages/Home/singleMovie';
import BookShow from './pages/Home/bookShow';
import Forget from "./pages/Profile/ForgotPassword";
import Reset from "./pages/Profile/ResetPassword";
function App() {
  return (
    <div >
      <Provider store ={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<ProctectedRoute><Home /></ProctectedRoute>} />
          <Route path='/admin' element={<ProctectedRoute><Admin /></ProctectedRoute>} />
          <Route path='/profile' element={<ProctectedRoute><Profile /></ProctectedRoute>} />
          <Route path='/partner' element={<ProctectedRoute><Partner /></ProctectedRoute>} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/movie/:id' element={<ProctectedRoute><SingleMovie /></ProctectedRoute> } />
          <Route path="/book-show/:id" element={ <ProctectedRoute> <BookShow /> </ProctectedRoute> } />
          <Route path="/forget" element={<Forget />} />
          <Route path="/reset/:email" element={<Reset />} />
        </Routes>
      </BrowserRouter>
      </Provider>
    </div>
  );  
}

export default App;
