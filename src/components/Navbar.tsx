import { Bell, Menu, Moon, Search, Sun, X } from "lucide-react";
import { useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import RewardWidget from "./RewardWidget";

interface NavbarProps {
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
}

const Navbar = ({ toggleSidebar, isSidebarOpen }: NavbarProps) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-white dark:bg-background border-b border-border z-50 px-4">
      <div className="container mx-auto h-full flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-full hover:bg-muted transition-colors"
            aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-eco-primary rounded-full flex items-center justify-center">
              <span className="text-white font-bold">E</span>
            </div>
            <h1 className="text-xl font-bold text-eco-secondary hidden md:block">
              EcoVerse
            </h1>
          </div>
        </div>

        <div className="flex-1 mx-4 max-w-md relative hidden md:block">
          <div className="relative">
            <input
              type="text"
              placeholder="Search EcoVerse..."
              className="w-full py-2 px-4 pl-10 rounded-full bg-muted border border-border focus:outline-none focus:ring-2 focus:ring-eco-primary/50"
            />
            <Search
              size={18}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-muted transition-colors"
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
          
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="p-2 rounded-full hover:bg-muted transition-colors md:hidden"
          >
            <Search size={20} />
          </button>
          <button className="p-2 rounded-full hover:bg-muted transition-colors relative">
            <Bell size={20} />
            <span className="absolute top-0 right-0 h-2 w-2 bg-eco-danger rounded-full"></span>
          </button>
          <RewardWidget />
        </div>
      </div>

      {/* Mobile search */}
      {isSearchOpen && (
        <div className="absolute top-16 left-0 right-0 bg-white p-4 border-b border-border md:hidden animate-slide-in">
          <div className="relative">
            <input
              type="text"
              placeholder="Search EcoVerse..."
              className="w-full py-2 px-4 pl-10 rounded-full bg-muted border border-border focus:outline-none focus:ring-2 focus:ring-eco-primary/50"
              autoFocus
            />
            <Search
              size={18}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
            />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
