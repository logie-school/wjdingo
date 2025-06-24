"use client"
 
import * as React from "react"
import { Book, Camera, DollarSign, HomeIcon, Info, MenuIcon, Moon, Package, Sun } from "lucide-react"
 
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerTrigger,
} from "@/components/ui/drawer"
import Link from "next/link"
import { useTheme } from "@/components/theme-context"

function Burger() {
  const { theme, setTheme } = useTheme()

  return (
    <Drawer>
      <DrawerTrigger asChild className="burger" style={{ display: "none"}}>
        <Button variant="ghost">
          <MenuIcon />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full">
          <DrawerHeader hidden>
            <DrawerTitle>Move Goal</DrawerTitle>
            <DrawerDescription>Set your daily activity goal.</DrawerDescription>
          </DrawerHeader>
          <div className="flex flex-col gap-4 p-4 w-full">
            <DrawerClose asChild>
              <Button className="flex flex-row gap-2 items-center justify-start burger-item" variant={"ghost"} asChild>
                <Link href='/' className="font-[500]">
                  <HomeIcon className="opacity-50 items-center flex justify-center" size={16} />
                  Home
                </Link>
              </Button>
            </DrawerClose>
            <DrawerClose asChild>
              <Button className="flex flex-row gap-2 items-center justify-start burger-item" variant={"ghost"} asChild>
                <Link href='/#packages' className="font-[500]">
                  <Package className="opacity-50 items-center flex justify-center" size={16} />
                  Packages
                </Link>
              </Button>
            </DrawerClose>
            <DrawerClose asChild>
              <Button className="flex flex-row gap-2 items-center justify-start burger-item" variant={"ghost"} asChild>
                <Link href='/about' className="font-[500]">
                  <Info className="opacity-50 items-center flex justify-center" size={16} />
                  About Us
                </Link>
              </Button>
            </DrawerClose>
            {/* <DrawerClose asChild>
              <Button className="flex flex-row gap-2 items-center justify-start burger-item" variant={"ghost"} asChild>
                <Link href='/gallery' className="font-[500]">
                  <Camera className="opacity-50 items-center flex justify-center" size={16} />
                  Gallery
                </Link>
              </Button>
            </DrawerClose> */}
            <DrawerClose asChild>
              <Button className="flex flex-row gap-2 items-center justify-start burger-item" variant={"ghost"} asChild>
                <Link href='/book' className="font-[500]">
                  <Book className="opacity-50 items-center flex justify-center" size={16} />
                  Get a free quote
                </Link>
              </Button>
            </DrawerClose>
            <Button
              variant="ghost"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="flex flex-row gap-2 items-center justify-start burger-item font-[500]"
            >
              {theme === "dark" ? <Moon className="opacity-50" /> : <Sun className="opacity-50" />}
              Change Theme
            </Button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

export { Burger }