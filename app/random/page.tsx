'use client';

import { useState, useEffect } from 'react';
import { getRandomAnime, getRandomManga } from '@/lib/api';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shuffle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function RandomPage() {
  const [content, setContent] = useState<any>(null);
  const [type, setType] = useState<'anime' | 'manga'>('anime');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRandom = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = type === 'anime' 
        ? await getRandomAnime()
        : await getRandomManga();
      setContent(data.data);
    } catch (error) {
      console.error('Error fetching random content:', error);
      setError('Failed to fetch content. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRandom();
  }, [type]);

  if (error) {
    return (
      <div className="container py-12 px-4 sm:px-6 lg:px-8 mx-auto min-h-[calc(100vh-4rem)]">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-lg text-destructive mb-4">{error}</p>
          <Button onClick={fetchRandom}>Try Again</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8 px-4 sm:px-6 lg:px-8 mx-auto min-h-[calc(100vh-4rem)]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold">Random {type.charAt(0).toUpperCase() + type.slice(1)}</h1>
          <div className="flex flex-wrap justify-center gap-2">
            <Button
              variant={type === 'anime' ? 'default' : 'outline'}
              onClick={() => setType('anime')}
              disabled={loading}
            >
              Anime
            </Button>
            <Button
              variant={type === 'manga' ? 'default' : 'outline'}
              onClick={() => setType('manga')}
              disabled={loading}
            >
              Manga
            </Button>
            <Button onClick={fetchRandom} disabled={loading}>
              <Shuffle className="h-4 w-4 mr-2" />
              {loading ? 'Loading...' : 'Shuffle'}
            </Button>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-6">
            {[...Array(5)].map((_, i) => (
              <Card key={i} className="overflow-hidden animate-pulse">
                <div className="relative aspect-[2/3] bg-muted" />
                <div className="p-2 sm:p-4 space-y-2">
                  <div className="h-3 sm:h-4 bg-muted rounded w-3/4" />
                  <div className="h-3 sm:h-4 bg-muted rounded w-1/2" />
                </div>
              </Card>
            ))}
          </div>
        ) : content ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-6">
            <Link href={`/${type}/${content.mal_id}`}>
              <Card className="overflow-hidden h-full group cursor-pointer transition-transform hover:scale-105">
                <div className="relative aspect-[2/3]">
                  <Image
                    src={content.images.jpg.large_image_url}
                    alt={content.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                <div className="p-2 sm:p-4">
                  <h3 className="font-semibold text-sm sm:text-base line-clamp-2 mb-1 sm:mb-2">{content.title}</h3>
                  <div className="flex items-center justify-between text-xs sm:text-sm text-muted-foreground">
                    <span>Score: {content.score || 'N/A'}</span>
                    <span>#{content.rank || 'N/A'}</span>
                  </div>
                </div>
              </Card>
            </Link>

            {/* Additional information card */}
            <div className="col-span-2 sm:col-span-3 md:col-span-4 lg:col-span-4">
              <Card className="h-full p-4 sm:p-6">
                <div className="space-y-4">
                  {content.title_english && content.title_english !== content.title && (
                    <p className="text-lg text-muted-foreground">{content.title_english}</p>
                  )}

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div>
                      <h3 className="font-semibold">Score</h3>
                      <p>{content.score || 'N/A'}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold">Rank</h3>
                      <p>#{content.rank || 'N/A'}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold">{type === 'anime' ? 'Episodes' : 'Chapters'}</h3>
                      <p>{type === 'anime' ? content.episodes : content.chapters || 'N/A'}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold">Status</h3>
                      <p>{content.status}</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Synopsis</h3>
                    <p className="text-muted-foreground">{content.synopsis || 'No synopsis available.'}</p>
                  </div>

                  {content.genres && content.genres.length > 0 && (
                    <div>
                      <h3 className="font-semibold mb-2">Genres</h3>
                      <div className="flex flex-wrap gap-2">
                        {content.genres.map((genre: any) => (
                          <span key={genre.mal_id} className="bg-secondary px-2 py-1 rounded-md text-sm">
                            {genre.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}