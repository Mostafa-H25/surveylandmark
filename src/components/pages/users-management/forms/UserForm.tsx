import type { Dispatch, FormEventHandler, SetStateAction } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { type UserRole, useAuth } from "@/contexts/AuthContext";
import { userRoles, UserRolesEnum } from "@/constants/defaults";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type User = {
  name: string;
  email: string;
  role: UserRole;
  financialLimit: string;
};

type Props = {
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
  setUserFormOpen: Dispatch<SetStateAction<boolean>>;
  handleSubmit: FormEventHandler<HTMLFormElement>;
};

const UserForm = ({ user, setUser, setUserFormOpen, handleSubmit }: Props) => {
  const { user: currentUser } = useAuth();

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Full Name</Label>
        <Input
          id="name"
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
          placeholder="Enter full name"
          required
        />
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="Enter email address"
          required
        />
      </div>
      <div>
        <Label htmlFor="role">Role</Label>
        <Select
          value={user.role}
          onValueChange={(value: UserRole) => setUser({ ...user, role: value })}
        >
          <SelectTrigger className="capitalize">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {userRoles.map((role) => {
              if (
                currentUser?.role !== UserRolesEnum.SUPER_ADMIN &&
                role === UserRolesEnum.SUPER_ADMIN
              )
                return null;

              return (
                <SelectItem key={role} value={role} className="capitalize">
                  {role.replaceAll("_", " ")}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="financialLimit">Financial Limit</Label>
        <Input
          id="financialLimit"
          type="number"
          value={user.financialLimit}
          onChange={(e) => setUser({ ...user, financialLimit: e.target.value })}
          placeholder="Enter financial limit"
        />
      </div>
      <div className="flex justify-end gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={() => setUserFormOpen(false)}
        >
          Cancel
        </Button>
        <Button type="submit">Submit</Button>
      </div>
    </form>
  );
};

export default UserForm;
