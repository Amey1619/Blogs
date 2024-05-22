import {
  addDoc,
  collection,
  query,
  getDocs,
  Timestamp,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { AiFillDelete } from "react-icons/ai";
import { db } from "../Firebase/Firebase";
import Alert from "./Alert";

// eslint-disable-next-line react/prop-types
function Comments({ Id }) {
  const user = useSelector((state) => state.user.user);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [viewAlert, setViewAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  const [textAreaHeight, setTextAreaHeight] = useState(150);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const commentsCollectionRef = collection(db, "posts", Id, "comments");
        const q = query(commentsCollectionRef);
        const querySnapshot = await getDocs(q);
        const fetchedComments = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setComments(fetchedComments);
      } catch (error) {
        console.error("Error fetching comments: ", error);
      }
    };

    fetchComments();
  }, [Id]);

  const handleReset = (event) => {
    event.preventDefault();
    setComment("");
    setTextAreaHeight(150);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!user) {
      setAlertMessage("Please SignIn to comment");
      setAlertType("error");
      setViewAlert(true);
      setTimeout(() => {
        setViewAlert(false);
      }, 2000);
      return;
    }
    if (comment.trim() === "") {
      setAlertMessage("Comment cannot be empty");
      setAlertType("error");
      setViewAlert(true);
      setTimeout(() => {
        setViewAlert(false);
      }, 2000);
      return;
    }
    try {
      const commentsCollectionRef = collection(db, "posts", Id, "comments");
      const userData = {
        userName: user.name || "",
        userImage: user.photo || "",
        comment: comment,
        date: Timestamp.now(),
        userId: user.uid,
      };
      await addDoc(commentsCollectionRef, userData);
      setAlertMessage("Comment posted successfully");
      setAlertType("success");
      setViewAlert(true);
      setTimeout(() => {
        setViewAlert(false);
      }, 2000);

      setComment("");
      setTextAreaHeight(150);

      // Refetch comments after posting a new one
      const q = query(commentsCollectionRef);
      const querySnapshot = await getDocs(q);
      const fetchedComments = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setComments(fetchedComments);
    } catch (error) {
      console.error("Error in posting comments: ", error);
    }
  };

  const DeleteComment = async (commentID) => {
    if (!user) {
      console.log("Please SignIn to Delete Comment");
      return;
    }
    try {
      const commentRef = doc(db, "posts", Id, "comments", commentID);
      await deleteDoc(commentRef);
      // Update local state by filtering out the deleted comment
      setComments(comments.filter((comment) => comment.id !== commentID));
    } catch (error) {
      console.error("Error deleting comment: ", error);
    }
  };

  return (
    <>
      <Alert show={viewAlert} type={alertType} message={alertMessage} />
      <div className="flex flex-wrap mb-6 mt-6 mx-auto max-w-screen-md">
        <div className="relative container p-1 appearance-none label-floating">
          <form onSubmit={handleSubmit}>
            <textarea
              className="resize-none tracking-wide py-2 px-4 mb-3 leading-relaxed appearance-none block w-full bg-gray-100 border border-gray-100 focus:outline-none focus:bg-white focus:border-gray-300"
              id="message"
              style={{ height: textAreaHeight }}
              onChange={(e) => {
                setComment(e.target.value);
                setTextAreaHeight(
                  e.target.scrollHeight > 150 ? e.target.scrollHeight : 150
                );
              }}
              value={comment}
              type="text"
              placeholder="What are your thoughts..?"
              rows="4"
            />
            <div className="text-right">
              <button
                onClick={handleReset}
                className="bg-indigo-500 text-white px-3 py-1.5 rounded text-sm font-semibold mr-5"
              >
                Reset
              </button>
              <button
                type="submit"
                className="bg-indigo-500 text-white px-3 py-1.5 rounded text-sm font-semibold"
              >
                Post
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="mx-auto max-w-screen-md">
        <div className="m-2 md:m-0">
          {comments &&
            comments.map((comment) => (
              <div className="space-y-4 py-3" key={comment.id}>
                <div className="flex">
                  <div className="flex-shrink-0 mr-1.5 md:mr-3">
                    <img
                      className="mt-2 rounded-full w-10 h-10 sm:w-12 sm:h-12"
                      src={comment.userImage}
                      alt={comment.userName}
                    />
                  </div>
                  <div className="flex-1 border border-gray-300 rounded-lg px-4 py-2 sm:px-6 sm:py-4 leading-relaxed relative">
                    <strong className="text-gray-800">
                      {comment.userName}
                    </strong>{" "}
                    <span className="text-xs text-gray-600">
                      {comment.date &&
                        new Date(comment.date.toDate()).toDateString()}
                    </span>
                    {user && comment.userId === user.uid && (
                      <span
                        className="absolute right-6 top-5 cursor-pointer"
                        onClick={() => DeleteComment(comment.id)}
                      >
                        <AiFillDelete />
                      </span>
                    )}
                    {comment.comment.split("\n").map((com, index) => (
                      <p className="text-md text-gray-700" key={index}>
                        {com}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default Comments;
