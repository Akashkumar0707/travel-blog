import { createContext, useState, useEffect } from 'react';
import { blogPosts } from '../data/blogData';

export const BlogContext = createContext();

export const BlogProvider = ({ children }) => {
  const [blogs, setBlogs] = useState(blogPosts);
  const [user, setUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Load user from localStorage on initial render
  useEffect(() => {
    const savedUser = localStorage.getItem('blogUser');
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  // Authentication functions
  const login = (username) => {
    const user = { username, isAdmin: username === 'admin' };
    setUser(user);
    localStorage.setItem('blogUser', JSON.stringify(user));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('blogUser');
  };

  // Blog interaction functions
  const likePost = (postId) => {
    if (!user) return alert('Please login to like posts');
    setBlogs(blogs.map(blog => 
      blog.id === postId 
        ? { ...blog, likes: (blog.likes || 0) + 1 } 
        : blog
    ));
  };

  const addComment = (postId, commentText) => {
    if (!user) return alert('Please login to comment');
    const newComment = {
      id: Date.now(),
      text: commentText,
      author: user.username,
      date: new Date().toISOString().split('T')[0]
    };
    setBlogs(blogs.map(blog => 
      blog.id === postId 
        ? { ...blog, comments: [...(blog.comments || []), newComment] } 
        : blog
    ));
  };

  // Filter blogs based on search term
  const filteredBlogs = blogs.filter(blog => 
    blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.countries.some(country => 
      country.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <BlogContext.Provider value={{ 
      blogs: filteredBlogs, 
      user,
      login,
      logout,
      likePost,
      addComment,
      searchTerm,
      setSearchTerm
    }}>
      {children}
    </BlogContext.Provider>
  );
};