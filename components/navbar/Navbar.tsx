import { SignOutButton, UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import { Button } from '../ui/button'

function Navbar() {
  return (
    <nav className='flex items-center justify-between border-b px-6 py-4'>
      <Link href="/dashboard" className='font-semibold text-lg'>
        Expense Tracker
      </Link>
      <div>
        <SignOutButton redirectUrl="/">
          <Button variant="outline" size="sm">Logout</Button>
        </SignOutButton>
      </div>
    </nav>
  )
}

export default Navbar