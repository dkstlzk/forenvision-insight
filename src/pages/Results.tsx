import { useLocation } from "react-router-dom";
import Header from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MessageSquare, Users, Clock, Globe, FileText, TrendingUp, BarChart3, PieChart } from "lucide-react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, BarChart, Bar, PieChart as RechartsPieChart, Cell, ResponsiveContainer } from "recharts";
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

// Mock data for visualizations
const communicationFrequency = [
  { date: "Jan 15", messages: 2 },
  { date: "Jan 16", messages: 2 },
  { date: "Jan 17", messages: 1 },
  { date: "Jan 18", messages: 3 },
  { date: "Jan 19", messages: 0 },
  { date: "Jan 20", messages: 1 },
  { date: "Jan 21", messages: 2 }
];

const contactDistribution = [
  { country: "UK", count: 3, color: "hsl(var(--forensic-teal))" },
  { country: "US", count: 2, color: "hsl(var(--forensic-orange))" },
  { country: "DE", count: 2, color: "hsl(var(--forensic-coral))" }
];

const messageTypes = [
  { type: "SMS", count: 3 },
  { type: "WhatsApp", count: 2 },
  { type: "Telegram", count: 2 }
];

const chartConfig = {
  messages: { label: "Messages", color: "hsl(var(--forensic-teal))" },
  count: { label: "Count", color: "hsl(var(--forensic-teal))" }
};

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

        {/* Data Visualization Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {/* Communication Frequency Chart */}
          <Card className="xl:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                <span>Communication Frequency</span>
              </CardTitle>
              <CardDescription>Messages matching your query over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[200px]">
                <LineChart data={communicationFrequency}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line 
                    type="monotone" 
                    dataKey="messages" 
                    stroke="hsl(var(--forensic-teal))" 
                    strokeWidth={2}
                    dot={{ fill: "hsl(var(--forensic-teal))", strokeWidth: 2 }}
                  />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Contact Distribution Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <PieChart className="h-5 w-5 text-primary" />
                <span>Contact Distribution</span>
              </CardTitle>
              <CardDescription>Foreign contacts by country</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[200px]">
                <RechartsPieChart>
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <RechartsPieChart data={contactDistribution} cx="50%" cy="50%" outerRadius={60} dataKey="count">
                    {contactDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </RechartsPieChart>
                </RechartsPieChart>
              </ChartContainer>
              <div className="flex justify-center space-x-4 mt-4">
                {contactDistribution.map((item, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div 
                      className="w-3 h-3 rounded-sm" 
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm text-foreground">{item.country} ({item.count})</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Message Types Chart */}
          <Card className="lg:col-span-2 xl:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MessageSquare className="h-5 w-5 text-primary" />
                <span>Platform Distribution</span>
              </CardTitle>
              <CardDescription>Messages by platform type</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[200px]">
                <BarChart data={messageTypes} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="type" type="category" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="count" fill="hsl(var(--forensic-teal))" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Pattern Analysis Card */}
          <Card className="lg:col-span-2 xl:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                <span>Pattern Analysis</span>
              </CardTitle>
              <CardDescription>AI-identified communication patterns</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-primary/5 rounded-lg border-l-4 border-primary">
                  <h4 className="font-semibold text-foreground mb-2">Temporal Pattern</h4>
                  <p className="text-sm text-muted-foreground">
                    Peak activity detected between 2-4 PM UTC. Suggests coordinated communication across time zones.
                  </p>
                </div>
                <div className="p-4 bg-primary/5 rounded-lg border-l-4 border-primary">
                  <h4 className="font-semibold text-foreground mb-2">Geographic Pattern</h4>
                  <p className="text-sm text-muted-foreground">
                    Primary communications between UK and US contacts with German intermediary involvement.
                  </p>
                </div>
                <div className="p-4 bg-primary/5 rounded-lg border-l-4 border-primary">
                  <h4 className="font-semibold text-foreground mb-2">Platform Preference</h4>
                  <p className="text-sm text-muted-foreground">
                    SMS preferred for initial contact, WhatsApp for follow-ups, Telegram for sensitive discussions.
                  </p>
                </div>
                <div className="p-4 bg-primary/5 rounded-lg border-l-4 border-primary">
                  <h4 className="font-semibold text-foreground mb-2">Risk Assessment</h4>
                  <p className="text-sm text-muted-foreground">
                    High probability of coordinated financial activity based on keyword frequency and contact patterns.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
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