import './App.scss';
import { Route, Routes } from 'react-router';
import Header from './components/Header';
import Main from './components/Main';
import Login from './components/Login';
import Success from './components/Success';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/registration" element={<Login />} />
        <Route path="/success" element={<Success />} />
        <Route path="/" element={<Main />} />
      </Routes>
    </>
  );
}

export default App;
