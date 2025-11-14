import React, { useEffect, useState } from "react";
import MostPopularSection from "../loadingTamplets/MostPupularSection";
import { useParams } from "react-router-dom";
import { blogApi } from "../api/api";
import { Bookmark, Share2, Clock, TrendingUp, Eye, Heart } from 'lucide-react';

function SingleBlogPage() {
  const [loading, setLoading] = useState({
    mainBlog: true,
    popular: false,
  });
  const [isLiked, setIsLiked] = useState(false);

  const [data, setData] = useState({
    mainBlog: null,
    popularBlog: null,
    error: null,
  });

  const { slug } = useParams();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleShare = () => {
    if (navigator.share && blog) {
      navigator.share({
        title: blog.title,
        text: blog.deck,
        url: window.location.href,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  useEffect(() => {
    apiHandler();
  }, []);

  const apiHandler = async () => {
    setLoading((prev) => ({ ...prev, mainBlog: true }));

    try {
      const res = await blogApi.singleBlog(slug);
      if (res?.status == 200 || res?.statusText === "OK") {
        const blog = res?.data?.data;
        console.log(blog);
        setData((prev) => ({
          ...prev,
          mainBlog: blog,
        }));
      } else {
        throw new Error("invalid response format");
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
      setData((prev) => ({
        ...prev,
        error: "Failed to load blogs. Showing default content.",
      }));
    } finally {
      setLoading((prev) => ({ ...prev, mainBlog: false }));
    }
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  if (loading.mainBlog) {
    return <MostPopularSection />;
  }

  const defaultPopularBlogs = [
    {
      _id: "1",
      title: "The Future of AI in Healthcare",
      category: { name: "TECHNOLOGY" },
      content: "Exploring how AI is revolutionizing medical diagnostics...",
      views: 1234,
    },
    {
      _id: "2",
      title: "Quantum Computing Breakthrough",
      category: { name: "SCIENCE" },
      content: "Scientists achieve quantum supremacy...",
      views: 987,
    },
    {
      _id: "3",
      title: "Climate Tech Innovations 2025",
      category: { name: "ENVIRONMENT" },
      content: "New technologies fighting climate change...",
      views: 856,
    },
    {
      _id: "4",
      title: "The Rise of Decentralized Social Media",
      category: { name: "CULTURE" },
      content: "How Web3 is changing social networking...",
      views: 743,
    },
    {
      _id: "5",
      title: "Cybersecurity in the Modern Age",
      category: { name: "SECURITY" },
      content: "Protecting digital infrastructure...",
      views: 692,
    },
  ];

  const blog = data.mainBlog;
  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Main Content - Takes 8 columns on desktop */}
          <div className="lg:col-span-8">
            <article>
              {/* Category Badge */}
              <div className="text-xs font-bold tracking-wider text-blue-600 mb-3 uppercase">
                {typeof blog.category === "string"
                  ? "ARTICLE"
                  : blog.category?.name || "ARTICLE"}
              </div>

              {/* Article Title */}
              <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
                {blog.title}
              </h1>

              {/* Deck/Subtitle */}
              {blog.deck && (
                <p className="text-xl text-gray-600 mb-6">{blog.deck}</p>
              )}

              {/* Author and Meta Info */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6 pb-6 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                    {typeof blog.author === "object"
                      ? blog.author?.username?.charAt(0)
                      : "A"}
                  </div>
                  <span className="font-medium text-gray-900">
                    {typeof blog.author === "object"
                      ? blog.author?.username
                      : "Author"}
                  </span>
                </div>
                <span>•</span>
                <span>{formatDate(blog.createdAt)}</span>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {/* <span>{calculateReadTime(blog.content)}</span> */}
                </div>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  <span>{blog.views} views</span>
                </div>
              </div>

              {/* Featured Image */}
              {blog.image && (
                <div className="relative aspect-[16/9] bg-gray-200 rounded-lg overflow-hidden mb-8">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src =
                        "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=1200&h=675&fit=crop";
                    }}
                  />
                </div>
              )}

              {/* Article Content */}
              <div className="prose prose-lg max-w-none">
                {blog.content.split("\n\n").map((paragraph, index) => (
                  <p key={index} className="text-gray-700 leading-relaxed mb-6">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-10 pt-6 border-t border-gray-200">
                <button
                  onClick={handleLike}
                  className={`flex-1 border ${
                    isLiked ? "border-red-500 bg-red-50" : "border-gray-300"
                  } py-3 px-4 rounded-lg text-sm font-medium hover:bg-gray-50 flex items-center justify-center gap-2 transition-colors`}
                >
                  <Heart
                    className={`w-4 h-4 ${
                      isLiked ? "fill-red-500 text-red-500" : ""
                    }`}
                  />
                  {isLiked ? "Liked" : "Like"} ({blog.likes.length})
                </button>
                <button className="flex-1 border border-gray-300 py-3 px-4 rounded-lg text-sm font-medium hover:bg-gray-50 flex items-center justify-center gap-2 transition-colors">
                  <Bookmark className="w-4 h-4" />
                  Save
                </button>
                <button
                  onClick={handleShare}
                  className="flex-1 border border-gray-300 py-3 px-4 rounded-lg text-sm font-medium hover:bg-gray-50 flex items-center justify-center gap-2 transition-colors"
                >
                  <Share2 className="w-4 h-4" />
                  Share
                </button>
              </div>

              {/* Tags */}
              {blog.tags && blog.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-6">
                  {blog.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 px-4 py-2 rounded-full text-sm text-gray-700 hover:bg-gray-200 cursor-pointer transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </article>
          </div>

          {/* Sidebar - Takes 4 columns on desktop, full width on mobile */}
          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-8">
              {/* Popular Blogs Section */}
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center gap-2 mb-6">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                  <h3 className="text-xl font-bold">Popular Articles</h3>
                </div>

                <div className="space-y-6">
                  {defaultPopularBlogs.map((popularBlog, index) => (
                    <div key={popularBlog._id} className="group cursor-pointer">
                      <div className="flex gap-4">
                        <span className="text-3xl font-bold text-gray-300 group-hover:text-blue-600 transition-colors flex-shrink-0">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-bold tracking-wider text-gray-500 mb-1 uppercase">
                            {typeof popularBlog.category === "object"
                              ? popularBlog.category.name
                              : popularBlog.category || "ARTICLE"}
                          </div>
                          <h4 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-2 leading-tight line-clamp-2">
                            {popularBlog.title}
                          </h4>
                          <div className="flex items-center gap-3 text-xs text-gray-500">
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              <span>
                                {/* {calculateReadTime(popularBlog.content || "")} */}
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Eye className="w-3 h-3" />
                              <span>{popularBlog.views || 0}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      {index < defaultPopularBlogs.length - 1 && (
                        <div className="border-b border-gray-200 mt-6"></div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Newsletter Box */}
              <div className="bg-black text-white rounded-lg p-6 mt-6">
                <h3 className="text-xl font-bold mb-3">Stay Updated</h3>
                <p className="text-gray-300 text-sm mb-4">
                  Get the latest articles delivered to your inbox.
                </p>
                <input
                  type="email"
                  placeholder="Your email"
                  className="w-full px-4 py-2 rounded bg-white text-black text-sm mb-3"
                />
                <button className="w-full bg-white text-black px-4 py-2 font-bold rounded hover:bg-gray-100 transition-colors text-sm">
                  Subscribe
                </button>
              </div>

              {/* Topics to Follow */}
              {blog.tags && blog.tags.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-lg font-bold mb-4">Related Topics</h3>
                  <div className="flex flex-wrap gap-2">
                    {blog.tags.map((topic, index) => (
                      <button
                        key={index}
                        className="bg-gray-100 px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors"
                      >
                        {topic}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}

export default SingleBlogPage;
