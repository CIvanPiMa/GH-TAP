import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="card">
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
          <h1 className="text-6xl text-gloom-brown font-bold mb-4">404</h1>
          <h2 className="text-2xl text-gloom-brown-light font-semibold mb-4">
            Page Not Found
          </h2>
          <p className="mb-8 max-w-md">
            Sorry, the page you are looking for doesn't exist or has been moved.
          </p>
          <Link to="/" className="btn-primary">
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
