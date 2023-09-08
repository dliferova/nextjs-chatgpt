import Link from "next/link";

export const ChatSidebar = () => {
  return (
    <div className="bg-gray-900">
      <Link href="/api/auth/logout" className="text-white">Logout</Link>
    </div>
  )
}
