import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Building2, FolderOpen, Users } from "lucide-react";

type Props = {
  initialStats?: {
    projects: { total: number; addedThisMonth: number; incomplete: number };
    members: { total: number; addedThisMonth: number };
    clients: { total: number; addedThisMonth: number };
  };
};

const EnhancedStats = ({ initialStats }: Props) => {
  const stats = [
    {
      title: "Total Projects",
      value: initialStats?.projects?.total ?? 0,
      description: `+${initialStats?.projects?.addedThisMonth ?? 0} from last month`,
      icon: Building2,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Active Clients",
      value: initialStats?.clients?.total ?? 0,
      description: `+${initialStats?.clients?.addedThisMonth ?? 0} new this month`,
      icon: Users,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Current Projects",
      value: initialStats?.projects?.total ?? 0,
      description: `${initialStats?.projects?.incomplete ?? 0} in progress`,
      icon: FolderOpen,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
    {
      title: "Total Members",
      value: initialStats?.members?.total ?? 0,
      description: `+${initialStats?.members?.addedThisMonth ?? 0} new members`,
      icon: Activity,
      color: "text-indigo-600",
      bgColor: "bg-indigo-100",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-x-20 gap-y-8 md:grid-cols-2 xl:grid-cols-4">
      {stats?.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.title} className="transition-shadow hover:shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {stat.title}
              </CardTitle>
              <div className={`rounded-full p-2 ${stat.bgColor}`}>
                <Icon className={`size-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {stat.value}
              </div>
              <p className="mt-1 text-xs text-gray-500">{stat.description}</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default EnhancedStats;
