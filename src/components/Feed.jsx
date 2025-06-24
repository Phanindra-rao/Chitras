import Post from './Post';
import '../css/Feed.css';

function Feed({ posts, users, currentUser }) {
  return (
    <section className="feed">
      <h2>Feed</h2>
      {posts.length === 0 && <p>No posts yet.</p>}
      {posts.map(post => (
        <Post key={post.id} post={post} users={users} />
      ))}
    </section>
  );
}

export default Feed;