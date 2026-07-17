import React from "react";
import { useNavigate } from "react-router-dom";
import FooterLink from "./FooterLink";

function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="bg-(--navBG) border-red-500 border-t">
      <div className="mx-auto px-8 py-5 max-w-5xl">
        {/* Top row */}
        <div className="flex justify-between items-start">
          {/* Brand */}
          <div className="flex flex-col gap-2">
            <span className="font-bold text-white text-lg">Driev Coaching</span>
            <p className="max-w-xs text-[#4a6274] text-sm">
              ©{new Date().getFullYear()} Driev Coaching. All rights reserved.
            </p>
            <div className="flex gap-6">
              <span className="text-[#4a6274] hover:text-[#94A3B8] text-xs transition-colors cursor-pointer">
                Privacy Policy
              </span>
              <span className="text-[#4a6274] hover:text-[#94A3B8] text-xs transition-colors cursor-pointer">
                Terms of Service
              </span>
            </div>
          </div>

          {/* Links */}
          <div className="flex gap-16">
            <div>
              <h4 className="mb-3 font-semibold text-[#94A3B8] text-xs uppercase tracking-widest">
                Services
              </h4>
              <div className="flex flex-col gap-2">
                <FooterLink
                  text="VOD Review"
                  onClick={() => navigate("/services")}
                />
                <FooterLink
                  text="Hands-On Coaching"
                  onClick={() => navigate("/services")}
                />
              </div>
            </div>

            <div>
              <h4 className="mb-3 font-semibold text-[#94A3B8] text-xs uppercase tracking-widest">
                Connect
              </h4>
              <div className="flex flex-col gap-2">
                <FooterLink
                  text="Twitch"
                  onClick={() =>
                    window.open("https://www.twitch.tv/drievtv", "_blank")
                  }
                />
                <FooterLink
                  text="YouTube"
                  onClick={() =>
                    window.open("https://www.youtube.com/@ItzDriev", "_blank")
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
