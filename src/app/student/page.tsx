'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Header, Footer, WhatsAppButton } from '@/components/layout'
import { 
  GraduationCap, 
  BookOpen, 
  Calendar, 
  Clock, 
  FileText, 
  Users,
  LogIn,
  User,
  Lock
} from 'lucide-react'

export default function StudentPortalPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [studentId, setStudentId] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Demo login - in production this would authenticate
    if (studentId && password) {
      setIsLoggedIn(true)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-violet-500 to-purple-600 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <Badge className="bg-white/20 text-white mb-4">Student Portal</Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Student Portal
              </h1>
              <p className="text-lg text-white/80">
                Access your academic records, timetable, results, and resources
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
                  <div className="w-16 h-16 rounded-full bg-violet-100 flex items-center justify-center mx-auto mb-4">
                    <GraduationCap className="w-8 h-8 text-violet-600" />
                  </div>
                  <CardTitle>Student Login</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                      <Label htmlFor="studentId">Student ID</Label>
                      <div className="relative mt-1">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input
                          id="studentId"
                          type="text"
                          placeholder="e.g., SSCN/2024/001"
                          value={studentId}
                          onChange={(e) => setStudentId(e.target.value)}
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
                    <Button type="submit" className="w-full bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700">
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
                <Card className="bg-gradient-to-r from-violet-500 to-purple-600 text-white">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-2xl font-bold">Welcome, Student!</h2>
                        <p className="text-white/80">Access your academic information below</p>
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
                      <BookOpen className="w-8 h-8 text-violet-500 mx-auto mb-2" />
                      <div className="text-2xl font-bold">6</div>
                      <p className="text-sm text-gray-500">Courses</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <Calendar className="w-8 h-8 text-green-500 mx-auto mb-2" />
                      <div className="text-2xl font-bold">3.8</div>
                      <p className="text-sm text-gray-500">Current GPA</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <Clock className="w-8 h-8 text-amber-500 mx-auto mb-2" />
                      <div className="text-2xl font-bold">Year 2</div>
                      <p className="text-sm text-gray-500">Semester 1</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <FileText className="w-8 h-8 text-rose-500 mx-auto mb-2" />
                      <div className="text-2xl font-bold">85%</div>
                      <p className="text-sm text-gray-500">Attendance</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Portal Features */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-violet-100 flex items-center justify-center">
                          <Calendar className="w-6 h-6 text-violet-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold">Timetable</h3>
                          <p className="text-sm text-gray-500">View your class schedule</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                          <FileText className="w-6 h-6 text-green-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold">Results</h3>
                          <p className="text-sm text-gray-500">View exam results</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center">
                          <BookOpen className="w-6 h-6 text-amber-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold">E-Learning</h3>
                          <p className="text-sm text-gray-500">Access online courses</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-rose-100 flex items-center justify-center">
                          <Users className="w-6 h-6 text-rose-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold">Fee Statement</h3>
                          <p className="text-sm text-gray-500">View fee balance & history</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-cyan-100 flex items-center justify-center">
                          <User className="w-6 h-6 text-cyan-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold">Profile</h3>
                          <p className="text-sm text-gray-500">Update your information</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center">
                          <Clock className="w-6 h-6 text-indigo-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold">Attendance</h3>
                          <p className="text-sm text-gray-500">Check attendance records</p>
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
