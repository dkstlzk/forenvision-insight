import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Calendar, Users, MessageSquare } from "lucide-react";

interface Dataset {
  id: string;
  name: string;
  uploadDate: string;
  size: string;
  contacts: number;
  messages: number;
  type: string;
}

const mockDatasets: Dataset[] = [
  {
    id: "1",
    name: "iPhone_Backup_2024_Q3.json",
    uploadDate: "2024-09-20",
    size: "45.2 MB",
    contacts: 234,
    messages: 12450,
    type: "WhatsApp"
  },
  {
    id: "2", 
    name: "Android_Extract_Case_001.xml",
    uploadDate: "2024-09-18",
    size: "78.9 MB",
    contacts: 156,
    messages: 8920,
    type: "Signal"
  },
  {
    id: "3",
    name: "Telegram_Data_Export.csv", 
    uploadDate: "2024-09-15",
    size: "23.1 MB",
    contacts: 89,
    messages: 5670,
    type: "Telegram"
  }
];

interface DatasetSectionProps {
  onSelectDataset: (dataset: Dataset) => void;
  selectedDataset: Dataset | null;
}

const DatasetSection = ({ onSelectDataset, selectedDataset }: DatasetSectionProps) => {
  return (
    <div className="w-full max-w-4xl space-y-4">
      <div className="text-center">
        <h2 className="text-xl font-semibold text-foreground mb-2">
          Available Datasets
        </h2>
        <p className="text-muted-foreground">
          Select a dataset to analyze or upload a new UFDR file
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockDatasets.map((dataset) => (
          <Card 
            key={dataset.id}
            className={`cursor-pointer transition-all hover:shadow-md ${
              selectedDataset?.id === dataset.id 
                ? "border-primary bg-primary/5" 
                : "hover:border-primary/50"
            }`}
            onClick={() => onSelectDataset(dataset)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <FileText className="h-5 w-5 text-primary" />
                <Badge variant="secondary" className="text-xs">
                  {dataset.type}
                </Badge>
              </div>
              <CardTitle className="text-sm font-medium leading-tight">
                {dataset.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center text-xs text-muted-foreground">
                <Calendar className="h-3 w-3 mr-1" />
                {new Date(dataset.uploadDate).toLocaleDateString()}
              </div>
              
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="flex items-center">
                  <Users className="h-3 w-3 mr-1 text-muted-foreground" />
                  <span>{dataset.contacts} contacts</span>
                </div>
                <div className="flex items-center">
                  <MessageSquare className="h-3 w-3 mr-1 text-muted-foreground" />
                  <span>{dataset.messages} messages</span>
                </div>
              </div>
              
              <div className="text-xs text-muted-foreground">
                Size: {dataset.size}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DatasetSection;