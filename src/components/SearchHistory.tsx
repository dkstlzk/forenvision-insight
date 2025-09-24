import { useState } from "react";
import { Clock, Search } from "lucide-react";

const mockQueries = [
  "Chats with foreign numbers mentioning bitcoin",
  "Calls longer than 5 minutes",
  "Media shared in last 30 days",
  "Messages containing suspicious keywords",
  "International contacts analysis",
  "Voice calls during night hours",
  "File transfers over 10MB",
  "Encrypted message patterns",
];

const SearchHistory = () => {
  const [selectedQuery, setSelectedQuery] = useState<number | null>(null);

  return (
    <div className="w-80 h-full bg-card border-r border-border">
      <div className="p-4 border-b border-border">
        <div className="flex items-center space-x-2">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <h2 className="font-semibold text-foreground">Search History</h2>
        </div>
      </div>
      
      <div className="p-2 space-y-1">
        {mockQueries.map((query, index) => (
          <button
            key={index}
            onClick={() => setSelectedQuery(index)}
            className={`w-full text-left p-3 rounded-md text-sm transition-colors ${
              selectedQuery === index 
                ? "bg-primary text-primary-foreground" 
                : "hover:bg-muted text-foreground"
            }`}
          >
            <div className="flex items-start space-x-2">
              <Search className="h-3 w-3 mt-0.5 text-current opacity-60" />
              <span className="leading-tight">{query}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchHistory;