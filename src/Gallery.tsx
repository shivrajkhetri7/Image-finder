import React, { useEffect, useRef } from 'react';

const Gallery = ({ imageList }: any) => {
    const firstImageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (firstImageRef.current) {
            firstImageRef?.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }, [imageList]);

    return (
        <div className="gallery">
            {imageList.map((image: any, index: number) => (
                <div
                    key={image.id}
                    ref={index === 0 ? firstImageRef : null} // Set ref for the first image
                    className="gallery-item"
                    style={{
                        backgroundImage: `url(${image?.webformatURL})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                >
                    <a href={image.pageURL} target="_blank" rel="noopener noreferrer" className="gallery-link">
                        {/* <div className="overlay">
                            <p>{image.tags}</p>
                            <p>Likes: {image.likes}</p>
                        </div> */}
                    </a>
                </div>
            ))}
        </div>
    );
};

export default Gallery;
