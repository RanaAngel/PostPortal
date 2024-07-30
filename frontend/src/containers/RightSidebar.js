const [activeButton, setActiveButton] = useState('All');
  const getUserIdFromToken = (token) => {
    try {
      // Decode the token
      const decodedToken = jwtDecode(token);
      
      // Extract the user ID (assuming it's stored as 'userId' in the payload)
      const userId = decodedToken.userId;
      
      return userId;
    } catch (error) {
      console.error('Invalid token:', error);
      return null;
    }
  };
  const handlePostClick = (postId) => {
    navigate(`/post/${postId}`);
  };
 // Set default active button
 const handleClick = async (platform) => {
  setActiveButton(platform);

  const token = localStorage.getItem('token');
  const userId = getUserIdFromToken(token);

  try {
    const response = await axios.post('http://localhost:5000/api/facebook/filter', { platform, userId });
    setPosts(response.data.posts);
  } catch (error) {
    console.error('Error fetching filtered posts:', error);
  }
};

// Fetch initial data or handle any other logic
useEffect(() => {
  handleClick('All'); // Default to 'All' posts
}, []);