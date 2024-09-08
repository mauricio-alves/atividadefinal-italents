import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import styles from "./style.module.css";

export function DetailsMoviePage({ userList, setUserList }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [movie, setMovie] = useState([]);
  const [loading, setLoading] = useState(true);
  const baseImgUrl = "https://image.tmdb.org/t/p/w500";
  const [imgUrl, setImgUrl] = useState("");

  useEffect(() => {
    async function fetchUserList() {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=pt-BR`
        );
        setMovie(response.data);
        setImgUrl(
          `https://media.themoviedb.org/t/p/w1920_and_h800_multi_faces/${response.data.backdrop_path}`
        );

        setLoading(false);
      } catch (error) {
        console.log(error);
        navigate("error");
      }
    }
    fetchUserList();
  }, [id, navigate]);

  return loading ? (
    <div className="main">
      <h2>Carregando...</h2>
    </div>
  ) : (
    <>
      <div
        className={styles.container}
        style={{ backgroundImage: `url(${imgUrl})` }}
      >
        <div className={styles.image}>
          <img src={`${baseImgUrl}${movie.poster_path}`} alt={movie.title} />
        </div>
        <div className={styles.content}>
          <h2>
            <strong>{movie.title}</strong>
          </h2>
          <h3>{movie.tagline}</h3>
          <p>
            <strong>Lançamento:</strong>{" "}
            {new Date(movie.release_date).toLocaleDateString("pt-BR")}
          </p>
          <p className={styles.genres}>
            <strong>Gêneros:</strong>{" "}
            {movie.genres.map((genre) => {
              return <span key={genre.id}>{genre.name}.</span>;
            })}
          </p>
          <p>
            <strong>Nota: </strong>
            <span>{movie.vote_average.toFixed(1)}</span>
          </p>
          <p className={styles.text}>
            <strong>Sinopse: </strong>
            {movie.overview}
          </p>
          <div className="btns">
            <Link className="btnDetails" to={`/`}>
              Voltar para a Home
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
