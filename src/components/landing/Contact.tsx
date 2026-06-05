"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Loader2,
  CheckCircle,
  MessageCircle,
  Linkedin,
  Facebook,
  Instagram,
  ChevronDown,
} from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ScrollProgress from "./ScrollProgress";
import { toast } from "sonner";
import emailjs from "@emailjs/browser";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

export default function ContactPage() {
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const validateForm = () => {
    const newErrors: Partial<FormData> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }
    if (!formData.service) {
      newErrors.service = "Please select a service";
    }
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fill in all required fields correctly");
      return;
    }

    setIsLoading(true);

    try {
      // EmailJS integration using the official SDK
      const emailResponse = await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID || "YOUR_SERVICE_ID",
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "YOUR_TEMPLATE_ID",
        formRef.current!,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "YOUR_PUBLIC_KEY",
      );

      if (emailResponse.status === 200) {
        setIsSuccess(true);
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          service: "",
          message: "",
        });
        setErrors({});
        toast.success("Message sent successfully! We will get back to you soon.");

        // Reset success state after 5 seconds
        setTimeout(() => {
          setIsSuccess(false);
        }, 5000);
      } else {
        toast.error("Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      description: "We typically reply within 24 hours.",
      contact: "dsites.ceo@dsites.in",
      href: "mailto:dsites.ceo@dsites.in",
    },
    {
      icon: Phone,
      title: "Call Us",
      description: "Mon-Fri from 9am to 6pm IST.",
      contact: "+91 8015052453",
      href: "tel:+918015052453",
    },
    {
      icon: MapPin,
      title: "Office Address",
      description: "Visit us in person",
      contact: "Coimbatore, Tamilnadu",
      href: "#",
    },
  ];

  const faqs = [
    {
      question: "What is your average project timeline?",
      answer:
        "Project timelines vary depending on scope and complexity. A typical static site takes 6 to 7 days from start to launch, and it varies based on the requirements and project complications. We provide detailed timelines during the consultation phase.",
    },
    {
      question: "Do you provide ongoing support after launch?",
      answer:
        "Yes! We offer maintenance, updates, and support packages ranging from basic to premium. All our clients receive 30 days of free support after project completion.",
    },
    {
      question: "What is your pricing model?",
      answer:
        "We offer flexible pricing based on project requirements. We can work with fixed-price contracts, time-and-materials, or dedicated team models depending on your needs.",
    },
    {
      question: "Do you sign NDAs?",
      answer:
        "Absolutely. We take confidentiality seriously and are happy to sign NDAs and any other agreements to protect your intellectual property.",
    },
  ];

  const services = [
    "Website Development",
    "Software Development",
    "Mobile Application",
    "E-Commerce Solutions",
    "Digital Marketing",
    "UI/UX Design",
    "Cloud Solutions",
    "Other",
  ];

  return (
    <main className="relative min-h-screen bg-gradient-to-b from-background via-background to-background/95 text-foreground overflow-x-hidden w-full">
      <ScrollProgress />
      <Navbar />

      {/* Animated background blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 h-96 w-[800px] rounded-full bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 blur-[120px]"
          animate={{
            y: [0, 50, 0],
            x: [0, 30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 h-96 w-[800px] rounded-full bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-cyan-500/20 blur-[120px]"
          animate={{
            y: [0, -50, 0],
            x: [0, -30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            className="text-center mb-16"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.span
              className="text-sm md:text-base font-bold text-[var(--cyan-glow)] tracking-widest uppercase px-4 py-2 rounded-full border border-[var(--cyan-glow)]/30 bg-[var(--cyan-glow)]/5"
              variants={itemVariants}
            >
              Get in Touch
            </motion.span>
            <motion.h1
              className="mt-6 text-4xl md:text-5xl lg:text-6xl font-bold"
              variants={itemVariants}
            >
              Let's Build Something{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">
                Amazing Together
              </span>
            </motion.h1>
            <motion.p
              className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto"
              variants={itemVariants}
            >
              Have a project in mind? We'd love to hear about it. Drop us a line and let's create
              something incredible together.
            </motion.p>
          </motion.div>

          {/* Contact section - Two column layout */}
          <div className="grid lg:grid-cols-2 gap-12 mb-20">
            {/* Left side - Contact Info */}
            <motion.div
              className="space-y-6"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {contactInfo.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.a
                    key={index}
                    href={item.href}
                    variants={itemVariants}
                    whileHover={{ scale: 1.02, translateY: -5 }}
                    className="group relative"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative glass-strong rounded-2xl p-6 border border-white/10 backdrop-blur-xl hover:border-cyan-500/50 transition-all duration-300">
                      <div className="flex items-start gap-4">
                        <div className="h-12 w-12 rounded-xl bg-gradient-to-r from-cyan-500/20 to-purple-500/20 flex items-center justify-center flex-shrink-0">
                          <Icon className="h-6 w-6 text-cyan-400" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                          <p className="text-muted-foreground text-sm mb-2">{item.description}</p>
                          <p className="text-cyan-400 font-medium">{item.contact}</p>
                        </div>
                      </div>
                    </div>
                  </motion.a>
                );
              })}

              {/* Social links */}
              <motion.div className="pt-8" variants={itemVariants}>
                <p className="text-sm font-medium text-muted-foreground mb-4">Follow us</p>
                <div className="flex gap-4">
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
                  ].map((social, index) => {
                    const Icon = social.icon;
                    return (
                      <motion.a
                        key={index}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1, rotateZ: 5 }}
                        whileTap={{ scale: 0.95 }}
                        className="h-10 w-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:border-cyan-500/50 transition-all duration-300"
                        aria-label={social.name}
                      >
                        <Icon className="h-4 w-4 text-muted-foreground hover:text-cyan-400 transition-colors" />
                      </motion.a>
                    );
                  })}
                </div>
              </motion.div>
            </motion.div>

            {/* Right side - Contact Form */}
            <motion.div
              className="relative"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {isSuccess ? (
                <motion.div
                  className="glass-strong rounded-2xl p-8 border border-white/10 backdrop-blur-xl h-full flex flex-col items-center justify-center text-center"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 0.6, repeat: 2 }}
                  >
                    <CheckCircle className="h-16 w-16 text-green-400 mx-auto mb-4" />
                  </motion.div>
                  <h3 className="text-2xl font-bold mb-2">Message Sent Successfully!</h3>
                  <p className="text-muted-foreground mb-6">
                    Thank you for reaching out. Our team will review your message and get back to
                    you within 24 hours.
                  </p>
                  <motion.button
                    onClick={() => setIsSuccess(false)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-500 font-medium hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
                  >
                    Send Another Message
                  </motion.button>
                </motion.div>
              ) : (
                <form
                  ref={formRef}
                  onSubmit={handleSubmit}
                  className="glass-strong rounded-2xl p-8 border border-white/10 backdrop-blur-xl space-y-6"
                >
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Full Name *</label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-lg bg-white/5 border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 ${
                          errors.fullName
                            ? "border-red-500"
                            : "border-white/10 hover:border-white/20"
                        }`}
                      />
                      {errors.fullName && (
                        <p className="text-red-400 text-xs mt-1">{errors.fullName}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-lg bg-white/5 border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 ${
                          errors.email ? "border-red-500" : "border-white/10 hover:border-white/20"
                        }`}
                      />
                      {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Phone Number *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-lg bg-white/5 border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 ${
                          errors.phone ? "border-red-500" : "border-white/10 hover:border-white/20"
                        }`}
                      />
                      {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Service Needed *</label>
                      <div className="relative">
                        <select
                          name="service"
                          value={formData.service}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 rounded-lg bg-white/5 border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 appearance-none cursor-pointer ${
                            errors.service
                              ? "border-red-500"
                              : "border-white/10 hover:border-white/20"
                          }`}
                        >
                          <option value="" className="bg-[#0a0a0a] text-white">
                            Select a service
                          </option>
                          {services.map((service) => (
                            <option
                              key={service}
                              value={service}
                              className="bg-[#0a0a0a] text-white"
                            >
                              {service}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
                      </div>
                      {errors.service && (
                        <p className="text-red-400 text-xs mt-1">{errors.service}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Message *</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={5}
                      className={`w-full px-4 py-3 rounded-lg bg-white/5 border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 resize-none ${
                        errors.message ? "border-red-500" : "border-white/10 hover:border-white/20"
                      }`}
                    />
                    {errors.message && (
                      <p className="text-red-400 text-xs mt-1">{errors.message}</p>
                    )}
                  </div>

                  {/* reCAPTCHA placeholder */}
                  <div className="p-3 rounded-lg bg-white/5 border border-white/10 text-xs text-muted-foreground">
                    This site is protected by reCAPTCHA and the Google{" "}
                    <a href="#" className="text-cyan-400 hover:underline">
                      Privacy Policy
                    </a>{" "}
                    and{" "}
                    <a href="#" className="text-cyan-400 hover:underline">
                      Terms of Service
                    </a>{" "}
                    apply.
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isLoading}
                    whileHover={{ scale: isLoading ? 1 : 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-500 font-semibold text-white hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5" />
                        Send Message
                      </>
                    )}
                  </motion.button>
                </form>
              )}
            </motion.div>
          </div>

          {/* FAQ Section */}
          <motion.div
            className="mb-20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-12">
              <span className="text-sm md:text-base font-bold text-[var(--cyan-glow)] tracking-widest uppercase px-4 py-2 rounded-full border border-[var(--cyan-glow)]/30 bg-[var(--cyan-glow)]/5">
                Common Questions
              </span>
              <h2 className="mt-6 text-4xl md:text-5xl font-bold">Frequently Asked Questions</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  className="glass-strong rounded-xl p-6 border border-white/10 backdrop-blur-xl hover:border-cyan-500/50 transition-all duration-300"
                  variants={itemVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <h3 className="font-semibold text-lg mb-2">{faq.question}</h3>
                  <p className="text-muted-foreground text-sm">{faq.answer}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            className="relative rounded-2xl overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/30 via-purple-500/30 to-cyan-500/30 blur-2xl" />
            <div className="relative glass-strong rounded-2xl p-12 border border-white/10 backdrop-blur-xl text-center">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Let's Build Something Amazing Together
              </h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                Whether you need a new website, a custom software solution, or a free consultation,
                our team is ready to help you succeed.
              </p>
              <motion.a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  formRef.current?.scrollIntoView({ behavior: "smooth" });
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block px-8 py-4 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-500 font-semibold text-white hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
              >
                Start Your Project Today
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
