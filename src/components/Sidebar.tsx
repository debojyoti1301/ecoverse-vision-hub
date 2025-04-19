
import { 
  Compass, 
  Home, 
  Map, 
  MessageSquare, 
  Plus, 
  Settings, 
  Trees, 
  Users 
} from "lucide-react";
import { Link } from "react-router-dom";

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar = ({ isOpen }: SidebarProps) => {
  const menuItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: Compass, label: "Explore", path: "/explore" },
    { icon: MessageSquare, label: "Messages", path: "/messages" },
    { icon: Users, label: "Community", path: "/community" },
    { icon: Map, label: "Map", path: "/map" },
  ];

  const toolItems = [
    { icon: Trees, label: "Path Detection", path: "/path-detection" },
    { icon: Settings, label: "Settings", path: "/settings" },
  ];

  return (
    <aside 
      className={`fixed left-0 top-16 bottom-0 bg-white border-r border-border w-64 z-40 transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0`}
    >
      <div className="p-4 flex flex-col h-full">
        <button className="eco-button w-full mb-6 flex items-center justify-center gap-2">
          <Plus size={18} />
          <span>New Post</span>
        </button>
        
        <nav className="space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              to={item.path}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-muted text-foreground transition-colors"
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
        
        <div className="mt-8 pt-6 border-t border-border">
          <h3 className="px-3 mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Tools
          </h3>
          <nav className="space-y-1">
            {toolItems.map((item) => (
              <Link
                key={item.label}
                to={item.path}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-muted text-foreground transition-colors"
              >
                <item.icon size={20} />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>
        
        <div className="mt-auto">
          <div className="p-4 bg-eco-light rounded-lg">
            <h3 className="font-medium mb-1">Help the planet!</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Upload pollution images to make a difference.
            </p>
            <Link 
              to="/upload" 
              className="text-eco-primary text-sm font-medium hover:underline"
            >
              Upload now →
            </Link>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
