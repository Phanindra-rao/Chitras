import './Post.css';

function Post({ post, users }) {
  return (
    <article className="feed-post">
      <h3>{users.find(u => u.id === post.userId)?.name}</h3>
      <p>{post.caption}</p>
    </article>
  );
}

export default Post;