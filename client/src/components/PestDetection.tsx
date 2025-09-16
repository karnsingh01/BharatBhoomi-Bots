import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Camera, Upload, CheckCircle, AlertTriangle, Leaf } from "lucide-react";
import diseaseImage from "@assets/generated_images/Coconut_palm_disease_detection_513c6f22.png";

interface DetectionResult {
  disease: string;
  confidence: number;
  severity: string;
  treatment: string;
  malayalam: string;
}

export default function PestDetection() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<DetectionResult | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  // Mock detection result - todo: remove mock functionality
  const mockResult: DetectionResult = {
    disease: "Coconut Leaf Blight",
    confidence: 94,
    severity: "Moderate",
    treatment: "Apply copper-based fungicide. Remove affected leaves. Improve drainage around trees.",
    malayalam: "കോപ്പർ അടിസ്ഥാനമാക്കിയ കുമിൾനാശിനി പ്രയോഗിക്കുക. രോഗബാധിതമായ ഇലകൾ നീക്കംചെയ്യുക."
  };

  const handleImageUpload = () => {
    setIsAnalyzing(true);
    setUploadedImage(diseaseImage);
    
    // Simulate AI analysis
    setTimeout(() => {
      setResult(mockResult);
      setIsAnalyzing(false);
    }, 2000);
    
    console.log('Image uploaded for pest detection');
  };

  const handleCameraCapture = () => {
    console.log('Camera capture initiated');
    handleImageUpload(); // Simulate capture
  };

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'mild': return 'bg-green-500';
      case 'moderate': return 'bg-yellow-500';
      case 'severe': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <Card className="p-6 space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-primary/10 rounded-md">
          <Leaf className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Pest & Disease Detection</h3>
          <p className="text-sm text-muted-foreground">Upload or capture plant images for AI analysis</p>
        </div>
      </div>

      {/* Upload Section */}
      {!uploadedImage && (
        <div className="space-y-4">
          <div className="border-2 border-dashed border-border rounded-lg p-8 text-center space-y-4">
            <div className="flex justify-center">
              <Camera className="w-12 h-12 text-muted-foreground" />
            </div>
            <div>
              <p className="text-foreground font-medium">Upload plant image for analysis</p>
              <p className="text-sm text-muted-foreground">Take clear photos of leaves, fruits, or affected areas</p>
            </div>
            <div className="flex gap-4 justify-center">
              <Button 
                onClick={handleCameraCapture}
                className="gap-2"
                data-testid="button-camera-capture"
              >
                <Camera className="w-4 h-4" />
                Capture Photo
              </Button>
              <Button 
                variant="outline" 
                onClick={handleImageUpload}
                className="gap-2"
                data-testid="button-upload-image"
              >
                <Upload className="w-4 h-4" />
                Upload Image
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Analysis in Progress */}
      {isAnalyzing && (
        <div className="text-center space-y-4 py-8">
          <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto"></div>
          <p className="text-foreground font-medium">Analyzing plant image...</p>
          <p className="text-sm text-muted-foreground">AI is examining for diseases and pests</p>
        </div>
      )}

      {/* Results */}
      {result && uploadedImage && (
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <img 
                src={uploadedImage} 
                alt="Uploaded plant image"
                className="w-full h-48 object-cover rounded-lg"
              />
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="font-medium text-foreground">Analysis Complete</span>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Disease Detected:</span>
                  <Badge variant="outline" data-testid="badge-disease-name">
                    {result.disease}
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Confidence:</span>
                  <span className="font-medium text-foreground">{result.confidence}%</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Severity:</span>
                  <Badge 
                    className={`${getSeverityColor(result.severity)} text-white`}
                    data-testid="badge-severity"
                  >
                    {result.severity}
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Treatment Recommendations */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-primary" />
              <h4 className="font-medium text-foreground">Treatment Recommendations</h4>
            </div>
            
            <div className="p-4 bg-primary/5 rounded-lg space-y-3">
              <p className="text-sm text-foreground">{result.treatment}</p>
              <div className="border-t border-border pt-3">
                <p className="text-sm text-muted-foreground font-medium">Malayalam:</p>
                <p className="text-sm text-foreground">{result.malayalam}</p>
              </div>
            </div>

            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => {
                setResult(null);
                setUploadedImage(null);
              }}
              data-testid="button-new-analysis"
            >
              Analyze Another Image
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
}