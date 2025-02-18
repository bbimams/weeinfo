import { fetchTopAnime, fetchTopManga } from '@/lib/api';
import { Card } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';

export const revalidate = 3600; // Cache the page for 1 hour

export default async function Home() {
  try {
    const [topAnime, topManga] = await Promise.all([
      fetchTopAnime().catch(() => null),
      fetchTopManga().catch(() => null),
    ]);

    if (!topAnime?.data && !topManga?.data) {
      throw new Error('Failed to fetch all data');
    }

    return (
      <div className="container py-8 px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="max-w-7xl mx-auto space-y-12">
          {topAnime?.data ? (
            <section>
              <h2 className="text-2xl sm:text-3xl font-bold mb-6">Top Anime</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-6">
                {topAnime.data.slice(0, 10).map((anime: any) => (
                  <Link key={anime.mal_id} href={`/anime/${anime.mal_id}`}>
                    <Card className="overflow-hidden h-full group cursor-pointer transition-transform hover:scale-105">
                      <div className="relative aspect-[2/3]">
                        <Image
                          src={anime.images.jpg.large_image_url}
                          alt={anime.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-2 sm:p-4">
                        <h3 className="font-semibold text-sm sm:text-base line-clamp-2 mb-1 sm:mb-2">{anime.title}</h3>
                        <div className="flex items-center justify-between text-xs sm:text-sm text-muted-foreground">
                          <span>Score: {anime.score || 'N/A'}</span>
                          <span>#{anime.rank || 'N/A'}</span>
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </section>
          ) : null}

          {topManga?.data ? (
            <section>
              <h2 className="text-2xl sm:text-3xl font-bold mb-6">Top Manga</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-6">
                {topManga.data.slice(0, 10).map((manga: any) => (
                  <Link key={manga.mal_id} href={`/manga/${manga.mal_id}`}>
                    <Card className="overflow-hidden h-full group cursor-pointer transition-transform hover:scale-105">
                      <div className="relative aspect-[2/3]">
                        <Image
                          src={manga.images.jpg.large_image_url}
                          alt={manga.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-2 sm:p-4">
                        <h3 className="font-semibold text-sm sm:text-base line-clamp-2 mb-1 sm:mb-2">{manga.title}</h3>
                        <div className="flex items-center justify-between text-xs sm:text-sm text-muted-foreground">
                          <span>Score: {manga.score || 'N/A'}</span>
                          <span>#{manga.rank || 'N/A'}</span>
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </section>
          ) : null}

          {(!topAnime?.data || !topManga?.data) && (
            <section>
              <h2 className="text-2xl sm:text-3xl font-bold mb-6">Partial Data Available</h2>
              <p>Some content might be temporarily unavailable. Please refresh to try again.</p>
            </section>
          )}
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error fetching data:', error);
    return (
      <div className="container py-8 px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="max-w-7xl mx-auto space-y-12">
          <section>
            <h2 className="text-2xl sm:text-3xl font-bold mb-6">Error</h2>
            <p>Failed to fetch data. Please try again later.</p>
          </section>
        </div>
      </div>
    );
  }
}