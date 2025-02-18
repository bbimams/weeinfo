import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Star, Users, Clock, Calendar, Link as LinkIcon } from 'lucide-react';

async function fetchDetails(type: string, id: string) {
  try {
    const response = await fetch(`https://api.jikan.moe/v4/${type}/${id}`, {
      next: { revalidate: 3600 }
    });
    const data = await response.json();
    
    if (!data.data) {
      return null;
    }
    
    return data.data;
  } catch (error) {
    console.error(`Error fetching ${type} details:`, error);
    return null;
  }
}

export default async function DetailsPage({
  params,
}: {
  params: { type: string; id: string };
}) {
  const validTypes = ['anime', 'manga'];
  if (!validTypes.includes(params.type)) {
    notFound();
  }

  const details = await fetchDetails(params.type, params.id);
  
  if (!details) {
    notFound();
  }

  const isAnime = params.type === 'anime';

  return (
    <div className="min-h-screen w-full px-4 sm:px-6 lg:px-8 py-6 md:py-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="relative h-[300px] sm:h-[400px] rounded-xl overflow-hidden mb-6 md:mb-8">
          <Image
            src={details.images.jpg.large_image_url}
            alt={details.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 line-clamp-2">{details.title}</h1>
            {details.title_english && details.title_english !== details.title && (
              <h2 className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-3 line-clamp-1">
                {details.title_english}
              </h2>
            )}
            <div className="flex flex-wrap gap-2">
              {details.genres?.map((genre: any) => (
                <Badge key={genre.mal_id} variant="secondary" className="text-xs sm:text-sm">
                  {genre.name}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6 md:mb-8">
          <Card className="p-3 sm:p-4">
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-yellow-500 shrink-0" />
              <span className="font-semibold text-sm sm:text-base">Score</span>
            </div>
            <p className="text-lg sm:text-2xl font-bold mt-1 sm:mt-2">{details.score || 'N/A'}</p>
          </Card>
          <Card className="p-3 sm:p-4">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 shrink-0" />
              <span className="font-semibold text-sm sm:text-base">Ranked</span>
            </div>
            <p className="text-lg sm:text-2xl font-bold mt-1 sm:mt-2">#{details.rank || 'N/A'}</p>
          </Card>
          <Card className="p-3 sm:p-4">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 shrink-0" />
              <span className="font-semibold text-sm sm:text-base">
                {isAnime ? 'Episodes' : 'Chapters'}
              </span>
            </div>
            <p className="text-lg sm:text-2xl font-bold mt-1 sm:mt-2">
              {isAnime ? details.episodes : details.chapters || 'N/A'}
            </p>
          </Card>
          <Card className="p-3 sm:p-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 shrink-0" />
              <span className="font-semibold text-sm sm:text-base">Status</span>
            </div>
            <p className="text-lg sm:text-2xl font-bold mt-1 sm:mt-2">{details.status}</p>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-[300px,1fr] gap-6 lg:gap-8">
          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="p-4">
              <h3 className="font-semibold mb-3">Information</h3>
              <div className="space-y-2 text-sm">
                {details.type && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Type:</span>
                    <span className="text-right">{details.type}</span>
                  </div>
                )}
                {details.source && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Source:</span>
                    <span className="text-right">{details.source}</span>
                  </div>
                )}
                {details.rating && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Rating:</span>
                    <span className="text-right">{details.rating}</span>
                  </div>
                )}
                {details.season && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Season:</span>
                    <span className="text-right">{details.season} {details.year}</span>
                  </div>
                )}
                {details.broadcast?.string && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Broadcast:</span>
                    <span className="text-right">{details.broadcast.string}</span>
                  </div>
                )}
                {details.authors?.length > 0 && (
                  <div>
                    <span className="text-muted-foreground block mb-1">Authors:</span>
                    <span className="block text-right">
                      {details.authors.map((author: any) => author.name).join(', ')}
                    </span>
                  </div>
                )}
                {details.serializations?.length > 0 && (
                  <div>
                    <span className="text-muted-foreground block mb-1">Serializations:</span>
                    <span className="block text-right">
                      {details.serializations.map((serial: any) => serial.name).join(', ')}
                    </span>
                  </div>
                )}
                {details.studios?.length > 0 && (
                  <div>
                    <span className="text-muted-foreground block mb-1">Studios:</span>
                    <span className="block text-right">
                      {details.studios.map((studio: any) => studio.name).join(', ')}
                    </span>
                  </div>
                )}
              </div>
            </Card>

            <Card className="p-4">
              <h3 className="font-semibold mb-3">Statistics</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Score:</span>
                  <span>{details.score} ({details.scored_by?.toLocaleString()} users)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Ranked:</span>
                  <span>#{details.rank}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Popularity:</span>
                  <span>#{details.popularity}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Members:</span>
                  <span>{details.members?.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Favorites:</span>
                  <span>{details.favorites?.toLocaleString()}</span>
                </div>
              </div>
            </Card>

            {details.external?.length > 0 && (
              <Card className="p-4">
                <h3 className="font-semibold mb-3">External Links</h3>
                <div className="space-y-2">
                  {details.external.map((link: any) => (
                    <a
                      key={link.url}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm hover:text-primary transition-colors"
                    >
                      <LinkIcon className="h-4 w-4 shrink-0" />
                      <span className="line-clamp-1">{link.name}</span>
                    </a>
                  ))}
                </div>
              </Card>
            )}

            {details.streaming?.length > 0 && (
              <Card className="p-4">
                <h3 className="font-semibold mb-3">Streaming Platforms</h3>
                <div className="space-y-2">
                  {details.streaming.map((platform: any) => (
                    <a
                      key={platform.url}
                      href={platform.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm hover:text-primary transition-colors"
                    >
                      <LinkIcon className="h-4 w-4 shrink-0" />
                      <span className="line-clamp-1">{platform.name}</span>
                    </a>
                  ))}
                </div>
              </Card>
            )}
          </div>

          {/* Main Content */}
          <div className="space-y-6">
            <Card className="p-4 sm:p-6">
              <h2 className="text-xl sm:text-2xl font-bold mb-4">Synopsis</h2>
              <p className="whitespace-pre-line text-sm sm:text-base">{details.synopsis}</p>
              
              {details.background && (
                <>
                  <Separator className="my-6" />
                  <h2 className="text-xl sm:text-2xl font-bold mb-4">Background</h2>
                  <p className="whitespace-pre-line text-sm sm:text-base">{details.background}</p>
                </>
              )}
            </Card>

            {details.relations?.length > 0 && (
              <Card className="p-4 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-bold mb-4">Related Content</h2>
                <div className="space-y-4">
                  {details.relations.map((relation: any) => (
                    <div key={relation.relation}>
                      <h3 className="font-semibold text-base sm:text-lg mb-2">
                        {relation.relation}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {relation.entry.map((entry: any) => (
                          <Badge key={entry.mal_id} variant="secondary" className="text-xs sm:text-sm">
                            {entry.name}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {details.theme?.openings?.length > 0 && (
              <Card className="p-4 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-bold mb-4">Opening Themes</h2>
                <div className="space-y-2">
                  {details.theme.openings.map((opening: string, index: number) => (
                    <p key={index} className="text-sm sm:text-base">
                      {opening}
                    </p>
                  ))}
                </div>
              </Card>
            )}

            {details.theme?.endings?.length > 0 && (
              <Card className="p-4 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-bold mb-4">Ending Themes</h2>
                <div className="space-y-2">
                  {details.theme.endings.map((ending: string, index: number) => (
                    <p key={index} className="text-sm sm:text-base">
                      {ending}
                    </p>
                  ))}
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}