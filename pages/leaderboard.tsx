import { useEffect, useState } from "react";

type Meme = {
  id: string;
  imageUrl: string;
  caption: string;
  likes: number;
  uploader: string;
};

type UserRanking = {
  username: string;
  totalLikes: number;
};

const Leaderboard = () => {
  const [topMemes, setTopMemes] = useState<Meme[]>([]);
  const [userRankings, setUserRankings] = useState<UserRanking[]>([]);

  useEffect(() => {
    // Fetch memes from local storage (or API in future)
    const storedMemes: Meme[] = JSON.parse(localStorage.getItem("uploadedMemes") || "[]");

    // Get top 10 most liked memes
    const sortedMemes = [...storedMemes].sort((a, b) => b.likes - a.likes).slice(0, 10);
    setTopMemes(sortedMemes);

    // Calculate user rankings based on total likes
    const userLikesMap: Record<string, number> = {};
    storedMemes.forEach((meme) => {
      if (!userLikesMap[meme.uploader]) {
        userLikesMap[meme.uploader] = 0;
      }
      userLikesMap[meme.uploader] += meme.likes;
    });

    // Convert object to array and sort rankings
    const sortedUsers = Object.entries(userLikesMap)
      .map(([username, totalLikes]) => ({ username, totalLikes }))
      .sort((a, b) => b.totalLikes - a.totalLikes)
      .slice(0, 10);

    setUserRankings(sortedUsers);
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">🏆 Meme Leaderboard</h1>

      {/* Top 10 Most Liked Memes */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">🔥 Top 10 Memes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {topMemes.length === 0 ? (
            <p className="text-gray-500">No memes available!</p>
          ) : (
            topMemes.map((meme, index) => (
              <div key={meme.id} className="border p-3 rounded-lg flex items-center gap-4">
                <span className="text-xl font-bold">{index + 1}.</span>
                <img src={meme.imageUrl} alt={meme.caption} className="w-16 h-16 object-cover rounded" />
                <div>
                  <p className="font-bold">{meme.caption}</p>
                  <p className="text-sm text-gray-500">❤️ {meme.likes} Likes</p>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* User Rankings */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">🏅 Top Meme Creators</h2>
        <div className="border rounded-lg p-4">
          {userRankings.length === 0 ? (
            <p className="text-gray-500">No rankings available!</p>
          ) : (
            <ul>
              {userRankings.map((user, index) => (
                <li key={index} className="flex justify-between py-2 border-b last:border-none">
                  <span className="font-bold">
                    {index + 1}. {user.username}
                  </span>
                  <span className="text-gray-600">❤️ {user.totalLikes} Likes</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </div>
  );
};

export default Leaderboard;
