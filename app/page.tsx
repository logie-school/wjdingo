"use client"

import { useRef, useLayoutEffect, useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { toast } from "sonner"
import Link from "next/link"
import { delay, easeInOut, motion, useInView } from "framer-motion"

import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator"

import { CircleCheckBig, CrownIcon, Flower, Flower2, Gauge, Leaf, PaintbrushVertical, Scale, Shrub, Sparkles, Sprout, TreePine, Trees, User, Users } from "lucide-react";
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import './style.css'
import { ArrowRight, Car, Sofa } from "lucide-react"

import { PackageFeature } from "@/components/package-feature";
import { FooterItem } from "@/components/footer-item";
import StarBorder from "@/components/react-bits/StarBorder/StarBorder";

export default function Home() {
  // trigger toast from URL
  const searchParams = useSearchParams()
  const msg = searchParams.get("toast")
  const type = searchParams.get("toastType") as keyof typeof toast

  useEffect(() => {
    if (msg && type && typeof toast[type] === "function") {
      // @ts-ignore
      toast[type](msg)
    }
  }, [msg, type])

    const badgeRef = useRef<HTMLDivElement>(null);
    const measureRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(badgeRef, { once: true, margin: "-50px" });
    const [openWidth, setOpenWidth] = useState(172); // fallback width
    const [showText, setShowText] = useState(false);

    // Measure the open width once on mount
    useLayoutEffect(() => {
        if (measureRef.current) {
            setOpenWidth(measureRef.current.offsetWidth);
        }
    }, []);

    // Delay showing the text after inView
    useEffect(() => {
        let timeout: NodeJS.Timeout;
        if (isInView) {
            timeout = setTimeout(() => setShowText(true), 2000); // 1 second delay
        }
        return () => clearTimeout(timeout);
    }, [isInView]);

  return (
    <main>
      <div className="flex items-center justify-center h-screen hero load-anim" style={{paddingTop: '61px'}} id="hero">
        <div className="w-[40%] text-left p-10 flex flex-col justify-center gap-4 hero-content">
          <div className="flex justify-center flex-col">
            <h1 className="text-6xl font-bold">W&J DINGO LAWN CARE</h1>
            <p className="text-lg mt-4 opacity-50">
              Your trusted partner for professional lawn care and maintenance services.
            </p>
          </div>
          <Button className="flex bg-[#406e23] text-white hover:bg-[#5a8e3c]" asChild>
            <Link href={'/book'}>
              Get a free quote
              <ArrowRight />
            </Link>
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-center flex-col gap-10 p-16 pb-0 flex-wrap offer w-full">
        <div className="flex w-full items-center justify-center flex-col gap-10 flex-wrap offer-content">
          <h2 className="text-4xl font-bold text-center">What We Offer</h2>
          <div className="flex items-center justify-center flex-row gap-10 flex-wrap">
            <motion.div className="flex items-center justify-center flex-row gap-10 flex-wrap" initial={{ opacity: 0, transform: 'translateY(30px)', filter: 'blur(10px)' }} whileInView={{ opacity: 1, transform: 'translateY(0px)', filter: 'blur(0px)' }} transition={{ duration: 1, ease: [.7,-0.63,.24,.99]}}>
              <StarBorder 
                color="#72c43d"
                speed="5s"
                className="flex w-[500px] max-[800px]:w-full items-center justify-center">
                <CardHeader className="flex items-center">
                  <CardTitle className="flex items-center gap-2">
                    <Sprout />
                    <span className="whitespace-nowrap">Lawn Care</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                  Complete lawn care, maintenance.
                  </CardDescription>
                </CardContent>
              </StarBorder>
            </motion.div>
            <motion.div className="flex items-center justify-center flex-row gap-10 flex-wrap" initial={{ opacity: 0, transform: 'translateY(30px)', filter: 'blur(10px)' }} whileInView={{ opacity: 1, transform: 'translateY(0px)', filter: 'blur(0px)' }} transition={{ duration: 1, ease: [.7,-0.63,.24,.99]}}>
              <StarBorder
              color="#72c43d"
              speed="5s"
               className="flex w-[500px] max-[800px]:w-full justify-center items-center">
                <CardHeader className="flex items-center justify-center">
                  <CardTitle className="flex  gap-2">
                    <Shrub />
                    <span className="whitespace-nowrap">Hedge Trimming</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                  Professional hedge trimming and shaping services.
                  </CardDescription>
                </CardContent>
              </StarBorder>
            </motion.div>
          </div>
        </div>
      </div>


      <div className="flex items-center justify-center flex-col gap-10 p-16 pb-0 flex-wrap offer" id="packages">
        <div className="flex w-full items-center justify-center flex-col gap-10 flex-wrap offer-content">
          <h2 className="text-4xl font-bold text-center">Our Packages</h2>
          <div className="grid grid-cols-1 min-[1000px]:grid-cols-3 gap-10 w-full">
            <motion.div initial={{ opacity: 0, transform: 'translateY(30px)', filter: 'blur(10px)' }} whileInView={{ opacity: 1, transform: 'translateY(0px)', filter: 'blur(0px)' }} transition={{ duration: 1, delay: 0, ease: [.7,-0.63,.24,.99]}}>
              <Card className="flex pricing-tier w-full">
                <CardHeader className="flex">
                  <CardTitle className="flex gap-2 items-center">
                    <Leaf className="opacity-25" />
                    Basic Package
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4">
                    Our Basic package is perfect for those who need regular lawn mowing and maintenance. This package includes:
                  </CardDescription>
                    <PackageFeature enabled={true} title="Mowing" />
                    <PackageFeature enabled={true} title="Edging" />
                    <PackageFeature enabled={false} title="Weeding" />
                    <PackageFeature enabled={false} title="Hedge Trimming" />
                    <PackageFeature enabled={false} title="Pressure Washing" />
                </CardContent>
                <CardFooter>
                  <Button className="flex w-full" variant={'outline'} asChild>
                    <Link href={'/book?package=basic'}>
                      Get a free quote
                      <ArrowRight />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>

            <motion.div initial={{ opacity: 0, transform: 'translateY(30px)', filter: 'blur(10px)' }} whileInView={{ opacity: 1, transform: 'translateY(0px)', filter: 'blur(0px)' }} transition={{ duration: 1, delay: 0.15, ease: [.7,-0.63,.24,.99]}}>
              <Card className="flex pricing-tier w-full">
                <CardHeader className="flex">
                  <CardTitle className="flex gap-2 items-center">
                    <Flower2 className="opacity-25" />
                    Monthly Care Plan
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4">
                    Our Monthly Care Plan is designed for those who want to keep their lawns and gardens in top shape all year round. This package includes:
                  </CardDescription>
                    <PackageFeature enabled={true} title="Mowing" />
                    <PackageFeature enabled={true} title="Edging" />
                    <PackageFeature enabled={true} title="Weeding" />
                    <PackageFeature enabled={false} title="Hedge Trimming" />
                    <PackageFeature enabled={false} title="Pressure Washing" />
                </CardContent>
                <CardFooter>
                  <Button className="flex w-full" variant={'outline'} asChild>
                    <Link href={'/book?package=monthly'}>
                      Get a free quote
                      <ArrowRight />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
            
            <motion.div initial={{ opacity: 0, transform: 'translateY(30px)', filter: 'blur(10px)' }} whileInView={{ opacity: 1, transform: 'translateY(0px)', filter: 'blur(0px)' }} transition={{ duration: 1, delay: 0.3, ease: [.7,-0.63,.24,.99] }}>
              <Card className="flex pricing-tier w-full">
                <CardHeader className="flex">
                  <CardTitle className="flex gap-2 items-center">
                    <Trees className="opacity-25" />
                    Greenery Package
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4">
                    Our Greenery Package is perfect for those who want a comprehensive lawn and garden care solution. This package includes:
                  </CardDescription>
                    <PackageFeature enabled={true} title="Mowing" />
                    <PackageFeature enabled={true} title="Edging" />
                    <PackageFeature enabled={true} title="Weeding" />
                    <PackageFeature enabled={true} title="Hedge Trimming" />
                    <PackageFeature enabled={false} title="Pressure Washing" />
                </CardContent>
                <CardFooter>
                  <Button className="flex w-full" variant={'outline'} asChild>
                    <Link href={'/book?package=greenery'}>
                      Get a free quote
                      <ArrowRight />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
            
          </div>

          <motion.div 
            initial={{ opacity: 0, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1,
              filter: 'blur(0px)' }}
            transition={{ duration: 1, delay: 0.4, ease: [.7,-0.63,.24,.99] }}
            className="flex items-center justify-center flex-row gap-4 w-full my-10"
            >
            <div className="w-full h-[1px] bg-border" />
            <span className="whitespace-nowrap">Need something more?</span>
            <div className="w-full h-[1px] bg-border" />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, transform: 'translateY(30px)', filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, transform: 'translateY(0px)',
              filter: 'blur(0px)' }}
            transition={{ duration: 1, delay: 0.4, ease: [.7,-0.63,.24,.99] }}
            className="w-full">
            <Card>
              <CardHeader className="flex ">
                <CardTitle className="flex items-center gap-2">
                  <CrownIcon />
                  Full Garden Maintenance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Our Full Garden Maintenance package is designed for those who want a complete solution for their lawn and garden care needs. This package includes all the services from our Greenery Package, plus additional services such as pressure washing and seasonal clean-ups.
                </p>
              </CardContent>
              <CardFooter className="flex">
                  <Button className="flex" asChild>
                    <Link href={"/book?package=full"}>
                      Get a free quote
                      <ArrowRight />
                    </Link>
                  </Button>
              </CardFooter>
            </Card>
          </motion.div>


          <motion.div 
            initial={{ opacity: 0, transform: 'translateY(30px)', filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, transform: 'translateY(0px)',
              filter: 'blur(0px)' }}
            transition={{ duration: 1, delay: 0.5, ease: [.7,-0.63,.24,.99] }}
            className="flex items-center justify-center flex-col gap-4 mt-10 bg-foreground/5 w-full p-16 rounded-2xl"
            >
                                  <motion.div
                        ref={badgeRef}
                        className="flex items-center rounded-full px-3 py-1.5 bg-[#406e23]/10 overflow-hidden"
                        initial={{ width: 36 }}
                        animate={{ width: showText ? openWidth : 36 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        style={{ minWidth: 36, height: 36, justifyContent: showText ? "flex-start" : "center" }}
                    >
                        <div className="flex items-center justify-center" style={{ width: 20, height: 20 }}>
                            <div className="h-2 w-2 bg-[#406e23] flex items-center justify-center rounded-full relative">
                                <div className="absolute h-2 w-2 bg-[#406e23] rounded-full blinker"></div>
                            </div>
                        </div>
                        {showText && (
                            <motion.span
                                initial={{ opacity: 0, marginLeft: 0 }}
                                animate={{ opacity: 1, marginLeft: 8 }}
                                transition={{ delay: 0.2, duration: 0.3 }}
                                className="whitespace-nowrap text-[#406e23] font-semibold text-sm"
                            >
                                Available for work
                            </motion.span>
                        )}
                    </motion.div>
            <h3 className="text-2xl font-bold text-center">Ready to transform your lawn?</h3>
            <Button className="flex bg-[#406e23] text-white hover:bg-[#5a8e3c]" asChild>
              <Link href={'/book'}>
                Get a free quote
                <ArrowRight />
              </Link>
            </Button>
          </motion.div>

        </div>
      </div>
    </main>
  )
}