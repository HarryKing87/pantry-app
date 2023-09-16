import "./CSS/dashboard.css";

const ImageScroller = ({
  image1 = "https://images.unsplash.com/photo-1546548970-71785318a17b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8ZnJ1aXRzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60",
  image2 = "https://images.unsplash.com/photo-1590779033100-9f60a05a013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dmVnZXRhYmxlc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60",
  image3 = "https://images.unsplash.com/photo-1529258283598-8d6fe60b27f4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGRhaXJ5fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60",
  image4 = "https://images.unsplash.com/photo-1603048297172-c92544798d5a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fG1lYXR8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60",
  image5 = "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cGFzdGF8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60",
  image6 = "https://images.unsplash.com/photo-1586585571612-bbc4176c9bf2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cGFudHJ5fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60",
}) => {
  return (
    <>
      <div className="image-grid">
        <a href="/fruits">
          <div className="image-container">
            <img src={image1} alt="" />
            <div className="image-label">Fruits</div>
          </div>
        </a>
        <a href="/vegetables">
          <div className="image-container">
            <img src={image2} alt="" />
            <div className="image-label">Vegetables</div>
          </div>
        </a>
        <a href="/dairy">
          <div className="image-container">
            <img src={image3} alt="" />
            <div className="image-label">Dairy</div>
          </div>
        </a>
        <a href="/meat">
          <div className="image-container">
            <img src={image4} alt="" />
            <div className="image-label">Meat</div>
          </div>
        </a>
        <a href="/pasta">
          <div className="image-container">
            <img src={image5} alt="" />
            <div className="image-label">Pasta</div>
          </div>
        </a>
        <a href="/misc">
          <div className="image-container">
            <img src={image6} alt="" />
            <div className="image-label">Misc</div>
          </div>
        </a>
      </div>
    </>
  );
};

export default ImageScroller;
