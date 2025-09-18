import type { Genre, Country } from "../types";

interface Props {
  genres?: Genre[] | undefined;
  countries?: Country[] | undefined;
  filters: { genres: number[]; country: string; year: string };
  setFilters: (f: { genres: number[]; country: string; year: string }) => void;
}

export default function Filters({
  genres = [],
  countries = [],
  filters,
  setFilters,
}: Props) {
  const toggleGenre = (id: number) => {
    const next = filters.genres.includes(id)
      ? filters.genres.filter((g) => g !== id)
      : [...filters.genres, id];
    setFilters({ ...filters, genres: next });
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="font-semibold mb-2">Фільтри</h3>
      <div className="mb-4">
        <label className="block mb-1">Жанри</label>
        <div className="flex flex-wrap gap-2">
          {genres?.map((g) => (
            <button
              key={g.id}
              onClick={() => toggleGenre(g.id)}
              className={`px-2 py-1 rounded border ${
                filters.genres.includes(g.id) ? "bg-blue-100" : ""
              }`}
            >
              {g.name}
            </button>
          ))}
        </div>
      </div>
      <div className="mb-4">
        <label className="block mb-1">Країна (мова оригіналу)</label>
        <select
          className="w-full p-2 border rounded"
          value={filters.country}
          onChange={(e) => setFilters({ ...filters, country: e.target.value })}
        >
          <option value="">Усі</option>
          {countries?.map((c) => (
            <option key={c.iso_3166_1} value={c.iso_3166_1.toLowerCase()}>
              {c.english_name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block mb-1">Рік</label>
        <input
          type="number"
          value={filters.year}
          onChange={(e) => setFilters({ ...filters, year: e.target.value })}
          placeholder="Наприклад, 2024"
          className="w-full p-2 border rounded"
        />
      </div>
    </div>
  );
}
