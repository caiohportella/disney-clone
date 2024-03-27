import CarouselBannerWrapper from '@/components/CarouselBannerWrapper';
import MoviesCarousel from '@/components/MoviesCarousel'
import { getMovies } from '@/lib/getMovies'

export default async function Home() {
  const upcomingMovies = await getMovies('upcoming');
  const topRatedMovies = await getMovies('top_rated');
  const popularMovies = await getMovies('popular');

  return (
    <main>
      <CarouselBannerWrapper />

      <div className='flex flex-col space-y-2 xl:mt-48'>
      <MoviesCarousel movies={upcomingMovies} title='Upcoming' />
      <MoviesCarousel movies={topRatedMovies} title='Top Rated' />
      <MoviesCarousel movies={popularMovies} title='Popular' />
      </div>
    </main>
  )
}
