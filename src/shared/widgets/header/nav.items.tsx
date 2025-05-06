import { navItems } from "@/app/configs/constants"
import Link from "next/link"

function NavItems() {
  return (
    <div className="w-full hidden md:flex items-center">
      {navItems.map((item: NavItems, index: number) => (
        <Link key={index} href={'/'} className="px-5 text-lg">
          {item.title}
        </Link>
      ))}
    </div>
  )
}

export default NavItems