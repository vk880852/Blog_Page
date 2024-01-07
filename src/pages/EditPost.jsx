import React, { useEffect, useState } from 'react';
import { Container, PostForm } from '../Components';
import appwriteService from '../appwrite/config';
import { useNavigate, useParams } from 'react-router-dom';

const EditPost = () => {
  const [store, setStore] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        if (slug) {
          const fetchedStore = await appwriteService.getPost(slug);
          if (fetchedStore) {
            setStore(fetchedStore);
          }
        } else {
          navigate('/');
        }
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    fetchPost();
  }, [slug, navigate]);

  return store ? (
    <div className='py-8'>
      <Container>
        <PostForm store={store} />
      </Container>
    </div>
  ) : null;
};

export default EditPost;
