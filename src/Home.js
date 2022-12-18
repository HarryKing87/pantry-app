import Navigation from "./Navigation";
import "./CSS/home.css";
export default function Home() {
  return (
    <div className="home-component">
      <Navigation />
      <div className="intro">
        <h1>Pantry.</h1>
      </div>
      <div className="content">
        <h3>Who are we?</h3>
        <img
          src="https://media.istockphoto.com/id/1001766336/photo/team-of-business-people-posing-for-a-photo.jpg?s=612x612&w=0&k=20&c=V-GEGp4KfUdcvmESvmCLmgkddzoJLZ2ebC6n_ntZG_Y="
          alt=""
          width={"100%"}
        />
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed quo
          aspernatur reprehenderit, dignissimos commodi totam placeat, id
          architecto ullam, perferendis officia natus sapiente? Nam quibusdam
          porro doloremque dignissimos ducimus facilis. Lorem ipsum dolor, sit
          amet consectetur adipisicing elit. Totam, possimus laudantium! Fuga,
          iure earum? Eius in molestiae sed dolorum, quos placeat. Nobis
          nesciunt deserunt ipsa? Itaque ipsam quia vero dolor.
        </p>
      </div>

      <div className="content">
        <h3>What we do?</h3>
        <img
          src="https://img.freepik.com/free-photo/cheerful-young-colleagues-indoors-coworking_171337-746.jpg?w=2000"
          alt=""
          width={"100%"}
        />
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed quo
          aspernatur reprehenderit, dignissimos commodi totam placeat, id
          architecto ullam, perferendis officia natus sapiente? Nam quibusdam
          porro doloremque dignissimos ducimus facilis. Lorem ipsum dolor, sit
          amet consectetur adipisicing elit. Totam, possimus laudantium! Fuga,
          iure earum? Eius in molestiae sed dolorum, quos placeat. Nobis
          nesciunt deserunt ipsa? Itaque ipsam quia vero dolor.
        </p>
      </div>

      <div className="content">
        <h3>Our Objectives</h3>
        <img
          src="https://www.ccl.org/wp-content/uploads/2020/11/10-Steps-for-Establishing-Team-Norms-center-for-creative-leadership.jpg"
          alt=""
          width={"100%"}
        />
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed quo
          aspernatur reprehenderit, dignissimos commodi totam placeat, id
          architecto ullam, perferendis officia natus sapiente? Nam quibusdam
          porro doloremque dignissimos ducimus facilis. Lorem ipsum dolor, sit
          amet consectetur adipisicing elit. Totam, possimus laudantium! Fuga,
          iure earum? Eius in molestiae sed dolorum, quos placeat. Nobis
          nesciunt deserunt ipsa? Itaque ipsam quia vero dolor.
        </p>
      </div>
    </div>
  );
}
