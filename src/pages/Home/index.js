import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <h1>My Indian Things Admin page</h1>
      <br />
      <Link
        to={{
          pathname: "/products",
        }}
      >
        Products
      </Link>
      <br />
      <Link to="/orders">Orders</Link>
      <br />
      <Link
        to={{
          pathname: "/categories",
        }}
      >
        Categories
      </Link>
      <br />
      <Link to="/blogs">Blogs</Link>
      <br />
      <Link to="/reviews">Reviews</Link>
    </>
  );
};

export default Home;
