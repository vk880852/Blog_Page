import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import appwriteService from '../appwrite/config';
import { Button, Container } from '../Components';
import parse from 'html-react-parser';
import { useSelector } from 'react-redux'; 

const Post = () => {
  const [post, setPost] = useState(null); 
  const { slug } = useParams();
  const navigate = useNavigate();
  const userData =useSelector((state)=>state.auth.userData);
  const isAuthor=post&userData?post.userId===userData.$Id:false;
  useEffect(() => {
    const fetchPost = async () => {
      try {
        if (slug) {
          const fetchedPost = await appwriteService.getPost(slug); // Assuming there's a function getPost to fetch a post
          if (fetchedPost) {
            setPost(fetchedPost);
          }
        } else {
          navigate('/');
        }
      } catch (error) {
        console.error('Error fetching post:', error);
        // Handle error as needed, e.g., redirect to an error page
      }
    };

    fetchPost();
  }, [slug, navigate]);
  const deletePost=()=>{
    appwriteService.deletePost(userData.$Id).then(status=>{
        if(status)
        {
            appwriteService.deleteFile(post.featuredImage);
            navigate("/")
        }
    })
  }
  return post ? (
    <div className="py-8">
      <Container>
        <div className='w-full flex justify-center mb-4 relative border rounded-xl p-2'>
          <img src={appwriteService.getFilePreview(post.featuredImage)} alt={post.title} className='rounded-xl' />
          { isAuthor && (
            <div className="absolute-right-6 top-6">
              <Link to={`/edit-post/${post.$id}`}>
                <Button bgColor="bg-green-500" className="mr-3">Edit</Button>
              </Link>
              <Button bgColor="bg-red-500" 
              onClick={deletePost}
              >Delete</Button>
            </div>
          )}
        </div>
        <div className="w-full mb-6">
          <h1 className="text-2xl font-bold">{post.title}</h1>
          <div className="browser-css">
            {parse(post.content)}
          </div>
        </div>
      </Container>
    </div>
  ) : null
};

export default Post;
