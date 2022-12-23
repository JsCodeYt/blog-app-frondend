import "./posts.css"
import Post from "../Post/Post"

export default function Posts({posts}) {
  return (
    <div className="posts">
      <Post post={posts}/>
    </div>
  )
}
