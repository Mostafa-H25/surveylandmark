import { Button } from "../ui/button";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { navigation } from "@/constants/defaults";
import { LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import UserCard from "./UserCard";
import { isRequiredRoleOrHigher } from "@/helpers/isRequiredRoleOrHigher";

const Sidebar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const filteredNavigation = navigation.filter((item) => {
    if (!item?.requiredRole) return true;

    return isRequiredRoleOrHigher(item.requiredRole, user?.role);
  });
  return (
    <div className="hidden border-r border-gray-200 bg-white lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
      <div className="flex h-16 items-center border-b px-6">
        <h1 className="text-xl font-bold text-blue-600">Survey LANDMARK</h1>
      </div>
      <nav className="flex-1 space-y-2 px-4 py-6">
        {filteredNavigation.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100",
                { "bg-blue-100 text-blue-700": isActive },
              )}
            >
              <Icon className="size-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>
      <div className="space-y-4 border-t p-4">
        <UserCard />
        <Button
          variant="ghost"
          className="w-full justify-start text-red-600 hover:bg-red-50"
          onClick={logout}
        >
          <LogOut className="mr-3 size-5" />
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
