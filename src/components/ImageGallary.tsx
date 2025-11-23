import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface ImageGalleryProps {
  title: string;
  images: string[];
  type: "accepted" | "refused";
}

const ImageGallery = ({ title, images, type }: ImageGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const baseUrl = import.meta.env.VITE_BASE_URL;

  const colorClass =
    type === "accepted" ? "border-green-200" : "border-red-200";
  const headerColor = type === "accepted" ? "text-green-600" : "text-red-600";

  return (
    <>
      <Card className={`${colorClass} border-2`}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className={headerColor}>{title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          {images?.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {images.map((image, index) => (
                <div key={index} className="group relative">
                  <img
                    src={baseUrl + "/" + image}
                    alt={`${type} item ${index + 1}`}
                    className="h-32 w-full cursor-pointer rounded-lg border object-cover transition-opacity hover:opacity-80"
                    onClick={() => setSelectedImage(image)}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center text-gray-500">
              <Upload className="mx-auto mb-4 size-12 text-gray-300" />
              <p>No images uploaded yet</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog
        open={!!selectedImage}
        onOpenChange={() => setSelectedImage(null)}
      >
        <DialogContent className="max-w-4xl">
          {selectedImage && (
            <img
              src={baseUrl + "/" + selectedImage}
              alt="Preview"
              className="h-auto max-h-[80vh] w-full object-contain"
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ImageGallery;
