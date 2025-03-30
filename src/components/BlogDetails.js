import { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BlogContext } from '../context/BlogContext';
import CountryInfo from './CountryInfo';
import AuthModal from './AuthModal';

const BlogDetails = () => {
  const { id } = useParams();
  const { blogs, user, likePost, addComment } = useContext(BlogContext);
  const [commentText, setCommentText] = useState('');
  const [showAuthModal, setShowAuthModal] = useState(false); // Added this line
  const blog = blogs.find(b => b.id === parseInt(id));

  if (!blog) return <div className="not-found">Blog post not found</div>;

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    addComment(blog.id, commentText);
    setCommentText('');
  };

  return (
    <div className="blog-post-container">
      {showAuthModal && (
        <AuthModal onClose={() => setShowAuthModal(false)} />
      )}

      <div className="blog-post-hero">
        <img src={blog.imageUrl} alt={blog.title} className="hero-image" />
        <div className="hero-overlay">
          <h1>{blog.title}</h1>
          <div className="hero-meta">
            <span>By {blog.author}</span>
            <span>{blog.date}</span>
            <button 
              onClick={() => likePost(blog.id)} 
              disabled={!user}
              className={`like-btn ${!user ? 'disabled' : ''}`}
            >
              ❤️ {blog.likes || 0} Likes
            </button>
          </div>
        </div>
      </div>

      <div className="blog-content-wrapper">
        <article className="blog-main-content">
          <div className="content-box">
            {blog.content.split('\n').map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>

          <div className="comments-section">
            <h3>Comments ({blog.comments?.length || 0})</h3>
            {user ? (
              <form onSubmit={handleCommentSubmit} className="comment-form">
                <textarea
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Add a comment..."
                  required
                />
                <button type="submit" className="btn-primary">Post Comment</button>
              </form>
            ) : (
              <p className="login-prompt">
                Please <button onClick={() => setShowAuthModal(true)}>login</button> to comment
              </p>
            )}

            <div className="comments-list">
              {blog.comments?.map(comment => (
                <div key={comment.id} className="comment">
                  <div className="comment-header">
                    <strong>{comment.author}</strong>
                    <span>{comment.date}</span>
                  </div>
                  <p>{comment.text}</p>
                </div>
              ))}
            </div>
          </div>
        </article>

        <aside className="blog-sidebar">
          <CountryInfo countryName={blog.countries[0]} />
        </aside>
      </div>
    </div>
  );
};

export default BlogDetails;