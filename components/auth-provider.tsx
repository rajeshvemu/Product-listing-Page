"use client"

import type React from "react"

import { createContext, useEffect, useState } from "react"
import type { User } from "@/lib/types"

interface AuthContextType {
  user: User | null
  isLoading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string, name?: string) => Promise<void>
  signOut: () => Promise<void>
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  signIn: async () => {},
  signUp: async () => {},
  signOut: async () => {},
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is already logged in
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (e) {
        console.error("Failed to parse stored user:", e)
      }
    }
    setIsLoading(false)
  }, [])

  const signIn = async (email: string, password: string) => {
    // In a real app, you would call your authentication API here
    // This is a mock implementation for demo purposes
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Validate credentials (mock)
      if (email === "user@example.com" && password === "password") {
        const newUser = { id: "1", email, name: "Demo User" }
        setUser(newUser)
        localStorage.setItem("user", JSON.stringify(newUser))
        return
      }

      throw new Error("Invalid email or password")
    } catch (error) {
      throw error
    }
  }

  const signUp = async (email: string, password: string, name?: string) => {
    // In a real app, you would call your registration API here
    // This is a mock implementation for demo purposes
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Create new user (mock)
      const newUser = { id: Date.now().toString(), email, name }
      setUser(newUser)
      localStorage.setItem("user", JSON.stringify(newUser))
    } catch (error) {
      throw error
    }
  }

  const signOut = async () => {
    // In a real app, you would call your logout API here
    // This is a mock implementation for demo purposes
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      setUser(null)
      localStorage.removeItem("user")
    } catch (error) {
      throw error
    }
  }

  return <AuthContext.Provider value={{ user, isLoading, signIn, signUp, signOut }}>{children}</AuthContext.Provider>
}
