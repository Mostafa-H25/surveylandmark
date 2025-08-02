import React, { useState } from "react";
import { Upload, X, FileText } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { fileCategories, KILOBYTE, SIZES } from "@/constants/defaults";

interface UploadedFile {
  file: File;
  id: string;
}

const FileUploadSection = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  // const [selectedExtension, setSelectedExtension] = useState("");
  const [selectedDirection, setSelectedDirection] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);

  const getDirectionOptions = (category: string) => {
    return fileCategories.find((c) => c.value === category)?.options || [];
  };

  const directionOptions = getDirectionOptions(selectedCategory);

  const handleFileUpload = (files: FileList | null) => {
    if (!files) return;

    const newFiles: UploadedFile[] = Array.from(files).map((file) => ({
      file,
      id: Math.random().toString(36).substring(2, 9),
    }));
    setUploadedFiles((prev) => [...prev, ...newFiles]);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    handleFileUpload(e.dataTransfer.files);
  };

  const removeFile = (fileId: string) => {
    setUploadedFiles((prev) => prev.filter((f) => f.id !== fileId));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";

    const i = Math.floor(Math.log(bytes) / Math.log(KILOBYTE));
    return (
      parseFloat((bytes / Math.pow(KILOBYTE, i)).toFixed(2)) + " " + SIZES[i]
    );
  };

  return (
    <div className="space-y-6 rounded-lg border border-gray-200 bg-white p-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold text-gray-900">Upload Data</h2>
        <p className="text-sm text-gray-600">
          Upload Excel or CSV files to set up data in each department table.
        </p>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              File Category
            </label>
            <Select
              value={selectedCategory}
              onValueChange={(value) => {
                setSelectedCategory(value);
                setSelectedDirection(""); // Reset direction when category changes
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {fileCategories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              File Extension
            </label>
            <Select
              value={selectedExtension}
              onValueChange={setSelectedExtension}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select extension" />
              </SelectTrigger>
              <SelectContent>
                {fileExtensions.map((extension) => (
                  <SelectItem key={extension.value} value={extension.value}>
                    {extension.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div> */}

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              File Direction
            </label>
            <Select
              value={selectedDirection}
              onValueChange={setSelectedDirection}
              disabled={!selectedCategory || directionOptions.length === 0}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select direction" />
              </SelectTrigger>
              <SelectContent>
                {directionOptions.map((direction) => (
                  <SelectItem key={direction.value} value={direction.value}>
                    {direction.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div
        className={`rounded-lg border-2 border-dashed p-8 text-center transition-colors ${
          isDragOver
            ? "border-blue-400 bg-blue-50"
            : "border-gray-300 hover:border-blue-400"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <Upload className="mx-auto mb-4 h-12 w-12 text-blue-500" />
        <p className="mb-2 text-gray-600">
          <span className="font-medium">Drag & drop files here, or </span>
          <label className="cursor-pointer font-medium text-blue-600 underline hover:text-blue-700">
            browse
            <input
              type="file"
              multiple
              accept=".csv,.xlsx,.pdf,.docx"
              className="hidden"
              onChange={(e) => handleFileUpload(e.target.files)}
            />
          </label>
        </p>
        <p className="text-sm text-gray-500">
          Supported: .csv, .xlsx, .pdf, .docx
        </p>
      </div>
      <p className="text-gray-400">
        Each upload will overwrite department data for this project.
      </p>

      {uploadedFiles.length > 0 && (
        <div>
          <h3 className="mb-3 text-sm font-medium text-gray-900">
            Uploaded Files ({uploadedFiles.length})
          </h3>
          <div className="space-y-2">
            {uploadedFiles.map((uploadedFile) => (
              <div
                key={uploadedFile.id}
                className="flex items-center justify-between rounded-lg bg-gray-50 p-3"
              >
                <div className="flex items-center space-x-3">
                  <FileText className="h-5 w-5 text-blue-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {uploadedFile.file.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatFileSize(uploadedFile.file.size)}
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFile(uploadedFile.id)}
                  className="h-8 w-8 p-0 hover:bg-red-100 hover:text-red-600"
                >
                  <X className="size-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUploadSection;
