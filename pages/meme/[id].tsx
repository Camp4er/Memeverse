import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Meme } from "../../types/meme";
import { Comment } from "../../types/comment";

const MemeDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const [meme, setMeme] = useState<Meme | null>(null);
  const [likes, setLikes] = useState<number>(0);
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentText, setCommentText] = useState<string>("");

  useEffect(() => {
    if (!id) return;

    // Fetch memes from API (or filter from local state)
    const fetchMeme = async () => {
      try {
        const res = await fetch("https://api.imgflip.com/get_memes");
        const data = await res.json();
        if (data.success) {
          const foundMeme = data.data.memes.find((m: Meme) => m.id === id);
          setMeme(foundMeme || null);
        }
      } catch (error) {
        console.error("Error fetching meme:", error);
      }
    };

    fetchMeme();

    // Load likes from local storage
    const savedLikes = localStorage.getItem(`likes-${id}`);
    if (savedLikes) {
      setLikes(Number(savedLikes));
    }

    // Load comments from local storage
    const savedComments = localStorage.getItem(`comments-${id}`);
    if (savedComments) {
      setComments(JSON.parse(savedComments));
    }
  }, [id]);

  // Handle like button click
  const handleLike = () => {
    const newLikes = likes + 1;
    setLikes(newLikes);
    localStorage.setItem(`likes-${id}`, newLikes.toString());
  };

  // Handle comment submission
  const handleCommentSubmit = () => {
    if (!commentText.trim()) return;
    const newComment: Comment = {
      id: Date.now().toString(),
      memeId: id as string,
      text: commentText,
      timestamp: Date.now(),
    };
    const updatedComments = [...comments, newComment];
    setComments(updatedComments);
    localStorage.setItem(`comments-${id}`, JSON.stringify(updatedComments));
    setCommentText("");
  };

  if (!meme) return <p className="text-center text-lg">Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-center mb-4">{meme.name}</h1>
      <div className="relative w-full h-96 mb-4">
        <Image
          src={meme.url}
          alt={meme.name}
          layout="fill"
          objectFit="contain"
          className="rounded-lg"
        />
      </div>
      <div className="flex justify-between items-center">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md"
          onClick={handleLike}
        >
          👍 Like ({likes})
        </button>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold">Comments</h2>
        <div className="mt-2">
          {comments.length > 0 ? (
            comments.map((comment) => (
              <div key={comment.id} className="p-2 bg-gray-200 dark:bg-gray-700 rounded-lg mb-2">
                <p>{comment.text}</p>
                <span className="text-sm text-gray-500">
                  {new Date(comment.timestamp).toLocaleString()}
                </span>
              </div>
            ))
          ) : (
            <p>No comments yet. Be the first to comment!</p>
          )}
        </div>
        <textarea
          className="w-full p-2 border rounded mt-4"
          placeholder="Add a comment..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
        <button
          className="px-4 py-2 mt-2 bg-green-500 text-white rounded-lg"
          onClick={handleCommentSubmit}
        >
          Submit Comment
        </button>
      </div>
    </div>
  );
};

export default MemeDetails;


// import { useEffect, useState } from "react";
// import { useRouter } from "next/router";

// type Meme = {
//   id: string;
//   imageUrl: string;
//   caption: string;
//   likes: number;
//   uploader: string;
// };

// type Comment = {
//   id: string;
//   text: string;
//   date: string;
// };

// const MemeDetails = () => {
//   const router = useRouter();
//   const { id } = router.query;
//   const [meme, setMeme] = useState<Meme | null>(null);
//   const [likes, setLikes] = useState<number>(0);
//   const [comments, setComments] = useState<Comment[]>([]);
//   const [commentText, setCommentText] = useState("");

//   useEffect(() => {
//     if (!id) return;

//     // Fetch memes from local storage (or API in future)
//     const storedMemes: Meme[] = JSON.parse(localStorage.getItem("uploadedMemes") || "[]");
//     const foundMeme = storedMemes.find((m) => m.id === id);
    
//     if (foundMeme) {
//       setMeme(foundMeme);
//       setLikes(foundMeme.likes);
//     }

//     // Load comments from local storage
//     const storedComments = JSON.parse(localStorage.getItem(`comments-${id}`) || "[]");
//     setComments(storedComments);
//   }, [id]);

//   const handleLike = () => {
//     if (!meme) return;

//     const updatedLikes = likes + 1;
//     setLikes(updatedLikes);

//     // Update meme likes in local storage
//     const storedMemes: Meme[] = JSON.parse(localStorage.getItem("uploadedMemes") || "[]");
//     const updatedMemes = storedMemes.map((m) => (m.id === id ? { ...m, likes: updatedLikes } : m));
//     localStorage.setItem("uploadedMemes", JSON.stringify(updatedMemes));
//   };

//   const handleAddComment = () => {
//     if (!commentText.trim()) return;

//     const newComment: Comment = {
//       id: `${Date.now()}`,
//       text: commentText,
//       date: new Date().toLocaleString(),
//     };

//     const updatedComments = [...comments, newComment];
//     setComments(updatedComments);
//     setCommentText("");

//     localStorage.setItem(`comments-${id}`, JSON.stringify(updatedComments));
//   };

//   if (!meme) return <p className="text-center text-gray-500">Meme not found!</p>;

//   return (
//     <div className="max-w-3xl mx-auto p-6">
//       <h1 className="text-3xl font-bold text-center mb-4">{meme.caption}</h1>

//       <div className="flex justify-center">
//         <img src={meme.imageUrl} alt={meme.caption} className="rounded-lg w-full max-w-md shadow-lg" />
//       </div>

//       {/* Like Button */}
//       <div className="flex justify-center items-center gap-3 mt-4">
//         <button
//           className="bg-red-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-red-600 transition"
//           onClick={handleLike}
//         >
//           ❤️ {likes} Likes
//         </button>
//       </div>

//       {/* Comments Section */}
//       <div className="mt-6">
//         <h2 className="text-2xl font-semibold mb-3">Comments</h2>
//         <div className="border rounded-lg p-4">
//           {comments.length === 0 ? (
//             <p className="text-gray-500">No comments yet. Be the first!</p>
//           ) : (
//             <ul>
//               {comments.map((comment) => (
//                 <li key={comment.id} className="border-b last:border-none py-2">
//                   <p>{comment.text}</p>
//                   <span className="text-sm text-gray-500">{comment.date}</span>
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>
        
//         {/* Add Comment */}
//         <div className="mt-4 flex gap-2">
//           <input
//             type="text"
//             placeholder="Add a comment..."
//             value={commentText}
//             onChange={(e) => setCommentText(e.target.value)}
//             className="flex-1 border p-2 rounded-lg"
//           />
//           <button className="bg-blue-500 text-white px-4 py-2 rounded-lg" onClick={handleAddComment}>
//             Submit
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MemeDetails;
