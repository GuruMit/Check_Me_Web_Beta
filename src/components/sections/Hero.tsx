import React from "react";
import PrimaryButton from "../ui/PrimaryButton";
import { ArrowRight, CheckCircle } from "lucide-react";
import FadeIn from "../ui/FadeIn";
import Link from "next/link";

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen pt-32 pb-20 overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-20 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-brand-500/5 to-transparent rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-brand-500/5 to-transparent rounded-full blur-3xl -z-10" />

      <div className="lg:max-w-[90%] md:max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <FadeIn delay={100} direction="up">
              <div className="flex w-fit justify-center items-center  bg-brand-500/10 text-brand-500 rounded-full px-4 py-1 text-sm font-medium mb-6">
                <div className="w-2 h-2 rounded-full text-brand-500 bg-blue-500 mr-2"></div>
                CheckMe - La présence simplifiée
              </div>
            </FadeIn>

            <FadeIn delay={200} direction="up">
              <h1 className="text-2xl sm:text-5xl md:text-5xl font-display font-bold leading-tight mb-6">
                <span className="gradient-text">
                  Gestion des présences{" "}
                </span>{" "}
               Simplifié
              </h1>
            </FadeIn>

            <FadeIn delay={300} direction="up">
              <p className="text-lg text-muted-foreground mb-8 max-w-lg text-justify">
                Une solution complète de gestion de la présence hors ligne,
                conçue pour les universités. Installation locale pour les
                administrateurs, accès mobile pour les étudiants.
              </p>
            </FadeIn>

            <FadeIn delay={400} direction="up">
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <PrimaryButton
                  size="lg"
                  icon={<ArrowRight size={18} />}
                  iconPosition="right"
                >
                  <Link href="/register">Commencez gratuitement</Link>
                </PrimaryButton>
                <PrimaryButton size="lg" variant="outline">
                  See it in action
                </PrimaryButton>
              </div>
            </FadeIn>

            <FadeIn delay={500} direction="up">
              <div className="flex flex-col sm:flex-row sm:items-center gap-7 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <CheckCircle size={16} className="text-brand-500 mr-2" />
                  <span>Work offline</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle size={16} className="text-brand-500 mr-2" />
                  <span>Secure local installation</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle size={16} className="text-brand-500 mr-2" />
                  <span>GDPR compliants</span>
                </div>
               
              </div>
            </FadeIn>
          </div>

          <FadeIn delay={300} className="relative hidden lg:block">
            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-500/20 to-blue-500/20 rounded-2xl blur"></div>
              <div className="relative glass-panel rounded-2xl overflow-hidden border shadow-xl">
                <img
                  src="https://placehold.co/900x600/e2e8f0/1e293b?text=CheckMe+Dashboard&font=Montserrat"
                  alt="CheckMe Dashboard"
                  className="w-full h-auto"
                />
              </div>
            </div>

            {/* Floating elements */}
            <div className="absolute -bottom-6 -left-6 glass-panel p-4 rounded-lg shadow-lg animate-float">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">Today's attendance</p>
                  <p className="text-2xl font-bold">98%</p>
                </div>
              </div>
            </div>

            <div
              className="absolute top-10 -right-6 glass-panel p-4 rounded-lg shadow-lg animate-float"
              style={{ animationDelay: "1s" }}
            >
              <div className="flex items-center space-x-3">
                <div>
                  <p className="text-sm font-medium">Time saved weekly</p>
                  <p className="text-2xl font-bold">12 hours</p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

export default Hero;
