"use client"

import * as React from "react"
import { useState, useEffect, useRef, Suspense, useLayoutEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { SendIcon, Loader2 } from "lucide-react"
import "./style.css"

// ─── TELEGRAM CONFIG ──────────────────────────────────────────────────────────
const TELEGRAM_BOT_TOKEN = "7818160357:AAEeWk_Wyl9slxxyr1jp6ByBcVN71cD-xSU"
const TELEGRAM_CHAT_ID = "7639356214"

// 1) declare your zod schema
const formSchema = z.object({
  name: z.string().nonempty("Name is required."),
  phone: z.string().nonempty("Phone is required."),
  email: z.string().email("Must be a valid email."),
  address: z.string().nonempty("Address is required."),
  detailType: z.enum(["basic", "monthly", "greenery", "full"], {
    errorMap: () => ({ message: "Please choose a package." }),
  }),
  extra: z.string().optional(),
})
type FormValues = z.infer<typeof formSchema>

function BookContent() {
  const searchParams = useSearchParams()
  const queryDetailType = (searchParams.get("package") as FormValues["detailType"]) || ""
  const containerRef = useRef<HTMLElement>(null)
  const router = useRouter()
  const [submitted, setSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const submitBtnRef = useRef<HTMLButtonElement>(null)
  const [btnWidth, setBtnWidth] = useState(0)

  // measure the button width once
  useLayoutEffect(() => {
    if (submitBtnRef.current) {
      setBtnWidth(submitBtnRef.current.offsetWidth)
    }
  }, [])

  // 2) bind react-hook-form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      address: "",
      detailType: queryDetailType,
      extra: "",
    },
  })

  // 3) submit: send to Telegram & show success screen
  const onSubmit = async (values: FormValues) => {
    setIsLoading(true)
    // build styled message
    const message = [
      "🌿 *New Quote Request* 🌿",
      `👤 *Name:* ${values.name}`,
      `📞 *Phone:* ${values.phone}`,
      `✉️ *Email:* ${values.email}`,
      `🏠 *Address:* ${values.address}`,
      `📦 *Package:* ${values.detailType}`,
      `📝 *Extra:* ${values.extra || "N/A"}`,
    ].join("\n")

    await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: "Markdown",
      }),
    }).catch(console.error)

    setSubmitted(true)
  }

  return (
    <main
      ref={containerRef}
      className="relative flex items-start justify-center h-screen book-screen load-anim mt-[60.61px]"
    >
      {/* success overlay */}
      <motion.div
        className="absolute inset-0 z-50 flex items-center justify-center bg-background"
        initial={{ opacity: 0 }}
        animate={{ opacity: submitted ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        style={{ pointerEvents: submitted ? "auto" : "none" }}
      >
        <motion.div
          className="flex flex-col items-center justify-center w-full max-w-md p-6 bg-transparent"
          initial={{ y: 20, opacity: 0, filter: "blur(10px)" }}
          animate={submitted ? { y: 0, opacity: 1, filter: "blur(0px)" } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <SendIcon className="mb-4 opacity-50" size={48} />
          <h1 className="text-2xl font-bold text-center">Quote Sent</h1>
          <p className="text-center text-lg mb-6">
            Thanks for your request. We'll be in touch soon.
          </p>
          <Link href="/">
            <Button className="bg-[#406e23] text-white hover:bg-[#365e1f]">
              Home
            </Button>
          </Link>
        </motion.div>
      </motion.div>

      {/* form card */}
      <div className="w-full h-fit flex justify-center items-center pb-12 pt-12">
        <Card className="min-[1100px]:w-[40%] max-[1100px]:w-[90%] input-card bg-background/90 backdrop-blur-sm border-0 p-0 shadow-none">
          <CardHeader className="p-0">
            <CardTitle>Get a Quote</CardTitle>
            <CardDescription>Reach out to get a quote.</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-4"
              >
                {/* name */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* phone */}
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input placeholder="0412345678" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* email */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="email@example.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* address */}
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input placeholder="123 Main St" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* package */}
                <FormField
                  control={form.control}
                  name="detailType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Package</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a package" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="basic">Basic Package</SelectItem>
                            <SelectItem value="monthly">
                              Monthly Care Plan
                            </SelectItem>
                            <SelectItem value="greenery">
                              Greenery Package
                            </SelectItem>
                            <SelectItem value="full">
                              Full Garden Maintenance
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* extra details */}
                <FormField
                  control={form.control}
                  name="extra"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Extra Details (optional)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Type your extra details…"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <CardFooter className="flex justify-between p-0">
                  <Button variant="outline" asChild>
                    <Link href="/">Back</Link>
                  </Button>

                  <Button
                    type="submit"
                    ref={submitBtnRef}
                    disabled={isLoading}
                    className="bg-[#406e23] text-white w-30 hover:bg-[#365e1f] disabled:opacity-70 disabled:cursor-not-allowed"
                    onClick={(e) => {
                      /* prevent double submits if needed */
                      if (isLoading) e.preventDefault()
                    }}
                  >
                    {isLoading
                      ? <Loader2 className="animate-spin" size={20} />
                      : "Get a Quote"
                    }
                  </Button>
                </CardFooter>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

export default function Book() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BookContent />
    </Suspense>
  )
}