'use client'
import { Button } from "@heroui/react"
import Link from "next/link"


function Toolbar() {
  return (
    <>
    <Button color="primary" className="text-lg">
        Start Trial
    </Button>
    <Link href={'/sign-up'}>
        Login
    </Link>
    </>
  )
}

export default Toolbar