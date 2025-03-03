import Link from "next/link";

const Custom404 = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center text-center p-6">
      <h1 className="text-6xl font-bold text-red-500">404</h1>
      <p className="text-xl mt-2">Oops! This page got lost in the meme universe. 🤯</p>
      <img 
        src="https://i.imgflip.com/30b1gx.jpg" 
        alt="Confused meme" 
        className="w-80 h-auto my-4 rounded-lg shadow-md"
      />
      <Link href="/">
        <button className="mt-4 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
          Take me home 🏠
        </button>
      </Link>
    </div>
  );
};

export default Custom404;
