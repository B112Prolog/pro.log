import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RecoilRoot } from 'recoil';
import TotalPage from './pages/TotalPage';
import './App.css';
import './assets/fonts.css';
import { CookiesProvider } from "react-cookie";
import styled from "styled-components";
// const Page = styled.div`
//   display: flex;
//   width: 1536px;
//   height: 737px;
//   background-color: gray;
// `

function App() {
  return (
    <CookiesProvider defaultSetOptions={{ path: "/" }}>
      <RecoilRoot>
        <TotalPage />
      </RecoilRoot>
    </CookiesProvider>
  );
}

export default App;
