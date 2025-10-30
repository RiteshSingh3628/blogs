import React from 'react'



function CategoryPage() {

    const blogs = [
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
   
    const trimData = (data, len) => {
    let arrayData = data.split(/\s+/);
    if (arrayData.length > len) {
      return arrayData.slice(0, len).join(" ");
    }
    return arrayData.join(" ");
  };
  return (
    <div>
      <div className="flex flex-col lg:flex-row min-h-[50vh] bg-white text-black">
        {/* Left side */}
        <div className="flex-1 lg:flex-3/4 border-t-2 border-black mx-6 sm:mx-10 mt-10">
          <h3 className="bg-black text-white font-bold text-sm uppercase px-3 py-1 w-fit -mt-3">
            Trending
          </h3>
          <div className=" p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* LEFT SIDE (2 smaller posts) */}
              <div className="col-span-1 flex flex-col gap-6">
                {blogs.slice(1, 4).map((post) => (
                  <div key={post.id} className="flex flex-col">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-40 object-cover rounded"
                    />
                    <p className="text-xs font-bold tracking-widest text-gray-500 mt-2">
                      {post.category}
                    </p>
                    <h3 className="font-bold text-lg leading-snug hover:underline cursor-pointer">
                      {post.title}
                    </h3>
                    <p className="text-xs text-gray-500">{post.author}</p>
                    <hr className=" text-gray-200 text-sm mt-2" />
                  </div>
                ))}
              </div>

              {/* RIGHT SIDE (main featured post) */}
              <div className="col-span-2 relative">
                <div>
                  <img
                    src={blogs[0].image}
                    alt={blogs[0].title}
                    className="w-full h-[400px] object-cover rounded"
                  />
                  <div className=" mt-4 bottom-6 left-6 text-black">
                    <p className="text-xs font-bold tracking-widest">
                      {blogs[0].category}
                    </p>
                    <h2 className="text-3xl font-extrabold mt-2 max-w-lg">
                      {blogs[0].title}
                    </h2>
                    <p className="text-sm mt-2 text-gray-900">
                      {trimData(blogs[0]?.description, 30)}
                    </p>
                    <p className="text-sm uppercase tracking-wide font-semibold mt-2 text-gray-900">
                      {blogs[0].author}
                    </p>
                  </div>
                </div>
                <hr className=" text-gray-200 text-sm my-2" />
                <div>
                  <img
                    src={blogs[0].image}
                    alt={blogs[0].title}
                    className="w-full h-[400px] object-cover rounded"
                  />
                  <div className=" mt-4 bottom-6 left-6 text-black">
                    <p className="text-xs font-bold tracking-widest">
                      {blogs[0].category}
                    </p>
                    <h2 className="text-3xl font-extrabold mt-2 max-w-lg">
                      {blogs[0].title}
                    </h2>
                    <p className="text-sm mt-2 text-gray-900">
                      {trimData(blogs[0]?.description, 10)}
                    </p>
                    <p className="text-sm uppercase tracking-wide font-semibold mt-2 text-gray-900">
                      {blogs[0].author}
                    </p>
                  </div>
                </div>
                <hr className=" text-gray-200 text-sm my-2" />
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
            {blogs.map((blog, index) => (
              <div key={index}>
                <div className="flex gap-2 justify-between">
                  <div className="flex-2/3">
                    <div className="text-sm font-semibold font-serif hover:underline text-black mb-1">
                      {blog?.title}
                    </div>
                    <p className="text-sm mt-2 text-gray-900">
                      {trimData(blog?.description, 15)}
                    </p>
                    <div className="text-xs uppercase tracking-wider mt-2 font-semibold font-mono text-black">
                      {blog?.author}
                    </div>
                  </div>

                  <div className=" relative  flex-1/3 flex">
                    <div className=" my-auto w-full h-[50%] aspect-square  bg-blue-400">
                      <img
                        src={blog?.image}
                        className="w-full h-full  justify-center content-center"
                        alt={blog?.author}
                      />
                    </div>
                  </div>
                </div>
                <hr className=" text-gray-200 text-sm my-2" />
              </div>
            ))}
          </div>
        </div>
        <hr className=" text-gray-200 text-sm my-2" />
      </div>
    </div>
  )
}

export default CategoryPage
