import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { servicesData } from "@/data/services";
import Footer from "@/components/landing/Footer";
import Navbar from "@/components/landing/Navbar";
import ScrollProgress from "@/components/landing/ScrollProgress";

interface ServiceDetailProps {
  serviceId: string;
}

const serviceImages: Record<string, string> = {
  "website-development":
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=60&w=800&auto=format&fit=crop",
  "software-development":
    "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=60&w=800&auto=format&fit=crop",
  "mobile-app-development":
    "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=60&w=800&auto=format&fit=crop",
  "e-commerce-solutions":
    "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=60&w=800&auto=format&fit=crop",
  "digital-marketing":
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=60&w=800&auto=format&fit=crop",
  "ui-ux-design":
    "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=60&w=800&auto=format&fit=crop",
  "cloud-solutions":
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=60&w=800&auto=format&fit=crop",
  branding:
    "https://images.unsplash.com/photo-1434626881859-194d67b2b86f?q=60&w=800&auto=format&fit=crop",
  "website-maintenance-support":
    "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=60&w=800&auto=format&fit=crop",
};

export default function ServiceDetail({ serviceId }: ServiceDetailProps) {
  const service = servicesData.find((item) => item.id === serviceId);

  if (!service) {
    return (
      <main className="min-h-screen bg-background text-foreground py-20 px-6">
        <div className="mx-auto max-w-3xl rounded-3xl border border-border bg-card p-10 text-center shadow-lg">
          <h1 className="text-3xl font-bold">Service not found</h1>
          <p className="mt-4 text-muted-foreground">The service you requested does not exist.</p>
        </div>
      </main>
    );
  }

  const imageUrl =
    serviceImages[serviceId] ||
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=60&w=800&auto=format&fit=crop";

  return (
    <main className="relative min-h-screen bg-background text-foreground pt-20 overflow-x-hidden w-full">
      <ScrollProgress />
      <Navbar />

      <section className="mx-auto max-w-6xl px-5 py-20">
        <div className="grid md:grid-cols-2 gap-10 items-center rounded-[2rem] border border-border bg-card/80 p-8 sm:p-10 shadow-xl backdrop-blur-xl overflow-hidden relative">
          <div className="space-y-6 relative z-10">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-primary">
              Service detail
            </span>
            <div className="space-y-4">
              <h1 className="text-4xl font-bold sm:text-5xl">{service.name}</h1>
              <p className="text-muted-foreground text-lg leading-8">{service.description}</p>
            </div>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                to="/services"
                className="inline-flex items-center gap-2 rounded-full border border-input bg-background/50 backdrop-blur-md px-5 py-2.5 text-sm font-medium text-foreground transition hover:bg-accent"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to services
              </Link>
            </div>
          </div>

          <div className="relative h-64 md:h-full min-h-[300px] w-full rounded-2xl overflow-hidden shadow-2xl border border-white/10 group">
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 to-purple-500/20 mix-blend-overlay z-10 pointer-events-none" />
            <img
              src={imageUrl}
              alt={service.name}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
          </div>
        </div>

        <div className="mt-16 grid gap-10 lg:grid-cols-[1fr_320px]">
          <div className="space-y-12">
            <article className="space-y-6">
              <h2 className="text-3xl font-semibold">What we deliver</h2>
              <div className="grid gap-4">
                {service.whatWeDeliver.map((item, index) => (
                  <div
                    key={index}
                    className="rounded-3xl border border-border bg-card p-6 shadow-sm"
                  >
                    <p className="text-base leading-7 text-muted-foreground">{item}</p>
                  </div>
                ))}
              </div>
            </article>

            {service.types?.length ? (
              <article className="space-y-6">
                <h2 className="text-3xl font-semibold">Ideal solutions</h2>
                <div className="grid gap-3 sm:grid-cols-2">
                  {service.types.map((type, index) => (
                    <div
                      key={index}
                      className="rounded-3xl border border-border bg-card p-6 shadow-sm"
                    >
                      <p className="font-medium">{type}</p>
                    </div>
                  ))}
                </div>
              </article>
            ) : null}

            {service.highlights?.length ? (
              <article className="space-y-6">
                <h2 className="text-3xl font-semibold">Why choose us</h2>
                <div className="space-y-4">
                  {service.highlights.map((highlight, index) => (
                    <div
                      key={index}
                      className="flex gap-3 rounded-3xl border border-border bg-card p-6 shadow-sm"
                    >
                      <CheckCircle2 className="mt-1 h-5 w-5 text-primary" />
                      <p className="text-muted-foreground">{highlight}</p>
                    </div>
                  ))}
                </div>
              </article>
            ) : null}
          </div>

          <aside className="space-y-8 rounded-[2rem] border border-border bg-card/80 p-8 shadow-xl">
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold">Need help with this service?</h3>
              <p className="text-muted-foreground leading-7">
                Talk to our experts and get a tailored plan for your project.
              </p>
            </div>
            <div className="space-y-4">
              <p className="text-sm uppercase tracking-[0.22em] text-muted-foreground">Contact</p>
              <div className="rounded-3xl border border-border bg-muted/5 p-5">
                <p className="font-semibold">dsites.ceo@dsites.in</p>
                <p className="text-sm text-muted-foreground">Available Mon–Fri, 9am–6pm</p>
              </div>
            </div>
            <Link
              to="/contact"
              className="inline-flex w-full items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
            >
              Request a consultation
            </Link>
          </aside>
        </div>
      </section>

      <Footer />
    </main>
  );
}
