"use client"

import { useState } from "react"
import { useFormState } from "react-dom"
import { joinWaitlist } from "../actions/waitlist"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import type React from "react" // Added import for React

interface WaitlistFormProps {
  onSuccess: (count: number) => void
}

export function WaitlistForm({ onSuccess }: WaitlistFormProps) {
  const [state, formAction] = useFormState(joinWaitlist, null)
  const [email, setEmail] = useState("")
  const [isPending, setIsPending] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsPending(true)
    const formData = new FormData(e.currentTarget)
    const result = await formAction(formData)
    setIsPending(false)

    if (result.success) {
      toast({
        title: "Success!",
        description: result.message,
        duration: 5000,
      })
      if (result.count) {
        onSuccess(result.count)
      }
      setEmail("")
    } else {
      toast({
        title: "Error",
        description: result.message,
        variant: "destructive",
        duration: 5000,
      })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-4 mb-8">
      <div className="flex overflow-hidden rounded-xl bg-white/5 p-1 ring-1 ring-white/20 focus-within:ring-2 focus-within:ring-blue-500">
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="Enter your email for early access"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-describedby="email-error"
          className="w-full border-0 bg-transparent text-white placeholder:text-gray-400 focus:ring-0 focus:border-transparent focus-visible:border-transparent focus:outline-none active:ring-0 active:outline-none focus-visible:ring-0 focus-visible:outline-none active:border-transparent focus-visible:ring-offset-0"
        />
        <Button
          type="submit"
          disabled={isPending}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 rounded-xl transition-all duration-300 ease-in-out focus:outline-none w-[120px]"
        >
          {isPending ? <Loader2 className="h-5 w-5 animate-spin" /> : "Join Waitlist"}
        </Button>
      </div>
    </form>
  )
}

