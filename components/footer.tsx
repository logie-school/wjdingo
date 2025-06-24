"use client"

import * as React from "react"
import Link from "next/link"

import { delay, easeInOut, motion } from "framer-motion"
import { FooterItem } from "./footer-item"
import { FooterButton } from "./footer-button" 
import { Button } from "@/components/ui/button"
import { del } from "framer-motion/client"

const staggerContainer = {
  hidden: {},
  show: {
    transition: {
      delayChildren: 0.5,
      staggerChildren: 0.12,
    },
  },
};

const staggerItem = {
  hidden: { opacity: 0, x: 10 },
  show: { 
    opacity: 1, 
    x: 0, 
    transition: { 
      duration: 2, 
      ease: [0, .87, .33, 1] 
    } 
  },
};

export function Footer() {
  const [currentYear, setCurrentYear] = React.useState(new Date().getFullYear());

  React.useEffect(() => {
    async function fetchYear() {
      const fallbackYear = new Date().getFullYear();
      const apiUrl = "http://worldclockapi.com/api/json/utc/now"; // Example API

      try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error("API request failed");

        const data = await response.json();
        if (data && data.currentDateTime) {
          setCurrentYear(new Date(data.currentDateTime).getFullYear());
        } else {
          throw new Error("Invalid API response");
        }
      } catch (error) {
        console.warn("Using fallback year:", fallbackYear);
        setCurrentYear(fallbackYear);
      }
    }

    fetchYear();
  }, []);

  // Define your sections and items as arrays for easy mapping
  const sections = [
    {
      title: "Packages",
      items: [
        <FooterItem key="basic" name="Basic Maintenance" href="/book?package=basic" />,
        <FooterItem key="monthly" name="Monthly Care Plan" href="/book?package=monthly" />,
        <FooterItem key="greenery" name="Greenery Package" href="/book?package=greenery" />,
        <FooterItem key="full" name="Full Garden Maintenance" href="/book?package=full" />,
      ],
    },
    {
      title: "Socials",
      items: [
        <FooterItem key="instagram" name="Instagram" href="https://www.instagram.com/dingo_lawn_care?igsh=enV2MDZyYXM1Yzhl&utm_source=qr" />,
        <FooterItem key="tiktok" name="TikTok" href="https://www.tiktok.com/@dingo.lawn.care?_t=ZS-8xTFW7Vaf46&_r=1" />,
        <FooterItem key="youtube" name="YouTube" href="https://youtube.com/@dingolawncare?si=1QEagRK5P3OdqtWh" />,
        <FooterItem key="facebook" name="Facebook" href="https://www.facebook.com/share/1ZANzPUXJV/?mibextid=wwXIfr" />,

      ],
    },
    {
      title: "Contact",
      items: [
        <FooterItem key="email" name="dingolawncareaus@gmail.com" href="mailto:dingolawncareaus@gmail.com" />,
        <FooterItem key="phone" name="+61477990630" href="tel:+61477990630" />,
      ],
    },
  ];

  return (
    <footer className="w-full p-16 flex gap-6 flex-col max-[1300px]:p-5 max-[1300px]:flex-wrap box-border" suppressHydrationWarning>
      <div className="w-full flex gap-6 flex-row max-[1300px]:flex-wrap ">
        <motion.div
          className="footer-column flex flex-col w-full min-w[200px] bg-transparent rounded-xl p-2 items-center justify-center"
          initial={{ opacity: 0, scale: 0.9, filter: 'blur(5px)' }}
          whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 0.5, delay: 0 }}
          viewport={{ once: true }}
        >
          <img className="h-40 rounded-full shadow-2xl" src="/logo.jpg" alt="logo" />
        </motion.div>

        {sections.map((section, idx) => (
          <motion.div
            key={section.title}
            className="footer-column flex flex-col w-full min-w[200px]"
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <strong className="mb-2 pb-1 border-b-1 border-solid">{section.title}</strong>
            {section.items.map((item, i) => (
              <motion.div key={i} variants={staggerItem}>
                {item}
              </motion.div>
            ))}
          </motion.div>
        ))}
      </div>

      <div className="w-full h-[20px] flex flex-row gap-3 items-center justify-center opacity-30 select-none">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0, ease: [.7, 0, .24, 1.5] }}
          viewport={{ once: true }}
        >
          © {currentYear}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [.7, 0, .24, 1.5] }}
          viewport={{ once: true }}
        >
          <Link href={'#'} className="hover:underline">
            wjdingo.com
          </Link>
        </motion.div>
      </div>
    </footer>
  );
}