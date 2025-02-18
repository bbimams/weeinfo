import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import Link from 'next/link';

async function fetchMagazines() {
  try {
    const response = await fetch('https://api.jikan.moe/v4/magazines?limit=25', {
      next: { revalidate: 3600 }
    });
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching magazines:', error);
    return [];
  }
}

export default async function MagazinePage() {
  const magazines = await fetchMagazines();

  return (
    <div className="container py-8 px-4 sm:px-6 lg:px-8 mx-auto min-h-[calc(100vh-4rem)]">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">Manga Magazines</h1>
          <p className="text-muted-foreground">
            Discover popular Japanese manga magazines and their published series.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {magazines.map((magazine: any) => (
            <Card key={magazine.mal_id} className="overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-bold mb-2">{magazine.name}</h2>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                  <span>{magazine.count} series</span>
                </div>
                {magazine.url && (
                  <Link 
                    href={magazine.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline"
                  >
                    View on MyAnimeList
                  </Link>
                )}
              </div>
            </Card>
          ))}
        </div>

        {magazines.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">
              No magazines found. Please try again later.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}