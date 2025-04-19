
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import PostCard from "@/components/PostCard";
import { useAppContext } from "@/context/AppContext";

const HomePage = () => {
  const { posts, toggleModal } = useAppContext();

  return (
    <div className="max-w-2xl mx-auto py-6 px-4">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-eco-secondary">Your Feed</h1>
        <Button 
          onClick={toggleModal}
          className="bg-eco-primary hover:bg-eco-primary/90 flex items-center gap-2"
        >
          <Plus size={18} />
          New Post
        </Button>
      </div>
      
      <div className="space-y-6">
        {posts.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
        
        {posts.length === 0 && (
          <div className="text-center py-12 bg-muted rounded-lg">
            <h3 className="text-lg font-medium mb-2">No posts yet</h3>
            <p className="text-muted-foreground mb-4">Be the first to post a pollution report!</p>
            <Button 
              onClick={toggleModal}
              className="bg-eco-primary hover:bg-eco-primary/90"
            >
              Upload Image
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
