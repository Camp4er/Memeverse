import MemeCard from "./MemeCard";
import { Meme } from "../types/meme";

interface MemeGridProps {
  memes: Meme[];
}

const MemeGrid: React.FC<MemeGridProps> = ({ memes }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {memes.map((meme) => (
        <MemeCard key={meme.id} meme={meme} />
      ))}
    </div>
  );
};

export default MemeGrid;
