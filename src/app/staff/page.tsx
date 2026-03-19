'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Header, Footer, WhatsAppButton } from '@/components/layout'
import { 
  Users, 
  BookOpen, 
  Calendar, 
  Clock, 
  FileText, 
  Settings,
  LogIn,
  User,
  Lock,
  ClipboardList,
  GraduationCap
} from 'lucide-react'

export default function StaffPortalPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [staffId, setStaffId] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (staffId && password) {
      setIsLoggedIn(true)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-emerald-500 to-green-600 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <Badge className="bg-white/20 text-white mb-4">Staff Portal</Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Staff Portal
              </h1>
              <p className="text-lg text-white/80">
                Access teaching resources, manage students, submit grades, and administrative tools
              </p>
            </div>
          </div>
        </section>

        {/* Portal Content */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            {!isLoggedIn ? (
              <Card className="max-w-md mx-auto">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-emerald-600" />
                  </div>
                  <CardTitle>Staff Login</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                      <Label htmlFor="staffId">Staff ID</Label>
                      <div className="relative mt-1">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input
                          id="staffId"
                          type="text"
                          placeholder="e.g., STF/001"
                          value={staffId}
                          onChange={(e) => setStaffId(e.target.value)}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="password">Password</Label>
                      <div className="relative mt-1">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input
                          id="password"
                          type="password"
                          placeholder="Enter your password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                    <Button type="submit" className="w-full bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700">
                      <LogIn className="w-4 h-4 mr-2" />
                      Login
                    </Button>
                  </form>
                  <p className="text-center text-sm text-gray-500 mt-4">
                    Forgot your password? Contact the IT department.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-6">
                {/* Welcome Banner */}
                <Card className="bg-gradient-to-r from-emerald-500 to-green-600 text-white">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-2xl font-bold">Welcome, Staff Member!</h2>
                        <p className="text-white/80">Access your teaching and administrative tools</p>
                      </div>
                      <Button variant="outline" onClick={() => setIsLoggedIn(false)} className="bg-white/20 border-white/30 text-white hover:bg-white/30">
                        Logout
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Card>
                    <CardContent className="p-4 text-center">
                      <GraduationCap className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
                      <div className="text-2xl font-bold">150</div>
                      <p className="text-sm text-gray-500">Students</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <BookOpen className="w-8 h-8 text-violet-500 mx-auto mb-2" />
                      <div className="text-2xl font-bold">4</div>
                      <p className="text-sm text-gray-500">Courses</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <Calendar className="w-8 h-8 text-amber-500 mx-auto mb-2" />
                      <div className="text-2xl font-bold">12</div>
                      <p className="text-sm text-gray-500">Classes/Week</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <ClipboardList className="w-8 h-8 text-rose-500 mx-auto mb-2" />
                      <div className="text-2xl font-bold">3</div>
                      <p className="text-sm text-gray-500">Pending Tasks</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Portal Features */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center">
                          <ClipboardList className="w-6 h-6 text-emerald-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold">Attendance</h3>
                          <p className="text-sm text-gray-500">Mark student attendance</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-violet-100 flex items-center justify-center">
                          <FileText className="w-6 h-6 text-violet-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold">Submit Grades</h3>
                          <p className="text-sm text-gray-500">Enter student results</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center">
                          <Calendar className="w-6 h-6 text-amber-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold">Timetable</h3>
                          <p className="text-sm text-gray-500">View teaching schedule</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-rose-100 flex items-center justify-center">
                          <GraduationCap className="w-6 h-6 text-rose-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold">Student List</h3>
                          <p className="text-sm text-gray-500">View enrolled students</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-cyan-100 flex items-center justify-center">
                          <BookOpen className="w-6 h-6 text-cyan-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold">Resources</h3>
                          <p className="text-sm text-gray-500">Upload course materials</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center">
                          <Settings className="w-6 h-6 text-indigo-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold">Settings</h3>
                          <p className="text-sm text-gray-500">Update profile & preferences</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  )
}
