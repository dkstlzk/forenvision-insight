import { useLocation } from "react-router-dom";
import Header from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MessageSquare, Users, Clock, Globe, FileText, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Mock data for the results
const mockResults = [
  {
    timestamp: "2024-01-15 14:23:45",
    contact: "+44 7911 123456",
    message: "Hey, did you get my bitcoin payment confirmation?",
    type: "SMS"
  },
  {
    timestamp: "2024-01-15 16:45:12", 
    contact: "+1 555 987 6543",
    message: "The bitcoin transaction should be complete by now",
    type: "WhatsApp"
  },
  {
    timestamp: "2024-01-16 09:12:33",
    contact: "+44 7911 123456", 
    message: "Can you check the bitcoin wallet address again?",
    type: "SMS"
  },
  {
    timestamp: "2024-01-16 11:30:21",
    contact: "+49 157 12345678",
    message: "Bitcoin price is rising, good time to transfer",
    type: "Telegram"
  },
  {
    timestamp: "2024-01-17 08:45:15",
    contact: "+1 555 987 6543",
    message: "Meeting about bitcoin investment tomorrow",
    type: "WhatsApp"
  },
];

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const query = location.state?.query || "Sample query";

  const stats = [
    { label: "Total Chats Scanned", value: "2,847", icon: MessageSquare },
    { label: "Matches Found", value: "7", icon: TrendingUp },
    { label: "Foreign Contacts", value: "3", icon: Globe },
    { label: "Time Period", value: "30 days", icon: Clock },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
        <div className="container mx-auto p-4 md:p-6 space-y-6">
        {/* Back button and query info */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <Button 
            variant="outline" 
            onClick={() => navigate('/')}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Search</span>
          </Button>
          
          <Badge variant="secondary" className="text-sm">
            Analysis Complete
          </Badge>
        </div>

        {/* Query Results Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-primary" />
              <span>Query Results</span>
            </CardTitle>
            <CardDescription className="text-base">
              <span className="font-medium">Query:</span> "{query}"
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-primary/5 border-l-4 border-primary p-4 rounded-r-md">
              <p className="text-sm text-foreground">
                <strong>AI Analysis:</strong> Found 7 conversations with foreign numbers (+44, +1, +49) 
                mentioning "bitcoin" across SMS, WhatsApp, and Telegram platforms. 
                Pattern suggests coordinated cryptocurrency discussions with international contacts.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Statistics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <stat.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Results Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MessageSquare className="h-5 w-5 text-primary" />
              <span>Matching Communications</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 text-sm font-semibold text-muted-foreground">Timestamp</th>
                    <th className="text-left p-3 text-sm font-semibold text-muted-foreground">Contact</th>
                    <th className="text-left p-3 text-sm font-semibold text-muted-foreground">Type</th>
                    <th className="text-left p-3 text-sm font-semibold text-muted-foreground">Message</th>
                  </tr>
                </thead>
                <tbody>
                  {mockResults.map((result, index) => (
                    <tr key={index} className="border-b hover:bg-muted/50 transition-colors">
                      <td className="p-3 text-sm text-foreground font-mono">{result.timestamp}</td>
                      <td className="p-3 text-sm">
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline" className="text-xs">
                            {result.contact.startsWith('+44') ? 'UK' : 
                             result.contact.startsWith('+1') ? 'US' : 'DE'}
                          </Badge>
                          <span className="font-mono text-foreground">{result.contact}</span>
                        </div>
                      </td>
                      <td className="p-3 text-sm">
                        <Badge variant="secondary">{result.type}</Badge>
                      </td>
                      <td className="p-3 text-sm text-foreground">{result.message}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Results;