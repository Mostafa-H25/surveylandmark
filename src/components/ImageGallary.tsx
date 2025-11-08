import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, Eye, Download } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface ImageGalleryProps {
  title: string;
  images: string[];
  type: "accepted" | "refused";
}

const ImageGallery = ({ title, images, type }: ImageGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const colorClass =
    type === "accepted" ? "border-green-200" : "border-red-200";
  const headerColor = type === "accepted" ? "text-green-600" : "text-red-600";

  return (
    <>
      <Card className={`${colorClass} border-2`}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className={headerColor}>{title}</CardTitle>
            <Button
              variant="outline"
              size="sm"
              className="flex cursor-pointer items-center gap-2"
            >
              <Upload className="size-4" />
              Upload Images
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {images.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {images.map((image, index) => (
                <div key={index} className="group relative">
                  <img
                    src={image}
                    alt={`${type} item ${index + 1}`}
                    className="h-32 w-full cursor-pointer rounded-lg border object-cover transition-opacity hover:opacity-80"
                    onClick={() => setSelectedImage(image)}
                  />
                  <div className="bg-opacity-0 group-hover:bg-opacity-30 absolute inset-0 flex items-center justify-center rounded-lg bg-black transition-all">
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100">
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => setSelectedImage(image)}
                      >
                        <Eye className="size-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="secondary"
                        className="cursor-pointer"
                      >
                        <Download className="size-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center text-gray-500">
              <Upload className="mx-auto mb-4 size-12 text-gray-300" />
              <p>No images uploaded yet</p>
              <Button variant="outline" className="mt-4 cursor-pointer">
                Upload First Image
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Image Preview Dialog */}
      <Dialog
        open={!!selectedImage}
        onOpenChange={() => setSelectedImage(null)}
      >
        <DialogContent className="max-w-4xl">
          {selectedImage && (
            <img
              src={selectedImage}
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
