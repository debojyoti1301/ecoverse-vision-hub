
import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-muted px-4">
      <div className="text-center max-w-md animate-fade-in">
        <div className="mb-6 flex justify-center">
          <div className="h-24 w-24 bg-eco-primary rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-4xl">404</span>
          </div>
        </div>
        <h1 className="text-3xl font-bold mb-4 text-eco-secondary">Page Not Found</h1>
        <p className="text-muted-foreground mb-8">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        <Button asChild className="eco-button">
          <Link to="/" className="flex items-center gap-2">
            <ArrowLeft size={16} />
            Return to Home
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
