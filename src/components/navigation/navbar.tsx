import { UserProfileDropdown } from "@/components/ui/user-profile-dropdown";
import { validateRequest } from "@/lib/auth";
import Link from "next/link";
import Logo from "../ui/logo";

async function Navbar() {
  const { user } = await validateRequest();
  return (
    <nav className="w-screen h-[7vh] fixed z-[50] top-0 bg-background">
      <div className="max-w-screen-xl mx-auto h-full p-5 flex justify-between items-center border-b">
        <Logo />
        <div className="flex justify-end items-center gap-5 w-3/4">
          {user && <UserProfileDropdown username={user.username} user_id={user?.id} />}
          {!user && <Link href={`/sign-in`}>Sign In</Link>}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
