import { Button } from "@/components/ui/button";
import { User, Sun, Moon } from "lucide-react";
import MobileSidebar from "./MobileSidebar";
import { useTheme } from "next-themes";

const Header = () => {
  const { theme, setTheme } = useTheme();

  return (
    <header className="h-16 border-b bg-card px-6 flex items-center justify-between shadow-sm">
      <div className="flex items-center space-x-4">
        <MobileSidebar />
        <div className="flex items-center space-x-2">
          <h1 className="text-2xl font-bold text-foreground">ForenSight</h1>
          <div className="h-6 w-px bg-border ml-2 hidden sm:block" />
          <span className="text-sm text-muted-foreground font-medium hidden sm:inline">AI-Powered UFDR Analysis</span>
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="flex items-center space-x-2"
        >
          {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          <span className="hidden sm:inline">{theme === "dark" ? "Light" : "Dark"}</span>
        </Button>
        <Button variant="outline" size="sm" className="flex items-center space-x-2">
          <User className="h-4 w-4" />
          <span className="hidden sm:inline">Login</span>
        </Button>
      </div>
    </header>
  );
};

export default Header;