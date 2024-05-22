import { AiOutlineHeart, AiFillHeart, AiOutlineLoading } from "react-icons/ai";
import {
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { db } from "../Firebase/Firebase";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Alert from "./Alert";

// eslint-disable-next-line react/prop-types
function LikeBtn({ Id }) {
  const user = useSelector((state) => state.user.user);
  const [likesCount, setLikesCount] = useState(0);
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [viewAlert, setViewAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    const fetchLikesCount = async () => {
      if (!user) return;
      try {
        const postRef = doc(db, "posts", Id);
        const docSnap = await getDoc(postRef);
        if (docSnap.exists()) {
          const post = docSnap.data();
          const likes = post.likes || [];
          setLikesCount(likes.length);
          setLiked(likes.some((like) => like.uid === user.uid));
        }
      } catch (error) {
        console.error("Error fetching likes count: ", error);
      }
    };

    fetchLikesCount();
  }, [Id, user]);

  const handleClick = async () => {
    if (!user) {
      setViewAlert(true);
      setAlertMessage("Please SignIn to Like");
       setTimeout(() => {
         setViewAlert(false);
       }, 2000);
      return;
    }
    setLoading(true);
    try {
      const likeRef = doc(db, "posts", Id);
      const userLike = {
        uid: user.uid,
        name: user.name,
      };

      const docSnap = await getDoc(likeRef);
      if (!docSnap.exists()) {
        await setDoc(likeRef, {
          likes: [userLike],
        });
        setLikesCount(1);
        setLiked(true);
      } else {
        if (liked) {
          await updateDoc(likeRef, {
            likes: arrayRemove(userLike),
          });
          setLikesCount((prevCount) => prevCount - 1);
        } else {
          await updateDoc(likeRef, {
            likes: arrayUnion(userLike),
          });
          setLikesCount((prevCount) => prevCount + 1);
        }
        setLiked(!liked);
      }
    } catch (error) {
      console.error("Error toggling like: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Alert show={viewAlert} type="error" message={alertMessage} />
      <div className="justify-center pt-16 pb-6 flex flex-row items-center">
        {loading ? (
          <AiOutlineLoading
            className="animate-spin"
            style={{ fontSize: "1.5rem" }}
          />
        ) : (
          <>
            <button onClick={handleClick} disabled={loading}>
              {user && liked ? (
                <AiFillHeart
                  style={{ fontSize: "2rem", color: "rgb(252, 92, 101)" }}
                />
              ) : (
                <AiOutlineHeart style={{ fontSize: "2rem" }} />
              )}
            </button>
            <span style={{ fontSize: "1.3em", paddingLeft: "16px" }}>
              {likesCount}
            </span>
          </>
        )}
      </div>
    </>
  );
}
export default LikeBtn;
