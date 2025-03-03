import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Meme } from "../types/meme";

interface MemeCardProps {
  meme: Meme;
}

const MemeCard: React.FC<MemeCardProps> = ({ meme }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="bg-gray-100 dark:bg-gray-800 p-2 rounded-lg shadow-md cursor-pointer"
    >
      <Link href={`/meme/${meme.id}`}>
        <div className="relative w-full h-64">
          <Image
            src={meme.url}
            alt={meme.name}
            layout="fill"
            objectFit="cover"
            className="rounded-md"
          />
        </div>
        <h2 className="text-lg font-semibold mt-2 text-center">{meme.name}</h2>
      </Link>
    </motion.div>
  );
};

export default MemeCard;
