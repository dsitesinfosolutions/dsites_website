"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Briefcase,
  GraduationCap,
  MapPin,
  Clock,
  Search,
  X,
  ArrowRight,
  CheckCircle,
  Filter,
  Users,
  Award,
  Zap,
  BookOpen,
} from "lucide-react";
import emailjs from "@emailjs/browser";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ScrollProgress from "./ScrollProgress";

interface JobOpening {
  id: string;
  type: "job" | "internship";
  title: string;
  department: string;
  location: string;
  duration?: string; // For internships
  experience?: string; // For jobs
  salary?: string;
  stipend?: string;
  tags: string[];
  description: string;
  responsibilities: string[];
  requirements: string[];
}

const careersData: JobOpening[] = [
  {
    id: "intern-bde",
    type: "internship",
    title: "Business Development Executive Intern",
    department: "Business Development",
    location: "Remote",
    duration: "3-6 Months",
    stipend: "Stipend + Performance-Based Incentives",
    tags: ["Lead Generation", "Client Relations", "Market Research", "B2B Sales"],
    description:
      "We are seeking a highly motivated and communicative Business Development Executive Intern to assist in lead generation, client communication, and overall sales strategy. You will gain direct experience in corporate sales, B2B negotiation, and growth strategy.",
    responsibilities: [
      "Identify potential clients and generate high-quality leads through online research, LinkedIn, and local business directories.",
      "Draft and send professional outreach messages, emails, and corporate service proposals.",
      "Assist in setting up consultation calls, pitch presentations, and client follow-ups.",
      "Maintain a structured record of leads and interactions to optimize the sales pipeline.",
      "Work closely with developers and designers to understand our service offerings and explain them clearly to clients.",
    ],
    requirements: [
      "Strong verbal and written communication skills in English and Tamil.",
      "Proactive, self-motivated attitude with a strong desire to build a career in business growth.",
      "Basic understanding of IT services (web, apps, cloud, digital marketing).",
      "Familiarity with LinkedIn, email communication, and Google Sheets/Slides.",
      "Currently pursuing or recently graduated with a business, marketing, or communication degree.",
    ],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function CareersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<"all" | "job" | "internship">("all");
  const [filterLocation, setFilterLocation] = useState("all");

  const [selectedJob, setSelectedJob] = useState<JobOpening | null>(null);
  const [isApplying, setIsApplying] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    portfolio: "",
    experience: "",
    message: "",
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const handleApplyClick = () => {
    setIsApplying(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formData.name.trim()) errors.name = "Full Name is required";
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Invalid email format";
    }
    if (!formData.phone.trim()) {
      errors.phone = "Phone number is required";
    } else if (!/^\+?[0-9\s-]{10,15}$/.test(formData.phone.trim())) {
      errors.phone = "Invalid phone number";
    }
    if (selectedJob?.type === "job" && !formData.experience.trim()) {
      errors.experience = "Please state your experience years/details";
    }
    if (!formData.portfolio.trim()) {
      errors.portfolio = "Portfolio / LinkedIn / CV Link is required";
    }
    return errors;
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormLoading(true);
    setSubmitError(null);

    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || "service_kbprs8y";
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "template_bdvwoy7";
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "TatZkpoRVyvVaaoyU";

      const templateParams = {
        fullName: formData.name,
        email: formData.email,
        phone: formData.phone,
        service: `BDE Intern Application`,
        message: `Candidate Name: ${formData.name}\n` +
                 `Email: ${formData.email}\n` +
                 `Phone: ${formData.phone}\n` +
                 `Portfolio/LinkedIn/CV Link: ${formData.portfolio}\n` +
                 `Experience: ${formData.experience || "N/A"}\n\n` +
                 `Cover Letter:\n${formData.message}`,
      };

      // 1. Submit to EmailJS
      const response = await emailjs.send(serviceId, templateId, templateParams, publicKey);

      if (response.status !== 200) {
        throw new Error("Failed to send email via EmailJS");
      }

      // 2. Submit to Google Sheets (Method 1: Google Apps Script Web App)
      const sheetsUrl = import.meta.env.VITE_GOOGLE_SHEETS_URL;
      if (sheetsUrl) {
        try {
          const payload = {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            portfolio: formData.portfolio,
            experience: formData.experience || "N/A",
            message: formData.message,
          };
          const blob = new Blob([JSON.stringify(payload)], { type: "text/plain;charset=utf-8" });
          await fetch(sheetsUrl, {
            method: "POST",
            mode: "no-cors",
            body: blob,
          });
        } catch (sheetErr) {
          console.error("Google Sheets Submission Error (Ignored to prevent blocking form success):", sheetErr);
        }
      }

      setFormSubmitted(true);
    } catch (err: any) {
      console.error("Submission Error:", err);
      setSubmitError(err.text || err.message || "Failed to submit application. Please try again.");
    } finally {
      setFormLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      portfolio: "",
      experience: "",
      message: "",
    });
    setSubmitError(null);
    setFormErrors({});
    setFormSubmitted(false);
    setIsApplying(false);
    setSelectedJob(null);
  };

  const filteredRoles = careersData.filter((role) => {
    const matchesSearch =
      role.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      role.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
      role.department.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = filterType === "all" || role.type === filterType;

    let matchesLocation = true;
    if (filterLocation !== "all") {
      matchesLocation = role.location.toLowerCase().includes(filterLocation.toLowerCase());
    }

    return matchesSearch && matchesType && matchesLocation;
  });

  return (
    <main className="relative min-h-screen bg-gradient-to-b from-background via-background to-background/95 text-foreground overflow-x-hidden">
      <ScrollProgress />
      <Navbar />

      {/* Animated background blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div
          className="absolute top-1/4 -right-1/4 h-96 w-[800px] rounded-full bg-[var(--electric)] opacity-20 blur-[120px]"
          animate={{ y: [0, 50, 0], x: [0, 30, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-1/4 -left-1/4 h-96 w-[800px] rounded-full bg-[var(--purple-glow)] opacity-20 blur-[120px]"
          animate={{ y: [0, -50, 0], x: [0, -30, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
      </div>

      <div className="relative z-10 pt-32 pb-20 px-5 max-w-7xl mx-auto min-h-screen">
        {/* Header */}
        <motion.div
          className="text-center mb-16 max-w-3xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.span
            className="text-sm md:text-base font-bold text-[var(--cyan-glow)] tracking-widest uppercase px-4 py-2 rounded-full border border-[var(--cyan-glow)]/30 bg-[var(--cyan-glow)]/5"
            variants={itemVariants}
          >
            Careers & Internships
          </motion.span>
          <motion.h1
            className="mt-6 text-4xl md:text-5xl lg:text-6xl font-bold"
            variants={itemVariants}
          >
            Work at <span className="text-gradient">D Sites Infosolutions</span>
          </motion.h1>
          <motion.p className="mt-6 text-lg text-muted-foreground" variants={itemVariants}>
            We're building premium websites, scalable software, and high-growth digital programs.
            Find your next opportunity, grow under veteran mentorship, and make a massive impact.
          </motion.p>
        </motion.div>

        {/* Why Join Us Section */}
        <div className="mb-20">
          <h2 className="text-2xl md:text-3xl font-bold mb-10 text-center">
            Why Build Your Career With Us?
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Zap,
                title: "Modern Tech Stack",
                desc: "Work on cutting-edge stacks like React 19, TypeScript, Tailwind CSS v4, AWS, and serverless architectures.",
              },
              {
                icon: Users,
                title: "Veteran Mentorship",
                desc: "Get daily guidance from senior developers and work closely with our CEO to build client-ready production code.",
              },
              {
                icon: Award,
                title: "Fast-Track Growth",
                desc: "We promote high performers quickly. For interns, we offer strong Pre-Placement Offers (PPOs) for full-time jobs.",
              },
              {
                icon: BookOpen,
                title: "Continuous Learning",
                desc: "We sponsor learning resources, hold regular internal tech shares, and host dev sprints to keep you sharp.",
              },
            ].map((perk, i) => (
              <div
                key={i}
                className="glass rounded-3xl p-6 hover:border-[var(--cyan-glow)]/30 transition-all duration-300"
              >
                <div className="h-12 w-12 rounded-2xl bg-[var(--cyan-glow)]/10 border border-[var(--cyan-glow)]/20 grid place-items-center mb-5 text-[var(--cyan-glow)]">
                  <perk.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold mb-2">{perk.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{perk.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Search & Filters */}
        <div className="glass rounded-3xl p-6 md:p-8 mb-12 border border-white/10">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full md:w-1/2">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search roles (e.g. React, Node, SEO...)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-black/20 border border-white/10 rounded-full py-3.5 pl-12 pr-6 text-sm text-foreground focus:outline-none focus:border-[var(--cyan-glow)]/50 focus:ring-1 focus:ring-[var(--cyan-glow)]/30 transition"
              />
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap gap-3 w-full md:w-auto justify-start md:justify-end">
              <div className="flex bg-black/20 p-1.5 rounded-full border border-white/5">
                {[
                  { label: "All Roles", value: "all" },
                  { label: "Jobs", value: "job" },
                  { label: "Internships", value: "internship" },
                ].map((tab) => (
                  <button
                    key={tab.value}
                    onClick={() => setFilterType(tab.value as any)}
                    className={`cursor-pointer px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                      filterType === tab.value
                        ? "bg-gradient-primary text-primary-foreground shadow-md"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Location Select */}
              <div className="flex items-center gap-2 bg-black/20 border border-white/5 px-4 py-2 rounded-full text-xs font-semibold text-muted-foreground">
                <Filter className="h-3.5 w-3.5" />
                <select
                  value={filterLocation}
                  onChange={(e) => setFilterLocation(e.target.value)}
                  className="bg-transparent text-foreground focus:outline-none cursor-pointer"
                >
                  <option value="all">All Locations</option>
                  <option value="Coimbatore">Coimbatore</option>
                  <option value="Namakkal">Namakkal</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Roles Grid */}
        <AnimatePresence mode="popLayout">
          {filteredRoles.length > 0 ? (
            <motion.div
              layout
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {filteredRoles.map((role) => (
                <motion.div
                  layout
                  key={role.id}
                  variants={itemVariants}
                  className="group relative flex flex-col justify-between rounded-3xl glass-strong border border-white/10 hover:border-[var(--cyan-glow)]/50 hover:shadow-[var(--shadow-glow)]/20 transition-all duration-300 p-6 overflow-hidden"
                >
                  <div>
                    {/* Badge */}
                    <div className="flex items-center justify-between mb-4">
                      <span
                        className={`text-xs font-bold px-3 py-1.5 rounded-full border ${
                          role.type === "job"
                            ? "text-cyan-400 bg-cyan-950/40 border-cyan-800/40"
                            : "text-purple-400 bg-purple-950/40 border-purple-800/40"
                        }`}
                      >
                        {role.type === "job" ? "Full-time Job" : "Internship Program"}
                      </span>
                      <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                        {role.department}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold mb-3 group-hover:text-[var(--cyan-glow)] transition-colors">
                      {role.title}
                    </h3>

                    <p className="text-sm text-muted-foreground mb-6 line-clamp-3">
                      {role.description}
                    </p>

                    {/* Metadata */}
                    <div className="space-y-2 mb-6">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <MapPin className="h-4 w-4 text-[var(--cyan-glow)] shrink-0" />
                        <span>{role.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock className="h-4 w-4 text-[var(--cyan-glow)] shrink-0" />
                        <span>{role.type === "job" ? role.experience : role.duration}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    {/* Tech Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {role.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] font-semibold bg-white/5 border border-white/5 text-muted-foreground px-2 py-0.5 rounded-md"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <button
                      onClick={() => setSelectedJob(role)}
                      className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 px-5 py-3 text-sm font-semibold text-white transition-all cursor-pointer"
                    >
                      View Details & Apply
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="text-center py-20 glass rounded-3xl border border-white/5"
            >
              <Briefcase className="h-12 w-12 text-muted-foreground/40 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">No matching positions found</h3>
              <p className="text-muted-foreground max-w-md mx-auto text-sm">
                We're always looking for stellar talent. Try adjusting your search keywords, filter
                by different locations, or send a general application.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Role Details and Application Modal */}
      <AnimatePresence>
        {selectedJob && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={resetForm}
              className="fixed inset-0 z-[100] bg-background/85 backdrop-blur-md"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed left-1/2 top-1/2 z-[101] w-full max-w-4xl -translate-x-1/2 -translate-y-1/2 p-4 md:p-6"
            >
              <div className="relative overflow-hidden rounded-3xl glass-strong border border-white/20 shadow-2xl flex flex-col md:flex-row max-h-[90vh]">
                {/* Close Button */}
                <button
                  onClick={resetForm}
                  className="absolute right-4 top-4 z-10 rounded-full bg-black/50 p-2 text-white/70 backdrop-blur-md hover:bg-black/90 hover:text-white transition-colors cursor-pointer"
                  aria-label="Close Modal"
                >
                  <X className="h-5 w-5" />
                </button>

                {/* Left Side: Details */}
                <div className="w-full md:w-1/2 p-6 md:p-8 overflow-y-auto border-b md:border-b-0 md:border-r border-white/10 max-h-[45vh] md:max-h-full">
                  <span
                    className={`text-[10px] font-bold px-2.5 py-1 rounded-full border mb-4 inline-block ${
                      selectedJob.type === "job"
                        ? "text-cyan-400 bg-cyan-950/40 border-cyan-800/40"
                        : "text-purple-400 bg-purple-950/40 border-purple-800/40"
                    }`}
                  >
                    {selectedJob.type === "job" ? "Full-time Job" : "Internship"}
                  </span>

                  <h3 className="text-2xl md:text-3xl font-bold mb-2">{selectedJob.title}</h3>
                  <p className="text-xs text-[var(--cyan-glow)] font-semibold mb-6">
                    {selectedJob.department} • {selectedJob.location}
                  </p>

                  <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                    {selectedJob.description}
                  </p>

                  {/* Responsibilities */}
                  <h4 className="text-base font-bold mb-3 flex items-center gap-2">
                    <Briefcase className="h-4.5 w-4.5 text-[var(--cyan-glow)]" /> Key
                    Responsibilities
                  </h4>
                  <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-2 mb-6">
                    {selectedJob.responsibilities.map((resp, i) => (
                      <li key={i}>{resp}</li>
                    ))}
                  </ul>

                  {/* Requirements */}
                  <h4 className="text-base font-bold mb-3 flex items-center gap-2">
                    <GraduationCap className="h-4.5 w-4.5 text-[var(--cyan-glow)]" /> Requirements
                  </h4>
                  <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-2">
                    {selectedJob.requirements.map((req, i) => (
                      <li key={i}>{req}</li>
                    ))}
                  </ul>
                </div>

                {/* Right Side: Apply Form or Success State */}
                <div className="w-full md:w-1/2 p-6 md:p-8 bg-black/20 overflow-y-auto max-h-[45vh] md:max-h-full flex flex-col justify-center">
                  {!isApplying ? (
                    <div className="text-center py-10 md:py-0">
                      <div className="h-16 w-16 bg-[var(--cyan-glow)]/10 rounded-2xl grid place-items-center mx-auto mb-6 border border-[var(--cyan-glow)]/20 text-[var(--cyan-glow)]">
                        <Award className="h-8 w-8" />
                      </div>
                      <h4 className="text-xl font-bold mb-3">Ready to Join Us?</h4>
                      <p className="text-sm text-muted-foreground mb-8 max-w-sm mx-auto">
                        Submit a fast application. Our engineering team reviews submissions within
                        48 hours.
                      </p>

                      <div className="space-y-3 max-w-xs mx-auto mb-8">
                        <div className="flex justify-between text-xs text-muted-foreground border-b border-white/5 pb-2">
                          <span>Location</span>
                          <span className="font-semibold text-foreground">
                            {selectedJob.location}
                          </span>
                        </div>
                        <div className="flex justify-between text-xs text-muted-foreground border-b border-white/5 pb-2">
                          <span>
                            {selectedJob.type === "job" ? "Experience Required" : "Duration"}
                          </span>
                          <span className="font-semibold text-foreground">
                            {selectedJob.type === "job"
                              ? selectedJob.experience
                              : selectedJob.duration}
                          </span>
                        </div>
                        <div className="flex justify-between text-xs text-muted-foreground border-b border-white/5 pb-2">
                          <span>{selectedJob.type === "job" ? "Salary Range" : "Stipend"}</span>
                          <span className="font-semibold text-foreground">
                            {selectedJob.type === "job" ? selectedJob.salary : selectedJob.stipend}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={handleApplyClick}
                        className="w-full max-w-xs rounded-full bg-gradient-primary py-3.5 px-6 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-glow)] hover:opacity-90 transition-all hover:scale-[1.02] cursor-pointer"
                      >
                        Apply Now
                      </button>
                    </div>
                  ) : formSubmitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-8"
                    >
                      <CheckCircle className="h-16 w-16 text-emerald-400 mx-auto mb-6 animate-bounce" />
                      <h4 className="text-2xl font-bold mb-3">Application Submitted!</h4>
                      <p className="text-sm text-muted-foreground max-w-sm mx-auto leading-relaxed mb-6">
                        Thank you for applying to the <strong>{selectedJob.title}</strong> role. We
                        have successfully logged your details. Our hiring team will review your
                        portfolio/credentials and contact you at <strong>{formData.email}</strong>.
                      </p>
                      <button
                        onClick={resetForm}
                        className="px-6 py-2.5 rounded-full border border-white/10 hover:border-white/20 bg-white/5 text-sm font-semibold text-white transition cursor-pointer"
                      >
                        Return to Listings
                      </button>
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex flex-col h-full"
                    >
                      <div className="flex items-center gap-2 mb-6">
                        <button
                          onClick={() => setIsApplying(false)}
                          className="text-xs text-[var(--cyan-glow)] hover:underline cursor-pointer"
                        >
                          ← Back to details
                        </button>
                      </div>

                      <h4 className="text-lg font-bold mb-4">Application Form</h4>
                      <form onSubmit={handleFormSubmit} className="space-y-4">
                        {/* Name */}
                        <div>
                          <label
                            htmlFor="name"
                            className="block text-xs font-semibold text-muted-foreground mb-1"
                          >
                            Full Name *
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="John Doe"
                            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[var(--cyan-glow)]/50"
                          />
                          {formErrors.name && (
                            <span className="text-xs text-rose-400 mt-1 block">
                              {formErrors.name}
                            </span>
                          )}
                        </div>

                        {/* Email */}
                        <div>
                          <label
                            htmlFor="email"
                            className="block text-xs font-semibold text-muted-foreground mb-1"
                          >
                            Email Address *
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="johndoe@example.com"
                            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[var(--cyan-glow)]/50"
                          />
                          {formErrors.email && (
                            <span className="text-xs text-rose-400 mt-1 block">
                              {formErrors.email}
                            </span>
                          )}
                        </div>

                        {/* Phone */}
                        <div>
                          <label
                            htmlFor="phone"
                            className="block text-xs font-semibold text-muted-foreground mb-1"
                          >
                            Phone Number *
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="+91 9876543210"
                            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[var(--cyan-glow)]/50"
                          />
                          {formErrors.phone && (
                            <span className="text-xs text-rose-400 mt-1 block">
                              {formErrors.phone}
                            </span>
                          )}
                        </div>

                        {/* Portfolio / LinkedIn / CV Link */}
                        <div>
                          <label
                            htmlFor="portfolio"
                            className="block text-xs font-semibold text-muted-foreground mb-1"
                          >
                            Portfolio / LinkedIn / CV Link *
                          </label>
                          <input
                            type="url"
                            id="portfolio"
                            name="portfolio"
                            value={formData.portfolio}
                            onChange={handleInputChange}
                            placeholder="Link to your resume (e.g. Google Drive/Dropbox), portfolio, or LinkedIn"
                            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[var(--cyan-glow)]/50"
                          />
                          {formErrors.portfolio && (
                            <span className="text-xs text-rose-400 mt-1 block">
                              {formErrors.portfolio}
                            </span>
                          )}
                        </div>

                        {/* Experience info for jobs */}
                        {selectedJob.type === "job" && (
                          <div>
                            <label
                              htmlFor="experience"
                              className="block text-xs font-semibold text-muted-foreground mb-1"
                            >
                              Years of Relevant Experience *
                            </label>
                            <input
                              type="text"
                              id="experience"
                              name="experience"
                              value={formData.experience}
                              onChange={handleInputChange}
                              placeholder="e.g. 3 years in React, Node"
                              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[var(--cyan-glow)]/50"
                            />
                            {formErrors.experience && (
                              <span className="text-xs text-rose-400 mt-1 block">
                                {formErrors.experience}
                              </span>
                            )}
                          </div>
                        )}

                        {/* Cover letter / Message */}
                        <div>
                          <label
                            htmlFor="message"
                            className="block text-xs font-semibold text-muted-foreground mb-1"
                          >
                            Why do you want to join D Sites?
                          </label>
                          <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            placeholder="Tell us briefly about your career goals and what excites you about this role..."
                            rows={3}
                            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[var(--cyan-glow)]/50 resize-none"
                          />
                        </div>

                        {submitError && (
                          <div className="text-xs text-rose-400 bg-rose-950/20 border border-rose-800/30 rounded-xl p-3">
                            {submitError}
                          </div>
                        )}

                        <button
                          type="submit"
                          disabled={formLoading}
                          className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-primary py-3 px-6 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-glow)] hover:opacity-90 transition disabled:opacity-50 cursor-pointer"
                        >
                          {formLoading ? "Submitting Application..." : "Submit Application"}
                          <ArrowRight className="h-4 w-4" />
                        </button>
                      </form>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <Footer />
    </main>
  );
}
