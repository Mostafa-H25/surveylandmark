import React, { useState } from "react";
import { Upload, X, FileText } from "lucide-react";

import { Button } from "@/components/ui/button";
import { KILOBYTE, SIZES } from "@/constants/defaults";
import { Controller, useFormContext } from "react-hook-form";
import { Label } from "@/components/ui/label";

const FileUploadSection = () => {
  const { control, setValue, watch } = useFormContext();
  const [isDragOver, setIsDragOver] = useState(false);
  const watchedFile = watch("file");

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
    const file = e.dataTransfer.files?.[0];
    if (file) setValue("file", file);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";

    const i = Math.floor(Math.log(bytes) / Math.log(KILOBYTE));
    return (
      parseFloat((bytes / Math.pow(KILOBYTE, i)).toFixed(2)) + " " + SIZES[i]
    );
  };

  return (
    <Controller
      name="file"
      control={control}
      rules={{
        required: "Project file is required.",
      }}
      render={({ field, fieldState: { error } }) => (
        <div className="space-y-6 rounded-lg border border-gray-200 bg-white p-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold text-gray-900">
              Upload Data
            </h2>
            <p className="text-sm text-gray-600">
              Upload Excel files to set up data in each department table.
            </p>
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
            <Upload className="mx-auto mb-4 size-12 text-blue-500" />
            <p className="mb-2 text-gray-600">
              <span className="font-medium">Drag & drop files here, or </span>
              <Label
                htmlFor={field.name}
                className="cursor-pointer font-medium text-blue-600 underline hover:text-blue-700"
              >
                browse
                <input
                  key={watchedFile ? watchedFile.name : "file-upload"}
                  id={field.name}
                  name={field.name}
                  ref={field.ref}
                  onBlur={field.onBlur}
                  type="file"
                  accept=".xlsx"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) field.onChange(file);
                  }}
                />
              </Label>
            </p>
            <p className="text-sm text-gray-500">Supported: .xlsx</p>
          </div>
          {error && (
            <span className="text-xs text-red-500">{error?.message}</span>
          )}
          {field.value && (
            <div>
              <div className="space-y-2">
                <div className="flex items-center justify-between rounded-lg bg-gray-50 p-3">
                  <div className="flex items-center space-x-3">
                    <FileText className="size-5 text-blue-500" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {field.value.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {formatFileSize(field.value.size)}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setValue("file", null)}
                    className="size-8 cursor-pointer p-0 hover:bg-red-100 hover:text-red-600"
                  >
                    <X className="size-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    />
  );
};

export default FileUploadSection;
