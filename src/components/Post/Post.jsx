import "./post.css";
import { posts } from "../../links";
import { Link } from "react-router-dom";

export default function Post({ post }) {
  const PF = "http://localhost:5000/upload";
  return (
    <>
      {post.map((item, index) => {
        return (
          <div className="post" key={index}>
            <img src={`${PF}/${item.image}`} alt={posts} />
            <div className="post-info">
              <Link className="post-title link" to={`/post/${item._id}`}>
                {item.title}
              </Link>
              <p className="post-desc">{item.desc}</p>
            </div>
          </div>
        );
      })}
    </>
  );
}
