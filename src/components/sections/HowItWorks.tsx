
import { ArrowRight } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Local Installation",
    description: "Our technical team installs the system on your university's local servers, ensuring complete data ownership and security.",
    color: "border-campus-blue"
  },
  {
    number: "02",
    title: "Admin Configuration",
    description: "University administrators set up courses, professors, and students within the system's intuitive dashboard.",
    color: "border-campus-navy"
  },
  {
    number: "03",
    title: "Student App Installation",
    description: "Students download the companion mobile app and authenticate with their university credentials.",
    color: "border-campus-orange"
  },
  {
    number: "04",
    title: "Offline Attendance",
    description: "The system works without internet connection, with all data syncing when connectivity is restored.",
    color: "border-green-500"
  }
];

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-campus-navy mb-4">
            How CampusConnect Works
          </h2>
          <p className="text-lg text-campus-gray max-w-3xl mx-auto">
            Our system is designed for easy deployment and use within any university environment, 
            even with limited connectivity.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8 max-w-5xl mx-auto">
          <div className="w-full md:w-2/5">
            <div className="sticky top-24 bg-campus-navy rounded-xl p-6 md:p-8 text-white shadow-lg">
              <h3 className="text-xl md:text-2xl font-bold mb-4">From Installation to Attendance</h3>
              <p className="text-gray-200 mb-6">
                Our comprehensive process ensures a smooth implementation for both administrators and students.
              </p>
              <div className="h-[1px] bg-white/20 my-6"></div>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-campus-blue flex items-center justify-center">
                  <span className="font-semibold">100%</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-200">Offline Capability</p>
                  <p className="font-medium">Works without internet</p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full md:w-3/5">
            <div className="space-y-8">
              {steps.map((step, index) => (
                <div key={index} className={`relative bg-white rounded-xl p-6 shadow-sm border-l-4 ${step.color}`}>
                  <span className="absolute top-6 right-6 text-4xl font-bold text-gray-100">
                    {step.number}
                  </span>
                  <h3 className="text-xl font-semibold text-campus-navy mb-3">{step.title}</h3>
                  <p className="text-campus-gray mb-4 pr-12">{step.description}</p>
                  
                  {index < steps.length - 1 && (
                    <div className="absolute left-6 bottom-0 w-[2px] h-8 bg-gray-100 translate-y-full hidden md:block"></div>
                  )}
                </div>
              ))}
              
              <div className="flex justify-end">
                <a href="#" className="flex items-center text-campus-blue font-medium hover:text-campus-navy transition-colors">
                  Learn more about implementation 
                  <ArrowRight size={16} className="ml-2" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;