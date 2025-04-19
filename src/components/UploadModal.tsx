
import { useState, useRef } from "react";
import { MapPin, X, Upload, AlertTriangle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (data: any) => void;
}

const UploadModal = ({ isOpen, onClose, onUpload }: UploadModalProps) => {
  const [image, setImage] = useState<string | null>(null);
  const [caption, setCaption] = useState("");
  const [location, setLocation] = useState("");
  const [severity, setSeverity] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [useLocation, setUseLocation] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = () => {
    if (!image || !severity) return;
    
    setIsUploading(true);
    
    // Simulate upload delay
    setTimeout(() => {
      const post = {
        image,
        caption,
        location: useLocation ? location : undefined,
        severity,
        timestamp: new Date().toISOString(),
      };
      
      onUpload(post);
      
      // Reset form
      setImage(null);
      setCaption("");
      setLocation("");
      setSeverity("");
      setIsUploading(false);
      onClose();
    }, 1500);
  };
  
  const handleLocationToggle = () => {
    if (!useLocation) {
      // Simulate getting location
      setLocation("New York, NY");
    } else {
      setLocation("");
    }
    setUseLocation(!useLocation);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Upload Pollution Image</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 pt-4">
          {!image ? (
            <div
              className="border-2 border-dashed border-border rounded-lg p-12 text-center cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <div className="flex flex-col items-center">
                <Upload className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="font-medium text-lg mb-2">Upload an image</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Drag and drop or click to select a file
                </p>
                <Button size="sm">Select Image</Button>
              </div>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>
          ) : (
            <div className="relative">
              <img
                src={image}
                alt="Upload preview"
                className="w-full rounded-lg object-cover max-h-[300px]"
              />
              <button
                className="absolute top-2 right-2 bg-black/50 text-white p-1 rounded-full"
                onClick={() => setImage(null)}
              >
                <X size={16} />
              </button>
              {useLocation && location && (
                <div className="absolute bottom-3 left-3 bg-black/50 text-white px-3 py-1 rounded-full text-sm flex items-center gap-1">
                  <MapPin size={14} />
                  <span>{location}</span>
                </div>
              )}
            </div>
          )}

          <Textarea
            placeholder="Add a caption..."
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="resize-none"
          />

          <div className="grid grid-cols-2 gap-4">
            <Button
              type="button"
              variant={useLocation ? "default" : "outline"}
              className={cn(
                "flex items-center gap-2",
                useLocation && "bg-eco-primary hover:bg-eco-primary/90"
              )}
              onClick={handleLocationToggle}
            >
              <MapPin size={16} />
              {useLocation ? "Location Added" : "Add Location"}
            </Button>

            <Select value={severity} onValueChange={setSeverity}>
              <SelectTrigger>
                <SelectValue placeholder="Severity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="High">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-500" />
                    <span>High Severity</span>
                  </div>
                </SelectItem>
                <SelectItem value="Medium">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-amber-500" />
                    <span>Medium Severity</span>
                  </div>
                </SelectItem>
                <SelectItem value="Low">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-yellow-500" />
                    <span>Low Severity</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="button"
              disabled={!image || !severity || isUploading}
              className="bg-eco-primary hover:bg-eco-primary/90"
              onClick={handleUpload}
            >
              {isUploading ? "Uploading..." : "Upload"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UploadModal;
