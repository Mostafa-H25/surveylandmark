import { Input } from "@/components/ui/input";

const DepartmentConfiguration = () => {
  const departments = [
    { name: "Construction Department", color: "text-blue-600" },
    { name: "Sales Department", color: "text-green-600" },
    { name: "Storage Department", color: "text-purple-600" },
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-2">
        Department Configuration
      </h2>
      <p className="text-sm text-gray-600 mb-6">
        Set up the three main departments for this project
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {departments.map((dept, index) => (
          <div key={index} className="space-y-4">
            <h3 className={`font-medium ${dept.color}`}>{dept.name}</h3>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Capacity
              </label>
              <div className="flex items-center space-x-2">
                <Input type="number" placeholder="0" className="flex-1" />
                <span className="text-sm text-gray-500">
                  {index === 2 ? "m²" : "member"}
                </span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Manager
              </label>
              <Input placeholder="Manager name" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DepartmentConfiguration;
