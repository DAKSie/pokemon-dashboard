import Navbar from "./components/Navbar";
import ClientWrapper from "./components/ClientWrapper";

async function fetchPokemon(limit = 20) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`);
  const list = await res.json();

  const detailed = await Promise.all(
    list.results.map(async (p) => {
      const res = await fetch(p.url);
      return res.json();
    })
  );

  return detailed;
}

export default async function Page() {
  const data = await fetchPokemon(20);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 px-6 py-12 sm:px-8 md:py-16">
        <div className="mx-auto max-w-7xl">
          <ClientWrapper data={data} />
        </div>
      </main>
    </>
  );
}