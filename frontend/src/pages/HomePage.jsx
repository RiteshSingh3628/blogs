import React, { useEffect, useState } from "react";
import { blogApi } from "../api/api";
import MostPopularSection from "../loadingTamplets/MostPupularSection";
import { Link } from "react-router-dom";

const BlogLayout = () => {
  const [loading, setLoading] = useState({
    mostPopular: false,
    newBlogs: false,
    allBlogs: true, // Start with true since we fetch on mount
  });
  const [data, setData] = useState({
    newBlogs: null,
    allBlogs: null,
    error: null,
  });

  // Safe data trim function
  const trimData = (data, len) => {
    if (!data || typeof data !== "string") return "";

    let arrayData = data.split(/\s+/);
    if (arrayData.length > len) {
      return arrayData.slice(0, len).join(" ") + "...";
    }
    return arrayData.join(" ");
  };

  // Default fallback data
  const defaultBlogs = [
    {
      id: 1,
      category: "THE AI ISSUE",
      title: "AI of a Thousand Faces",
      description:
        "What happens now that AI is everywhere and in everything? We can't tell the future, but we can try to make sense of it. Behold: 17 readings from the furthest reaches of the AI age.",
      date: "October 28, 2025",
      image:
        "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=800&fit=crop",
      isHero: true,
      author: "Ritesh",
    },

    {
      id: 2,
      category: "AI AS THERAPIST",
      title: "The Cure",
      description:
        "Can artificial intelligence replace human therapists? We explore the boundaries of AI in mental health care.",
      date: "October 27, 2025",
      image:
        "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=300&fit=crop",
    },
    {
      id: 3,
      category: "AI AS TEACHER",
      title:
        "Parents Fell in Love with Alpha School's Promise. Then They Wanted Out",
      description:
        "The rise and fall of an AI-powered education platform that promised personalized learning for every child.",
      date: "October 26, 2025",
      image:
        "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=300&fit=crop",
    },
    {
      id: 4,
      category: "AI AS PR",
      title: "Ed Zitron Gets Paid to Love AI. He Also Gets Paid to Hate AI",
      description:
        "Inside the controversial career of a tech PR executive navigating the AI boom with conflicting interests.",
      date: "October 25, 2025",
      image:
        "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=400&h=300&fit=crop",
    },
    {
      id: 5,
      category: "AI AS BLACK BOX",
      title: "Why AI Breaks Bad",
      description:
        "When artificial intelligence systems malfunction, the consequences can be catastrophic.",
      date: "October 24, 2025",
      image:
        "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=300&fit=crop",
    },
  ];

  // API call for all blogs with proper error handling
  const fetchAllBlogs = async () => {
    setLoading((prev) => ({ ...prev, allBlogs: true }));
    setData((prev) => ({ ...prev, error: null }));

    try {
      const res = await blogApi.getAllBlog();

      if (res?.status === 200 || res?.statusText === "OK") {
        const blogs = res?.data?.data?.blogs || defaultBlogs;
        console.log("blogs", blogs);
        setData((prev) => ({
          ...prev,
          allBlogs: blogs,
        }));
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
      setData((prev) => ({
        ...prev,
        allBlogs: defaultBlogs,
        error: "Failed to load blogs. Showing default content.",
      }));
    } finally {
      setLoading((prev) => ({ ...prev, allBlogs: false }));
    }
  };

  useEffect(() => {
    fetchAllBlogs();
  }, []);

  // Safe data accessors
  const allBlogs = data.allBlogs || defaultBlogs;
  const heroBlog = allBlogs[0] || defaultBlogs[0];
  const otherBlogs = allBlogs.slice(1,5);

  const getDateFun = (date) => {
    const d = new Date(date);
    const day = d.getDate().toString().padStart(2, "0");
    const month = d.toLocaleString("default", { month: "short" }); // e.g., "Aug"
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  };

  // Safe image component
  const SafeImage = ({
    src,
    alt,
    className,
    fallbackSrc = "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop",
  }) => (
    <img
      src={src || fallbackSrc}
      alt={alt || "Blog image"}
      className={className}
      onError={(e) => {
        e.target.src = fallbackSrc;
      }}
    />
  );

  if (loading.allBlogs) {
    return <MostPopularSection />;
  }

  return (
    <div className="min-h-screen bg-white text-white">
      {/* Error Banner */}
      {data.error && (
        <div className="bg-yellow-500 text-black p-4 text-center">
          {data.error}
        </div>
      )}

      {/* HERO SECTION */}
      <div className="relative w-full h-[60vh] sm:h-[70vh] lg:h-[80vh] overflow-hidden">
        <SafeImage
          src={heroBlog?.image}
          alt={heroBlog?.title}
          className="w-full h-full object-cover"
        />

        {/* Vignette Overlays */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(to right, rgba(0,0,0,0.7), transparent),
              linear-gradient(to left, rgba(0,0,0,0.7), transparent)
            `,
          }}
        ></div>

        {/* Text Overlay */}
        <div className="absolute bottom-10 left-6 sm:left-10 max-w-xl px-4">
          <p className="font-bold font-mono text-sm tracking-widest text-gray-300">
            {heroBlog?.category?.name || "CATEGORY"}
          </p>
          <Link to={`/blog/${heroBlog?.slug}`}>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-2">
            {heroBlog?.title || "Blog Title"}
          </h1>
          </Link>
          <p className="hidden sm:block text-sm sm:text-base text-gray-300 mt-3">
            {heroBlog?.deck || "Blog description"}
          </p>
          <p className="text-xs sm:text-sm mt-2 text-gray-400">
            {getDateFun(heroBlog?.createdAt) || "Date not available"}
          </p>
        </div>
      </div>

      {/* OTHER BLOGS GRID */}
      <div className="px-6 bg-black sm:px-10 lg:px-16 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {otherBlogs.map((blog) => (
            <div
              key={blog.id}
              className="flex items-center border-r justify-between gap-3 group cursor-pointer"
            >
              <div className="flex-1">
                <p className="text-xs font-bold tracking-widest text-gray-400 mb-1">
                  {blog.category?.name}
                </p>
                <Link to={`/blog/${blog.slug}`}>
                  <h3 className="text-base sm:text-lg font-semibold mb-1 group-hover:text-gray-200 transition">
                  {blog.title}
                </h3>
                </Link>
                <p className="text-xs text-gray-500">{blog.date}</p>
              </div>
              <div className="w-16 h-16 sm:w-20 sm:h-20 overflow-hidden rounded-lg flex-shrink-0">
                <SafeImage
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* TRENDING SECTION */}
      <div className="flex flex-col lg:flex-row min-h-[50vh] bg-white text-black">
        {/* Left side */}
        <div className="flex-1 lg:flex-3/4 border-t-2 border-black mx-6 sm:mx-10 mt-10">
          <h3 className="bg-black text-white font-bold text-sm uppercase px-3 py-1 w-fit -mt-3">
            Trending
          </h3>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* LEFT SIDE (2 smaller posts) */}
              <div className="col-span-1 flex flex-col gap-6">
                {allBlogs.slice(1, 4).map((post) => (
                  <div key={post.id} className="flex flex-col">
                    <SafeImage
                      src={post.image}
                      alt={post.title}
                      className="w-full h-40 object-cover rounded"
                    />
                    <p className="text-xs font-bold tracking-widest text-gray-500 mt-2">
                      {post.category?.name}
                    </p>
                    <h3 className="font-bold text-lg leading-snug hover:underline cursor-pointer">
                      {post.title}
                    </h3>
                    <p className="text-xs text-gray-500">{post.author?.username}</p>
                    <hr className="text-gray-200 text-sm mt-2" />
                  </div>
                ))}
              </div>

              {/* RIGHT SIDE (main featured post) */}
              <div className="col-span-2 relative">
                <div>
                  <SafeImage
                    src={heroBlog.image}
                    alt={heroBlog.title}
                    className="w-full h-[400px] object-cover rounded"
                  />
                  <div className="mt-4 bottom-6 left-6 text-black">
                    <p className="text-xs font-bold tracking-widest">
                      {heroBlog.category?.name}
                    </p>
                    <h2 className="text-3xl font-extrabold mt-2 max-w-lg">
                      {heroBlog.title}
                    </h2>
                    <p className="text-sm mt-2 text-gray-900">
                      {trimData(heroBlog.description, 30)}
                    </p>
                    <p className="text-sm uppercase tracking-wide font-semibold mt-2 text-gray-900">
                      {heroBlog.author?.username}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right side */}
        <div className="flex-1 lg:flex-1/4 border-t-2 border-black mx-6 sm:mx-10 mt-10">
          <h3 className="bg-black text-white font-bold text-sm uppercase px-3 py-1 w-fit mt-[-12px]">
            Popular
          </h3>
          <div className="p-6">
            {allBlogs.slice(0, 5).map((blog, index) => (
              <div key={blog.id || index}>
                <div className="flex gap-2 justify-between">
                  <div className="flex-2/3">
                    <div className="text-sm font-semibold font-serif hover:underline text-black mb-1">
                      {blog.title}
                    </div>
                    <p className="text-sm mt-2 text-gray-900">
                      {trimData(blog.description, 15)}
                    </p>
                    <div className="text-xs uppercase tracking-wider mt-2 font-semibold font-mono text-black">
                      {blog.author?.username}
                    </div>
                  </div>

                  <div className="relative flex-1/3 flex">
                    <div className="my-auto w-full h-[50%] aspect-square bg-blue-400">
                      <SafeImage
                        src={blog.image}
                        className="w-full h-full justify-center content-center"
                        alt={blog.author?.username}
                      />
                    </div>
                  </div>
                </div>
                <hr className="text-gray-200 text-sm my-2" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Exclusive Post */}
      <div className="flex flex-col min-h-[50vh] m-10 bg-white text-black">
        <div className="relative p-5 border-t-2">
          <h3 className="bg-black absolute left-0 top-0 text-white font-bold text-sm uppercase px-3 py-1 w-fit -mt-3">
            Exclusive
          </h3>
        </div>

        <div className="flex w-full border">
          <div className="flex p-10">
            <div className="flex-2/3">
              <SafeImage src={heroBlog.image} alt={heroBlog.title} />
            </div>
            <div className="flex-1/3">
              <div className="text-2xl font-custom text-black">
                {heroBlog.title}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogLayout;
