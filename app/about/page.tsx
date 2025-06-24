"use client"

import * as React from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import {SiFacebook, SiYoutube, SiInstagram, SiTiktok} from 'react-icons/si';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "sonner"
import './style.css'
import { Textarea } from "@/components/ui/textarea"
import { Shield, Trophy, Share2 } from "lucide-react"

export default function About() {

  return (
    <main>
      <div className="flex justify-center h-screen w-screen load-anim pt-[120px] max-[900px]:h-full">
        <div className="w-[90%] h-full flex flex-row items-center justify-start max-[900px]:flex-col max-[900px]:pt-12 max-[900px]:gap-8">
          <div className="w-[40%] h-full justify-center flex flex-col max-[900px]:w-[90%]">
            <motion.div className="gap-1 flex flex-col"  initial={{ opacity: 0, transform: 'translateX(-30px)', filter: 'blur(10px)' }} whileInView={{ opacity: 1, transform: 'translateX(0px)', filter: 'blur(0px)' }} transition={{ duration: 1, ease: [.7,-0.63,.24,.99]}}>
              <h1 className="text-6xl font-bold">About Us</h1>
              <p className="">W&J DINGO LAWN CARE is a locally owned and operated lawn care business run by two Year 12 students based on Sydney’s Northern Beaches. We’re passionate about providing reliable, high-quality lawn and garden maintenance at affordable prices. As young locals, we take pride in every job big or small and treat your lawn like it’s our own. Whether you need regular mowing, edging, clean-ups, or basic garden care, we’re here to make your outdoor space look its best.</p>
            </motion.div>
          </div>
          <motion.div className="w-[60%] h-full p-12 max-h-[700px] max-[900px]:w-[90%] max-[900px]:p-0" initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }} whileInView={{ opacity: 1,  scale: 1, filter: 'blur(0px)' }} transition={{ duration: 1, delay: 0.3, ease: [.7,-0.63,.24,.99]}}>
            <img src="grass.jpg" alt="about" className="w-full h-full object-cover rounded-2xl shadow-xl shadow-black/20"/>
          </motion.div>
        </div>
      </div>
      {/* <div className="flex justify-center w-screen">
        <Card className="flex w-[90%]">
          <CardHeader className="flex items-center">
            <CardTitle className="flex items-center gap-2">
              Why Choose Us?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Your car is more than just a mode of transportation it’s a reflection of your style and personality. Whether it's your daily commute or weekend adventures, you want your vehicle to always look its best. Our mobile detailing service delivers the convenience of professional care, right at your doorstep, and at a fraction of the cost of other services. From the exterior shine to the interior freshness, we offer a comprehensive clean that not only enhances your car’s appearance but also helps maintain its value. Let us preserve that “new car” feeling and ensure every detail is flawless, all while saving you money. After all, a car that shines is a car that turns heads at an unbeatable price.
            </CardDescription>
          </CardContent>
        </Card>
      </div> */}

      <div className="flex items-center justify-center flex-col gap-10 p-16 pb-16 flex-wrap offer w-full">
        <div className="flex w-full items-center justify-center flex-col gap-10 flex-wrap offer-content">
          <h2 className="text-4xl font-bold">Why We Stand Out</h2>
          <div className="gap-10 flex flex-col w-[100%]">
            <div className="flex gap-10 flex-col w-full">
              <motion.div className="flex items-center justify-center flex-col gap-10" initial={{ opacity: 0, transform: 'translateY(30px)', filter: 'blur(10px)' }} whileInView={{ opacity: 1, transform: 'translateY(0px)', filter: 'blur(0px)' }} transition={{ duration: 1, ease: [.7,-0.63,.24,.99]}}>
                <Card className="flex w-[100%]">
                  <CardHeader className="flex items-center">
                    <CardTitle className="flex items-center gap-2">
                      <Trophy />
                      Premium Services
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="justify-center flex text-center min-[1280px]:whitespace-nowrap">
                    We use only the highest quality products and techniques to ensure your lawn looks its absolute best
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
              <motion.div className="flex items-center justify-center flex-row gap-10 flex-wrap w-full" initial={{ opacity: 0, transform: 'translateY(30px)', filter: 'blur(10px)' }} whileInView={{ opacity: 1, transform: 'translateY(0px)', filter: 'blur(0px)' }} transition={{ duration: 1, ease: [.7,-0.63,.24,.99]}}>
                <Card className="flex w-[100%]">
                  <CardHeader className="flex items-center">
                    <CardTitle className="flex items-center gap-2">
                      <Shield />
                      100% Satisfaction
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="flex justify-center text-center min-[1280px]:whitespace-nowrap">
                    We guarantee flawless results on your lawns makeover.
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            <motion.div initial={{ opacity: 0, transform: 'translateY(30px)', filter: 'blur(10px)' }} whileInView={{ opacity: 1, transform: 'translateY(0px)', filter: 'blur(0px)' }} transition={{ duration: 1, delay: 0.2, ease: [.7,-0.63,.24,.99]}}>
              <Card className="flex">
                <CardHeader className="flex items-center">
                  <CardTitle className="flex items-center gap-2">
                    <Share2 />
                    Our Socials
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="flex items-center justify-center gap-4 max-[1000px]:flex-col">
                    <Link href="#" target="_blank" rel="noopener noreferrer" className=" max-[1000px]:w-[100%] cursor-pointer">
                      <Button style={{background: 'linear-gradient(45deg, #3f72fd, #22cbff)'}} className="text-white hover:transform-[translateY(-2px)] transition-[0.3s] max-[1000px]:w-[100%] cursor-pointer">
                        <SiFacebook />
                        Facebook
                      </Button>
                    </Link>
                    <Link href="#" target="_blank" rel="noopener noreferrer" className=" max-[1000px]:w-[100%] cursor-pointer">
                      <Button style={{background: 'linear-gradient(45deg, #dd2630, #b94d4d)'}} className="text-white hover:transform-[translateY(-2px)] transition-[0.3s] max-[1000px]:w-[100%] cursor-pointer">
                        <SiYoutube />
                        YouTube
                      </Button>
                    </Link>
                    <Link href="#" target="_blank" rel="noopener noreferrer" className=" max-[1000px]:w-[100%] cursor-pointer">
                      <Button style={{background: 'linear-gradient(115deg, #f9ce34, #ee2a7b, #6228d7)'}} className="text-white hover:transform-[translateY(-2px)] transition-[0.3s] max-[1000px]:w-[100%] cursor-pointer">
                        <SiInstagram />
                        Instagram
                      </Button>
                    </Link>
                    <Link href="#" target="_blank" rel="noopener noreferrer" className=" max-[1000px]:w-[100%] cursor-pointer">
                      <Button style={{background: 'linear-gradient(90deg, rgba(1,242,233,1) 0%, rgba(9,159,244,1) 16%, rgba(252,3,80,1) 100%)'}} className="text-white hover:transform-[translateY(-2px)] transition-[0.3s] max-[1000px]:w-[100%] cursor-pointer">
                        <SiTiktok />
                        TikTok
                      </Button>
                    </Link>
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>


    </main>
  )
}