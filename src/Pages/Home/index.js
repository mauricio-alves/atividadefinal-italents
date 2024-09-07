import { useState, useEffect } from "react";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { Search } from "../../components/Search";
import { Card } from "../../components/Card";
import { NotFound } from "../../components/NotFound";
import axios from "axios";

export function Home() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchList() {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=pt-BR&page=1`
        );
        setData(response.data.results);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    fetchList();
  }, []);

  return loading ? (
    <div className="main">
      <h2>Carregando...</h2>
    </div>
  ) : (
    <div>
      <Header />
      <div className="main">
        <div id="form">
          <h2>Catálogo de Filmes</h2>
          <Search search={search} setSearch={setSearch} />
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
                      <Card movie={movie} />
                    </div>
                  );
                })}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
