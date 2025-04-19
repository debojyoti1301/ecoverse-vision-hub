
import React, { createContext, useContext, useState, useEffect } from "react";
import { Post } from "@/components/PostCard";
import { v4 as uuidv4 } from "uuid";

// Sample placeholder data
const placeholderPosts: Post[] = [
  {
    id: "1",
    user: {
      name: "Jane Cooper",
      username: "janecooper",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3"
    },
    image: "https://images.unsplash.com/photo-1530587191325-3db32d826c18?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
    caption: "Industrial waste polluting our river. This needs immediate attention! #SaveOurRivers #Pollution",
    location: "Detroit, MI",
    severity: "High",
    likes: 142,
    comments: 36,
    timestamp: "2 hours ago"
  },
  {
    id: "2",
    user: {
      name: "Alex Morgan",
      username: "alexm",
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3"
    },
    image: "https://images.unsplash.com/photo-1604187350483-2ac4d576b39d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
    caption: "Air pollution in the city center is reaching alarming levels. We need better regulations. #CleanAir",
    location: "Portland, OR",
    severity: "Medium",
    likes: 89,
    comments: 12,
    timestamp: "5 hours ago"
  },
  {
    id: "3",
    user: {
      name: "Tara Wilson",
      username: "tarawilson",
      avatar: "https://images.unsplash.com/photo-1614644147798-f8c0fc9da7f6?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3"
    },
    image: "https://images.unsplash.com/photo-1621451537984-a5a979de9d6c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3",
    caption: "Plastic waste on our beach after the weekend. Let's organize a cleanup! #PlasticPollution #BeachCleanup",
    severity: "Low",
    likes: 215,
    comments: 43,
    timestamp: "1 day ago"
  }
];

interface AppContextType {
  posts: Post[];
  isModalOpen: boolean;
  isSidebarOpen: boolean;
  addPost: (post: Omit<Post, "id" | "user" | "likes" | "comments">) => void;
  toggleModal: () => void;
  toggleSidebar: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [posts, setPosts] = useState<Post[]>(placeholderPosts);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const addPost = (postData: Omit<Post, "id" | "user" | "likes" | "comments">) => {
    const newPost: Post = {
      id: uuidv4(),
      user: {
        name: "Current User",
        username: "currentuser",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3"
      },
      ...postData,
      likes: 0,
      comments: 0
    };
    
    setPosts([newPost, ...posts]);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <AppContext.Provider
      value={{
        posts,
        isModalOpen,
        isSidebarOpen,
        addPost,
        toggleModal,
        toggleSidebar
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
