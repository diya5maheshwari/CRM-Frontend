import { Facebook, Youtube, Linkedin, Instagram, Twitter } from "lucide-react";
import Logo from "../assets/logo.webp";

export default function Footer() {
  return (
    <div className="mt-10">

      {/* TOP WHITE SECTION */}
      <div className="bg-gray-100 px-6 md:px-12 py-10">

        {/* LINKS GRID */}
     

        {/* SOCIAL ICONS */}
        <div className="flex justify-center gap-4 mt-8 text-gray-600">

          <Twitter className="w-5 h-5 hover:text-black cursor-pointer" />
          <Facebook className="w-5 h-5 hover:text-black cursor-pointer" />
          <Youtube className="w-5 h-5 hover:text-black cursor-pointer" />
          <Linkedin className="w-5 h-5 hover:text-black cursor-pointer" />
          <Instagram className="w-5 h-5 hover:text-black cursor-pointer" />

        </div>

        {/* SMALL LINKS */}
        <div className="text-center text-xs text-gray-400 mt-6 flex flex-wrap justify-center gap-3">
          <span>Security</span>
          <span>Privacy Policy</span>
          <span>Terms</span>
        </div>

      </div>

      {/* BOTTOM DARK SECTION */}
      <div className="bg-[#0B1E3A] text-center py-6">

        <img src={Logo} className="w-16 mx-auto mb-3" />

        <p className="text-xs text-gray-400">
          © 2026 Your Company. All Rights Reserved.
        </p>

      </div>

    </div>
  );
}