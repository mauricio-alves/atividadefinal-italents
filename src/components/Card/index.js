export function Card({ movie }) {
  const baseImgUrl = "https://image.tmdb.org/t/p/w500";

  return (
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
      <div>
        <button>Detalhes</button>
        <button>Deletar</button>
      </div>
    </div>
  );
}
