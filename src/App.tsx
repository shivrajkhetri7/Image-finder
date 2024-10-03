import './App.css';
import React, { useState } from 'react';
import axios from 'axios';
import SEARCH_ICONS from "./assets/search.png";
import Gallery from './Gallery';
import { useDispatch, useSelector } from 'react-redux';
import { setImageList } from './store/Slices/imageStoreSlice'; // Import the action

function App() {
  const [image, setImage] = useState("");
  const [imageList, setImageListState] = useState([]); // Local state for current image list
  const dispatch = useDispatch();
  const cachedImages = useSelector((state:any) => state?.imageList?.images); // Get cached images from Redux store

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setImage(event.target.value);
  }

  const getImageGalleryList = async () => {
    try {
      if (image && image !== "") {
        console.log('image',image.toLowerCase())
        // Check if the image list already exists in the store
        if (cachedImages[image?.toLowerCase()]) {
          console.log("Using cached data for:", image);
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
      <div className="App">
        <div className='title'>Photo GPT</div>
        <div className='inputs-container'>
          <input
            placeholder='please enter image name'
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
