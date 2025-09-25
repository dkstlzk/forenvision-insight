import { useState } from "react";
import { Clock, Search } from "lucide-react";

interface QueryHistory {
  query: string;
  dataset: string;
  timestamp: string;
}

const mockQueries: QueryHistory[] = [
  {
    query: "Chats with foreign numbers mentioning bitcoin",
    dataset: "iPhone_Backup_2024_Q3.json",
    timestamp: "2024-09-24"
  },
  {
    query: "Calls longer than 5 minutes",
    dataset: "Android_Extract_Case_001.xml", 
    timestamp: "2024-09-23"
  },
  {
    query: "Media shared in last 30 days",
    dataset: "iPhone_Backup_2024_Q3.json",
    timestamp: "2024-09-23"
  },
  {
    query: "Messages containing suspicious keywords",
    dataset: "Telegram_Data_Export.csv",
    timestamp: "2024-09-22"
  },
  {
    query: "International contacts analysis", 
    dataset: "Android_Extract_Case_001.xml",
    timestamp: "2024-09-22"
  },
  {
    query: "Voice calls during night hours",
    dataset: "iPhone_Backup_2024_Q3.json",
    timestamp: "2024-09-21"
  },
  {
    query: "File transfers over 10MB",
    dataset: "Telegram_Data_Export.csv", 
    timestamp: "2024-09-21"
  },
  {
    query: "Encrypted message patterns",
    dataset: "Android_Extract_Case_001.xml",
    timestamp: "2024-09-20"
  },
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
        {mockQueries.map((item, index) => (
          <button
            key={index}
            onClick={() => setSelectedQuery(index)}
            className={`w-full text-left p-3 rounded-md text-sm transition-colors ${
              selectedQuery === index 
                ? "bg-primary text-primary-foreground" 
                : "hover:bg-muted text-foreground"
            }`}
          >
            <div className="space-y-2">
              <div className="flex items-start space-x-2">
                <Search className="h-3 w-3 mt-0.5 text-current opacity-60" />
                <span className="leading-tight">{item.query}</span>
              </div>
              <div className="ml-5 text-xs opacity-70">
                <div className="font-medium">{item.dataset}</div>
                <div className="text-xs opacity-60">{item.timestamp}</div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchHistory;