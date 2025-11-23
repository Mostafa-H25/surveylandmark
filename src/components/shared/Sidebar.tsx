import { Button } from "../ui/button";
import { Link, useLocation } from "react-router-dom";
import { navigation } from "@/constants/defaults";
import { LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import UserCard from "./UserCard";
import { isRequiredRoleOrHigher } from "@/helpers/isRequiredRoleOrHigher";
import { useAuthStore } from "@/lib/store/use-auth-store";
import { logoutApi } from "@/api/auth/logout.api";

const Sidebar = () => {
  const location = useLocation();
  const user = useAuthStore((state) => state.user);
  const removeToken = useAuthStore((state) => state.removeToken);

  const filteredNavigation = navigation.filter((item) => {
    if (!item?.requiredRole) return true;

    return isRequiredRoleOrHigher(item.requiredRole, user?.role);
  });

  const logout = async () => {
    await logoutApi();
    removeToken();
  };

  return (
    <div className="fixed inset-y-0 z-10 flex w-64 flex-col border-r border-gray-200 bg-white">
      <div className="flex h-16 items-center border-b px-6">
        <h1 className="text-xl font-bold text-blue-600">LANDMARK Projects</h1>
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
          className="w-full cursor-pointer justify-start text-red-600 hover:bg-red-50"
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
