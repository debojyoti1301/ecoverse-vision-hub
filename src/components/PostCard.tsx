
import { Heart, MapPin, MessageCircle, Share2 } from "lucide-react";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export interface Post {
  id: string;
  user: {
    name: string;
    avatar?: string;
    username: string;
  };
  image: string;
  caption: string;
  location?: string;
  severity: 'High' | 'Medium' | 'Low';
  likes: number;
  comments: number;
  timestamp: string;
}

interface PostCardProps {
  post: Post;
}

const PostCard = ({ post }: PostCardProps) => {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(post.likes);

  const handleLike = () => {
    if (liked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setLiked(!liked);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'High':
        return 'bg-red-500';
      case 'Medium':
        return 'bg-amber-500';
      case 'Low':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="eco-card card-hover overflow-hidden mb-6 animate-fade-in">
      <div className="flex items-center gap-3 mb-3">
        <Avatar>
          <AvatarImage src={post.user.avatar} />
          <AvatarFallback>{post.user.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <p className="font-medium">{post.user.name}</p>
              <p className="text-sm text-muted-foreground">@{post.user.username}</p>
            </div>
            <Badge className={`${getSeverityColor(post.severity)} text-white`}>
              {post.severity} Severity
            </Badge>
          </div>
        </div>
      </div>

      <div className="relative">
        <img 
          src={post.image} 
          alt={post.caption} 
          className="w-full h-auto rounded-lg object-cover max-h-[500px]"
        />
        {post.location && (
          <div className="absolute bottom-3 left-3 bg-black/50 text-white px-3 py-1 rounded-full text-sm flex items-center gap-1">
            <MapPin size={14} />
            <span>{post.location}</span>
          </div>
        )}
      </div>
      
      <div className="mt-3 flex justify-between items-center">
        <div className="flex gap-4">
          <button 
            className="flex items-center gap-1.5 text-muted-foreground hover:text-eco-danger transition-colors"
            onClick={handleLike}
          >
            <Heart 
              size={20} 
              className={`${liked ? 'fill-eco-danger text-eco-danger' : ''}`} 
            />
            <span>{likes}</span>
          </button>
          <button className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors">
            <MessageCircle size={20} />
            <span>{post.comments}</span>
          </button>
        </div>
        <button className="text-muted-foreground hover:text-foreground transition-colors">
          <Share2 size={20} />
        </button>
      </div>
      
      <p className="mt-3 text-foreground">{post.caption}</p>
      <p className="mt-1 text-sm text-muted-foreground">{post.timestamp}</p>
    </div>
  );
};

export default PostCard;
