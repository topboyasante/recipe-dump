import { Beef } from "lucide-react";
import Link from "next/link";

function Logo() {
  return (
    <div>
      <Link href={`/`}>
        <Beef />
      </Link>
    </div>
  );
}

export default Logo;
