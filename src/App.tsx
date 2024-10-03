import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SEARCH_ICONS from "./assets/search.png";
import Gallery from './Gallery';
import { useDispatch, useSelector } from 'react-redux';
import { setImageList } from './store/Slices/imageStoreSlice'; // Import the action
import IMG1 from './assets/Photographers.webp';
import IMG2 from './assets/Image2.jpg';
import IMG3 from './assets/Image3.png';
import IMG4 from './assets/Image4.jpg';
import IMG5 from './assets/Image5.jpg';
import IMG6 from './assets/Image6.jpg';


function App() {
  const [image, setImage] = useState("");
  const [imageList, setImageListState] = useState([]); // Local state for current image list
  const [backgroundIndex, setBackgroundIndex] = useState(0);
  const dispatch = useDispatch();
  const cachedImages = useSelector((state:any) => state?.imageList?.images); // Get cached images from Redux store

  const images = [
    IMG1,
    IMG2,
    IMG3,
    IMG4,
    IMG5,
    IMG6
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setBackgroundIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, []);

  const backgroundImage = images[backgroundIndex];

  function handleChange(event:any) {
    setImage(event.target.value);
  }

  const getImageGalleryList = async () => {
    try {
      if (image && image !== "") {
        // Check if the image list already exists in the store
        if (cachedImages[image?.toLowerCase()]) {
          setImageListState(cachedImages[image]);
          return;
        }

        const encodedImageName = encodeURIComponent(image);
        const response = await axios.get(`https://pixabay.com/api/?key=46318960-385046bf42bdc9ec6a37a7bf5&q=${encodedImageName}&image_type=photo`);

        // Dispatch the action to store the new image list in the Redux store
        dispatch(setImageList({ key: image, images: response.data.hits }));
        setImageListState(response.data.hits); // Update local state
      }
    } catch (error) {
      console.error('Error while calling the image list API:', error);
    }
  };

  return (
    <React.Fragment>
      <div className="App" style={{ backgroundImage: `url(${backgroundImage})` }}>
        <div className='title'>Photo GPT</div>
        <div className='inputs-container'>
          <input
            placeholder='please search photos'
            className='input-search'
            onChange={handleChange}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                getImageGalleryList();
              }
            }}
          />
          <button className='btn-search-img' onClick={getImageGalleryList}>
            <img src={SEARCH_ICONS} alt='search icons' className='search-btn' />
          </button>
        </div>
      </div>
      {imageList?.length > 0 && <Gallery imageList={imageList} />}
    </React.Fragment>
  );
}

export default App;
