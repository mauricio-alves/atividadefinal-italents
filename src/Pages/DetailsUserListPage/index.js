import { Link } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import { NotFound } from "../../components/NotFound";

export function DetailsUserListPage({ userList, setUserList }) {
  const baseImgUrl = "https://image.tmdb.org/t/p/w500";

  function handleRemoveMovie(movie) {
    const clone = [...userList];
    const updatedList = clone.filter((currentMovie) => {
      return movie !== currentMovie;
    });
    setUserList(updatedList);
    toast.error("Filme removido da sua lista!");
  }

  return (
    <>
      <div>
        <Toaster />
      </div>

      <div className="userList">
        <div>
          <h3>Esses são os filmes da sua lista!</h3>
        </div>
        <div className="btns">
          <Link className="btnDetails" to={`/`}>
            Voltar para a Home
          </Link>
        </div>
        <div>
          {userList.length === 0 ? (
            <NotFound />
          ) : (
            <div id="resultado">
              {userList.map((movie) => {
                return (
                  <div className="card" key={movie.title}>
                    <img
                      src={`${baseImgUrl}${movie.poster_path}`}
                      alt={movie.title}
                    />
                    <p>
                      <strong>{movie.title}</strong>
                    </p>
                    <p>
                      Lançamento:{" "}
                      {new Date(movie.release_date).toLocaleDateString("pt-BR")}
                    </p>
                    <p>
                      Nota: <strong>{movie.vote_average.toFixed(1)}</strong>
                    </p>
                    <div className="btns">
                      <Link className="btnDetails" to={`/details/${movie.id}`}>
                        Saiba mais
                      </Link>
                      <button
                        className="btnDelete"
                        onClick={() => {
                          handleRemoveMovie(movie);
                        }}
                      >
                        Remover da Lista
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
