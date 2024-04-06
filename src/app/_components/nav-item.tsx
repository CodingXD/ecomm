"use client";

import Link from "next/link";
import useUserStore from "~/store/user";

type Props = {
  href: string;
  text: string;
  isProtected: boolean;
};

export default function NavItem({ href, text, isProtected }: Props) {
  const user = useUserStore((state) => state.user);
  if (!user && isProtected) return <></>;
  else if (user && isProtected && text === "Hi") text += `, ${user.name}`;

  return (
    <Link href={href} className="text-xs font-medium hover:text-gray-700">
      {text}
    </Link>
  );
}
