// import React from 'react';
// import FadeIn from '../ui/FadeIn';
// import { CheckCircle, Clock, QrCode, BarChart, UserCheck, Shield } from 'lucide-react';

// const features = [
//   {
//     icon: <QrCode className="w-6 h-6" />,
//     title: "Contrôle d'accès basé sur les rôles",
//     description: "Contrôle granulaire avec 6 niveaux d'utilisateurs distincts, des super administrateurs aux étudiants.",
//   },
//   {
//     icon: <Clock className="w-6 h-6" />,
//     title: 'Gestion des sessions',
//     description: 'Démarrez, surveillez et fermez les sessions de présence pour les cours avec une interface simple.',
//   },
//   {
//     icon: <UserCheck className="w-6 h-6" />,
//     title: 'Rapports complets',
//     description: 'Générez des rapports détaillés pour les facultés, les départements et les performances individuelles des étudiants.',
//   },
//   {
//     icon: <BarChart className="w-6 h-6" />,
//     title: 'Présence en temps réel',
//     description: 'Les utilisateurs peuvent marquer leur présence en temps réel avec vérification.',
//   },
//   {
//     icon: <Shield className="w-6 h-6" />,
//     title: 'Sécurisé et conforme',
//     description: 'Sécurité de niveau entreprise avec conformité RGPD et cryptage des données de bout en bout.',
//   },
//   {
//     icon: <CheckCircle className="w-6 h-6" />,
//     title: 'Géorepérage',
//     description: "Vérifiez la présence en fonction de l'emplacement pour le travail à distance ou sur site.",
//   },
// ];

// const Features: React.FC = () => {
//   return (
//     <section id="features" className="pt-20 bg-secondary/30">
//       <div className="max-w-7xl mx-auto px-6">
//         <FadeIn className="text-center mb-16">
//           <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
//           Adapté à <span className="gradient-text"> différents besoins</span>
//           </h2>
//           <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
//           Que vous gériez des cours universitaires ou des équipes d'entreprise, CheckMe s'adapte à vos besoins spécifiques en matière de suivi des présences.
//           </p>
//         </FadeIn>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-15 gap-8">
//           {features.map((feature, index) => (
//             <FadeIn key={index} delay={100 * (index + 1)} className="card-hover">
//               <div className="bg-white rounded-xl p-8 shadow-sm border border-border/50 h-full">
//                 <div className="feature-icon-container">
//                   {feature.icon}
//                 </div>
//                 <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
//                 <p className="text-muted-foreground">{feature.description}</p>
//               </div>
//             </FadeIn>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Features;


import { Calendar, Computer, Smartphone, WifiOff, Lock, Check } from "lucide-react";

const features = [
  {
    title: "Administrative Dashboard",
    description: "Complete attendance management system with real-time analytics and reporting.",
    icon: Computer,
    color: "bg-campus-blue/10 text-campus-blue",
    audience: "admin"
  },
  {
    title: "Mobile Check-in",
    description: "Students can mark attendance through a simple, fast mobile app interface.",
    icon: Smartphone,
    color: "bg-campus-orange/10 text-campus-orange",
    audience: "student"
  },
  {
    title: "Offline Functionality",
    description: "All core features work without internet connection, with automatic syncing.",
    icon: WifiOff,
    color: "bg-green-100 text-green-600",
    audience: "both"
  },
  {
    title: "Local Installation",
    description: "Secure installation on university servers for complete data ownership.",
    icon: Lock,
    color: "bg-purple-100 text-purple-600",
    audience: "admin"
  },
  {
    title: "Attendance Tracking",
    description: "Comprehensive course attendance tracking and analytics for faculty.",
    icon: Calendar,
    color: "bg-blue-100 text-blue-600",
    audience: "admin"
  },
  {
    title: "Student Verification",
    description: "Simple verification process ensures attendance authenticity.",
    icon: Check,
    color: "bg-amber-100 text-amber-600",
    audience: "student"
  }
];

interface Feature {
  title: string;
  description: string;
  icon: React.ComponentType<{ size: number }>;
  color: string;
  audience: string;
}

const FeatureCard: React.FC<{ feature: Feature }> = ({ feature }) => {
  const Icon = feature.icon;
  
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className={`${feature.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
        <Icon size={24} />
      </div>
      <h3 className="text-xl font-semibold mb-2 text-campus-navy">{feature.title}</h3>
      <p className="text-campus-gray">{feature.description}</p>
      <div className="mt-4">
        <span className={`text-xs font-medium px-2 py-1 rounded-full ${
          feature.audience === 'admin' 
            ? 'bg-campus-blue/10 text-campus-blue' 
            : feature.audience === 'student' 
              ? 'bg-campus-orange/10 text-campus-orange'
              : 'bg-gray-100 text-gray-600'
        }`}>
          {feature.audience === 'admin' 
            ? 'Administrative' 
            : feature.audience === 'student' 
              ? 'Student App'
              : 'Both Systems'}
        </span>
      </div>
    </div>
  );
};

const FeaturesSection = () => {
  return (
    <section id="features" className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-campus-navy mb-4">
            Complete Local Attendance Solution
          </h2>
          <p className="text-lg text-campus-gray max-w-3xl mx-auto">
            Our system combines powerful administrative tools with a simple student experience,
            all designed to work offline in any university environment.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;