"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Separator } from "@radix-ui/react-separator"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ArrowRight, SunIcon, MoonIcon, X } from "lucide-react"
import { Burger } from "@/components/burger"
import './nav-bar.css'
import { Badge } from "@/components/ui/badge"
import { useTheme } from "@/components/theme-context"

function Navbar() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()

  // banner control
  const [showBanner, setShowBanner] = React.useState(true)
  const [collapsing, setCollapsing] = React.useState(false)

  const handleCloseBanner = () => {
    setCollapsing(true)
    // after CSS transition:
    setTimeout(() => setShowBanner(false), 300)
  }

  // keep track of last scroll Y to detect direction
  const lastScrollY = React.useRef(0)
  React.useEffect(() => {
    function onScroll() {
      if (!showBanner) return
      const currentY = window.scrollY
      if (currentY > lastScrollY.current) {
        // scrolling down → collapse
        setCollapsing(true)
      } else {
        // scrolling up → expand
        setCollapsing(false)
      }
      lastScrollY.current = currentY
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [showBanner])

  return (
    <div className="z-[999] fixed top-0 flex flex-col w-full h-fit justify-center items-center">
      {showBanner && pathname !== "/book" && (
        <div
          className={
            "banner-container w-full h-full justify-center items-center flex group " +
            (collapsing ? "collapsing" : "")
          }
        >
          <Link
            href="/book"
            className="w-full h-fit justify-center items-center flex"
          >
            <div className="w-full justify-center items-center gap-2 h-12 flex bg-[#406e23] group-hover:bg-[#365e1f] transition-colors text-white p-2 text-sm font-medium">
              <span>Limited time sale, get 10% off!</span>
            </div>
          </Link>

          <div
            onClick={handleCloseBanner}
            className="h-12 w-12 flex items-center absolute right-0 justify-center bg-[#406e23] group-hover:bg-[#365e1f] cursor-pointer hover:scale-120 transition-all"
          >
            <X className="transition-all text-white" />
          </div>
        </div>
      )}

      <div className="w-full h-fit flex justify-center items-center">
        <div
          className="w-full mx-auto p-3 flex items-center justify-center
                      bg-white/80 dark:bg-background/60 backdrop-blur-sm"
          suppressHydrationWarning
        >
          <div className="w-[60%] flex items-center justify-between nav-bar">
            <a className="font-bold text-xl" href="/">W&J DINGO LAWN CARE</a>
            <Burger />
            <NavigationMenu className="nav-buttons">
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link href="/#packages" legacyBehavior passHref>
                    <NavigationMenuLink className={"bg-transparent"}>
                    <span className="font-medium">Packages</span>
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/about" legacyBehavior passHref>
                    <NavigationMenuLink className={"bg-transparent"}>
                      <span className="font-medium">About Us</span>
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent">Get a Quote</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-6 md:w-[300px] lg:w-[600px] lg:grid-cols-[.75fr_1fr]">
                      <li className="row-span-4">
                        <NavigationMenuLink asChild>
                          <a
                            className="flex h-full w-full select-none flex-col rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md justify-center"
                            href="/book"
                          >
                            <div className="mb-2 mt-4 text-lg font-medium">
                              Get a free quote
                            </div>
                            <p className="text-sm leading-tight text-muted-foreground">
                              Personalized quote for your lawn care needs.
                            </p>
                          </a>
                        </NavigationMenuLink>
                      </li>
                      <ListItem href="/book?package=basic" title="Basic Maintenance">
                        Basic maintenance package for regular upkeep of your lawn.
                      </ListItem>
                      <ListItem href="/book?package=monthly" title="Monthly Care Plan">
                        Monthly care plan for comprehensive lawn maintenance.
                      </ListItem>
                      <ListItem href="/book?package=greenery" title="Greenery Package">
                        Greenery package for enhanced lawn aesthetics and health.
                      </ListItem>
                      <ListItem href="/book?package=full" title="Full Garden Maintenance">
                        Full garden maintenance package for complete care.
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Button
                    variant="ghost"
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  >
                    {theme === "dark" ? <MoonIcon /> : <SunIcon />}
                  </Button>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
      </div>
    </div>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"

export { Navbar }