import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Home } from "./Pages/Home";
import { DetailsMoviePage } from "./Pages/DetailsMoviePage";
import { DetailsUserListPage } from "./Pages/DetailsUserListPage";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";

export function App() {
  const [userList, setUserList] = useState([]);

  return (
    <>
      <Header />
      <Routes>
        <Route
          path="/"
          element={<Home userList={userList} setUserList={setUserList} />}
        />
        <Route path="/details/:id" element={<DetailsMoviePage />} />
        <Route
          path="/details/userList"
          element={
            <DetailsUserListPage
              userList={userList}
              setUserList={setUserList}
            />
          }
        />
      </Routes>
      <Footer />
    </>
  );
}
