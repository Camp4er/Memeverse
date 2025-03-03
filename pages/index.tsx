import { useEffect, useState } from "react";
import MemeGrid from "../components/MemeGrid";
import { Meme } from "../types/meme";

const Home = () => {
  const [memes, setMemes] = useState<Meme[]>([]);

  useEffect(() => {
    const fetchMemes = async () => {
      try {
        const res = await fetch("https://api.imgflip.com/get_memes");
        const data = await res.json();
        if (data.success) {
          setMemes(data.data.memes);
        }
      } catch (error) {
        console.error("Error fetching memes:", error);
      }
    };

    fetchMemes();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">🔥 Trending Memes</h1>
      <MemeGrid memes={memes} />
    </div>
  );
};

export default Home;
