import MoviesCarousel from "@/components/MoviesCarousel";
import OpenAIAzureSuggestion from "@/components/OpenAIAzureSuggestion";
import { getMovies, getSearchedMovies } from "@/lib/getMovies";
import { notFound } from "next/navigation";

type SearchProps = {
  params: {
    term: string;
  };
};

const SearchPage = async ({ params: { term } }: SearchProps) => {
  if (!term) notFound();

  const termToUse = decodeURI(term);
  const movies = await getSearchedMovies(termToUse);
  const popularMovies = await getMovies("popular");

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col space-y-5 mt-32 lg:mt-42">
        <h1 className="text-6xl font-bold px-10">Results for {termToUse}</h1>
        <OpenAIAzureSuggestion term={termToUse} />
        <MoviesCarousel title="Movies" movies={movies} isVertical />
        <MoviesCarousel title="You may also like:" movies={popularMovies} />
      </div>
    </div>
  );
};

export default SearchPage;
