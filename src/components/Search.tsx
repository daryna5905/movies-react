import { useState, type FormEvent } from "react";

interface Props {
  onSearch: (q: string) => void;
}

export default function Search({ onSearch }: Props) {
  const [val, setVal] = useState("");
  const submit = (e: FormEvent) => {
    e.preventDefault();
    onSearch(val);
  };
  return (
    <form onSubmit={submit} className="flex gap-2">
      <input
        value={val}
        onChange={(e) => setVal(e.target.value)}
        placeholder="Пошук фільмів..."
        className="flex-1 p-2 border rounded"
      />
      <button className="btn p-2 bg-blue-600 text-white rounded">Пошук</button>
    </form>
  );
}
