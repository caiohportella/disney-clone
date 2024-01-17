import { getDiscoverMovies } from "@/lib/getMovies";
import CarouselBanner from "./CarouselBanner";

type CarouselBannerWrapperProps = {
  id?: string;
  keywords?: string;
};

const CarouselBannerWrapper = async ({
  id,
  keywords,
}: CarouselBannerWrapperProps) => {
    const movies = await getDiscoverMovies(id, keywords);
  return <CarouselBanner movies={movies} />;
};

export default CarouselBannerWrapper;
