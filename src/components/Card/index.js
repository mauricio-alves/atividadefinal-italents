import { Link } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";

export function Card({ movie, userList, setUserList }) {
  const baseImgUrl = "https://image.tmdb.org/t/p/w500";

  function handleAddMovie(movie) {
    if (userList.includes(movie)) {
      toast.error("Filme já está na sua lista!");
      return;
    }
    setUserList([...userList, movie]);
    toast.success("Filme adicionado à sua lista!");
  }

  return (
    <>
      <div>
        <Toaster />
      </div>
      <div className="card">
        <img src={`${baseImgUrl}${movie.poster_path}`} alt={movie.title} />
        <p>
          <strong>{movie.title}</strong>
        </p>
        <p>
          Lançamento: {new Date(movie.release_date).toLocaleDateString("pt-BR")}
        </p>
        <p>
          Nota: <strong>{movie.vote_average.toFixed(1)}</strong>
        </p>
        <div className="btns">
          <Link className="btnDetails" to={`/details/${movie.id}`}>
            Saiba mais
          </Link>
          <button
            className="btnAdd"
            onClick={() => {
              handleAddMovie(movie);
            }}
          >
            Adicionar a lista
          </button>
        </div>
      </div>
    </>
  );
}
