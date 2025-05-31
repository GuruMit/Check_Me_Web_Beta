import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import RoleSelection from './RoleSelection';
import { ChevronLeft, Building2, GraduationCap } from 'lucide-react';

type AuthFormProps = {
  mode: 'login' | 'register';
  onSuccess?: () => void;
};

const mockUniversities = [
  { id: 'uni1', name: 'University of Technology' },
  { id: 'uni2', name: 'National University' },
  { id: 'uni3', name: 'City College' },
];

const mockEnterprises = [
  { id: 'ent1', name: 'TechCorp' },
  { id: 'ent2', name: 'Global Industries' },
  { id: 'ent3', name: 'Innovate Solutions' },
];

type FormStep = 'institution' | 'role' | 'credentials';
type UserRole = 'admin' | 'student' | 'employee';

const AuthForm = ({ mode = 'login', onSuccess }: AuthFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    role: 'university',
    institutionId: '',
    userRole: '' as UserRole | '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [institutions, setInstitutions] = useState<Array<{id: string, name: string}>>(mockUniversities);
  const [currentStep, setCurrentStep] = useState<FormStep>('institution');

  useEffect(() => {
    setInstitutions(formData.role === 'university' ? mockUniversities : mockEnterprises);
    setFormData(prev => ({ ...prev, institutionId: '' }));
  }, [formData.role]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleInstitutionChange = (value: string) => {
    setFormData(prev => ({ ...prev, institutionId: value }));
  };

  const handleRoleSelection = (role: UserRole) => {
    setFormData(prev => ({ ...prev, userRole: role }));
    setCurrentStep('credentials');
  };

  const handleNextStep = () => {
    if (currentStep === 'institution') {
      if (!formData.institutionId) {
        toast({
          title: 'Please select an institution',
          description: 'You need to select your institution to continue',
          variant: 'destructive',
        });
        return;
      }
      setCurrentStep('role');
    }
  };

  const handleBackStep = () => {
    if (currentStep === 'role') {
      setCurrentStep('institution');
    } else if (currentStep === 'credentials') {
      setCurrentStep('role');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: mode === 'login' ? 'Login successful' : 'Account created',
        description: mode === 'login' 
          ? 'Welcome back to CheckMe' 
          : 'Your account has been created successfully',
      });
      
      if (onSuccess) onSuccess();
    } catch (error) {
      toast({
        title: 'Authentication error',
        description: 'Please check your credentials and try again',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 'institution':
        return (
          <>
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-2">
                  Select your {formData.role}
                </h3>
                <p className="text-muted-foreground">
                  Choose the {formData.role} you belong to
                </p>
              </div>
              
              <Tabs 
                defaultValue={formData.role} 
                // onValueChange={(value) => setFormData(prev => ({ ...prev, role: value }))}
                className="w-full"
              >
                <TabsList className="w-full grid grid-cols-2">
                  <TabsTrigger 
                    value="university" 
                    className={cn(
                      "text-base data-[state=active]:bg-brand-500 data-[state=active]:text-white",
                      "transition-all data-[state=active]:shadow-none rounded-md flex items-center justify-center gap-2 py-3"
                    )}
                  >
                    <GraduationCap className="w-5 h-5" />
                    University
                  </TabsTrigger>
                  <TabsTrigger 
                    value="enterprise" 
                    className={cn(
                      "text-base data-[state=active]:bg-brand-500 data-[state=active]:text-white",
                      "transition-all data-[state=active]:shadow-none rounded-md flex items-center justify-center gap-2 py-3"
                    )}
                  >
                    <Building2 className="w-5 h-5" />
                    Enterprise
                  </TabsTrigger>
                </TabsList>
              </Tabs>

              <div className="space-y-2">
                <Label htmlFor="institution">Select {formData.role === 'university' ? 'University' : 'Enterprise'}</Label>
                <Select onValueChange={handleInstitutionChange} value={formData.institutionId}>
                  <SelectTrigger className="h-12 border-gray-300">
                    <SelectValue placeholder={`Select your ${formData.role === 'university' ? 'university' : 'enterprise'}`} />
                  </SelectTrigger>
                  <SelectContent>
                    {institutions.map((institution) => (
                      <SelectItem key={institution.id} value={institution.id}>
                        {institution.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <Button
                type="button"
                className="w-full h-12 bg-brand-500 hover:bg-brand-600 transition-all duration-200 hover:scale-[1.02] active:scale-95"
                disabled={!formData.institutionId}
                onClick={handleNextStep}
              >
                Continue
              </Button>
            </div>
          </>
        );
      case 'role':
        return (
          <>
            <Button
              variant="ghost"
              className="absolute top-4 left-4 p-2 hover:bg-gray-100 rounded-full"
              onClick={handleBackStep}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <RoleSelection 
              institutionType={formData.role as 'university' | 'enterprise'} 
              onSelectRole={handleRoleSelection} 
            />
          </>
        );
      case 'credentials':
        return (
          <>
            <Button
              variant="ghost"
              className="absolute top-4 left-4 p-2 hover:bg-gray-100 rounded-full"
              onClick={handleBackStep}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-2">
                  {mode === 'login' ? 'Log in' : 'Create your account'}
                </h3>
                <p className="text-muted-foreground">
                  {mode === 'login' 
                    ? `Access your ${formData.role} account` 
                    : `Register as a ${formData.userRole} in your ${formData.role}`}
                </p>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                {mode === 'register' && (
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="h-12 border-gray-300"
                    />
                  </div>
                )}
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="h-12 border-gray-300"
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    {mode === 'login' && (
                      <a href="#" className="text-xs text-brand-500 hover:text-brand-600 transition-colors">
                        Forgot password?
                      </a>
                    )}
                  </div>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="h-12 border-gray-300"
                  />
                </div>
                
                <Button
                  type="submit"
                  className="w-full h-12 bg-brand-500 hover:bg-brand-600 transition-all duration-200 hover:scale-[1.02] active:scale-95 mt-2"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 border-2 border-t-transparent rounded-full animate-spin"></div>
                      <span>{mode === 'login' ? 'Logging in...' : 'Creating account...'}</span>
                    </div>
                  ) : (
                    <span>{mode === 'login' ? 'Log in' : 'Create account'}</span>
                  )}
                </Button>
              </form>
            </div>
          </>
        );
    }
  };

  return (
    <div className="w-full max-w-md space-y-6 relative">
      {renderStepContent()}
      
      {currentStep === 'credentials' && (
        <div className="mt-6 text-center text-sm">
          {mode === 'login' ? (
            <p className="text-muted-foreground">
              Don't have an account?{' '}
              <a href="/register" className="text-brand-500 hover:text-brand-600 font-medium transition-colors">
                Sign up
              </a>
            </p>
          ) : (
            <p className="text-muted-foreground">
              Already have an account?{' '}
              <a href="/login" className="text-brand-500 hover:text-brand-600 font-medium transition-colors">
                Log in
              </a>
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default AuthForm;