import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { BlogContext } from '../context/BlogContext';

const BlogList = () => {
  const { blogs } = useContext(BlogContext);

  return (
    <div className="blog-home">
      <h1 className="page-title">Travel Blog Posts</h1>
      <div className="blog-grid">
        {blogs.map(blog => (
          <Link to={`/blog/${blog.id}`} key={blog.id} className="blog-card-link">
            <div className="blog-card">
              <div className="image-container">
                <img src={blog.imageUrl} alt={blog.title} className="blog-thumbnail" />
                <div className="country-tags">
                  {blog.countries.map(country => (
                    <span key={country} className="country-tag">{country}</span>
                  ))}
                </div>
              </div>
              <div className="blog-content">
                <h2>{blog.title}</h2>
                <p className="blog-excerpt">{blog.content.substring(0, 100)}...</p>
                <div className="blog-meta">
                  <p>By {blog.author}</p>
                  <p>{blog.date}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BlogList;