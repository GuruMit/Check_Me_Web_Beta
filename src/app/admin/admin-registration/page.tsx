"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useState, useEffect, ChangeEvent } from "react";
import { ArrowLeft, Eye, EyeOff, X, Upload, CheckCircle } from "lucide-react";
import Link from "next/link";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/Dialogue";

import { Formik, Form, Field, ErrorMessage, FieldProps } from "formik";
import * as Yup from "yup";

// Validation schemas
const institutionSchema = Yup.object().shape({
  institutionName: Yup.string().required("Champs requis"),
});

const adminSchema = Yup.object().shape({
  username: Yup.string().required("Champs requis"),
  password: Yup.string()
    .min(8, "Le mot de passe doit contenir au moins 8 caractères")
    .required("Champs requis"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Les mots de passe ne correspondent pas")
    .required("Champs requis"),
});

const institutionDetailsSchema = Yup.object().shape({
  institutionName: Yup.string().required("Champs requis"),
  establishmentType: Yup.string().required("Champs requis"),
  administrator: Yup.string().required("Champs requis"),
  location: Yup.string().required("Champs requis"),
  email: Yup.string().email("Email invalide").required("Champs requis"),
  phone: Yup.string().nullable(),
  website: Yup.string().nullable(),
  description: Yup.string().nullable(),
  logo: Yup.mixed().required("Veuillez insérer le logo de votre institution"),
});

export default function AdminRegistration() {
  const router = useRouter();

  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isSubmittingFinal, setIsSubmittingFinal] = useState(false);
  const [redirectCountdown, setRedirectCountdown] = useState(5);

  // interface AdminData {
  //   username: string;
  //   password: string;
  //   confirmPassword: string;
  // }

  // Removed duplicate declaration of adminData

  const [adminData, setAdminData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [formData, setFormData] = useState({
    // Step 1: Institution basic info
    institutionName: "",

    // Step 2: Admin credentials
    adminData,

    // Step 3: Institution details
    establishmentType: "université",
    administrator: "",
    location: "",
    email: "",
    phone: "",
    website: "",
    description: "",
    logo: null,
  });

 

  // Handle countdown and redirect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (showSuccessModal && redirectCountdown > 0) {
      timer = setTimeout(() => {
        setRedirectCountdown(redirectCountdown - 1);
      }, 1000);
    } else if (showSuccessModal && redirectCountdown === 0) {
      router.push("/userLogin");
    }
    return () => clearTimeout(timer);
  }, [showSuccessModal, redirectCountdown, router]);

  interface InstitutionData {
    institutionName: string;
  }

