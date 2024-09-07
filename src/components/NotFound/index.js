import notFoundImg from "../../assets/images/not-found.png";

export function NotFound() {
  return (
    <div className="not-found">
      <img src={notFoundImg} alt="imagem de não encontrado" />
      <p>Desculpe, nenhum filme encontrado. Tente novamente!</p>
    </div>
  );
}
