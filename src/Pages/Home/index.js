import { useState, useEffect } from "react";
import { Search } from "../../components/Search";
import { Card } from "../../components/Card";
import { NotFound } from "../../components/NotFound";
import axios from "axios";
import { Link } from "react-router-dom";

export function Home({ userList, setUserList }) {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const baseImgUrl = "https://image.tmdb.org/t/p/w500";
  const lista = [
    { name: "now_playing", text: "Agora no cinema" },
    { name: "popular", text: "Populares" },
    { name: "top_rated", text: "Melhores avaliados" },
    { name: "upcoming", text: "Que estão por vir" },
  ];

  useEffect(() => {
    async function fetchList() {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${lista[1].name}?api_key=${process.env.REACT_APP_API_KEY}&language=pt-BR&page=1`
        );
        setData(response.data.results);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    fetchList();
  }, []);

  function handleSelect(name) {
    async function fetchNewList() {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${name}?api_key=${process.env.REACT_APP_API_KEY}&language=pt-BR&page=1`
        );
        setData(response.data.results);
      } catch (error) {
        console.log(error);
      }
    }
    fetchNewList();
  }

  return loading ? (
    <div className="main">
      <h2>Carregando...</h2>
    </div>
  ) : (
    <div>
      <div className="main">
        <div id="form">
          <h2>Catálogo de Filmes</h2>
          <Search search={search} setSearch={setSearch} />
        </div>
        <div>
          <h3>Quais filmes quer ver?</h3>
          <ul className="lista">
            {lista.map((item) => {
              return (
                <li
                  key={item.name}
                  onClick={() => {
                    handleSelect(item.name);
                  }}
                >
                  {item.text}
                </li>
              );
            })}
          </ul>
        </div>
        <div>
          <div>
            {userList.length > 0 && (
              <div id="listCard" key={userList[0].title}>
                <div>
                  <img
                    src={`${baseImgUrl}${userList[0].poster_path}`}
                    alt={userList[0].title}
                  />
                </div>
                <div>
                  <h4>Sua Lista</h4>
                  <Link to={`/details/userList`} className="btnDetails">
                    Detalhes
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div class="content">
        <div>
          {data.filter((movie) => {
            return movie.title.toLowerCase().includes(search.toLowerCase());
          }).length === 0 ? (
            <NotFound />
          ) : (
            <div id="resultado">
              {data
                .filter((movie) => {
                  return movie.title
                    .toLowerCase()
                    .includes(search.toLowerCase());
                })
                .map((movie) => {
                  return (
                    <div key={movie.title}>
                      <Card
                        movie={movie}
                        userList={userList}
                        setUserList={setUserList}
                      />
                    </div>
                  );
                })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
