"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useSession } from "@/lib/auth-client"
import { User, Mail, Lock, Loader2 } from "lucide-react"

interface EditProfileModalProps {
  open: boolean
  onClose: () => void
}

export function EditProfileModal({ open, onClose }: EditProfileModalProps) {
  const { data: session } = useSession()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  // Account info state
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")

  // Password state
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  useEffect(() => {
    if (session?.user) {
      setName(session.user.name || "")
      setEmail(session.user.email || "")
    }
  }, [session])

  const handleUpdateAccount = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setSuccess(null)

    try {
      const { updateUserInfo } = await import("@/actions/user")
      const result = await updateUserInfo({ name, email })

      if (result.error) {
        setError(result.error)
      } else {
        setSuccess("Account information updated successfully!")
        setTimeout(() => {
          setSuccess(null)
          // Refresh the page to update session data
          window.location.reload()
        }, 2000)
      }
    } catch (err) {
      setError("An error occurred while updating your account")
    } finally {
      setIsLoading(false)
    }
  }

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setSuccess(null)

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match")
      setIsLoading(false)
      return
    }

    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters long")
      setIsLoading(false)
      return
    }

    try {
      const { changePassword } = await import("@/actions/user")
      const result = await changePassword({ currentPassword, newPassword })

      if (result.error) {
        setError(result.error)
      } else {
        setSuccess("Password changed successfully!")
        setCurrentPassword("")
        setNewPassword("")
        setConfirmPassword("")
        setTimeout(() => setSuccess(null), 3000)
      }
    } catch (err) {
      setError("An error occurred while changing your password")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-slate-900 border-indigo-500/30 text-slate-100">
        <DialogHeader>
          <DialogTitle className="text-2xl lunar-gradient-text">Edit Profile</DialogTitle>
          <DialogDescription className="text-slate-400">
            Update your account information and security settings
          </DialogDescription>
        </DialogHeader>

        {error && (
          <div className="p-3 rounded-lg bg-red-950/50 border border-red-500/30 text-red-300 text-sm">
            {error}
          </div>
        )}

        {success && (
          <div className="p-3 rounded-lg bg-green-950/50 border border-green-500/30 text-green-300 text-sm">
            {success}
          </div>
        )}

        <Tabs defaultValue="account" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-slate-800">
            <TabsTrigger value="account">Account Info</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>

          <TabsContent value="account" className="space-y-4 mt-4">
            <Card className="border-indigo-500/30 bg-slate-800/50">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2 text-slate-100">
                  <User className="h-5 w-5" />
                  Personal Information
                </CardTitle>
                <CardDescription className="text-slate-400">
                  Update your name and email address
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleUpdateAccount} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-slate-200">
                      Name
                    </Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                      className="border-indigo-500/30 bg-slate-800/50 text-slate-100"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-slate-200">
                      <Mail className="inline h-4 w-4 mr-1" />
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your.email@example.com"
                      className="border-indigo-500/30 bg-slate-800/50 text-slate-100"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Updating...
                      </>
                    ) : (
                      "Update Account"
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-4 mt-4">
            <Card className="border-indigo-500/30 bg-slate-800/50">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2 text-slate-100">
                  <Lock className="h-5 w-5" />
                  Change Password
                </CardTitle>
                <CardDescription className="text-slate-400">
                  Update your password to keep your account secure
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleChangePassword} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword" className="text-slate-200">
                      Current Password
                    </Label>
                    <Input
                      id="currentPassword"
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder="Enter current password"
                      className="border-indigo-500/30 bg-slate-800/50 text-slate-100"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="newPassword" className="text-slate-200">
                      New Password
                    </Label>
                    <Input
                      id="newPassword"
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Enter new password (min 8 characters)"
                      className="border-indigo-500/30 bg-slate-800/50 text-slate-100"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-slate-200">
                      Confirm New Password
                    </Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm new password"
                      className="border-indigo-500/30 bg-slate-800/50 text-slate-100"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Changing...
                      </>
                    ) : (
                      "Change Password"
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

