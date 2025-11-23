import { ROUTES } from "@/constants/routes";
import { formatCamelCaseToText } from "@/helpers/formatCamelCaseToText";
import { useAuthStore } from "@/lib/store/use-auth-store";
import { Link } from "react-router-dom";

const UserCard = () => {
  const user = useAuthStore((state) => state.user);

  const baseUrl = import.meta.env.VITE_BASE_URL;
  return (
    <Link
      to={ROUTES.SETTINGS}
      className="flex h-auto w-full cursor-pointer items-center justify-start space-x-3 rounded-lg px-4 py-2 hover:bg-blue-50"
    >
      <div className="flex size-12 items-center justify-center overflow-hidden rounded-full bg-blue-100">
        {user?.profileImageUrl ? (
          <img
            src={baseUrl + "/" + user?.profileImageUrl}
            alt="profile image"
            className="object-center"
          />
        ) : (
          <span className="text-sm font-medium text-blue-600">
            {user?.name.charAt(0)}
          </span>
        )}
      </div>
      <div>
        <p className="text-sm font-medium whitespace-nowrap text-gray-900">
          {user?.name}
        </p>
        <p className="text-xs text-gray-500 capitalize">
          {formatCamelCaseToText(user?.role || "")}
        </p>
      </div>
    </Link>
  );
};

export default UserCard;
