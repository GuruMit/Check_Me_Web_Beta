"use client";
import { useEffect } from "react";
import Features from "@/components/sections/Features";
import Hero from "@/components/sections/Hero";
import {
  GraduationCap,
  Building,
  ShieldCheck,
  Zap,
  BarChart3,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import FadeIn from "@/components/ui/FadeIn";
import Footer from "@/layout/Footer";
import Navbar from "@/layout/Navbar";
import HowItWorksSection from "@/components/sections/HowItWorks";
import AudienceSection from "@/components/sections/Audience";



export default function Home() {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen felx flex-col bg-background">

      <Navbar/>

      <main className="flex-grow">
        <Hero />
        <Features />
        <HowItWorksSection />


        {/* Use Cases Section */}
        {/* <section id="utilisation" className="pt-35 pb-10 px-30 bg-muted/30">
          <div className="container mx-auto px-4 md:px-6">
              <FadeIn>
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="order-2 md:order-1 animate-slide-up">
                <div className="inline-flex items-center rounded-full px-3 py-1 mb-6 text-sm font-medium bg-brand-50 text-brand-700 border border-brand-100">
                  Universities
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Perfect for Educational Institutions
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Manage attendance across departments, faculties, and courses
                  with a hierarchical system designed for academic structures.
                </p>

                <ul className="space-y-4">
                  {[
                    {
                      icon: ShieldCheck,
                      text: "Role-based access for administrators, faculty, and students",
                    },
                    {
                      icon: GraduationCap,
                      text: "Track attendance across all courses and programs",
                    },
                    {
                      icon: Zap,
                      text: "Real-time notifications for students about attendance status",
                    },
                    {
                      icon: BarChart3,
                      text: "Comprehensive reporting for administrative decisions",
                    },
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <div className="h-6 w-6 rounded-full bg-brand-50 flex items-center justify-center mr-3 mt-0.5">
                        <item.icon className="h-3 w-3 text-brand-500" />
                      </div>
                      <span className="text-foreground">{item.text}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8">
                  <Button
                    className="bg-brand-500 hover:bg-brand-600 h-12 px-8 rounded-full text-base text-white font-medium transition-transform active:scale-95"
                    asChild
                  >
                    <Link href="/register">Get Started</Link>
                  </Button>
                </div>
              </div>
              <div className="order-1 md:order-2 animate-slide-up [animation-delay:100ms]">
                <div className="bg-white shadow-elevation-3 rounded-2xl overflow-hidden border border-border">
                  <div className="p-1">
                    <div className="flex gap-1.5 px-2 py-1.5">
                      <div className="w-3 h-3 rounded-full bg-destructive"></div>
                      <div className="w-3 h-3 rounded-full bg-muted"></div>
                      <div className="w-3 h-3 rounded-full bg-muted"></div>
                    </div>
                    <div className="w-full aspect-video bg-card rounded-lg overflow-hidden p-4 border border-border">
                      <div className="h-full w-full rounded-md bg-muted flex items-center justify-center">
                        <div className="text-center">
                          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-brand-50 flex items-center justify-center">
                            <GraduationCap className="h-8 w-8 text-brand-500" />
                          </div>
                          <p className="text-sm text-muted-foreground">
                            University dashboard preview
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
                  </FadeIn>
          </div>
        </section> */}

        <AudienceSection />

        {/* CTA Section */}
        <section className="py-20 relative overflow-hidden " >

          <div className="py-20 bg-brand-500 text-white flex justify-center items-center">
          <div className="container  mx-auto px-4 md:px-6 text-center">
          <div className="mt-20 text-center ">
          <FadeIn>
            <h3 className="text-2xl font-display font-bold">
              Trusted by leading organizations
            </h3>

            <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8">
              {[
                "University",
                "Enterprise",
                "School",
                "Corporate",
                "Institution",
              ].map((name, index) => (
                <div
                  key={index}
                  className="text-xl md:text-2xl font-bold text-muted-foreground/70"
                >
                  {name}
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
          </div>
            
             
           
          </div>

          

        </section>

  

        <Footer />
      </main>
    </div>
  );
}
