import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

type Meme = {
  id: string;
  imageUrl: string;
  caption: string;
  likes: number;
  uploadedAt: string;
};

const MemeExplorer = () => {
  const [memes, setMemes] = useState<Meme[]>([]);
  const [filteredMemes, setFilteredMemes] = useState<Meme[]>([]);
  const [search, setSearch] = useState<string>("");
  const [sortType, setSortType] = useState<string>("latest");
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    // Fetch memes (replace with API call if needed)
    const storedMemes: Meme[] = JSON.parse(localStorage.getItem("uploadedMemes") || "[]");
    setMemes(storedMemes);
    setFilteredMemes(storedMemes);
  }, []);

  // Filter & Sort Memes
  useEffect(() => {
    let tempMemes = [...memes];

    // Search
    if (search) {
      tempMemes = tempMemes.filter((meme) => meme.caption.toLowerCase().includes(search.toLowerCase()));
    }

    // Filter
    if (filter !== "all") {
      tempMemes = tempMemes.filter((meme) => meme.caption.toLowerCase().includes(filter));
    }

    // Sort
    tempMemes.sort((a, b) => {
      if (sortType === "likes") return b.likes - a.likes;
      if (sortType === "latest") return new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime();
      return 0;
    });

    setFilteredMemes(tempMemes);
  }, [search, filter, sortType, memes]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-4">Explore Memes</h1>

      {/* Search & Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <input
          type="text"
          placeholder="Search memes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 border rounded w-full sm:w-auto"
        />

        <select value={filter} onChange={(e) => setFilter(e.target.value)} className="p-2 border bg-gray-800 rounded">
          <option value="all">All</option>
          <option value="trending">Trending</option>
          <option value="classic">Classic</option>
          <option value="random">Random</option>
        </select>

        <select value={sortType} onChange={(e) => setSortType(e.target.value)} className="p-2 border bg-gray-800 rounded">
          <option value="latest">Latest</option>
          <option value="likes">Most Liked</option>
        </select>
      </div>

      {/* Meme Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredMemes.length === 0 ? (
          <p className="text-gray-500 col-span-3 text-center">No memes found!</p>
        ) : (
          filteredMemes.map((meme) => (
            <Link key={meme.id} href={`/meme/${meme.id}`} className="block border rounded-lg overflow-hidden">
              <Image src={meme.imageUrl} alt={meme.caption} width={300} height={300} className="w-full h-60 object-cover" />
              <div className="p-2">
                <p className="font-bold">{meme.caption}</p>
                <p className="text-sm text-gray-500">❤️ {meme.likes} Likes</p>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default MemeExplorer;
