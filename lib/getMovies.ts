import { SearchResults } from "@/typings";

async function fetchFromTMBD(url: URL, cacheTime?: number) {
  url.searchParams.set("include_adult", "false");
  url.searchParams.set("include_video", "false");
  url.searchParams.set("sort_by", "popularity.desc");
  url.searchParams.set("language", "en");
  url.searchParams.set("page", "1");

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
    },
    next: {
      revalidate: cacheTime || 60 * 60 * 24,
    },
  };

  const res = await fetch(url.toString(), options);
  const data = (await res.json()) as SearchResults;

  return data;
}

export async function getMovies(category?: string) {
  const url = new URL(`https://api.themoviedb.org/3/movie/${category}`);
  const data = await fetchFromTMBD(url);

  return data.results;
}

export async function getDiscoverMovies(id?: string, keywords?: string) {
  const url = new URL(`https://api.themoviedb.org/3/discover/movie`);
  id && url.searchParams.set("with_genres", id);
  keywords && url.searchParams.set("with_keywords", keywords);

  const data = await fetchFromTMBD(url);

  return data.results;
}

export async function getSearchedMovies(term: string) {
  const url = new URL(`https://api.themoviedb.org/3/search/movie`);
  url.searchParams.set("query", term);

  const data = await fetchFromTMBD(url);

  return data.results;
}
