import { Facebook, Linkedin, Instagram, MessageCircle } from "lucide-react";
import { Link } from "@tanstack/react-router";
import logo from "@/assets/logo.png";

export default function Footer() {
  return (
    <footer className="relative border-t border-border/60 pt-16 pb-10">
      <div className="mx-auto max-w-7xl px-5">
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <Link to="/" className="flex items-center gap-2">
              <img src={logo} alt="D Sites Infosolutions" className="h-9 w-9 object-contain" />
              <span className="font-display text-lg font-semibold">
                D <span className="text-gradient">Sites</span> Infosolutions
              </span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground max-w-sm">
              We build powerful websites, scalable software, and digital strategies that help
              businesses grow faster.
            </p>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-sm font-semibold mb-4">Company</h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li>
                <Link to="/" hash="why" className="hover:text-foreground">
                  About
                </Link>
              </li>
              <li>
                <Link to="/" hash="process" className="hover:text-foreground">
                  Process
                </Link>
              </li>
              <li>
                <Link to={"/updates" as any} className="hover:text-foreground">
                  Updates & Offers
                </Link>
              </li>
              <li>
                <Link to={"/contact" as any} className="hover:text-foreground">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-sm font-semibold mb-4">Services</h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li>
                <Link to="/services" className="hover:text-foreground">
                  Web
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-foreground">
                  Software
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-foreground">
                  Mobile
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-foreground">
                  Cloud
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <h4 className="text-sm font-semibold mb-4">Get in touch</h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li>dsites.ceo@dsites.in</li>
              <li>+91 8015052453</li>
            </ul>
            <div className="mt-5 flex items-center gap-3">
              {[
                { name: "WhatsApp", icon: MessageCircle, href: "https://wa.me/918015052453" },
                {
                  name: "LinkedIn",
                  icon: Linkedin,
                  href: "https://www.linkedin.com/in/sanjayraj-g-t-aa262a25b/",
                },
                {
                  name: "Facebook",
                  icon: Facebook,
                  href: "https://www.facebook.com/share/1DWoTteDMD/",
                },
                {
                  name: "Instagram",
                  icon: Instagram,
                  href: "https://www.instagram.com/dsites.infosolutions?igsh=MWliN2Nvb2M2YzMyYQ==",
                },
              ].map((social, i) => {
                const Icon = social.icon;
                return (
                  <a
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="h-9 w-9 rounded-lg glass grid place-items-center hover:bg-white/10 transition"
                  >
                    <Icon className="h-4 w-4 text-muted-foreground hover:text-cyan-400 transition-colors" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-border/60 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} D Sites Infosolutions. All rights reserved.</p>
          <div className="flex gap-5">
            <a href="#" className="hover:text-foreground">
              Privacy
            </a>
            <a href="#" className="hover:text-foreground">
              Terms
            </a>
            <a href="#" className="hover:text-foreground">
              Security
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
