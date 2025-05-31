// import Link from "next/link"
// import Image from "next/image"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Eye } from "lucide-react"

// export default function AdminRegistrationStepForm2() {
//   return (
//     <div className="flex min-h-screen w-full">
//       {/* Left side - Hero section */}
//       <div className="hidden w-1/2 bg-sky-50 p-10 lg:flex lg:flex-col">
//         <div className="space-y-2">
//           <h2 className="text-3xl font-medium text-slate-800">Controle de Presence</h2>
//           <h1 className="text-7xl font-bold text-sky-500">
//             Intelligent<span className="text-sky-500">.</span>
//           </h1>
//         </div>

//         <div className="relative mt-8 flex-1">
//           <div className="absolute right-[30%] top-[15%] h-16 w-16 rounded-full border border-dashed border-sky-200"></div>
//           <div className="absolute right-[40%] top-[30%] h-24 w-24 rounded-full border border-dashed border-sky-200"></div>
//           <Image
//             src="/illustrations/people-group.svg"
//             alt="People illustration"
//             width={500}
//             height={400}
//             className="absolute bottom-0 left-0 right-0 mx-auto"
//             priority
//           />
//         </div>
//       </div>

//       {/* Right side - Login form */}
//       <div className="flex w-full flex-col items-center justify-center p-6 lg:w-1/2">
//         <div className="mx-auto w-full max-w-md space-y-8">
//           <div className="flex justify-center">
//             <div className="h-16 w-16 rounded-lg border border-sky-200 p-3">
//               <Image src="/icons/fingerprint.svg" alt="Fingerprint" width={40} height={40} className="text-sky-500" />
//             </div>
//           </div>

//           <div className="text-center">
//             <h1 className="text-3xl font-bold text-slate-800">Connectez-vous</h1>
//             <p className="mt-2 text-slate-600">Accédez à votre compte CheckMe</p>
//           </div>

//           <div className="space-y-6">
//             <div className="space-y-2">
//               <label htmlFor="username" className="text-sm font-medium text-slate-700">
//                 Nom d&apos;utilisateur
//               </label>
//               <Input id="username" placeholder="Entrez votre nom d'utilisateur" className="h-12 border-slate-200" />
//             </div>

//             <div className="space-y-2">
//               <div className="flex items-center justify-between">
//                 <label htmlFor="password" className="text-sm font-medium text-slate-700">
//                   Mot de passe
//                 </label>
//                 <Link href="/forgot-password" className="text-sm text-sky-500 hover:underline">
//                   Mot de passe oublié?
//                 </Link>
//               </div>
//               <div className="relative">
//                 <Input
//                   id="password"
//                   type="password"
//                   placeholder="Entrez votre mot de passe"
//                   className="h-12 border-slate-200 pr-10"
//                 />
//                 <button type="button" className="absolute inset-y-0 right-0 flex items-center pr-3">
//                   <Eye className="h-5 w-5 text-slate-400" />
//                 </button>
//               </div>
//             </div>

//             <Button className="w-full bg-sky-500 py-6 text-base hover:bg-sky-600">Se connecter</Button>

//             <p className="text-center text-sm text-slate-600">
//               Vous n&apos;avez pas de compte?{" "}
//               <Link href="/" className="text-sky-500 hover:underline">
//                 Inscrivez-vous
//               </Link>
//             </p>
//           </div>
//         </div>

//         <div className="mt-8 text-sm text-slate-500">©2025 all right reserved</div>
//       </div>
//     </div>
//   )
// }
