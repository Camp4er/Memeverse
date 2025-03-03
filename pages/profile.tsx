import { useEffect, useState } from "react";

type Meme = {
  id: string;
  imageUrl: string;
  caption: string;
  likes: number;
};

type UserProfile = {
  name: string;
  bio: string;
  profilePic: string;
};

const Profile = () => {
  const [profile, setProfile] = useState<UserProfile>({
    name: "Meme Enthusiast",
    bio: "Lover of all things funny!",
    profilePic: "/default-avatar.png",
  });

  const [uploadedMemes, setUploadedMemes] = useState<Meme[]>([]);
  const [likedMemes, setLikedMemes] = useState<Meme[]>([]);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Load profile info from local storage
    const storedProfile = JSON.parse(localStorage.getItem("userProfile") || "null");
    if (storedProfile) setProfile(storedProfile);

    // Load uploaded memes from local storage
    const storedMemes: Meme[] = JSON.parse(localStorage.getItem("uploadedMemes") || "[]");
    setUploadedMemes(storedMemes);

    // Load liked memes from local storage
    const storedLikedMemes: Meme[] = JSON.parse(localStorage.getItem("likedMemes") || "[]");
    setLikedMemes(storedLikedMemes);
  }, []);

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const saveProfile = () => {
    localStorage.setItem("userProfile", JSON.stringify(profile));
    setIsEditing(false);
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* Profile Info */}
      <div className="flex items-center gap-4 mb-6">
        <img src={profile.profilePic} alt="Profile" className="w-16 h-16 rounded-full border" />
        <div>
          {isEditing ? (
            <>
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleProfileChange}
                className="border p-2 rounded w-full mb-2"
              />
              <textarea
                name="bio"
                value={profile.bio}
                onChange={handleProfileChange}
                className="border p-2 rounded w-full"
              />
              <button className="bg-green-500 text-white px-3 py-1 rounded mt-2" onClick={saveProfile}>
                Save
              </button>
            </>
          ) : (
            <>
              <h2 className="text-xl font-bold">{profile.name}</h2>
              <p className="text-gray-600">{profile.bio}</p>
              <button className="bg-blue-500 text-white px-3 py-1 rounded mt-2" onClick={() => setIsEditing(true)}>
                Edit
              </button>
            </>
          )}
        </div>
      </div>

      {/* Uploaded Memes */}
      <h3 className="text-2xl font-semibold mb-3">Your Uploads</h3>
      <div className="grid grid-cols-2 gap-4">
        {uploadedMemes.length === 0 ? (
          <p className="text-gray-500">You haven't uploaded any memes yet.</p>
        ) : (
          uploadedMemes.map((meme) => (
            <div key={meme.id} className="border rounded-lg overflow-hidden">
              <img src={meme.imageUrl} alt={meme.caption} className="w-full h-40 object-cover" />
              <p className="p-2 text-center">{meme.caption}</p>
            </div>
          ))
        )}
      </div>

      {/* Liked Memes */}
      <h3 className="text-2xl font-semibold mt-6 mb-3">Liked Memes</h3>
      <div className="grid grid-cols-2 gap-4">
        {likedMemes.length === 0 ? (
          <p className="text-gray-500">You haven't liked any memes yet.</p>
        ) : (
          likedMemes.map((meme) => (
            <div key={meme.id} className="border rounded-lg overflow-hidden">
              <img src={meme.imageUrl} alt={meme.caption} className="w-full h-40 object-cover" />
              <p className="p-2 text-center">{meme.caption}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Profile;
