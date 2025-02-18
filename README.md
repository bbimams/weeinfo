# WeeInfo

WeeInfo is a Netflix-style anime and manga website built using Next.js, Jikan API, and shadcn components. This project provides a platform to discover, search, and explore anime and manga series with a sleek and responsive design.

# Tech Stack

WeeInfo is built using the following technologies:

- **Next.js**: A React framework for building fast and user-friendly web applications.
- **TypeScript**: A strongly typed programming language that builds on JavaScript, giving you better tooling at any scale.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
- **Jikan API**: An unofficial MyAnimeList API for accessing anime and manga data.
- **shadcn UI**: A component library for building modern web applications.
- **React Icons**: A collection of popular icons as React components.
- **Axios**: A promise-based HTTP client for making API requests.
- **Radix UI**: A set of low-level, accessible UI components for building web applications.
- **Next Themes**: A library for managing themes in Next.js applications.
- **Lucide React**: A collection of simple and beautiful SVG icons for React.

These technologies work together to provide a robust and scalable platform for anime and manga enthusiasts.

## Features

- **Netflix-style UI**: Full-width hero banner, horizontal scrolling content rows, and hover effects for cards.
- **Responsive Design**: Mobile-first approach with adaptive layouts for tablets and desktops.
- **Jikan API Integration**: Efficient API calls with error handling and caching for improved performance.
- **Search Functionality**: Real-time search results with filters for type, genre, and status.
- **Random Content**: One-click access to random anime/manga with optional filters.

## API Integration

The project uses the Jikan API to fetch anime and manga data. The API utility functions are defined in `lib/api.ts`:

- `fetchTopAnime()`: Fetch top-rated anime
- `fetchTopManga()`: Fetch top-rated manga
- `searchAnime(query)`: Search anime
- `searchManga(query)`: Search manga
- `getRandomAnime()`: Get random anime
- `getRandomManga()`: Get random manga
- `getDetails(type, id)`: Get specific anime/manga details

# Data Flow
The WeeInfo application follows a structured data flow to efficiently fetch, process, and display anime and manga information. Here's an overview of the data flow within the application:

1. **API Requests**:
   - The application uses the Jikan API to fetch data related to anime and manga.
   - API utility functions are defined in `lib/api.ts` to handle requests and responses.
   - Functions like `fetchTopAnime`, `fetchTopManga`, `getRandomAnime`, and `getDetails` are used to retrieve data from the API.
     
2. **Data Fetching**:
   - Data fetching is performed in server components for static data and client components for dynamic data.
   - The `Home` component fetches top anime and manga data using `fetchTopAnime` and `fetchTopManga`.

3. **State Management**:
   - Client-side components use React's `useState` and `useEffect` hooks to manage and update state.
   - The `RandomPage` component uses state to handle random content fetching and display.


4. **Data Display**:
   - Data is displayed using reusable UI components such as `Card`, `Badge`, and `Button`.
   - The `DetailsPage` component displays detailed information about a specific anime or manga.

5. **User Interaction**:
   - Users can interact with the application through navigation, search, and random content features.
   - The `Navbar` component provides navigation links to different sections of the application.
   - Example:

6. **Styling and Theming**:
   - Tailwind CSS is used for styling, with a focus on responsive design and dark mode support.
   - Global styles are defined in `app/globals.css`, and theming is managed by the `ThemeProvider`.


This data flow ensures that the application is efficient, responsive, and user-friendly, providing a seamless experience for anime and manga enthusiasts.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.