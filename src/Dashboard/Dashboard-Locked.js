import React from 'react';
import Navigation from "../Navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faLock
} from "@fortawesome/free-solid-svg-icons";
import '../CSS/home.css';

const DashboardLocked = () => {
    const dashboardLockedStyle = {
        position: 'relative',
    };
    library.add(faLock);

    const overlayStyle = {
        position: 'fixed',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        zIndex: 998,
    };

    const messageStyle = {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
        padding: '20px',
        borderRadius: '8px',
        zIndex: 10000,
        fontSize: '25px',
        fontFamily: 'sans-serif'
    };

    const imageScrollerStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', // Adjust the column size as needed
        gap: '20px',
        padding: '20px',
        marginTop: '50px', // Add margin-top to create space for the message
        position: 'relative', // Set position to relative to place the images behind the overlay
    };

    // Background images (Sample URLs)
    const backgroundImagesStyle = {
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        opacity: 0.3, // Adjust opacity as needed
    };

    return (
        <div>
            <Navigation />
            <div style={dashboardLockedStyle} className="dashboard-locked-content">
                <div className="background-images" style={backgroundImagesStyle}></div>
                <div style={overlayStyle}>
                    <div style={messageStyle}>
                    <FontAwesomeIcon icon={faLock} bounce fontSize={'50px'}/>
                        <p>You are not a premium user</p>
                    </div>
                </div>
                <div className="image-scroller-premium" style={imageScrollerStyle}>
                    {/* Include the ImageScrollerPremium component with the provided images */}
                    <ImageScrollerPremium />
                </div>
            </div>
        </div>
    );
};

const ImageScrollerPremium = ({
    image1 = "https://images.unsplash.com/photo-1546548970-71785318a17b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8ZnJ1aXRzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60",
    image2 = "https://images.unsplash.com/photo-1590779033100-9f60a05a013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dmVnZXRhYmxlc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60",
    image3 = "https://images.unsplash.com/photo-1529258283598-8d6fe60b27f4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGRhaXJ5fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60",
    image4 = "https://images.unsplash.com/photo-1603048297172-c92544798d5a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fG1lYXR8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60",
    image5 = "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cGFzdGF8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60",
    image6 = "https://images.unsplash.com/photo-1586585571612-bbc4176c9bf2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cGFudHJ5fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60",
  }) => {
    return (
      <>
        <a href="/fruits">
          <div className="image-container">
            <img src={image1} alt="Fruits" />
            <div className="image-label">Fruits</div>
          </div>
        </a>
        <a href="/vegetables">
          <div className="image-container">
            <img src={image2} alt="Vegetables" />
            <div className="image-label">Vegetables</div>
          </div>
        </a>
        <a href="/dairy">
          <div className="image-container">
            <img src={image3} alt="Dairy" />
            <div className="image-label">Dairy</div>
          </div>
        </a>
        <a href="/meat">
          <div className="image-container">
            <img src={image4} alt="Meat" />
            <div className="image-label">Meat</div>
          </div>
        </a>
        <a href="/pasta">
          <div className="image-container">
            <img src={image5} alt="Pasta" />
            <div className="image-label">Pasta</div>
          </div>
        </a>
        <a href="/misc">
          <div className="image-container">
            <img src={image6} alt="Misc" />
            <div className="image-label">Misc</div>
          </div>
        </a>
      </>
    );
  };

export default DashboardLocked;
