import React, { useState, useEffect } from 'react';
import appwriteService from '../appwrite/config';
import { Container, PostCard } from '../Components';
import { useSelector } from 'react-redux';

const Home = () => {
  const login = useSelector((state) => state.auth.status);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await appwriteService.getPosts();
        if (response.documents) {
          setPosts(response.documents);
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []); // Empty dependency array to run the effect only once on mount

  if (posts.length === 0) {
    return (
      <div className='w-full py-8 mt-4 text-center'>
        <Container>
          <div className='flex flex-wrap'>
            <div className='p-2 w-full'>
              {!login ? (
                <h1 className='text-2xl font-bold hover:text-gray-500'>
                  Login To Read The Page
                </h1>
              ) : (
                <h1 className='text-2xl font-bold hover:text-gray-500'>
                  Welcome To Home Page
                </h1>
              )}
            </div>
          </div>
        </Container>
      </div>
    );
  } else {
    return (
      
        <div className='w-full py-8'>
          <Container>
            <div className='flex flex-wrap'>
              {posts.map((post) => (
                <div key={post.$id} className='p-2 w-1/4'>
                  <PostCard {...post} />
                </div>
              ))}
            </div>
          </Container>
        </div>
     
    );
  }
};

export default Home;
