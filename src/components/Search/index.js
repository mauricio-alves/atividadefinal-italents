export function Search({ search, setSearch }) {
  function handleChange(event) {
    setSearch(event.target.value);
  }

  return (
    <form className="search">
      <input
        id="input-name"
        name="name"
        value={search}
        type="text"
        onChange={handleChange}
        placeholder="Digite o título do filme aqui..."
      />
    </form>
  );
}
