"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Menu, User, Edit, LogOut, Moon } from "lucide-react"
import { signOut, useSession } from "@/lib/auth-client"

interface HamburgerMenuProps {
  onNavigate?: (tab: "profile") => void
  onEditProfile?: () => void
}

export function HamburgerMenu({ onNavigate, onEditProfile }: HamburgerMenuProps) {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const { data: session } = useSession()

  const handleLogout = async () => {
    try {
      await signOut()
      setOpen(false)
      router.push("/auth/signin")
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  const handleGoToProfile = () => {
    setOpen(false)
    if (onNavigate) {
      onNavigate("profile")
    }
  }

  const handleEditProfile = () => {
    setOpen(false)
    if (onEditProfile) {
      onEditProfile()
    }
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="text-[#e0e7ff] hover:bg-[#334155]">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent className="bg-[#1e293b] border-[#475569] text-slate-100">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2 text-slate-100">
            <div className="w-8 h-8 bg-gradient-to-br from-[#8b5cf6] to-[#3b82f6] rounded-full flex items-center justify-center">
              <Moon className="h-4 w-4 text-[#e0e7ff]" />
            </div>
            FlowFit
          </SheetTitle>
          <SheetDescription className="text-slate-400">
            {session?.user?.email || "Manage your account"}
          </SheetDescription>
        </SheetHeader>

        <div className="mt-8 space-y-4">
          <Button
            variant="ghost"
            className="w-full justify-start text-slate-200 hover:bg-[#334155] hover:text-[#e0e7ff]"
            onClick={handleGoToProfile}
          >
            <User className="mr-3 h-5 w-5" />
            Go to Profile
          </Button>

          <Button
            variant="ghost"
            className="w-full justify-start text-slate-200 hover:bg-[#334155] hover:text-[#e0e7ff]"
            onClick={handleEditProfile}
          >
            <Edit className="mr-3 h-5 w-5" />
            Edit Profile
          </Button>

          <div className="pt-4 border-t border-[#475569]">
            <Button
              variant="ghost"
              className="w-full justify-start text-red-400 hover:bg-red-950/20 hover:text-red-300"
              onClick={handleLogout}
            >
              <LogOut className="mr-3 h-5 w-5" />
              Logout
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

