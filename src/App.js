import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Home } from "./Pages/Home";
import { DetailsPage } from "./Pages/DetailsPage";
import { Routes, Route } from "react-router-dom";

export function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/details/:id" element={<DetailsPage />} />
      </Routes>
      <Footer />
    </>
  );
}
