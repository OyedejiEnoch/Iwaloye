"use client"

import React, { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Eye, EyeOff } from "lucide-react"
import { toast } from "sonner"
import { useLoginMutation } from "@/redux/api/authApi"
import { useDispatch } from "react-redux"
import { setAuth } from "@/redux/features/authSlice"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()
  const dispatch = useDispatch()
  const [login, { isLoading }] = useLoginMutation()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !password) {
      toast.error("Please fill in all fields")
      return
    }

    try {
      const result = await login({ email, password }).unwrap()

      // The backend returns:
      // {
      //   token: "...",
      //   role: "super-admin" | "sub-admin",
      //   admin: { ... }
      // }
      
      dispatch(setAuth({
        token: result.token,
        user: result.admin,
        role: result.role
      }))

      toast.success(result.message || "Login successful!")

      if (result.role === 'super-admin') {
        router.push("/admin")
      } else if (result.role === 'sub-admin') {
        router.push("/sub-admin")
      } else {
        // Fallback for any other roles if they exist
        router.push("/admin")
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Login failed. Please check your credentials.")
    }
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Top Left Logo */}
      <div className="p-6 md:p-10">
        <div className="flex items-center gap-3">
          <Image src="/assets/iwaloyelogo.png" alt="Iwaloye Logo" width={100} height={40} className="object-contain" />
          <Image src="/assets/teslisLogo.png" alt="Teslis Logo" width={100} height={40} className="object-contain" />

        </div>
      </div>

      {/* Login Form Container */}
      <div className="flex-1 flex items-center justify-center px-4 -mt-20">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-3xl md:text-4xl font-inter text-gray-900 tracking-tight">Get Started Now</h1>
            <p className="text-gray-500 text-sm">Enter your cridentials to access your account</p>
          </div>

          <form onSubmit={handleSubmit} className="mt-10 space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 block" htmlFor="email">
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="guruwtf@gmail.com"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all text-gray-900"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 block" htmlFor="password">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Compound$$V"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all text-gray-900"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                <div className="flex justify-end">
                  <Link href="#" className="text-sm text-blue-600 hover:underline">
                    Forgot password?
                  </Link>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-[#155DFC] hover:bg-[#155DFC] text-white font-bold  shadow-purple-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wider text-sm mt-4"
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
