const BASE_URL = 'https://api.jikan.moe/v4';

export async function fetchTopAnime(page = 1) {
  const response = await fetch(`${BASE_URL}/top/anime?page=${page}`);
  return response.json();
}

export async function fetchTopManga(page = 1) {
  const response = await fetch(`${BASE_URL}/top/manga?page=${page}`);
  return response.json();
}

export async function searchAnime(query: string, page = 1) {
  const response = await fetch(
    `${BASE_URL}/anime?q=${encodeURIComponent(query)}&page=${page}`
  );
  return response.json();
}

export async function searchManga(query: string, page = 1) {
  const response = await fetch(
    `${BASE_URL}/manga?q=${encodeURIComponent(query)}&page=${page}`
  );
  return response.json();
}

export async function getRandomAnime() {
  const response = await fetch(`${BASE_URL}/random/anime`);
  return response.json();
}

export async function getRandomManga() {
  const response = await fetch(`${BASE_URL}/random/manga`);
  return response.json();
}

export async function getMagazines(page = 1) {
  const response = await fetch(`${BASE_URL}/magazines?page=${page}`);
  return response.json();
}