// --- MODIFIED handleNextStep to include loading and delay ---
  const handleNextStep = async (values: InstitutionData): Promise<void> => {
    // Simulate an async operation (e.g., API call)
    await new Promise((resolve) => setTimeout(resolve, 3000)); // 3-second delay

    setFormData((prev) => ({
      ...prev,
      institutionName: values.institutionName,
    }));
    setStep(2);
  };
  // --- END MODIFIED handleNextStep ---

  const handlePrevStep = () => {
    setStep(1);
  };

  interface ContinueValues {
    username: string;
    password: string;
    confirmPassword: string;
  }

  const handleContinue = (values: ContinueValues): void => {
    setFormData((prev) => ({
      ...prev,
      adminData: {
        ...prev.adminData,
        username: values.username,
        password: values.password,
        confirmPassword: values.confirmPassword,
      },
    }));
    setAdminData({
      username: values.username,
      password: values.password,
      confirmPassword: values.confirmPassword,
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  type FileChangeEvent = React.ChangeEvent<HTMLInputElement> & {
    currentTarget: HTMLInputElement & { files: FileList };
  };

  interface SetFieldValue {
    (field: string, value: any): void;
  }

  const handleFileChange = (
    event: ChangeEvent<HTMLInputElement>,
    setFieldValue: (
      field: string,
      value: any,
      shouldValidate?: boolean | undefined
    ) => void
  ) => {
    const file = event.currentTarget.files?.[0]; // Use optional chaining
    if (file) {
      setFieldValue("logo", file);
    }
  };

  interface FinalSubmitValues {
    [key: string]: any; // Adjust this type based on the expected structure of the `values` object
  }

  const handleFinalSubmit = async (
    values: FinalSubmitValues
  ): Promise<void> => {
    setIsSubmittingFinal(true);
    try {
      // Combine all data and submit
      const finalData = {
        ...formData,
        ...adminData,
        ...values,
      };
      console.log("Form submitted with data:", finalData);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Close the details modal and show success modal
      setShowModal(false);
      setShowSuccessModal(true);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmittingFinal(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full">
      {/* Left side - Hero section */}
      <div className="hidden w-1/2 bg-sky-50 p-10 lg:flex lg:flex-col lg:justify-between">
        <div className="space-y-6">
          <span className="text-5xl ml-1 font-bold leading-tight">
            Controle de Presence <br />
            <div className="flex items-baseline ml-1">
              <span className="text-8xl ">Intelligent</span>
              <div className="w-5 h-5 rounded-full text-white bg-black ml-2"></div>
            </div>
            {/* <span className="text-6xl"></span> */}
          </span>

          <div className="absolute -top-8 lg:right-2/3  -translate-x-1/100 md:-top-10 lg:-top-[-190px]">
            <svg
              width="229"
              height="214"
              viewBox="0 0 229 214"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M228.66 3.11059C228.721 2.28442 228.101 1.56516 227.275 1.50408L213.811 0.508745C212.985 0.447666 212.266 1.0679 212.205 1.89407C212.144 2.72024 212.764 3.4395 213.59 3.50058L225.558 4.38532L224.673 16.3527C224.612 17.1788 225.232 17.8981 226.058 17.9592C226.884 18.0203 227.604 17.4 227.665 16.5739L228.66 3.11059ZM143.164 78.5L144.189 79.5955L143.164 78.5ZM167.861 148.926L169.328 148.614L167.861 148.926ZM135.361 183.927L135.361 185.427L135.361 183.927ZM114.362 109.925L114.362 111.425L114.362 109.925ZM227.164 3L226.184 1.86403C224.927 2.94843 223.71 3.99678 222.533 5.01042L223.512 6.147L224.491 7.28358C225.669 6.26953 226.886 5.22078 228.144 4.13597L227.164 3ZM216.417 12.2493L215.44 11.1113C212.815 13.3651 210.434 15.4053 208.271 17.2556L209.246 18.3955L210.221 19.5354C212.386 17.6838 214.768 15.6423 217.394 13.3873L216.417 12.2493ZM202.105 24.4879L201.133 23.3453C198.229 25.8153 195.891 27.7937 193.979 29.406L194.947 30.5526L195.914 31.6992C197.828 30.0843 200.169 28.1032 203.076 25.6305L202.105 24.4879ZM187.752 36.6047L186.782 35.4603C184.25 37.6062 183.316 38.4851 179.79 41.8606L180.827 42.9442L181.864 44.0278C185.379 40.6632 186.26 39.8348 188.721 37.749L187.752 36.6047ZM174.039 49.4275L173.005 48.3409C171.114 50.141 168.868 52.2732 166.174 54.8207L167.205 55.9106L168.235 57.0004C170.931 54.4507 173.18 52.3163 175.073 50.5141L174.039 49.4275ZM160.369 62.3603L159.341 61.2682C157.26 63.227 154.988 65.363 152.504 67.6951L153.53 68.7888L154.557 69.8825C157.043 67.5494 159.316 65.4123 161.397 63.4524L160.369 62.3603ZM146.687 75.2031L145.662 74.1081C144.525 75.173 143.351 76.2714 142.139 77.4045L143.164 78.5L144.189 79.5955C145.401 78.4621 146.575 77.3634 147.713 76.2981L146.687 75.2031ZM143.164 78.5L142.139 77.4045C140.836 78.6238 139.562 79.8357 138.318 81.0401L139.361 82.1178L140.405 83.1954C141.636 82.0033 142.897 80.8033 144.189 79.5955L143.164 78.5ZM132.049 89.4657L130.965 88.4286C128.461 91.045 126.101 93.6226 123.882 96.1597L125.011 97.1473L126.14 98.135C128.328 95.6332 130.658 93.0885 133.133 90.5029L132.049 89.4657ZM118.373 105.142L117.193 104.216C114.932 107.096 112.86 109.918 110.971 112.678L112.209 113.525L113.447 114.373C115.297 111.669 117.33 108.9 119.553 106.068L118.373 105.142ZM106.689 122.314L105.386 121.571C103.54 124.812 101.961 127.956 100.64 130.999L102.016 131.596L103.392 132.194C104.666 129.259 106.195 126.211 107.993 123.057L106.689 122.314ZM98.5578 141.404L97.1082 141.019C96.1236 144.722 95.567 148.243 95.4196 151.566L96.9181 151.633L98.4167 151.699C98.5534 148.616 99.0717 145.309 100.007 141.79L98.5578 141.404ZM97.9844 161.935L96.538 162.333C97.5406 165.982 99.1799 169.252 101.397 172.104L102.582 171.183L103.766 170.263C101.796 167.729 100.331 164.816 99.4308 161.538L97.9844 161.935ZM110.363 177.998L109.59 179.283C112.527 181.051 115.856 182.446 119.525 183.456L119.923 182.01L120.321 180.564C116.885 179.618 113.813 178.324 111.137 176.713L110.363 177.998ZM130.149 183.734L130.035 185.23C131.761 185.361 133.537 185.427 135.361 185.427L135.361 183.927L135.361 182.427C133.61 182.427 131.909 182.364 130.263 182.238L130.149 183.734ZM135.361 183.927L135.361 185.427C136.939 185.427 138.532 185.322 140.12 185.116L139.927 183.628L139.734 182.141C138.27 182.331 136.807 182.427 135.361 182.427L135.361 183.927ZM148.78 181.361L149.325 182.758C152.291 181.603 155.125 180.085 157.694 178.227L156.815 177.011L155.936 175.796C153.586 177.496 150.978 178.895 148.236 179.963L148.78 181.361ZM163.354 170.646L164.554 171.546C166.467 168.994 167.969 166.118 168.913 162.949L167.476 162.521L166.038 162.092C165.202 164.899 163.868 167.459 162.154 169.746L163.354 170.646ZM168.485 153.466L169.982 153.376C169.889 151.829 169.674 150.24 169.328 148.614L167.861 148.926L166.394 149.238C166.71 150.723 166.904 152.163 166.987 153.555L168.485 153.466ZM167.861 148.926L169.328 148.614C169.005 147.097 168.594 145.618 168.101 144.178L166.681 144.664L165.262 145.15C165.717 146.478 166.097 147.841 166.394 149.238L167.861 148.926ZM162.887 136.693L164.163 135.904C162.561 133.315 160.694 130.897 158.628 128.656L157.525 129.673L156.423 130.69C158.371 132.802 160.119 135.069 161.611 137.482L162.887 136.693ZM151.021 123.69L151.948 122.51C149.566 120.639 147.049 118.945 144.459 117.433L143.703 118.729L142.947 120.025C145.426 121.471 147.828 123.088 150.094 124.869L151.021 123.69ZM135.797 114.773L136.382 113.391C133.53 112.184 130.66 111.189 127.846 110.415L127.448 111.861L127.05 113.308C129.735 114.046 132.48 114.997 135.212 116.154L135.797 114.773ZM118.769 110.173L118.93 108.682C117.358 108.512 115.829 108.425 114.362 108.425L114.362 109.925L114.362 111.425C115.712 111.425 117.132 111.505 118.608 111.664L118.769 110.173ZM114.362 109.925L114.362 108.425C112.993 108.425 111.365 108.471 109.517 108.58L109.605 110.077L109.693 111.575C111.49 111.469 113.058 111.425 114.362 111.425L114.362 109.925ZM100.13 111.01L99.9305 109.523C96.9948 109.918 93.8113 110.438 90.4458 111.11L90.7398 112.581L91.0339 114.052C94.3344 113.392 97.455 112.883 100.33 112.496L100.13 111.01ZM81.4575 114.74L81.072 113.29C78.0702 114.088 74.9832 115.008 71.8482 116.066L72.3276 117.487L72.807 118.908C75.8763 117.873 78.9004 116.972 81.843 116.189L81.4575 114.74ZM63.403 120.845L62.8251 119.461C59.9068 120.679 56.977 122.025 54.0644 123.511L54.7462 124.847L55.428 126.184C58.2684 124.734 61.1286 123.42 63.9808 122.229L63.403 120.845ZM46.4504 129.52L45.6594 128.246C42.9536 129.925 40.2877 131.742 37.6864 133.706L38.5903 134.903L39.4942 136.1C42.0187 134.194 44.6088 132.429 47.2413 130.795L46.4504 129.52ZM31.2724 141.012L30.2547 139.91C27.9135 142.072 25.6533 144.379 23.4957 146.839L24.6234 147.828L25.7511 148.817C27.8367 146.439 30.0232 144.208 32.2901 142.114L31.2724 141.012ZM18.7421 155.317L17.5135 154.457C15.6923 157.057 13.9808 159.8 12.397 162.692L13.7126 163.413L15.0283 164.133C16.5585 161.339 18.2117 158.689 19.9708 156.178L18.7421 155.317ZM9.59972 171.993L8.21449 171.418C7.00694 174.325 5.9202 177.361 4.96741 180.533L6.40399 180.964L7.84056 181.396C8.76423 178.321 9.81678 175.381 10.985 172.569L9.59972 171.993ZM4.09656 190.237L2.62568 189.942C2.01428 193 1.51928 196.168 1.14979 199.451L2.64037 199.618L4.13096 199.786C4.49113 196.587 4.97316 193.503 5.56745 190.531L4.09656 190.237ZM1.94569 209.106L0.446638 209.053C0.389782 210.653 0.360911 212.277 0.360915 213.926L1.86091 213.926L3.3609 213.926C3.36091 212.312 3.38917 210.723 3.44474 209.16L1.94569 209.106Z"
                fill="#159DDC"
                fill-opacity="0.15"
              />
            </svg>
          </div>

          <div></div>
        </div>
      </div>

      {/* Right side - Registration form */}

      {/* Right side - Registration form */}
      <div className="flex w-full flex-col items-center justify-center p-6 lg:w-1/2">
        {step === 1 ? (
          <div className="mx-auto w-full max-w-md space-y-8 mb-10 ">
            <div className="flex justify-center">
              <div className="h-16 w-16 rounded-lg border flex justify-cent items-center border-sky-200 p-3 mb-5">
                <svg
                  width="64"
                  height="64"
                  viewBox="0 0 54 54"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                >
                  <rect
                    x="0.612305"
                    width="53"
                    height="54"
                    fill="url(#pattern0_2917_2254)"
                  />
                  <defs>
                    <pattern
                      id="pattern0_2917_2254"
                      patternContentUnits="objectBoundingBox"
                      width="1"
                      height="1"
                    >
                      <use
                        xlinkHref="#image0_2917_2254"
                        transform="matrix(0.00397995 0 0 0.00390625 -0.00943396 0)"
                      />
                    </pattern>
                    <image
                      id="image0_2917_2254"
                      width="256"
                      height="256"
                      preserveAspectRatio="none"
                      xlinkHref="data:image/png;base64,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"
                    />
                  </defs>
                </svg>
              </div>
            </div>

            <div className="text-center">
              <h1 className="text-3xl font-bold text-tertiary">
                Create Your Account
              </h1>
              <p className="mt-2 text-muted-foreground">
                Join CheckMe to streamline attendance tracking
              </p>
            </div>

            <Formik
              initialValues={{
                username: formData.adminData.username,
                password: formData.adminData.password,
                confirmPassword: formData.adminData.confirmPassword,
                institutionName: formData.institutionName,
              }}
              validationSchema={institutionSchema}
              onSubmit={handleNextStep}
            >
              {({ errors, touched, isSubmitting }) => (
                <Form className="space-y-6">
                  <div className="flex items-center justify-center space-x-2">
                    <svg
                      width="30"
                      height="30"
                      viewBox="0 0 30 30"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                    >
                      <rect
                        width="30"
                        height="30"
                        fill="url(#pattern0_3578_1090)"
                      />
                      <defs>
                        <pattern
                          id="pattern0_3578_1090"
                          patternContentUnits="objectBoundingBox"
                          width="1"
                          height="1"
                        >
                          <use
                            xlinkHref="#image0_3578_1090"
                            transform="scale(0.00416667)"
                          />
                        </pattern>
                        <image
                          id="image0_3578_1090"
                          width="240"
                          height="240"
                          preserveAspectRatio="none"
                          xlinkHref="data:image/png;base64,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"
                        />
                      </defs>
                    </svg>
                    <p className="text-center text-slate-600 font-medium">
                      Inscrivez votre Académie
                    </p>
                  </div>

                  <div>
                    <label
                      htmlFor="institutionName"
                      className="text-sm font-medium text-slate-700"
                    >
                      Nom de l&apos;Académie
                    </label>
                    <Field
                      as={Input}
                      id="institutionName"
                      name="institutionName"
                      placeholder="Ecole Superieur International de Genie Numerique"
                      className={`h-12 border-slate-200 ${
                        errors.institutionName && touched.institutionName
                          ? "border-red-500"
                          : ""
                      }`}
                    />
                    <ErrorMessage
                      name="institutionName"
                      component="div"
                      className="mt-1 text-sm text-red-500"
                    />
                  </div>

                  <Button
                      type="submit"
                      className="w-full bg-brand-500 hover:bg-sky-600 text-white"
                      disabled={isSubmitting} 
                    >
                      {isSubmitting ? (
                        <div className="flex items-center justify-center gap-2">
                          <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                          <span>Suivant...</span>
                        </div>
                      ) : (
                        "Suivant"
                      )}
                    </Button>
                </Form>
              )}
            </Formik>
          </div>
        ) : (
          <div className="mx-auto w-[full] max-w-m space-y-3">
            <div className="flex justify-center">
              <div className="h-16 w-16 rounded-lg border flex justify-cent items-center border-sky-200 p-3">
                <svg
                  width="64"
                  height="64"
                  viewBox="0 0 54 54"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                >
                  <rect
                    x="0.612305"
                    width="53"
                    height="54"
                    fill="url(#pattern0_2917_2254)"
                  />
                  <defs>
                    <pattern
                      id="pattern0_2917_2254"
                      patternContentUnits="objectBoundingBox"
                      width="1"
                      height="1"
                    >
                      <use
                        xlinkHref="#image0_2917_2254"
                        transform="matrix(0.00397995 0 0 0.00390625 -0.00943396 0)"
                      />
                    </pattern>
                    <image
                      id="image0_2917_2254"
                      width="256"
                      height="256"
                      preserveAspectRatio="none"
                      xlinkHref="data:image/png;base64,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"
                    />
                  </defs>
                </svg>
              </div>
            </div>

            <div className="text-center space-y-2">
              {/* <h1 className="text-3xl font-bold text-slate-800">
                Créez votre compte
              </h1> */}
              {/* <p className="text-slate-600 text-xl">
                Rejoignez CheckMe pour améliorer le suivi des présences
              </p> */}
            </div>

            <div className="text-center space-y-1 relative">
              <h2 className="text-xl font-bold text-slate-800">Admin</h2>
              <div className="flex items-center justify-center">
                <button
                  onClick={handlePrevStep}
                  className=" absolute left-4 mr-5 p-2 "
                >
                  <ArrowLeft className="h-5 w-5" />
                </button>
                <p className="text-slate-600 w-[70%]">
                  Inscrivez-vous en tant qu&apos;administrateur dans votre{" "}
                  <span className="text-sky-500">Institution</span>
                </p>
              </div>
            </div>

            <Formik
              initialValues={adminData}
              validationSchema={adminSchema}
              onSubmit={handleContinue}
            >
              {({ errors, touched }) => (
                <Form className="space-y-4">
                  <div>
                    <label
                      htmlFor="username"
                      className="text-sm font-medium text-slate-700"
                    >
                      Nom d&apos;utilisateur
                    </label>
                    <Field
                      as={Input}
                      id="username"
                      name="username"
                      placeholder="uiecc2025"
                      className={`h-12 border-slate-200 ${
                        errors.username && touched.username
                          ? "border-red-500"
                          : ""
                      }`}
                    />
                    <ErrorMessage
                      name="username"
                      component="div"
                      className="mt-1 text-sm text-red-500"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="password"
                      className="text-sm font-medium text-slate-700"
                    >
                      Password
                    </label>
                    <div className="relative">
                      <Field
                        as={Input}
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        className={`h-12 border-slate-200 pr-10 ${
                          errors.password && touched.password
                            ? "border-red-500"
                            : ""
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 flex items-center pr-3"
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5 text-slate-400" />
                        ) : (
                          <Eye className="h-5 w-5 text-slate-400" />
                        )}
                      </button>
                    </div>
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="mt-1 text-sm text-red-500"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="confirmPassword"
                      className="text-sm font-medium text-slate-700"
                    >
                      Confirm Password
                    </label>
                    <div className="relative">
                      <Field
                        as={Input}
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        className={`h-12 border-slate-200 pr-10 ${
                          errors.confirmPassword && touched.confirmPassword
                            ? "border-red-500"
                            : ""
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute inset-y-0 right-0 flex items-center pr-3"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-5 w-5 text-slate-400" />
                        ) : (
                          <Eye className="h-5 w-5 text-slate-400" />
                        )}
                      </button>
                    </div>
                    <ErrorMessage
                      name="confirmPassword"
                      component="div"
                      className="mt-1 text-sm text-red-500"
                    />
                  </div>

                  <Button
                    type="submit"
                    text-
                    className="w-full bg-sky-500 py-6 text-base text-white hover:bg-sky-600"
                  >
                    Continuez
                  </Button>

                  <p className="text-center text-sm text-slate-600">
                    Vous avez déjà un compte ?{" "}
                    <Link
                      href="/login"
                      className="text-sky-500 hover:underline"
                    >
                      Connectez-vous
                    </Link>
                  </p>
                </Form>
              )}
            </Formik>

            {/* <div className="space-y-2">
              <div className="space-y-2">
                <label
                  htmlFor="username"
                  className="text-sm font-medium text-slate-700"
                >
                  Nom d&apos;utilisateur
                </label>
                <Input
                  id="username"
                  placeholder="uiecc2025"
                  className="h-12 border-slate-200"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-slate-700"
                >
                  Password
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    className="h-12 border-slate-200 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-slate-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-slate-400" />
                    )}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="confirm-password"
                  className="text-sm font-medium text-slate-700"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <Input
                    id="confirm-password"
                    type={showConfirmPassword ? "text" : "password"}
                    className="h-12 border-slate-200 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5 text-slate-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-slate-400" />
                    )}
                  </button>
                </div>
              </div>

              <Button
                onClick={() => handleContinue({
                  username: '', // Replace with actual username value
                  password: '', // Replace with actual password value
                  confirmPassword: '' // Replace with actual confirmPassword value
                })}
                className="w-full mt-5 bg-sky-500 py-6 text-base text-white cursor-pointer hover:bg-sky-600"
              >
                Continuez
              </Button>

              <p className="text-center text-sm text-slate-600">
                Vous avez déjà un compte ?{" "}
                <Link href="/login" className="text-sky-500 hover:underline">
                  Connectez-vous
                </Link>
              </p>
            </div> */}
          </div>
        )}

        <div className="mt-8 text-sm text-slate-500">
          ©2025 all right reserved
        </div>
      </div>

      {/* Institution Information Modal */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="max-w-6xl p-0 sm:rounded-lg  max-h-[95vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <DialogTitle className="text-2xl font-bold">
                  Complétez les informations sur l&apos;institution
                </DialogTitle>
                <DialogDescription className="mt-1 text-slate-600">
                  Enregistrez une nouvelle institution dans le système.
                </DialogDescription>
              </div>
              <button
                onClick={handleCloseModal}
                className="rounded-full p-1 hover:bg-slate-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <Formik
              initialValues={{
                institutionName: formData.institutionName,
                establishmentType: formData.establishmentType,
                administrator: formData.administrator,
                location: formData.location,
                email: formData.email,
                phone: formData.phone,
                website: formData.website,
                description: formData.description,
                logo: formData.logo as File | null,
              }}
              validationSchema={institutionDetailsSchema}
              onSubmit={handleFinalSubmit}
            >
              {({ errors, touched, setFieldValue, values }) => (
                <Form>
                  <div className="rounded-lg border border-slate-200 bg-white p-8">
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                      <div>
                        <label
                          htmlFor="institutionName"
                          className="text-sm font-medium text-slate-700"
                        >
                          Nom de l&apos;institution{" "}
                          <span className="mt-1 ml-1 text-red-500"> * </span>
                        </label>
                        <Field
                          as={Input}
                          id="institutionName"
                          name="institutionName"
                          className={`h-12 border-slate-200 ${
                            errors.institutionName && touched.institutionName
                              ? "border-red-500"
                              : ""
                          }`}
                        />
                        <ErrorMessage
                          name="institutionName"
                          component="div"
                          className="mt-1 text-sm text-red-500"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="establishmentType"
                          className="text-sm font-medium text-slate-700"
                        >
                          Type d&apos;établissement{" "}
                          <span className="mt-1 ml-1 text-red-500"> * </span>
                        </label>
                        <Field name="establishmentType" >
                          {({ field }: FieldProps) => (
                            <Select
                              defaultValue={field.value}
                              onValueChange={(value) =>
                                setFieldValue("establishmentType", value)
                              }
                            >
                              <SelectTrigger
                                className={`h-12 border-slate-200 ${
                                  errors.establishmentType &&
                                  touched.establishmentType
                                    ? "border-red-500"
                                    : ""
                                }`}
                              >
                                <SelectValue placeholder="Sélectionnez un type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="université">
                                  Université
                                </SelectItem>
                                <SelectItem value="école_supérieure">
                                  École Supérieure
                                </SelectItem>
                                <SelectItem value="institut">
                                  Institut
                                </SelectItem>
                                <SelectItem value="lycée">Lycée</SelectItem>
                                <SelectItem value="collège">Collège</SelectItem>
                                <SelectItem value="école_primaire">
                                  École Primaire
                                </SelectItem>
                                <SelectItem value="centre_formation">
                                  Centre de Formation
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          )}
                        </Field>
                        <ErrorMessage
                          name="establishmentType"
                          component="div"
                          className="mt-1 text-sm text-red-500"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="administrator"
                          className="text-sm font-medium text-slate-700"
                        >
                          Responsable / Administrateur{" "}
                          <span className="mt-1 ml-1 text-red-500"> * </span>
                        </label>
                        <Field
                          as={Input}
                          id="administrator"
                          name="administrator"
                          placeholder="Elanga Philippe Lauraine"
                          className={`h-12 border-slate-200 ${
                            errors.administrator && touched.administrator
                              ? "border-red-500"
                              : ""
                          }`}
                        />
                        <ErrorMessage
                          name="administrator"
                          component="div"
                          className="mt-1 text-sm text-red-500"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="location"
                          className="text-sm font-medium text-slate-700"
                        >
                          Localisation (ville/région){" "}
                          <span className="mt-1 ml-1 text-red-500"> * </span>
                        </label>
                        <Field
                          as={Input}
                          id="location"
                          name="location"
                          placeholder="Douala, Bonamoussadi"
                          className={`h-12 border-slate-200 ${
                            errors.location && touched.location
                              ? "border-red-500"
                              : ""
                          }`}
                        />
                        <ErrorMessage
                          name="location"
                          component="div"
                          className="mt-1 text-sm text-red-500"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label
                          htmlFor="email"
                          className="text-sm font-medium text-slate-700"
                        >
                          Contact Email{" "}
                          <span className="mt-1 ml-1 text-red-500"> * </span>
                        </label>
                        <Field
                          as={Input}
                          id="email"
                          name="email"
                          placeholder="elanga.phils2000@gmail.com"
                          type="email"
                          className={`h-12 border-slate-200 ${
                            errors.email && touched.email
                              ? "border-red-500"
                              : ""
                          }`}
                        />
                        <ErrorMessage
                          name="email"
                          component="div"
                          className="mt-1 text-sm text-red-500"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="phone"
                          className="text-sm font-medium text-slate-700"
                        >
                          Téléphone de contact (facultatif)
                        </label>
                        <Field
                          as={Input}
                          id="phone"
                          name="phone"
                          className="h-12 border-slate-200"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="website"
                          className="text-sm font-medium text-slate-700"
                        >
                          URL du site Web (facultatif)
                        </label>
                        <Field
                          as={Input}
                          id="website"
                          name="website"
                          placeholder="uiecc.cm"
                          className="h-12 border-slate-200"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="description"
                          className="text-sm font-medium text-slate-700"
                        >
                          Description (facultatif)
                        </label>
                        <Field
                          as={Textarea}
                          id="description"
                          name="description"
                          className="min-h-[200px] border-slate-200"
                        />
                      </div>

                      <div>
                        <label className="flex items-center text-sm font-medium text-slate-700">
                          Importation du Logo{" "}
                          <span className="mt-1 ml-1 text-red-500"> * </span>
                        </label>
                        <div
                          className={`flex h-[200px] flex-col items-center justify-center rounded-md border-2 border-dashed ${
                            errors.logo && touched.logo
                              ? "border-red-500"
                              : "border-sky-300"
                          } bg-white p-4`}
                        >
                          <div className="flex flex-col items-center justify-center space-y-2 text-center">
                            <div className="rounded-full bg-slate-50 p-2">
                              <Upload className="h-5 w-5 text-slate-400" />
                            </div>
                            <div className="text-sm text-slate-600">
                              Upload institution logo
                            </div>
                            <input
                              id="logo"
                              name="logo"
                              type="file"
                              accept=".svg,.png,.jpg,.jpeg"
                              onChange={(event) =>
                                handleFileChange(event, setFieldValue)
                              }
                              className="hidden"
                            />
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              className="flex items-center gap-2 text-xs"
                              onClick={() => {
                                const logoInput =
                                  document.getElementById("logo");
                                if (logoInput) logoInput.click();
                              }}
                            >
                              <Upload className="h-3 w-3" />
                              Select file to uploads
                            </Button>
                            {values.logo && (
                              <div className="text-xs text-green-600">
                                Fichier sélectionné: {values.logo?.name}
                              </div>
                            )}
                            <div className="text-xs text-slate-400">
                              Supported formats: Image (.svg, .png, .jpeg, .jpg)
                            </div>
                          </div>
                        </div>
                        <ErrorMessage
                          name="logo"
                          component="div"
                          className="mt-1 text-sm text-red-500"
                        />
                      </div>
                    </div>

                    <div className="mt-10 flex justify-start">
                      <Button
                        type="submit"
                        className="w-40 bg-sky-500 py-6 text-base text-white hover:bg-sky-600"
                        disabled={isSubmittingFinal}
                      >
                        {isSubmittingFinal ? (
                          <div className="flex items-center justify-center gap-2">
                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                            <span>Traitement...</span>
                          </div>
                        ) : (
                          "Enregistrez"
                        )}
                      </Button>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </DialogContent>
      </Dialog>

      {/* Success Modal */}
      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className="sm:max-w-md">
          <div className="flex flex-col items-center justify-center p-6 text-center">
            <div className="mb-4 rounded-full bg-green-100 p-3">
              <CheckCircle className="h-12 w-12 text-green-500" />
            </div>
            <DialogTitle className="text-2xl font-bold text-slate-800">
              Inscription réussie!
            </DialogTitle>
            <DialogDescription className="mt-2 text-center text-slate-600">
              Votre compte administrateur a été créé avec succès. Vous allez
              être redirigé vers la page de connexion dans {redirectCountdown}{" "}
              secondes.
            </DialogDescription>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

