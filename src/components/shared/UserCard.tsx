import { useAuthStore } from "@/lib/store/use-auth-store";

const UserCard = () => {
  const user = useAuthStore((state) => state.user);
  return (
    <div className="flex h-auto w-full items-center justify-start space-x-3 p-2">
      <div className="flex size-12 items-center justify-center rounded-full bg-blue-100">
        <span className="text-sm font-medium text-blue-600">
          {user?.name.charAt(0)}
        </span>
      </div>
      <div>
        <p className="text-sm font-medium whitespace-nowrap text-gray-900">
          {user?.name}
        </p>
        <p className="text-xs text-gray-500 capitalize">
          {user?.role?.replaceAll("_", " ")}
        </p>
      </div>
    </div>
  );
};

export default UserCard;
