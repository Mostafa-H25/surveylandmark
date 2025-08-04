import { Building2 } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { departmentData } from "@/assets/data";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const DepartmentOverviewChart = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building2 className="size-5 text-blue-600" />
          Department Overview
        </CardTitle>
        <CardDescription>Projects and budget by department</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={departmentData} layout="horizontal">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis dataKey="department" type="category" width={80} />
            <Tooltip
              formatter={(value, name) => [
                name === "budget" ? `$${value.toLocaleString()}` : value,
                name === "budget" ? "Budget" : "Projects",
              ]}
            />
            <Bar dataKey="projects" fill="#3b82f6" name="projects" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default DepartmentOverviewChart;
