import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowLeft,
  Plus,
  Upload,
  FileText,
  Edit,
  Trash2,
  Download,
  Eye,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Standards = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const { toast } = useToast();
  const [isAddingStandard, setIsAddingStandard] = useState(false);
  const [newStandard, setNewStandard] = useState({
    title: "",
    description: "",
    category: "",
    version: "1.0",
  });

  // Mock standards data
  const [standards, setStandards] = useState([
    {
      id: 1,
      title: "Foundation Standards",
      description: "Standards for foundation construction and quality control",
      category: "Structural",
      version: "2.1",
      lastUpdated: "2024-01-15",
      status: "Active",
      hasDocument: true,
      documentName: "foundation-standards-v2.1.pdf",
    },
    {
      id: 2,
      title: "Electrical Safety Standards",
      description: "Electrical installation and safety requirements",
      category: "Electrical",
      version: "1.5",
      lastUpdated: "2024-01-10",
      status: "Active",
      hasDocument: true,
      documentName: "electrical-safety-v1.5.pdf",
    },
    {
      id: 3,
      title: "Material Quality Standards",
      description: "Quality control standards for construction materials",
      category: "Materials",
      version: "3.0",
      lastUpdated: "2024-01-08",
      status: "Draft",
      hasDocument: false,
      documentName: null,
    },
  ]);

  const handleAddStandard = () => {
    if (!newStandard.title || !newStandard.category) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const standard = {
      id: standards.length + 1,
      ...newStandard,
      lastUpdated: new Date().toISOString().split("T")[0],
      status: "Draft",
      hasDocument: false,
      documentName: null,
    };

    setStandards([...standards, standard]);
    setNewStandard({
      title: "",
      description: "",
      category: "",
      version: "1.0",
    });
    setIsAddingStandard(false);

    toast({
      title: "Success",
      description: "Standard added successfully",
    });
  };

  const handleDeleteStandard = (id: number) => {
    setStandards(standards.filter((s) => s.id !== id));
    toast({
      title: "Success",
      description: "Standard deleted successfully",
    });
  };

  const handleFileUpload = (standardId: number) => {
    // Simulate file upload
    setStandards(
      standards.map((s) =>
        s.id === standardId
          ? {
              ...s,
              hasDocument: true,
              documentName: `${s.title.toLowerCase().replace(/\s+/g, "-")}-v${
                s.version
              }.pdf`,
            }
          : s,
      ),
    );

    toast({
      title: "Success",
      description: "Document uploaded successfully",
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-700";
      case "Draft":
        return "bg-yellow-100 text-yellow-700";
      case "Archived":
        return "bg-gray-100 text-gray-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={() => navigate(`/project/${projectId}`)}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="size-4" />
              Back to Project
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Construction Standards
              </h1>
              <p className="mt-1 text-gray-600">
                Manage project standards and specifications
              </p>
            </div>
          </div>
          <Button
            onClick={() => setIsAddingStandard(true)}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="mr-2 size-4" />
            Add Standard
          </Button>
        </div>

        {/* Add New Standard Form */}
        {isAddingStandard && (
          <Card>
            <CardHeader>
              <CardTitle>Add New Standard</CardTitle>
              <CardDescription>
                Create a new construction standard for this project
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Title *
                  </label>
                  <Input
                    value={newStandard.title}
                    onChange={(e) =>
                      setNewStandard({ ...newStandard, title: e.target.value })
                    }
                    placeholder="Enter standard title"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Category *
                  </label>
                  <Input
                    value={newStandard.category}
                    onChange={(e) =>
                      setNewStandard({
                        ...newStandard,
                        category: e.target.value,
                      })
                    }
                    placeholder="e.g., Structural, Electrical, Materials"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Version
                  </label>
                  <Input
                    value={newStandard.version}
                    onChange={(e) =>
                      setNewStandard({
                        ...newStandard,
                        version: e.target.value,
                      })
                    }
                    placeholder="1.0"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <Textarea
                    value={newStandard.description}
                    onChange={(e) =>
                      setNewStandard({
                        ...newStandard,
                        description: e.target.value,
                      })
                    }
                    placeholder="Describe the standard and its requirements"
                    rows={3}
                  />
                </div>
              </div>
              <div className="mt-6 flex gap-2">
                <Button onClick={handleAddStandard}>Add Standard</Button>
                <Button
                  variant="outline"
                  onClick={() => setIsAddingStandard(false)}
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Standards List */}
        <Card>
          <CardHeader>
            <CardTitle>Project Standards</CardTitle>
            <CardDescription>
              All construction standards and specifications for this project
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Version</TableHead>
                  <TableHead>Last Updated</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Document</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {standards.map((standard) => (
                  <TableRow key={standard.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{standard.title}</p>
                        <p className="text-sm text-gray-600">
                          {standard.description}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>{standard.category}</TableCell>
                    <TableCell>{standard.version}</TableCell>
                    <TableCell>
                      {new Date(standard.lastUpdated).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusBadge(standard.status)}>
                        {standard.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {standard.hasDocument ? (
                          <div className="flex items-center gap-2">
                            <FileText className="size-4 text-green-600" />
                            <span className="text-sm text-green-600">
                              Attached
                            </span>
                          </div>
                        ) : (
                          <span className="text-sm text-gray-400">
                            No document
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Edit className="size-4" />
                        </Button>
                        {standard.hasDocument ? (
                          <>
                            <Button variant="outline" size="sm">
                              <Eye className="size-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Download className="size-4" />
                            </Button>
                          </>
                        ) : (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleFileUpload(standard.id)}
                          >
                            <Upload className="size-4" />
                          </Button>
                        )}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteStandard(standard.id)}
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Standards;
