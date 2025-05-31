import { Button } from "@/components/ui/button";
import { University, Smartphone } from "lucide-react";

const AudienceSection = () => {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-campus-navy mb-4">
            Tailored for Your Campus Needs
          </h2>
          <p className="text-lg text-campus-gray max-w-3xl mx-auto">
            CampusConnect offers specialized solutions for both university administration and students.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-12">
          {/* For Universities */}
          <div id="universities" className="bg-white rounded-xl overflow-hidden shadow-md">
            <div className="bg-campus-navy p-6 md:p-10">
              <div className="w-16 h-16 bg-white/10 rounded-lg flex items-center justify-center mb-6">
                <University size={32} className="text-white" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">For Universities</h3>
              <p className="text-gray-200">
                A comprehensive attendance solution that integrates with your existing systems while maintaining complete data ownership.
              </p>
            </div>
            <div className="p-6 md:p-10">
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-campus-gray">On-premise installation for complete data control</span>
                              </li>
                              <li className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-campus-gray">Role-based access for administrators, faculty, and students</span>
                              </li>
                              <li className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-campus-gray">Track attendance across all courses and programs</span>
                </li>
            
              
                <li className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-campus-gray">Comprehensive reporting for administrative decisions</span>
                </li>
              </ul>
              <div className="mt-8">
                <Button className="bg-campus-blue hover:bg-campus-blue/90 text-white w-full">
                  Request University Demo
                </Button>
              </div>
            </div>
          </div>
          
          {/* For Students */}
          <div id="students" className="bg-white rounded-xl overflow-hidden shadow-md">
            <div className="bg-campus-orange p-6 md:p-10">
              <div className="w-16 h-16 bg-white/10 rounded-lg flex items-center justify-center mb-6">
                <Smartphone size={32} className="text-white" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">For Students</h3>
              <p className="text-gray-200">
                A simple, intuitive mobile app that makes recording attendance quick and reliable, even without internet access.
              </p>
            </div>
            <div className="p-6 md:p-10">
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-campus-gray">One-tap attendance check-ins</span>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-campus-gray">Works offline - no internet required</span>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-campus-gray">Real-time notifications for students about attendance status</span>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-campus-gray">Automated notifications and reminders</span>
                </li>
              </ul>
              <div className="mt-8">
                <Button className="bg-campus-orange hover:bg-campus-orange/90 text-white w-full">
                  Learn More About Student App
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AudienceSection;
