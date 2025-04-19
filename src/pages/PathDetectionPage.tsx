
import PathDetectionTool from "@/components/PathDetectionTool";

const PathDetectionPage = () => {
  return (
    <div className="max-w-4xl mx-auto py-6 px-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-eco-secondary">Path Detection Tool</h1>
        <p className="text-muted-foreground">
          Find the optimal path through dense forest areas using our AI-powered detection technology
        </p>
      </div>
      
      <PathDetectionTool />
      
      <div className="mt-8 bg-eco-light p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-3">How to use the Path Detection Tool</h2>
        <ol className="list-decimal pl-5 space-y-2">
          <li>Upload a satellite or aerial image of a forest area</li>
          <li>Our AI will process the image to identify paths and obstacles</li>
          <li>View the generated optimal path on the results tab</li>
          <li>Download the path data for offline use</li>
        </ol>
        <div className="mt-4 p-4 bg-white rounded border border-border">
          <p className="text-sm text-muted-foreground">
            <strong>Note:</strong> The Path Detection Tool works best with clear aerial images. 
            For dense canopy forests, consider using multiple images from different angles for 
            better results.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PathDetectionPage;
