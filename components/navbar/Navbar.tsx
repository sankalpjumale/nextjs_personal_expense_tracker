import { UserButton } from '@clerk/nextjs'
import Link from 'next/link'

function Navbar() {
  return (
    <nav className='flex items-center justify-between border-b px-6 py-4'>
      <Link href="/dashboard" className='font-semibold text-lg'>
        Expense Tracker
      </Link>
      {/* <UserButton afterSignOutUrl="/" /> */}
    </nav>
  )
}

export default Navbar