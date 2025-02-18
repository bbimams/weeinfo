'use client';

import { useState } from 'react';
import { searchAnime, searchManga } from '@/lib/api';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Image from 'next/image';
import Link from 'next/link';
import { Search as SearchIcon, Filter } from 'lucide-react';

type Status = 'all' | 'airing' | 'complete' | 'upcoming';
type Rating = 'all' | 'g' | 'pg' | 'pg13' | 'r17' | 'r' | 'rx';
type Season = 'all' | 'winter' | 'spring' | 'summer' | 'fall';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [type, setType] = useState('anime');
  const [sort, setSort] = useState('score');
  const [status, setStatus] = useState<Status>('all');
  const [rating, setRating] = useState<Rating>('all');
  const [season, setSeason] = useState<Season>('all');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;
    
    setLoading(true);
    try {
      const data = type === 'anime' 
        ? await searchAnime(query)
        : await searchManga(query);
      
      let filteredResults = [...data.data];

      // Apply filters
      if (status !== 'all') {
        filteredResults = filteredResults.filter(item => 
          item.status.toLowerCase().includes(status)
        );
      }

      if (type === 'anime' && rating !== 'all') {
        filteredResults = filteredResults.filter(item => 
          item.rating?.toLowerCase().includes(rating)
        );
      }

      if (type === 'anime' && season !== 'all') {
        filteredResults = filteredResults.filter(item => 
          item.season?.toLowerCase() === season
        );
      }

      // Apply sorting
      if (sort === 'score') {
        filteredResults.sort((a, b) => (b.score || 0) - (a.score || 0));
      } else if (sort === 'title') {
        filteredResults.sort((a, b) => a.title.localeCompare(b.title));
      } else if (sort === 'popularity') {
        filteredResults.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
      } else if (sort === 'rank') {
        filteredResults.sort((a, b) => (a.rank || 999999) - (b.rank || 999999));
      }
      
      setResults(filteredResults);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-8 px-4 sm:px-6 lg:px-8 mx-auto min-h-[calc(100vh-4rem)]">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-2xl mx-auto space-y-6 mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center">Search Anime & Manga</h1>
          
          <Tabs defaultValue="anime" onValueChange={(value) => setType(value)} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="anime">Anime</TabsTrigger>
              <TabsTrigger value="manga">Manga</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Search..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  className="w-full"
                />
              </div>
              <Button onClick={handleSearch} disabled={loading} className="whitespace-nowrap">
                <SearchIcon className="h-4 w-4 mr-2" />
                Search
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Select value={sort} onValueChange={setSort}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="score">Score</SelectItem>
                  <SelectItem value="title">Title</SelectItem>
                  <SelectItem value="popularity">Popularity</SelectItem>
                  <SelectItem value="rank">Rank</SelectItem>
                </SelectContent>
              </Select>

              <Select value={status} onValueChange={(value) => setStatus(value as Status)}>
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="airing">Airing</SelectItem>
                  <SelectItem value="complete">Completed</SelectItem>
                  <SelectItem value="upcoming">Upcoming</SelectItem>
                </SelectContent>
              </Select>

              {type === 'anime' && (
                <Select value={rating} onValueChange={(value) => setRating(value as Rating)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Rating" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Ratings</SelectItem>
                    <SelectItem value="g">G - All Ages</SelectItem>
                    <SelectItem value="pg">PG - Children</SelectItem>
                    <SelectItem value="pg13">PG-13 - Teens 13+</SelectItem>
                    <SelectItem value="r17">R - 17+</SelectItem>
                    <SelectItem value="r">R+ - Mild Nudity</SelectItem>
                    <SelectItem value="rx">Rx - Hentai</SelectItem>
                  </SelectContent>
                </Select>
              )}

              {type === 'anime' && (
                <Select value={season} onValueChange={(value) => setSeason(value as Season)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Season" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Seasons</SelectItem>
                    <SelectItem value="winter">Winter</SelectItem>
                    <SelectItem value="spring">Spring</SelectItem>
                    <SelectItem value="summer">Summer</SelectItem>
                    <SelectItem value="fall">Fall</SelectItem>
                  </SelectContent>
                </Select>
              )}
            </div>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-6">
            {[...Array(10)].map((_, i) => (
              <Card key={i} className="overflow-hidden animate-pulse">
                <div className="relative aspect-[2/3] bg-muted" />
                <div className="p-2 sm:p-4 space-y-2 sm:space-y-3">
                  <div className="h-3 sm:h-4 bg-muted rounded w-3/4" />
                  <div className="h-3 sm:h-4 bg-muted rounded w-1/2" />
                </div>
              </Card>
            ))}
          </div>
        ) : results.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-6">
            {results.map((item) => (
              <Link key={item.mal_id} href={`/${type}/${item.mal_id}`}>
                <Card className="overflow-hidden h-full group cursor-pointer transition-transform hover:scale-105">
                  <div className="relative aspect-[2/3]">
                    <Image
                      src={item.images.jpg.large_image_url}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-2 sm:p-4">
                    <h3 className="font-semibold text-sm sm:text-base line-clamp-2 mb-1 sm:mb-2">{item.title}</h3>
                    <div className="flex items-center justify-between text-xs sm:text-sm text-muted-foreground">
                      <span>Score: {item.score || 'N/A'}</span>
                      <span>#{item.rank || 'N/A'}</span>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        ) : query && (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">No results found</p>
          </div>
        )}
      </div>
    </div>
  );
}