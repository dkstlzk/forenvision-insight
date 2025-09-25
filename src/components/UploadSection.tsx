import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, FileText, Search, CheckCircle, Database } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import DatasetSection from "./DatasetSection";

interface Dataset {
  id: string;
  name: string;
  uploadDate: string;
  size: string;
  contacts: number;
  messages: number;
  type: string;
}

const UploadSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDataset, setSelectedDataset] = useState<Dataset | null>(null);
  const [datasetSource, setDatasetSource] = useState<"existing" | "upload">("existing");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleUpload = () => {
    // Simulate upload process
    const newDataset: Dataset = {
      id: Date.now().toString(),
      name: "New_UFDR_Upload.json",
      uploadDate: new Date().toISOString().split('T')[0],
      size: "32.5 MB",
      contacts: 187,
      messages: 9240,
      type: "WhatsApp"
    };
    
    setSelectedDataset(newDataset);
    toast({
      title: "Upload Successful",
      description: "UFDR file has been processed and indexed.",
    });
  };

  const handleSelectDataset = (dataset: Dataset) => {
    setSelectedDataset(dataset);
    setDatasetSource("existing");
  };

  const handleSearch = () => {
    if (!searchQuery.trim() || !selectedDataset) return;
    
    toast({
      title: "Analysis Started", 
      description: `Processing query on ${selectedDataset.name}...`,
    });
    
    // Simulate processing delay then navigate to results
    setTimeout(() => {
      navigate('/results', { 
        state: { 
          query: searchQuery,
          dataset: selectedDataset.name
        } 
      });
    }, 1500);
  };

  return (
    <div className="flex-1 p-8 space-y-8">
      {/* Main Search Section - Now Primary Focus */}
      <div className="flex items-center justify-center">
        <div className="w-full max-w-4xl space-y-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              AI-Powered UFDR Analysis
            </h1>
            <p className="text-lg text-muted-foreground">
              Ask questions about your forensic data using natural language
            </p>
          </div>

          {/* Dataset Selection */}
          <Card className="border border-border">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-foreground">Select Dataset Source</h3>
                  {selectedDataset && (
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Database className="h-4 w-4" />
                      <span>{selectedDataset.name}</span>
                    </div>
                  )}
                </div>
                
                <Select value={datasetSource} onValueChange={(value: "existing" | "upload") => setDatasetSource(value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose dataset source" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="existing">Use Existing Dataset</SelectItem>
                    <SelectItem value="upload">Upload New UFDR File</SelectItem>
                  </SelectContent>
                </Select>

                {datasetSource === "upload" && (
                  <Card className="border-2 border-dashed border-border hover:border-primary transition-colors">
                    <CardContent className="p-6 text-center">
                      <div className="flex flex-col items-center space-y-4">
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
                        <Button onClick={handleUpload} variant="secondary">
                          Select File
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Query Input - Primary Focus */}
          <div className="space-y-4">
            <div className="flex space-x-2">
              <Input
                placeholder="e.g., Show me chats with foreign numbers mentioning bitcoin"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                className="flex-1 h-12 text-base"
                autoFocus
              />
              <Button 
                onClick={handleSearch} 
                disabled={!searchQuery.trim() || !selectedDataset}
                className="px-8 h-12"
                size="lg"
              >
                <Search className="h-5 w-5 mr-2" />
                Analyze
              </Button>
            </div>
            
            {!selectedDataset && (
              <p className="text-sm text-muted-foreground text-center">
                Please select a dataset first to begin analysis
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Available Datasets Section */}
      {datasetSource === "existing" && (
        <div className="flex justify-center">
          <DatasetSection 
            onSelectDataset={handleSelectDataset}
            selectedDataset={selectedDataset}
          />
        </div>
      )}
    </div>
  );
};

export default UploadSection;