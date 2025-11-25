import React, { useContext } from 'react';
import { Container, PostCard, Hero, Loader , HighLight} from '../components';
import { Link } from 'react-router-dom';
import { ContextStore } from '../context/contextStore';
import { useSelector } from 'react-redux';

const Home = () => {
  const { postList, loading } = useContext(ContextStore);
  const user = useSelector((state)=>state.auth.userData);

  // useEffect(()=>{
  //   console.log(user)
  // },[user])

  const categories = [
    "Random Thought",
    "Learn & Share",
    "Academic",
    "Subject Review",
    "Prominent Places" 
  ];

  const publicPosts = postList
    .filter((post) => post.status === "Public")
    .sort((a, b) => new Date(b.$createdAt) - new Date(a.$createdAt)); 

  const renderCategoryPosts = (category) => {
    const categoryPosts = publicPosts.filter((post) => post.category === category);
    const limitedPosts = categoryPosts.slice(0, 4);

    if (limitedPosts.length === 0) return null;

    return (
      <div key={category} className="w-full py-8">
        <Container>
          <h2 className="text-3xl font-bold text-center mb-10 text-amber-800">
            {category === "Random Thought" && <span>Random Thoughts</span>}
            {category !== "Random Thought" && category}
          </h2>

          <div className="flex flex-wrap -mx-2">
            {limitedPosts.map((post) => (
              <div key={post.$id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2">
                <PostCard {...post} />
              </div>
            ))}
          </div>
        </Container>
      </div>
    );
  };

  

  
  const prominentPosts = publicPosts.filter((post) => post.category === "Prominent Places").sort((a, b) => new Date(a.$createdAt) - new Date(b.$createdAt));;
  const limitedProminentPosts = prominentPosts.slice(0, 8);

  return (
    <div className="w-full">
      {!loading && <Hero isLoggedIn={user} />}
      {!user && <HighLight/>}

      {loading ? (
        <Loader />
      ) : user ? (
        <>
          
          {categories
            .filter((category) => category !== "Prominent Places")
            .map((category) => renderCategoryPosts(category))}

          
          {prominentPosts.length > 0 ? (
            <div id="blogs" className="w-full py-8">
              <Container>
                <h2 className="text-3xl font-bold text-center mb-10 text-amber-800">
                  Explore <span className="text-indigo-600">Prominent Places Of KUET</span>
                </h2>

                <div className="flex flex-wrap -mx-2">
                  {limitedProminentPosts.map((post) => (
                    <div key={post.$id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2">
                      <PostCard {...post} />
                    </div>
                  ))}
                </div>

                {prominentPosts.length > 8 && (
                  <div className="flex justify-center items-center mt-8">
                    <Link to="/all-post">
                      <button className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white font-medium rounded-lg shadow-lg transition duration-300">
                        See More
                      </button>
                    </Link>
                  </div>
                )}
              </Container>
            </div>
          ) : (
            <div className="h-[60vh] flex flex-col items-center justify-center gap-4">
              <p className="text-xl font-semibold">No public posts found.</p>
            </div>
          )}
        </>
      ) : null}
    </div>
  );
};

export default Home;
