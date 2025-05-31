// "use client"

// import type React from "react"

// import { useEffect } from "react"
// import Link from "next/link"
// import Image from "next/image"
// import {
//   Home,
//   BarChart2,
//   Sparkles,
//   User,
//   Globe,
//   ClipboardList,
//   Users,
//   BookOpen,
//   FolderOpen,
//   Clock,
//   Bell,
//   Settings,
//   ChevronRight,
//   ChevronLeft,
//   HelpCircle,
// } from "lucide-react"
// import { cn } from "@/lib/utils"

// interface SidebarProps {
//   expanded: boolean
//   onToggle: () => void
//   className?: string
// }

// export function Sidebar({ expanded, onToggle, className }: SidebarProps) {
//   // Store sidebar state in localStorage
//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       localStorage.setItem("sidebarExpanded", expanded.toString())
//     }
//   }, [expanded])

//   return (
//     <aside
//       className={cn(
//         "transition-all duration-300 border-r border-slate-200 bg-white flex flex-col py-4 overflow-hidden overflow-y-auto",
//         expanded ? "w-64" : "w-16",
//         className,
//       )}
//     >
//       {/* Logo and collapse button */}
//       <div className="flex items-center justify-between px-4 mb-3">
//         {expanded && (
//           <div className="flex items-center flex-row-reverse gap-3">
//             <h1 className="text-xl font-bold text-slate-800">
//               Check<span className="text-sky-500">ME</span>
//             </h1>
//             <div className="h-16 w-16 rounded-lg border flex justify-center items-center border-sky-200 p-3 mb-0">
//               <Image src="/logo/checkme-logo.svg" alt="CheckME Logo" width={64} height={64} />
//             </div>
//           </div>
//         )}
//         <button
//           onClick={onToggle}
//           className={cn(
//             "p-1 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors",
//             expanded ? "" : "mx-auto",
//           )}
//           aria-label={expanded ? "Collapse sidebar" : "Expand sidebar"}
//         >
//           {expanded ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
//         </button>
//       </div>

//       {/* Navigation Links */}
//       <NavSection expanded={expanded} />

//       {/* ANALYSES Section */}
//       <NavSectionHeader title="ANALYSES" expanded={expanded} />
//       <div className="flex flex-col px-2 space-y-1">
//         <NavLink href="/admin/graphs" icon={<BarChart2 size={20} />} label="Graphes" expanded={expanded} />
//         <NavLink
//           href="/admin/justifications"
//           icon={<Sparkles size={20} />}
//           label="Justifications"
//           expanded={expanded}
//           badge={15}
//         />
//       </div>

//       {/* ACADÉMIE Section */}
//       <NavSectionHeader title="ACADÉMIE" expanded={expanded} />
//       <div className="flex flex-col px-2 space-y-1">
//         <NavLink href="/admin/profile" icon={<User size={20} />} label="Mon profil" expanded={expanded} />
//         <NavLink
//           href="/admin/academic-structure"
//           icon={<Globe size={20} />}
//           label="Structure académique"
//           expanded={expanded}
//         />
//         <NavLink href="/admin/managers" icon={<ClipboardList size={20} />} label="Gestionnaires" expanded={expanded} />
//         <NavLink href="/admin/students" icon={<Users size={20} />} label="Étudiants" expanded={expanded} />
//         <NavLink href="/admin/courses" icon={<BookOpen size={20} />} label="Cours" expanded={expanded} />
//       </div>

//       {/* RAPPORTS Section */}
//       <NavSectionHeader title="RAPPORTS" expanded={expanded} />
//       <div className="flex flex-col px-2 space-y-1">
//         <NavLink href="/admin/documents" icon={<FolderOpen size={20} />} label="Documents" expanded={expanded} />
//         <NavLink
//           href="/admin/action-history"
//           icon={<Clock size={20} />}
//           label="Historique des actions"
//           expanded={expanded}
//         />
//       </div>

//       <div className="flex-grow"></div>

//       {/* Bottom Navigation Links */}
//       <div className="flex flex-col space-y-1 px-2 mt-2">
//         <NavLink href="/admin/notifications" icon={<Bell size={20} />} label="Notifications" expanded={expanded} />
//         <NavLink href="/admin/settings" icon={<Settings size={20} />} label="Settings" expanded={expanded} />
//         <NavLink href="/admin/help" icon={<HelpCircle size={20} />} label="Help & Support" expanded={expanded} />
//       </div>
//     </aside>
//   )
// }

// function NavSection({ expanded }: { expanded: boolean }) {
//   return (
//     <div className="flex flex-col px-2 space-y-1">
//       <Link
//         href="/admin/dashboard"
//         className={cn(
//           "flex items-center rounded-lg text-white bg-sky-500",
//           expanded ? "px-2 py-2 justify-start" : "px-2 py-2 justify-center mb-2",
//         )}
//       >
//         <Home size={20} className={cn("flex-shrink-0", !expanded && "mx-auto")} />
//         {expanded && <span className="ml-3">Accueil</span>}
//       </Link>
//     </div>
//   )
// }

// function NavSectionHeader({ title, expanded }: { title: string; expanded: boolean }) {
//   if (!expanded) return null

//   return (
//     <div className="mt-6 px-4">
//       <h3 className="text-xs font-medium text-slate-400 mb-2">{title}</h3>
//     </div>
//   )
// }

// function NavLink({
//   href,
//   icon,
//   label,
//   expanded,
//   badge,
// }: {
//   href: string
//   icon: React.ReactNode
//   label: string
//   expanded: boolean
//   badge?: number
// }) {
//   return (
//     <Link
//       href={href}
//       className={cn(
//         "flex items-center rounded-lg text-slate-700 hover:bg-slate-100",
//         expanded ? "px-2 py-2 justify-start" : "px-2 py-2 justify-center mb-2",
//       )}
//     >
//       <div className={cn("relative flex-shrink-0", !expanded && "mx-auto")}>
//         {icon}
//         {badge && (
//           <div className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-sky-500 text-[10px] font-medium text-white">
//             {badge}
//           </div>
//         )}
//       </div>
//       {expanded && <span className="ml-3">{label}</span>}
//       {expanded && badge && !badge.toString().startsWith("-") && (
//         <div className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-sky-500 text-xs font-medium text-white">
//           {badge}
//         </div>
//       )}
//     </Link>
//   )
// }
