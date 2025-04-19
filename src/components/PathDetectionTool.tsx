
import { useState } from "react";
import { 
  Map, 
  Upload, 
  Compass, 
  CornerRightDown,
  Flag
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const PathDetectionTool = () => {
  const [activeTab, setActiveTab] = useState("upload");
  const [hasUploadedImage, setHasUploadedImage] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
        setHasUploadedImage(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProcess = () => {
    if (!hasUploadedImage) return;
    
    setIsProcessing(true);
    
    // Simulate processing delay
    setTimeout(() => {
      // For demo purposes, we'll just use the same image with a filter
      setResultImage(uploadedImage);
      setIsProcessing(false);
      setShowResults(true);
    }, 2000);
  };

  const resetProcess = () => {
    setHasUploadedImage(false);
    setUploadedImage(null);
    setResultImage(null);
    setShowResults(false);
  };

  return (
    <Card className="w-full shadow-md">
      <CardHeader className="bg-eco-secondary text-white rounded-t-xl">
        <CardTitle className="flex items-center gap-2">
          <Compass className="h-5 w-5" />
          Path Detection Tool
        </CardTitle>
        <CardDescription className="text-gray-200">
          Find the optimal path through dense forest areas
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="upload" disabled={isProcessing}>
              <Upload className="h-4 w-4 mr-2" />
              Upload
            </TabsTrigger>
            <TabsTrigger value="results" disabled={!showResults}>
              <Map className="h-4 w-4 mr-2" />
              Results
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="upload" className="space-y-4">
            {!hasUploadedImage ? (
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                <div className="flex flex-col items-center">
                  <div className="bg-eco-light p-4 rounded-full mb-4">
                    <Upload className="h-8 w-8 text-eco-primary" />
                  </div>
                  <h3 className="font-medium text-lg mb-2">Upload a forest image</h3>
                  <p className="text-muted-foreground text-sm mb-4 max-w-md mx-auto">
                    Upload an aerial or satellite image of a forest area to find the optimal path
                  </p>
                  <Button className="bg-eco-primary hover:bg-eco-primary/90 relative overflow-hidden">
                    <span>Select Image</span>
                    <input
                      type="file"
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      accept="image/*"
                      onChange={handleFileUpload}
                    />
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="rounded-lg overflow-hidden border border-border">
                  <img
                    src={uploadedImage!}
                    alt="Uploaded forest"
                    className="w-full h-auto object-cover max-h-[300px]"
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Button 
                    variant="outline" 
                    onClick={resetProcess}
                    disabled={isProcessing}
                  >
                    Upload Different Image
                  </Button>
                  <Button 
                    className="bg-eco-primary hover:bg-eco-primary/90"
                    onClick={handleProcess}
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <>
                        <span className="animate-pulse">Processing...</span>
                      </>
                    ) : (
                      <>
                        <CornerRightDown className="h-4 w-4 mr-2" />
                        Process Image
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="results">
            {showResults && (
              <div className="space-y-4">
                <div className="rounded-lg overflow-hidden border border-border relative">
                  <img
                    src={resultImage!}
                    alt="Path result"
                    className="w-full h-auto object-cover max-h-[300px]"
                  />
                  {/* Path visualization overlay - just an example */}
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path 
                      d="M10,90 C30,40 50,80 90,10" 
                      stroke="#2A9D8F" 
                      strokeWidth="3" 
                      fill="none"
                      strokeDasharray="5,5"
                      className="animate-pulse-scale"
                    />
                  </svg>
                  <div className="absolute top-3 left-3 bg-eco-primary text-white px-2 py-1 rounded text-sm">
                    Start Point
                  </div>
                  <div className="absolute bottom-3 right-3 bg-eco-danger text-white px-2 py-1 rounded text-sm flex items-center gap-1">
                    <Flag className="h-3 w-3" />
                    End Point
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 mt-4">
                  <div className="bg-muted p-3 rounded-lg text-center">
                    <p className="text-sm text-muted-foreground">Distance</p>
                    <p className="font-bold">2.3 km</p>
                  </div>
                  <div className="bg-muted p-3 rounded-lg text-center">
                    <p className="text-sm text-muted-foreground">Difficulty</p>
                    <p className="font-bold">Medium</p>
                  </div>
                  <div className="bg-muted p-3 rounded-lg text-center">
                    <p className="text-sm text-muted-foreground">Est. Time</p>
                    <p className="font-bold">45 min</p>
                  </div>
                </div>
                
                <div className="flex justify-between mt-4">
                  <Button variant="outline" onClick={resetProcess}>
                    Try Another Image
                  </Button>
                  <Button className="bg-eco-accent text-eco-secondary hover:bg-eco-accent/90">
                    Download Path
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default PathDetectionTool;
