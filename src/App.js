import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Default from "./components/Default";

function App() {
  return (
    <BrowserRouter>
      <Default />
      <Main>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
