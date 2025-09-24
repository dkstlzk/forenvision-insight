import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import MobileSidebar from "./MobileSidebar";

const Header = () => {
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
      
      <Button variant="outline" size="sm" className="flex items-center space-x-2">
        <User className="h-4 w-4" />
        <span className="hidden sm:inline">Login</span>
      </Button>
    </header>
  );
};

export default Header;