import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, FileText, Search, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const UploadSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isUploaded, setIsUploaded] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleUpload = () => {
    setIsUploaded(true);
    toast({
      title: "Upload Successful",
      description: "UFDR file has been processed and indexed.",
    });
  };

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    
    toast({
      title: "Analysis Started", 
      description: "Processing your query...",
    });
    
    // Simulate processing delay then navigate to results
    setTimeout(() => {
      navigate('/results', { state: { query: searchQuery } });
    }, 1500);
  };

  return (
    <div className="flex-1 flex items-center justify-center p-8">
      <div className="w-full max-w-2xl space-y-8">
        {/* Upload Card */}
        <Card className="border-2 border-dashed border-border hover:border-primary transition-colors">
          <CardContent className="p-8 text-center">
            <div className="flex flex-col items-center space-y-4">
              {isUploaded ? (
                <>
                  <CheckCircle className="h-12 w-12 text-green-500" />
                  <h3 className="text-lg font-semibold text-foreground">UFDR File Ready</h3>
                  <p className="text-muted-foreground">File successfully processed and indexed</p>
                </>
              ) : (
                <>
                  <div className="p-4 bg-primary/10 rounded-full">
                    <Upload className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">Upload UFDR File</h3>
                  <p className="text-muted-foreground">
                    Drag and drop your UFDR file here, or click to browse
                  </p>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <FileText className="h-4 w-4" />
                    <span>Supports .json, .csv, .xml formats</span>
                  </div>
                  <Button onClick={handleUpload} className="mt-4">
                    Select File
                  </Button>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Search Section */}
        <div className="space-y-4">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-foreground mb-2">
              Analyze Your Data
            </h2>
            <p className="text-muted-foreground">
              Ask questions about your forensic data using natural language
            </p>
          </div>
          
          <div className="flex space-x-2">
            <Input
              placeholder="e.g., Show me chats with foreign numbers mentioning bitcoin"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              className="flex-1"
              disabled={!isUploaded}
            />
            <Button 
              onClick={handleSearch} 
              disabled={!searchQuery.trim() || !isUploaded}
              className="px-6"
            >
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </div>
          
          {!isUploaded && (
            <p className="text-sm text-muted-foreground text-center">
              Please upload a UFDR file first to begin analysis
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadSection;