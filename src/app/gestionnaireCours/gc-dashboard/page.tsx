"use client";

import { GestionnaireDeCoursLayout } from "@/layout/GcLayOut";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Cards";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  Users,
  Calendar,
  ClipboardCheck,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Bell,
  FileText,
  Fingerprint,
  MoreHorizontal,
} from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/Badges";
import { Progress } from "@/components/ui/progess";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { useAuth } from "@/app/context/auth-context";
import { useIsMobile } from "@/hooks/use-mobile";
import MobileCourseLayout from "@/layout/MobileLayOut";
import { useRouter } from "next/navigation";

export default function CourseManagerDashboard() {
  const { user } = useAuth();
  const isMobile = useIsMobile();
  const router = useRouter();

  // Sample session history data
  const sessionHistory = [
    {
      id: 1,
      status: "en_cours",
      courseName: "Dr AMOUGOU",
      time: "8h-12h",
      date: "Jan 17, 2022",
      type: "ISN",
    },
    {
      id: 2,
      status: "repondue",
      courseName: "Mme EYENGA",
      time: "8h-12h",
      date: "Jan 17, 2022",
      type: "Toutes",
    },
    {
      id: 3,
      status: "repondue",
      courseName: "Bank payment",
      time: "14h-16h",
      date: "Jan 17, 2022",
      type: "ISN",
    },
    {
      id: 4,
      status: "non_repondue",
      courseName: "Bank payment",
      time: "14h-16h",
      date: "Jan 17, 2022",
      type: "ISN",
    },
    {
      id: 5,
      status: "repondue",
      courseName: "Mme EYENGA",
      time: "8h-12h",
      date: "Jan 17, 2022",
      type: "Toutes",
    },
    {
      id: 6,
      status: "non_repondue",
      courseName: "Bank payment",
      time: "14h-16h",
      date: "Jan 17, 2022",
      type: "ISN",
    },
    {
      id: 7,
      status: "non_repondue",
      courseName: "Card payment",
      time: "8h-10h",
      date: "Jan 17, 2022",
      type: "Toutes",
    },
  ];

  // Sample participation data for courses
  const participationData = [
    { courseName: "Nom du cours", rate: 95 },
    { courseName: "Nom du cours", rate: 85.4 },
    { courseName: "Nom du cours", rate: 85.4 },
    { courseName: "Nom du cours", rate: 85.4 },
    { courseName: "Nom du cours", rate: 85.4 },
    { courseName: "Nom du cours", rate: 85.4 },
    { courseName: "Nom du cours", rate: 85.4 },
    { courseName: "Nom du cours", rate: 85.4 },
  ];

  const handleGoToCours = () => {
    router.push("/gestionnaireCours/gc-session");
  };
  // Content to be rendered inside either layout
  const dashboardContent = (
    <div className="w-full lg:p-5">
      <div className="flex flex-col w-full md:flex-row md:justify-center lg:justify-between lg:items-start md:items-center gap-4">
        <div className="flex flex-col py-5 justify-center md:flex-row items-center md:justify-center gap-4 w-full md:w-auto">
          <h2 className="text-lg font-semibold text-gray-800 bg-blue-50 px-4 py-2 rounded-md">
            GESTIONNAIRE DE COURS
          </h2>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold">
              Bienvenue, {user?.name || "Prof. Laurent"}
            </h1>
          </div>
        </div>
      </div>

      {/* Top Stats Cards */}
      <div className="flex lg:flex-row md:flex-col w-full lg:gap-0 lg:p-0 mb-3 ">
        <div className="flex lg:flex-row md:flex flex-col gap-4 lg:w-8/12 lg:justify-between lg:items-center lg:p-0 p-5">
          {/* Heures de Présence */}
          <Card className="bg-gradient-to-br flex flex-col justify-center  from-green-400 to-green-600 md:w-full text-white border-0 h-[150px] lg:w-[260px] shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                HEURES DE PRÉSENCE
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xl font-bold">126 Heures</p>
            </CardContent>
          </Card>

          {/* Heures d'Absences */}
          <Card className="bg-gradient-to-br flex flex-col justify-center  from-red-400 to-red-600 md:w-full text-white border-0 h-[150px] lg:w-[260px] shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                HEURES D'ABSENCES
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xl font-bold">60 Heures</p>
            </CardContent>
          </Card>

          {/* Avertissements */}
          <Card className="bg-gradient-to-br flex flex-col justify-center from-amber-400 to-amber-600 md:w-full text-white border-0 h-[150px] lg:w-[250px] shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                AVERTISSEMENTS
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xl font-bold">0 Avertissement(s)</p>
            </CardContent>
          </Card>
        </div>

        <div className="flex lg:justify-end w-4/12 md:w-full md:justify-center">
          <button onClick={handleGoToCours}>
            {/* Fingerprint Card */}
            <svg
              width="149"
              height="147"
              viewBox="0 0 149 147"
              className="cursor-pointer transition"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
            >
              <g filter="url(#filter0_d_481_7416)">
                <g filter="url(#filter1_d_481_7416)">
                  <rect
                    x="26.8627"
                    y="26"
                    width="96"
                    height="93"
                    rx="10"
                    fill="white"
                    fill-opacity="0.09"
                    shape-rendering="crispEdges"
                  />
                </g>
                <g filter="url(#filter2_d_481_7416)">
                  <rect
                    x="30.8627"
                    y="28"
                    width="88"
                    height="86"
                    rx="10"
                    fill="url(#paint0_linear_481_7416)"
                  />
                </g>
                <rect
                  x="52.8627"
                  y="49"
                  width="44"
                  height="44"
                  fill="url(#pattern0_481_7416)"
                  // style="mix-blend-mode:plus-lighter"
                />
              </g>
              <defs>
                <filter
                  id="filter0_d_481_7416"
                  x="20.8627"
                  y="21"
                  width="109.137"
                  height="107"
                  filterUnits="userSpaceOnUse"
                  color-interpolation-filters="sRGB"
                >
                  <feFlood flood-opacity="0" result="BackgroundImageFix" />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feOffset dy="4" />
                  <feGaussianBlur stdDeviation="2" />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0.0823529 0 0 0 0 0.615686 0 0 0 0 0.862745 0 0 0 0.34 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow_481_7416"
                  />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1_dropShadow_481_7416"
                    result="shape"
                  />
                </filter>
                <filter
                  id="filter1_d_481_7416"
                  x="0.762671"
                  y="0.9"
                  width="148.2"
                  height="145.2"
                  filterUnits="userSpaceOnUse"
                  color-interpolation-filters="sRGB"
                >
                  <feFlood flood-opacity="0" result="BackgroundImageFix" />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feMorphology
                    radius="1"
                    operator="dilate"
                    in="SourceAlpha"
                    result="effect1_dropShadow_481_7416"
                  />
                  <feOffset dy="1" />
                  <feGaussianBlur stdDeviation="12.55" />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0.0823529 0 0 0 0 0.615686 0 0 0 0 0.862745 0 0 0 0.47 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow_481_7416"
                  />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1_dropShadow_481_7416"
                    result="shape"
                  />
                </filter>
                <filter
                  id="filter2_d_481_7416"
                  x="27.0627"
                  y="25.2"
                  width="95.6"
                  height="93.6"
                  filterUnits="userSpaceOnUse"
                  color-interpolation-filters="sRGB"
                >
                  <feFlood flood-opacity="0" result="BackgroundImageFix" />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feOffset dy="1" />
                  <feGaussianBlur stdDeviation="1.9" />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0.0823529 0 0 0 0 0.615686 0 0 0 0 0.862745 0 0 0 1 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow_481_7416"
                  />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1_dropShadow_481_7416"
                    result="shape"
                  />
                </filter>
                <pattern
                  id="pattern0_481_7416"
                  patternContentUnits="objectBoundingBox"
                  width="1"
                  height="1"
                >
                  <use
                    xlinkHref="#image0_481_7416"
                    transform="scale(0.00390625)"
                  />
                </pattern>
                <linearGradient
                  id="paint0_linear_481_7416"
                  x1="74.8627"
                  y1="28"
                  x2="74.8627"
                  y2="114"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#02AFFF" />
                  <stop offset="1" stop-color="#016594" />
                </linearGradient>
                <image
                  id="image0_481_7416"
                  width="256"
                  height="256"
                  preserveAspectRatio="none"
                  xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAYAAABccqhmAAAAAXNSR0IArs4c6QAAIABJREFUeF7tfXecJVXR9vN09yyyc2eJYkReAREVBUmiYEAwYeJVMQEqiooBxcz7GlHMviZQwayYs5hFDIiikgQzfgaiSt6dmYXd6e7n27rTs8zMzsztE+6de2f6/H77x849VaeqTnf1CVVPEU1rLNBYYNlagMtW80bxxgKNBdA4gH5/CGyG1O9CNvINqgUaBzCoM9fI3VggggUaBxDBiEuKRbPiWFLT2UmZxgF0slDze2OBnlqgtx64cQA9ndxmsJ5boLfvU8/VCx2wcQChFmzoGwuEWGCRHVTjAEImr6EdcAss8tvXB9ZrHEAfTEIjQmOBxbJA4wAWy/LNuI0F+sACjQPog0loRJjDAv2yOu8XObr0kERzADfeeONWaZreIUmSzbokqzPbsizXlWV51RZbbHG9M3FFsMTn39csy4JubGzstgBuQzLrF4XtmS6K4sott9zyhhgyBTkAScn4+PhTBR4HYE+gb0OLLwLxodbmKz/OhBMxDBfOo3Et4TaMz+Hyy7X5FluNv4jk0RB2jj9CFI4SdH4CvHd4ePjzJEtfrp0dwDzP6dVXX91auXL4CwIe6Tt4z+mEc0g9rtVq/bvnYzcD9r0Fbrrppv/Ki/I7AO7e98LeskL99tq140/Zbrvtxnxk7uwA5uA6+eVfe/pAvfy36HFRa3jl/iTHfQzW0CxNC9xwg7bMhsZ/A/Aug6YhgW8PD698rM9KwMsBjI2NHSHwtEEz1JS8hN7RarVetan8zbJ8UOc0VO7RsbH3AXxRKB93ekv19HoNZwxF6PBWq/U51/G9Rh4dGz8PwF6ug/VR/zWt4ZW3I7m2j2TqrSiNr9tob0krx8bHrwW4eW8nId5oG1bj565qDe/rytHZAbRP+7Oh6zZ1W/N7sjg+zlW1Dv1VPnhkZOQnkbkOLLvl7A/GxsYOFnjGwE7epODKJ1ZuvdVWvNFFD2cHMDo6uhuY/M5lkH7sS+gZrVbrU/0oWyNTby0wNjZ2pMBP93bULoymcreRkZE/uHB2dgDj4+N7lYJtAQa7iYeNjKz8ymAr4Sr9cv7Oz2+r0dG1h4H6kqs1+61/Quw9PDx8votc/eEAFuG5LLJ05y1vdau/uRir6bs0LbBmzZpdmaR/GnTtBtcBBFne64ThgpHW8CAfYgZZrBfEi+DTg9RaAgfbWKYOwHneVUAP27LV8jv0GbQn29k8rgRLwyCjozc9ECx+DDBxtUC/9O9vB9Anz4lKvHrVquG39MukbZSjT+zTd3bpoUCjo2uPBfW+KBfzPZR7aqj+dgCLYJBZQ15N6GWtVusziy9KI0FfWWDqJEzAmjXjj2GCkwDcqa9krCFM3zsAAuMCz7Uryxr6BHchcLOEK0n9/Kbh4dNvTY4GMx0gBs2iwm+yJK0YHb3pkUzKB0G6E5i0/Di5UmmI4N4Chl0prX9fOwB7+cuy2GvVqlV/8VGuoWkssBwsYDcSSZKe5+MEFs0B1DuH55kjrZUHL4dJbHRsLBBigdGxsTMBPtiVx6I5gDqCEvhOqzX8qDp9mz6NBZazBcbGxr/tk2nbOIDl/NQ0ui8ZC8xwAA4HOf3pACoFmhVA759PSZbdtu0EcFsCWxC4FQD7W2L/ny6RADuYtUPSUsANAm4cAgx26nqSq3sv/fIdsVkB2Nw7eL7l+qhI2nICuEsC3IXAziqxC4gdAWxnWHYAAk+vN57u3AzgCgBXQrhcwKVM8KcS+MsQ8Bcus9uVbj9vjQOYYeHGE5g5JO1YAk8lcL9SMAw4C2U20Mp+aJcDuJDE+QLOT4HzSP6nZ4ItsUekcQA9e3ICBuryQydpvxI4isCDAPwXgBWTjgCw73K/NwF/pXAWEvwsBX5K0pxE02pYoKsOYNZz27NswOYMYOGZt/16CTxbwFMTYHdM7tc3abZBH8Qm4M8QvoME38mgs8mkT9CZ+8+aXXUAs9RdUg6gyx/l6E+KpK1K4FUEngC09+4LzsegvvxzGG515Qy+mAI/ILkuunEHmOGmDqBepE1/3gJUE9GsACYNYYjKJXAsgBcS2KnTSz/1HNsjYMv/JdhuhPB1JfjEEPnzJaifs0rNCsDZZP1PIGkPAW8C8NCp/byL1Evo67+Q2mekxNNJ/svFNkutb+MAltCMFtKLCRgE+e181RqUgz9f/WbRXZoS9yN5VSR+A8emcQA1p6xf9/ySshI4kcALQu/il/DSf6FZ/nGWJAcNxn1HzYfVoVvjAByM1U9dJa0qgZMJPMlnmT+XLstk6b+J6iIOHiLP7Kf57ZUsjQPolaU3GWeOS9KaB2+F9EYC/wsgjSX+Mlv6zzSbcGqW8phYthwkPo0DGKTZAlBIXyTwxNhiL9evf2XHs7OE949t00Hg1ziAQZilSsZCeg6BU2OLvKy//pPG/FWW8L6x7ToI/BoHMAizVMlYSlaKaUZmXaj4EQ/+rhFwDYFrAfwHamf3WSixyawkwU0A8rLESCVzSmBLEFsB2IrANprMN7DEol63L2cJo6+qeq2Ez3iNA/Cx2iLQSNpXwK9jD+249L8MwMUSLkkS/L8S+GsG/D/L3iMZBXtR0mYA7pADOyTALmWJXUnsCuCe9vdO+nvd1hDPyciPdOK9FH9fhg7A6xFZ9LkvpDdXB3/RZOnw9V8D4OcSzmOCc1PgXJJXRxvcg5Gk2xTAXgT2knAAgP3hCWo5bfh/p8SOJG2FsuzaMnQAsee4Nw6lkE7asLx+YUzpZ33919temMSPSuBH2eQLH+WrHlPm6bwsBiIH9kmAAyUcAmA/x5uRUsQhQ+QPuiVjv/Ndfg6gN+9r9HkvJIvnNwz5KK36+hv4xg9AfDkFvkXSvvoD2yRtUwAPg/B4oO0Q5sxyrBQcA/H0jPzawCocQfDl5wAiGG0xWEjaVoAtwZ2zKueQ1w7sXrcB3eezSxVhxwKlCuBQqJ39aDgHU4eP/4bwlTTB20ka8tCybo0D6Mr0d2eZUUjn2f7XU+SiBM5OgeNJ/sqTRxyy7phnXtlsq1Ddnojk9XGUWBpcGgcwQPNYrQKudAz9NdDNkxLgzSRtn9+0xgIbLdA4gF48DBG/eJIOEGDVhhfa35pWV5XAqzPyk71QsRljMC3QOIC55i3iC9uNx0LSdgJO23BNd9CsU28L6vtDCbxiiPx+N8ZueC4tC/S1AxgdHd0NTH7nbHLhmyMjw4c60w0ggaS9SmDvDaCel2bAWSTXDqAajciLZIHR0fGvgfhv1+EJ7dFqtS5yoXM+vV69evXWSZpZaKkbrXDKyMjw8+YXrs8/8S5Wbfo2FgiwwOj4+EmQR3yJytuMjIw4BYa5vcSVUqNj47/FJHJt7UboiFar9dnaBE3HxgKDaoHAb9no6OjjwOSrburrkpFW665uNK5f8SkHMD7+XAinOAx29c3DK3e+dVNBxsFkTdflagHLvRgbX3sJgDvVtQGhV7RarXfV7T/Vz2sFIGlobGztz0DUStckdGSr1fqMq3Cx+09ID0mAowVsnwA3C/hNArynp1VsYivV8KtngTm+ypJaBfBQAruVJTZLElyVTMKUWzLVorY1a8YfwwTfqLfV1u9aw8P7+MCrezkAs8zY2Nhthfap9kJbAanEa1atGn7LYlqzuqb7yjxprRaB+x0CjyVpJbeatpAFApe3/WBcSTbRL5PaCE6W+jy7nZ4SLyJ56WLKOzq69liwfC/AZH45+Jc85cO22nxzL1m9HYAJJGl4fHz8dUIbumnVLCEvKKDjt2y17H580VouWaUdu55bwIht8a4wnP4mMGfRpqonA0tKC+HzAA7rMOB/SuKQFeQFPRFsnkFGR296gFi+a0NdjX1mdVkr6JSJdetO2GabbbzzRYIcwJRAl1+uzbfccmw/iTuQGi3L8qItttiiR8uo+T9JufTIBDi9xsvfVsXCcjMuTxiqeg/54H/+Jwq9mWx/+eu0a1PiAST/VKdzN/usWXPzLmS5O1kaNsO/brhh+Jfbbx+eLh3FAXRTcV/e1bL/p46pqHa3uS/Jc33H9aeL+3LZlw7ADjlwJwK3JXDrssStObnktUKjGYgRCJZePCpgFMBNSYKx6v83lMDfhoC/kbzOX6/+oZS0fSH8FYC9RHXbFSlxQNB2IO7U1pW7Vr8l6QAk3V3AhY7x+VMGOz0hH1vLen3SSdLtC2BvldiHxO4CdiFwZ0/959LKoMT+BuFv7SKfCc7JgF8OWtZiIb1Cwjs8pu1vKXH/pVixyN8B9KlXM4QaAf8AsLnHRBvJpQlp5bj7tkm6Q2EhxyUOBvHgzrBc9YpLOipcEPidhLOR4Bcp8LN+f0HyQl8E/dCbCVyQTG4Hxh3t1Nfd/R1AH6olaYUAw8gLAbG8NiFv3W/qrZPukVkVYeHxmsTi67dmNyjnkPhyAny1H/P681J2a/WwAMN9IyUev5Rui5aUAyil8+Cfmz/1XPwtIXcOeEgCSGcuqyTdbkM+wVGlcASBuwUw7kgaeUE35Qy+kgBf7JeVQV7o0yCO7GiMBTpIeOdQyleG8Ogn2iXjAArpNAJHhBpXwCdS8pmhfHzp7Y66AB4O4TkAHtU+rBvsNgHhy2WC965YlMPVW4yXS0dDCEcaJo7OyI8N9rRMSr8kHEAuPTMBYkyICNxhMb5YFl1ZAE+h8EoB91gKD9dsHQicL+L9KfB5khO91rEd+Sf8HUDoFm9CxIOGyF/2Wgf38RZe2w28A5C0i4A/ul73zWVIAaem7G09uuqLb1+m1wLY3nWCIy/dXYf37X8ZiBNT4OOkLXh613LpaRA+FWFEK2O+56DDmQ20AzBcOQH/BrBN6ISWVoqKvS1FJWllIVjW18ND5R9EenPcJF6Zkd/ptvzTHeVEobeReFWEMb+bEo8e5EPBgXYAufTTBHhg6EQK+FMC7LbgRHbhU5uXMvhrJ+CHLogRar4Y9D8piVesIM+PwawTj/aqq8SpIJ7dqW+n30m8OiUXNdelk4wL/T6wDiCXnp0AHw5RvqK9yoJmep0DkEuPhdrZXk2btIAgfDJN8FKSVruwq01SUpT4LIgnBw6Ul8QBK8joJeIC5apF7uQA+uXrU+HvGX78UC0t5+90HS1UdhEgu/JSVvnmoYHyL0XyK0Qc3YvKQBY3Ugi2/Tg4xJAC/pJNngcMHPSbkwMIMVJM2lL6A4C7B/JcR+CuQTHengLY2UUhrAaw0pPFUiez1cBH0gQv73a4sRUrKYVfCNgtyKjCyVnKY4N4LALxwDmAQnoNgTcF2qokcCDJswL5VORuayNJWxVCUwyjs/H/IeIZQ9Hmae4BJe1UCFaYZdvOIk32mGPGJeJhQ+Sipr/XlX+q30A5gGrpb0U4goJjNtwcHJOSp7oaK1Z/Sbcq1M66s4y9brb/APhrlcRzRZLgWgHXABgX2uNPPczDthrhZKmukbLEtiR2JrDzBqjznaaV8OqmrPPxzkm8NCWj1WCca6AJ6f4UzgzcVv49Je45SFuBgXIAuWQQXrOBEZweSgFfSsknORF1oXNR6uLIMf12cPYzEr8ugXMz4LxYh2mWYJUb8lNpabG4P4B959u+uK2FHAwrfDRN8IJuHtYW0nES3uMg1SZdJbx1KGVdvIGQoaLQDowDyKXHWZJJoNaXJeQOgTyikBfSyy2uPISZZeOB+GoBfH9o8oXvSVCNRS1OAHuxxKNAHEZglxA9JmlrZSz+okrGsZVNV1pe6ks10IIWGttuBfZeQTrh83dFmRpMB8IBVAE/lpPeqqHTfF3s0G+HfgEALaXNS8EKrNgS26VdRuLjCfAFkn9xIexW3/XSHizxRBK2stqxW+NUfC8ricd06wWzQ8FcODfQqf2yAhExr9bXbSAcQCF9hMDRIZbcgG5zZEYuOjLxdB3WSbulwk9qHD7Zg/RdEB9IJ1Fr+xK8tH23DhwC4biqRFrIlC1Ee0NJPKxbyUXrpT0T4ZwgQBXiqRlp2IPdaZH2Wn3vACRtLcCWfCEHf99LyEO6MxNhXCXtUEzWWJgrHNgy6b5QJHjnZqR7ObYw0YKo10n3SkscB+LwoBdpfilWl8TDV3SprHohvVbCGwOMYFBids3c17EBfe8ASslOZg31xreNEnaq3d9luG+W7jkEPEQldhQwwQS/T4HTSdqp/cA2STsXwlsBPL4L2adrRDyiG1l57dWMYJiSdujp1Uj8T0q+zYu4q0S3LB/62gFI2k3AxSEPTgEcPESaE2maiwUiLTGnhlwv7ZtMHno+wEWMGn3HRTx6iLStVNRmmaaFYId5ncq+zzfumpS4C0mnen1RlViQGfsbD6CQLiSwR4BBzkjIBcJtQ5/yUPoAzQaQtEp9PhzC++cpyOGr1WhJ3L8bB4OF9DoJJ/gK1u8IQn27ApB0L6HtfX2bnfrb0n9jwIsvo4YurgUk3bY694iJvnxVStwnNhah5Qvkwm8DINnGU2LHfl0F9K0DKKQLCNzb99HbcHD4vJR0KWDqO1RD52mBXHoWhHfPUVXqFo5ui6xzU+JBsQ/eJqQHcvK2xut9kfCuoZSv8DRTV8m8FOqqRJMlx0K//v9MSMPFb1oEC7i9g24DSrpLLnwz4As7e8CvprSYhLhXpYEBQn27CuhLB5BL5yTAfm6P0oyPhhVxONuXvqHrrQWq5Ci7Mw+B7N4otIS3DKV8dUwtJO1YqA0951JVaLpMJw6lNNi3vmp95wAkbSvATk29ZFsMaK8FZ7Sbn8+AR6nfxLJSZnmJt5N4WYBaU6SWmffwIfKHEXhtZDFR6J0kXu7J8/qU2D729sRTlo1kXi9Z6KAL0RfS5wg8xXMMQ/W1cN/LPekbskW2QCG91PbMBBgYR2uHgveKWddQ0paF2lWntvQyE/GcjAyHJfcafG6ivnIAFnwhwCKnvJZZG4I2zkzIIHSXiLZtWHlaoJCeK+GDdas6LzDMN7KETpiLnUSeKPQGEq/v1G+u3yvkoLuRob7NZ/QBcACF9D8EfAEW7YOxQ9J8/eM9HYvIqSriYZgNSZAYxFEZ+ckgHtOIQ1cBIh4yRP4oljyhfPpqBVBKtnS/o6dSP07Igzxp50J48WXV0EWyQCE9r1oJhHC0aLw9SNrSPUqbKHQCidd5MRM+n6V8qhdtF4j6xgHYdZCAS3x1JNrBFtEm2eSwikMEXkHAqgUbek8O4B8l8NZ+yyycz27tZCNgd8M/VIldQNwJgCVYtQgYEpBl4o9zEiHoegiXMsEltlxNgYsXAzNxui6BB29TrE7Pkngl36tbC/tYte3n2NalbFefus6Rrivd+8YBlJKBfTzOR0sBv0vJe/nQzkVjyzwBVmh03lx9AX9OgPvGQt2pJXuNo3vLZy+spmCJg0AcCCA0HuIfEH6MBGemwLe7DdI52w5VUs6XfZ+NKX7VrYAhMUdpeaFTQDzXhxmJF6bkB3xoY9P0kwOww7/NfRTcAIH1yIz8rg/tHA+clRi/qma1oWsI3HGxMw3bV2jAQ1jiSLBdaMTLjvPZb5rfWQvh60pwWgacETvYZoFVjFVQssw8bzg4An9IJrcCtooLbpLuVgiGTu38DhG4IE24V7AQERg4Cx9hzE1YWJGMBJNFMmp85GbTX5OQ28WRiyhVGk68C3bA6QnjLS9d9JgqKCrBDk93daGN0PfvBN6fEKeQXBeBX5vFfPMv6Y5VZt7WvmORODYlT/aln02Xl/q+b/BSSuzaD4hOzg7A4wXtaO9SsjjrB3XsOEcHAW9Lyf/xoZ3j67+D0L7ndbGLQYyP9DLAo8qqO2pDLR27jrI9/bytG/M1a7BLN1jrDSnwqW5fb+XS4yF8JWCub0iJXUheG8BjI2mIPCRek5JvjiFHCA+XBz1knAVpS+kmz5zrqC9fLv0iAe7nqqiAF3UbtnpKpjbSjvAheMjpqpdj/7ML4gWbkYbf0LWWF/okiKf7DiDh7UMpj/eln05XVRayClXO5cYJ/DZN6J3sFkN+47HoDmBCekgKeIVstuGvSYOoDm5VmfE/+9hEwGdS8shgIRZgYMCoeQkLQrGqtiHwaN0UMzdY7CzBCd1CKJY0UggXeoCpTum9OmW7HNyaGIaYKPRuEi/x4VWBhfw/H9pYNIvuAEr576NK4NCM/GYMY4QkIAn4bEoeEUOOuXgYLn8hGKDpoEQ5npUSTyFph6nR24R0MAXvCjxWkjwlgyDZp63I7pmqjVrl3GLK4Tx4ReDmALqwoSwlg/v2ia2+OSGjnHaHJiAJeElKvtd3Ehaim5D2p/B1n2VmN+Rx4Hm1iEOHSEPXjd7yUub4H+PJ+MoKpGO9J/0MsolSf/RMZz4zSxY3dN3NAdS1Vk1HUZX68iryUAI/y0ivg8PZahTSaQR8v+CWgGTIQ9Fr/eXSoyB8cYCLiK4F8cSMtJuVqK1Kz7VrOD+8PuKZGfmJGEJNFHqTHep58FqfEluTHPegjULSHQdQU7RCehPhZTiUwH9nZPvqMLQFHEKaHOdkpPPBYSeZc+lpED7Wx/v9TipM/Z5jMh4/ek2GiUJvJuFVhsviAtKEYRWBKw2tMEoyeS5Rq834PhKHZOT3ahF2odNiOwDDWtvdQ6+JhFzhQbcJSSEda/fZnrzs62/Y73/1pJ+TLJceA7XLoHXpsK9WGa6YKhUgnpSRoaXdZshUHQhe6gswWhL7rSB/HUPRvNTffKoiSXj/UMoXx5DhFh41l+A+J94xBS2lm31Sfw0sNCVD0II3qlFIf7aX2EevEvh5RkaFuZ6QHkTBvgh+S1sfRSqa+o+N1yA3V+WzI5Vkn5QhYPmNmC9fXugDIJ7vahnas5zEeZZdx7b+i7YCsCQVAf/0EVrAG1PSKyd7+nhVzL/t3X3sYF//nTZJQAp4iywhqhDOBbBFLbsEjFWLf/xOFoizN8m/x2ItaZtCsFWAT2LO1VViTnB4cC4damHSHnqVKbFVrGtJ1/F9HnzXMebsX0j/S8ArEorAbWMU+SwkQ57xhaC6OCF9ti9z2kPSrUrhlwpAQl5gYuzO+ywSZwntikOWdWmOb3Xl/FZZhmBh2xlgN6ldvMP+jUSZ7JlMzqsKZ0YLH84LnQziBT6yxkoSqrYjluE35CrHYmIELJoDKKUfb6hnb9lqru3GhNzKlWiu/iH4AzETkEw23yXkAnawAqLfAvGJFPiea8JSO8oNeCSEZ8CyC32BOeZapQgnZSlfFGMOjUd1I2DnMO7gIcJnsjROEFdeyoBo93fVy7AFUvJNrnQx+vs7gMDlZykZ8KdzCGWsU3dJKzWZA+9jg+sSctsYE2A8LBqS8ouGnEMGQfhMmuDNsZJNJO1alHgNCAOy8LHXJmKKOGiItI9AlJaX3vkkYynb17jBK5KJQu8g4YP//70sWZzitVEm02cGS6nw8dgCTkwZDq9cSC8h2kUpNm3TDsnn/oDhlJR8no/es2kkbZYLFwfWo2+zJfC7kjimG8UyK0d1QCJ8SEDw9ZmAP2WT6blRgnGqIiMfnX9O5r/5EPHAITL4cDLgHODKLKEvElbQY7goDqCKu/+Lj+QE7kny9z6002ly6dcJ4JVHEOsMwuSJUIZ6Ui3htDTBMd3OSrSzigq+O3gJT+L4lHx76FxW24BVhfBvHywEq/03lPINoXJYYFuhdil751atQnqOErQoDqCQjiPwHmcrAdHu/0vJF4Dk0oQ0iLDgZiHIhdo3IT4n2FPj2x3783oNN10h9xqqjUGl+bbRlPivWFGUAdV7zsoSPtBXiRkfllKWTu78fMRahbjqsCgOoJQM4ukJrsICuCoh7+BBN4NE0h0EWBqncxNwUso4B1ghd9iV4BZl9+TYATZ1jZJLT4BgFX28A5ZifX1N5lw6DMKX6so/rZ+F5NpVnH0UgppvjgKJF6SkQaH3tPXQAdyymy4li+G+u6umsQJvQuDHba8eI/Kvjd03eX/tkwhlphOIozPy4652jNk/l46A8OmAw0FLz7ViLnYlGdSqmAA7XHa+DZhxFRdwwO0dnix8MEvpdZUZYrQeOoBbxCwlQ2TZxlVwAe9NSa/c641jEShL7yvI0YS0O/N520LPzvTfbBskeW2D2mNb3v1QSq84eFe7d+o/UehtFU5Bp65z/k7ixSnpG449g2dR6kIBzlGiEt40lNIP6nuaBLn0VAif9TDEd7OEj/SgCyJZLAdgVy7Osfyx8v8X+wrSZqwodUFA0M/ZKXFgLIDLoCdo8h4+q0A7ne/AbWwC56cJ9w6Vw+gnCv0fiZd68PpalvDxHnQzSNZLuyfCb135CPjjUMJ7uNKF9u+5A6jKf9kVoHMjcOsYeG6lNOGzb40VgrxOukcq+N5k2H51d5KGXrRpC1i+Ok/INIIqjPl3PrkdbYdI3HOzOLc7Frz0bVdd7FpyKKHztnT2OFVEoA/a0E0pMdxtXMXZ8i6GA9jNcPxdJwhAmZAhJ87tIUMwCAz0Yd4Xz0GhkCWzhDcPpfTJPXeQ0K9rP+hVnQP4gH5OVC+gfRyCWl7KrvOc0YtT4jYk7QyjZ62zA4jwRZnOIpeOTNA+NHJt4wnZciWa3d/2aAm89mh5QjrHec8lb1HqfAF7euhiZa7s2sxQlPquSdq6utb0ySH4TZbwPjGUyku/KNOUuDvJP4XK4Du/JbHXCvKCeceP8C4u+gqgkF5DwCfu+YqE3D54cqSTCa/EkWsT0jl0eba81UtyjddJtfDOoZSvDLVBN+knCr2L9EqwKqpgmBtD5ctLWRER93t94vEZ+TXf8afez7yU8XCuSlylS3sB5IbI7EvrRVdIHyJwjAdxlOw7XxBSARempM9Xe4aqufS4CuzD2QQp42xBnAd2IKgq5vzRgeSWrsRjM/J0L9ppRHmhD4Huz1isyETf8UEcnpGfC9Xfhb7zFsCFW42+vjUAS+CsjOHRWqV0PjyW3wK+mJJPrqHigl0mCp1I4tUefM7NkjgQ6OulfVniMVXRUysO+k8l+OYK0rAIgltR6jwBzqWvYl3FGcqTgX24KkIrcEKe4Eo3u7/vHJO9qy8xJXPA2a/sAAAgAElEQVT3HMA8+5Vc+mniszwDvpYw/JqmlCz4ZsFqOnM9AALemjL83j0vZZVtnK+bYrwcVXktCxx6yDwP+Q9S4lkkrwx5CQKCYb6UpXxSyNhGOyE9kJO1BN0a8eyMXCChqB47SzST5kk0W4CFhDcOpeFAN/WknOzVPQcwjxSFdCF9AjWAU1PSZ+swQ5IpGHLX85QSeFaMqLui1MUC7ukySdY3NH22ypm3fPXbdRj7qgqww7vUui9ufyx4LEnDVVKOS46Fqnp9l/gUqJxu0wrQ9VPOcyy8ZyilTwyD61Ab+y+GA/g9AeeAh1g1AH2TgAjcn6S9QEEtL/2SkEKyxax6cCnYzUMtBCMCFybEPr7VfSTduhB8rrPGsyT8pscmKC90EogXOkzW97OEj3DoP29X75qBwgeylC4yB4vbcwdQSpYGvIur5BuyuaPsz0rJKwqRwI6b4P85KmGptIVgdRBd27VZ4n8DYVevVbx+/XGJIzLSJ6S1Pcbsu/C6K66U2CwGRoDhPVYlxOpk5lk+gmEVRinTVdVz+FZ9Y1c9hY9lKY92pgsgWAwHYICQd3aVWcCrUvIdrnSz+/tGARLYJjRt1ffLSODiNPHHH8xLWWSca5z5t7KEvpV3LNT59/JY6dVd6dRxKJJ2zoXvErjLAs9N9ApG3ghPEeHJ6r4nvXcApS4D4XyfH6sCry8S0QYA06HQ2PtqH2748a7tl1lCrzj76mt8GeBs839mCZ0d9ZRieSkrCbafq6IpcWeSXmjRc41lobl5iVeQeA6A20zrs8ZWRWmCE2MAzE4fe0J6AIWfueoO4CtZwsM86LyPLXrvACSb3B1clSyBI2NUlyklA8t01jvhhkui6a3OJ2iWkusk30KSZ2QJH+pqs2kvo5WeWulIvzpL6JuqbFuAnwBwLt3WrVgHy0EBcJccuG0JXLcC+JPvGUcnO05IB1D4ead+c/z+1SyhD06Gx1CTJM4vwuyRXN+DXPpNAuzjKrEdHJL0CzCpBgtIRIqSh7Be2i8RfIplfiNL6BxZZmpLYiEY7r1rjvx/soS3dZ2naU7nVwBqhPbOxOqrQp3tqnZg24R0EIUfOSsgfC5LebgzXQBBsANwHduzHkCUSsABSEBRoMgCHozPZqlf+fGAg8egLUBR6rd1bx2mP0Mp49R8cH0uY/bf8JE7BIJ7QVThE1nKZ8aUpROvnjsAw5vfUE7b0F9ql74S8LGU4aejufSUBPAJtbwpIV2X0JvYvqr5Z2Wt3ZrwkSyl7WE3aZ1WYJK2KtQuAuLUBPx5KOHdnIimdZ4o9RcfpOOU2GKxquTM0LWTYRcwjDc6sHBKlsZBm647b3M4gADNp426EJdcenYCfLimkNcRuH2Mq6HCPxHo6oScfoBUU/SZ3cwBQe4OSML7hlIe5zOopNsXgnNkn8UCpIl/7kNe+kVcxroG9LFVLJpcehKEL7jyC5ln17Gm+vd8BTA1cCG9noDV91tIhmsJ7Enycl8Fp9MV0u+s9JUHr/MThiPWFNLLJLzLdfwQ+K+Am4dzssS/7HleyuCxt3PUtcyScMwHxzGjd/eKu5iEeXvHUMpXRRdoAYbuDiDOAqEtkqT7lMAnCOw6yxGsFfC5BHhe6NXbdE+3AQzUKwhIwGdT+u3Bp9s+L/R+EMe6TjCJY1PyZFc6679e2icRfuNB++Ms4UEedG2SvNQoAFf8hmiRgL5yx6DLpaMhfMSVl4QTh9Lwojcu47o7ABfuNfvaQRWAvQtguxS4iKTPXfmCo+XSYxPgG5Oex+3+Q8ALU9Iw8IOaL2Q0pqfJOjpg0xuq9HaRXghKzMlLL9i1oIhHF/W62TcgG/G1KXliN2Wbzbv7DsDxgZ1P+VA2uXRO4hGYYvIQbcz4YKAKX8Takrj3CtIZaNJkL6TnSXDGmw/Zj1rdxUKw2APXdkWWhIO+uA4au79tbyU4VxoyMNOU9CmY462CnwMIfRu9xZ2HsIM8FQ7gvzzuwm3A6xPSGcJ8tqSWkFMIBhbpfJuQElv7woBNFHojide6mjwEHEPSToXgHFdP4A9pQp8zGlf1utrfeas39fwST89IH7g8b338HID3cItDWEqWmGElrn3aDxPyYT6E02nWSfdKhYs8+IxmycK1CBbimRf6KIhnOY9LPC0jT3Omm8zH9w2F/WGWhNvaR+aYNHmhzxi6jzNP4lEZ6R4/4DzQLQRL3gEYXLUAy0D00rUE/jsjJ88OAlouHQXBuYqPD2b+9AVRXup7AB7uKrqIhw6RZ7jSWf9ceiKELzrTCp/OUj7dma7PCHxtXhL3XUFaBGXPmtdL0TPpIgxUSrYU3cmTVRQk4vZLUeiDVsTTWQ7n4JCZ+6G89Mu9SDlf6HXn/V8AIk7fVDtynqdpBHkpu3VxDndPGafsnIvsS9oBFNJ7CHgF0FRGjAJDZrx8DwBBPMe38q+kVnXuUGOeN4nJ39K3Xt9EobeTcEYvjlkizOUl8Os7vyPMS7+PTsrwlHNXXWo8GK4s+6O/hWMmgMEze+tI4K4kLwnVSNJtC+EqH1lCbgDWS/dJBJ8l5VVZ4l+FeaE98ILrB+IJi1Xp2HmOF1AkL2V1G1wzKcuUWNGtDMX59PN+OZwN1kMCSfsI+KVP+a9pYl6QkM7ItnOp6bv/B3BzSqwi6VWtJpeeCeFjHqYPTT8+E8CDXccVsf8QafM2sK2q+uxT6fi6LOG2vVZ8yTkASQ8UYIdXQVV8iDZElEGIB7e8lNWs9wF6CAIC8S2UKeG9Q6l/Fea8lAGK1oHimmHblNiJpCFGDWzzxXwg8Ps0oTNYbKihlpQDKKQXEe2S26657zPsKOCilHQuMT0XLIth05XC5XIPiwWJ16fkG30nOfctgx4Aj+127jDT7CmxkuTNvvr2A503HiDwnSyh71W1t+pLwgFY5NmGQhR21++87JzDciWBnUMBQKf4FtJ7Abx4Q2SYcyuJfX2LdUgaKgSLXnQOPAq5jgrIPbg8S+hcr8HZqF0mKKQXSHDP2xA+mKV8QZfF24R9/ziAzrdLc9qmkI4j8FYXfIGFjCzgoyn57FgTUWqyUGXp7gCuqcAxDMLMuQWgDxk+voU+++xjLQbgGRA+4SwwEA2W22PsaCQThd5B4hWuDMk4oLfO47oS9EN/SVkJvJTA8QC2iijTDQS2Jen10s2WQ9KeAtrnCM4OQPhUlvIZvroV0issvdSVXsAlQwnv6ko31X+i0DtJvNyVXsL/DaV0pnMdp9v980JfBPFE53GIJ2eke/CU80AzCfpnBdBBkfZeGjhKwBMTYO/AE/65RrOl/170TLqZi+H0Mmi2AHDaBhBPykg7PPRq3pmHgdj0eSkLZT3EWWjGqbw0fdz10t5JiaNI3Ffm2IHrJZxTJvjkCvLXzjLWIMhLGd99a3Sd0SVk2+U61vT+feUAJO1SAs8ncOcSuDWBlYbHD8CuR2pDiPkYRMDxKfl2H9q5aMxhCbhu+oGkwypgTUrcjuRaH3mqxCMD5HBPYiKemZE+S/i2qHWQgOba7ZXEfVaQPrgFm5jIYOeKEoa9YDBqcz/jk5DghjfhZeN55twAWG8AtIVr+EnKNuqVJaz1tM1pHM/tuLfgknYVYFh5zhWDvAedSfi9hHT/ai0weCF9jsBTpnep7QCED2cpn+urWwAsNVLiLr4Vcqo7cDt4dP2w2LmDYQEaiEhQM+TnYhL/4NE1GP0oJQ7xjbOYzV/SnQrBB9HY4j2GY209a+i9sYvrRNXj7eBBJqQDU+CHXVjS15JVwG9T8t61Ok/rtJCK1a2EHaJl0/nW3QaELgd99+EA/p0l7FQ8dF5T+RYFBXBpltA5bmAuQVzBOEj8b0raIXJw80UDjlUU1UeB7jiAmpJUy+R/A9isJskMz+V+sL7JKP+0slGxYMemuBfSpwkcOZdOnVYBAv40lPDurvaY3t8XkRfAl7OE7gdY1eAThU4g8ToP2b+bJXQtXbbJMHY4XAhXzKoA1EmcG6vbFoOLC2q+B68QvGHfgwT2WKqFjjeDvpROr7lUizquMTPY6wTYPQba8IyvvGTFNK7UPMFInRyAJdGk5Dt9FbbtVCH8yYeeDIM+y0v5hQALbx9KaTc6QW1Cuh+FX7gyEfGwIdJWoUEtL/RJEM7pzPOtQhwW0t5yL+oKoJQs6sv56++tbUVYAr9Kgf27sefKpV8mwH3nk7HDNmA0JXbwRf+xMQvpVRLe5mOjkKo8IYFHMzAPfQSvaHy/wCRelJInBQzdJi1KnbchIM09f2Q65mOoEI70i+YAJN1GgC3/e9oEfDil/wHbQsJKeoDQuSjkfKuAGLDQvhV5QusABAYe3Zqk3Zh4takvZV7qywCca+uFrnxM6Ormxc59hl2VcMmBiL0qWEwHsJ/gVSfP1b5T/deVwGEZ6V63vcaIVd1Bu3rrmNFl8QBznF+sS4kdSVrasFdbL+2ZaDLwyLVtKH36hpQ8wZVuqr/31zciDmBeqkbp+TkgoRmO+rRe2j0RfIBb16bESDdWo3XmcjEdwLYCrqkjZGifEjg3Rfu659pQXvPRz3XtN1/fObcBwoeylM8PkS8vdBKIF/rwCMEdsPECAo+ilMOStG0hv+cpJbYnaYeH3q2QjpHwIQ8G52YJnQOHPMaZk2TRHIBJU0oWhLF5LGXm4LO6BJ4RA9NvIRknpAelwI9dDlVnbQMmUmLXkFTYdvDLZAmwjiuQOXS5rNr/e1+s5OVkzoPzXBJHZORnnelmEeTSIyB814NPvavPDmtv3wNAw4nMUrqDtnooOhfJojqAQvoCgSdF0mU6mzEB706AE7q9tJI0LMAiuEZc9Ji+CpDwnqGUL3Whn903lw6D4Bc6LJyUpXyR7/h2nlPI7zynOvS8zHfsKbpCeq0En9Tpb2UJHxM6vvfVa0DqdajMRr+oDqAKmLEvh/PByTzKXy3g/1LyHZOqeX/Qatu2kC4m4AXkUK0CLOtvl9DCI5O5/zrQZ0pD0o7NUJJ2KIR/1jbaLR2jBQDlpd+VcijmQqX/NtX2w/l9KojdNiP/4GG7KCTOAkcZdRoTSXsJ7btb3+tAq0BzBoHXkvx9bPkW4ldIHydwlO+Y7eQg4rkpWbdS8pxDrZf2SoTzfOSIgUQjafNC7ZLvbihMkQJgJFkMvt0ouRYjNfsHY/Hn0iMhfNvD/pbzYanXUbJPPcZf3BXAlMCS7lAAX086QynbKzMG4B8CvpcAp8YC7nA1XiFZ0lJovcDVluw0HxBk3TVMXugLoN9WKlY5qrzUTwE80MmOkVJgfWG4TNaUuA1JW4VubHXtPkUwUehEEq920n2ycxD2osd4m5As+gpgukSSti4BA+OwpCCLo7e74WvttiAFfhYDoTeG0WIgDreXjsDzUvKUEJkk/Vch/HXhXIp5q6Ha4eMdZ78AzvKwfQtwKISvO9D+szr4jBGC+yKrZegw9lTXy7KEO3jQzSDJSxny8n1c+diZxVDK17vSxezfVw4gpmLd4lWBjlrIaxo4RhTU4YlC77NINk9ZvpYlfLwn7SZkeaHPg3hyDX4TIh4xRJodg1teyhzPoc6MAisgt524tGUh2PWy8/NQ2eD7znJHJGgcgIMxJVnw0s8jZC6uJ3CH0LiEqt6AVT7yO0QlHp2RPnvXOa0mabOixKc7IOKMgu2rWavZENyq9F97AZ2RocjwFVguPQ7CVz0UsRRoQ5+6fjqt6/Zj03Frcqi6NQ6g5sxNSA9L0T7omZHiW5N8RrcqNuFTPrTTabzLjU0y+Xt1+1CEyjGbvnopXgLgftMAUa6H8JU0wdtuObep+bAuIGDIAWi1BbG6kd4tL3SKHeS6MqCloSfuaeiu43Tq3ziAThaaLHZ5VAJ8NBRuvBrqzIQ8uMawC3aRdOdC+DOAFTM61nynSByTkqeGyrEQvd0OALi9mRDAZSSj38v6hiADCKp+NKV3XupvAHZ0taOEdw6ldC6f5jpOp/6NA+hgoUI6kcD/RoqZuIZoH7qt7zQxnX4POfkHcHUV+XdTp3H6/fe8lO2h3cu3C5/JUs6J2VBXZ0k7FYJtwZxbSPVl58EWIFjWDqADqk9WVRh6UCSD277fwEeCo96qxJMLfFckJF6Tkm+OpNeisZG0RSHYFd7MVVAdiSKAkNpVsOR1FXxTVQh00R1wkAOoudqsMx191UfSXQWc7RlXP5cuKoHHxshErIJe7PT8QE+jjVfht97pt57jRifLpadA+JwP45S4M0mf6MWNw/kCoGw4G/lhltB91eKjaAeaIAfQBXkWnWUhvWaDUd7gc60zn/ACXpuSJ8ZQLqDgZ3v40Lp/MXSIxSNgGxQcgizJwn8t+tD5UNgKh6Tku2LZIYRP4wAq69l+rgR+QGCnEIPOphVwWko+LQbP6qGzgz+fjD8TYaxC/e05EEsM/afzqLIfbfm/hTNvITgFOZeeBbUPhp1bSeyxgrzImbALBMveAdg9cgmcROAY3z31AvPyjYT871jzlhf6FAhvZyLhhKGUtroZ+GbXshScg2jsgS+Jhw+RPwgxgncBFOBfKdsxINFvRHz0WdYOoIrnt2IgLR/jdaCJct03NcaE9GAKPwq4jbCTfyt6Goy93wVbTWNZ72QpIAbCcBcNgsw7BDno8FH4QJbSC7SlG3Zflg6gutc34Ez37LEas2Cgoxk5LzBoDRYzulQPnC0ZvePWSbwgJT/oOnZf9J/lEyr8PbtNsRgDtyZ8MUtZJ1x5Xr65dASE09wGnuwt4sFD5E98aLtBs2wcQFVQ9NUb6sNZ3PzW3TBmxfMnCRmjTPlGEfNCnwNnVhlykd8KfmbEbrEq4LiM3Y2+E9JDKWxcwtdbM1SSEE/JyC+EyOWLPWCJbVXJNwuM6ou25B2ApD0E2An8Q53z1R2nSMAnUvKZjmQLds+lp0EICxsmnpCRPvHqMVWJxisvdBqIIzwYWvbjdiHgKxX60eVez5Lw0SyNV3reQ/9NSJakA7AabaXBgQEG9dTNr/1Ggwo4IWXcAzZJ9y8Eq7brBDc2a5a/nyV8RIyHpR94GARbdf3mc24TbItCermF8frYoh+y/2bLvaQcgAGLCG1gyHv5TFA9mk1y6wvDMAipqDvXuFXZtCsEDDuVFZ/JzIJ+bOkfFPBSzy696ZVLT4fwSZ/RSDw/JX2QezcOV5S6SH7Pl5UgM/CR4DBwH93no1kyDkDSfapU3dqwVE57x7kteAOBB3QDiqyULEutXS15njoCHZ+DWGg/HQfqYYe8lN2EHOQxZF6Bn1jtBq+2XtonEfxKmAunZWmceBAv4echWhIOQFKrqjFwq5jGWYhXCfwiBR7cDY9eSl8BMAOoo1NNwTmWdhclxN6xC5/2yr7zrIruUJXfdgbfAHB6lvCxIfLnhT4Awqt2Q6z6gyHyz0Xr5QAifDmj6lFKBi4RLeCmg3D2Lr4p9n5/CsXY9pjEpnvMuqXFK9nzkrjPCtIShqI0K7yRA3txEnhjzYZCK78JBTRxFczCtCW8yZWu3Z94YkZa6TCv1gY7Eaxqk8+Z0hVV9mV07AUvZaYReTmA0EFj0/ewyOhlBB5B8o+xdTB+ufSoBLCKyXPOS92tQEysuQp34B0A7Os5fXtlD/PXU+J4kpYT39VWlf7+B4A7egy0urp+886+C0D+tS3cW4ZS+oCGeqjqRjLwDsBO/AVc6qa2c+9CwFtT8rXOlDUJJO0p4NedkktqbAXOTokD/Zf+t6zvJqQDKXwDwKoF1Fgj4rAY5bUXMlUuPQmC3/29cGqW0kK9vdtEobeS8ClhbtBfVvXpEu/BnQnrr9GXggPYv0rddTZTTYI/Eng4Sbv77UqTtLOA3wHoeIbRYStgJ833jnHqL2nHQriww8s/ZQ+7bdiH5J+6YqDJ2oOWnr2/D38RBwyRVnvCu+WFPgy2Eatd2y+yhAe4EvWq/1JwADsIXlVpOtn4PyXw3Iz8ZqeOIb9XV5d24l8b2HPeVUAknP0Kc8BqHbqAofwgS/jwEFvMR7te2iOZdEY+7R9V+e2g5JuJQm8j8SpnARa59Fcneb0cQP0FxsLDx+IT+QxgXMD/puT7Oxkv9Hc7WBPamP5buvLaxAlEWOZOyZBLh0P4jKNMttTdqRuFWvJCHwPhFWFJ4nUp6XdwOM0AufRYTG6HXJoh/9yOpFVN6svm5QD6TZNS+haARwXKtVrABxPgNb0o1STp9gKsJpzzy296Tt8KELgwIfYn6X3INWU7SasKwZby7ok2xOEZ6YXQM9/cVWW/LfHHp4r0+gr9KBj/QNKtKvy/O9R+ziKUfK89lmfHKA7AwjPHx8f3K4E7UcmolFy8atWt6h96BC4Fqqg5m2Sf+oKXlsDrMvLTnjZ0JrNqPgIuDgzxnQoQ+ndK7BvrjCIv9H4QxzorZVcXxEtS8r0+tPPRFNLrDMfAi2ek2oPTVkZPhvD5mrJY+vU9g6suVYONjo7eDWjzM/zDfw8PD/+S5NqasszbLcgBXCONbDZ+0+tJPReanVOv3xI4vtVqBQEv1FXQTqxT4IedTtErfhOWspsCryRpZZ161iTdU2hHk3U88KshlApg/yHynBp9O3ZZL+2XqI2F6BNoY5eXz4wZEm0BXoVgV39eCEhVLIRf5N481iqkV1exCAu9O9eVxCNWkOd2NHqHDqOjowciSd4FYc+ZXWWrvVPXr1v3+m222WaN7zjeDmB8fPx2pdov3G4LDC4QrxsZHo6Ch9dJSUm7CLDtQDuEdlazCqx/EHByAnykF4gssxc2lsZaFRepHa68kM4CPp6Sz+pklzq/W6BLLlxA4O7z9e+0UEuJe8SMkSik4yW8tY78s/sQOD9NuLcPbScaiwmwhCAC9lWe3iYMpDRN8HqSwVfTY2NrjxP07oVBYHRJnqYP3Wrzzb3G83IAkobGxtaeBWK/Tsay3wk9rdVqeQEo1OE/u4+kXS1Bh8DOANYJOMsKe5C82YdfDJpCegEBO1hMYvArgXMy0irvRGkThd5C4n8CmJ2bJdw3gH4GqaSV1dffD7SFODIjXQ8ya4tvNyUTwL03BG7tadGRAq6oCthatGBwWzM+figFi3Ct847+vjW80q5hnZ/vOsw3UWZ0fPwYCC5ZVVffPLxy51vPgKPq9D0JtmEUBjGkLKTPEDg8ikCTTC4nsKN/sM9MSaryWrYVcka4neIk4iFDpCXqRGmF9BIJ9vXzadekxJ18XgifwWLT2GpsbHyt3Q5tX5e3oFeuarWc05T9HMDYuMFTOaXcEjqy1Wp1zSPXNVQv+9lXTIDtz51s1UHG66uXP8rVksmYC+cT2NXbNhFgtqaPXcXd/93rJmIye/JNQylf563PIhOOjo4+HkwsIaxjuyU5XZeMtFp37Ugwq4OzA1i9evXWSZpZNVY3WuHUkZHhoHBMV+UWs39VSdjOSELAPGarsMa2NSSviaVbQITblAgGsnk3klfGkimg4o6JsLYq+mGQ4QPZRsfHT4LgDhyq8jYjIyNOeru9xABGR0d3AxMLW3VrwjdHRobda7i7jeLVO8Yyf/rAkesJTrFeS+CuJK/wUnIOolw6FMLXQ/jFxhyoTv7tCvl2PnJJeM9Qypf60PYLzejo+NdA9+xWQnu0Wi2negPODmB8fHyvUjjP1VgEvtNqDYcG67gO29P+krYrgZ/OcTocKsfNBHaPmVBiSVSFYOnC2/gKZyWuk8kcgGgglxOF3kDi9Z4yrauiEaOtRjzlCCIbGxv/toBHujIx/Ifh4eHzXegaB+BirQX65tLRCdqFIt0LVS4sg3359yQZVMd++hB2i1MIP91Qoy7kFsEwB/ZbQdr5QTsyMbSZA62i7fy2TQMQeVfHRo0DqGOlPulTJfNY7MG9uyCS7fkN0y9qJmJAUY2NKnbjoC0vdCqI53ja0RB/d4mRCek5fjSyxgFEM2V3GRXSWwi80jtybmHxriXagTVOhzqdNA4pajHFm8AfEmKvkOo6s+W02I1C7ZRov6tI4eNZGicoqpMNu/174wC6beFA/pLupcmw49sEspqP/J/Vl388Jv/10r7J5NLfJ7FmShRb+u+/gowaYpuXQQldRUrcPeYZSUy7u/LqOwcwfY+33A8Bc+kJCfDFWBF9sx+OEvjNhpyG+5GMih9n2YeF2ohDPpBaG8Uk45U6n2I6IT2Ek2Hls9ott9xTh1VznjUIn8xSHuX6ovVr/75zANMNtZwdgCQDHzH8O79kmQ5PnIBPpeQzYj+YllJbCj8VcI9A3gY39qCYzqnKQbjIrjg9ZbOce7sejXpO4ilLFLLGAUQxY3wmG5JAzk2AbiSYGL6HFe88JbbUlsdeYSZuVwNPcKHhDW7MriItNz9aC7z2s6i/Nw+lfE00gfqAUeMA+mASNlmMSisEWApmlGSeafztms9APKPuqY2/JawI+PP07EhvJ0A8KSO/FHNqDAuxOvjzTY22mH+LjPROh42pTyxejQOIZcmIfGyfWuENRONqL2eCNpLP9dGYTmOUS+ck2DRj09UJSHj/ipQvjnHXP13PvJSVcfOuWzjQJc8XmPDBdgDzRIUMeiRgFejzkUgvqkH8fzAl3eO9awpQSoZfN28lHAcn8KuUeGDsCki59BTLna+pzibd/Euexwpb8pW8M91gO4B59JvXAfT/fLQ1irgCGCXwSJI/7/wo+PUopI8QOHoh6pqVhq5P2Y5C9AKbmG98SSOFYJGNXvH+bb7E4zIyKI/Bz7rdp1peDqD79owygqREwMTCZwCbVA6ePfaZ1cu/LlyouT1nIZ1M4AV1+HdwAnlVzjpajv+UTEElviaZ/DRLeGAdHQexz1wOoOOTZQ9mkwvQ3enOpbNtz+4xyk1VCfHPetDWJimkUwg8tzbBLHTh6XQkjk3Jk1141e07UerP7Ws/v9WfIf3u0c0iJHX16Fa/ZgXQLcsG8pV02+pKzSXh54cbsuYOjQHZvZD4dZb98y7JqxLkG38XPpalXHAL4WvKavnvfWq/FK/9ZtuycQC+T0QEMM0AAAYvSURBVFcP6AwQMkG7QESnmPX/EHgcyV92W6wYkGPTtgNnpMQhMVN8p+tfRST6puv+PWU7OWqB+gd+y4puz5EL/8YBuFhrEfpa3TwBdoU1V/SaVRY6OSV9Ckk6a1NKVrrsMc6EcxAI+E+CdiHLG2Pwm4tHlYpsePadHOim5MQhGfm9bsnWL3wbB9AvM9FBDiudXU6CfRqe3rWywynStXyUt7YxvvzTBi8IHNCLOgl5qZ8BeICj4l/JEh7mSDOQ3RsHMJDT1luhJ6SDU+CMSKOqRPtarSfOy6PUd3TcwUh26wqbxgF0xaxLi2kpGWy01T0IbiXwnIyMFeTUUZ6q+vB3akYBWnEZw/jv6g1KR6F72KFxAD009iAOVcX4W7qwM6TbbH03xDa8OiXf0ms7SNqiEL4K4KAFxs5JHJ+S/9dr+XzGi3X82DgAH+svIxpJdxPwRyeV54gkEfD2Xh1WziWrpKwEXijBUHynF8GwMm5niDghVt1DJ1stcufGASzyBPT78JLuXpUW9xa1uqnwqgLsPeg8hBZlaQ4gn9zS3JwBl8SsfRBb3m7zaxxAty084Pw1mZpsdeC8tgAC3peSxw24GSKIH2vRHkGUaSwaBxDXnkuSWyn9E8AOs5Xr9Egv9rJ/SU5GZKUaBxDZoEuRXS4dlgBOAB0CXp+Sb1yK9oitUydHGnu86fwWzwHU0NoXExDgmSOtlQd303DLjXcp2VXaITX0NvyBVwzKaXoNfZZkl6nXb3Rs7EyAD3ZVst+zAcfLsth71apVBlF1S6vhdFwNsWT617BNKdlV2uMW0HmiBJ6ZkcuqMvOgPgOjo6N3AxMrvbfSVYe+dgCVMmsBnQvQ8uq734RxJLgMZfmzVqv1rdioNt1XoN4Ikg4ogPckwG4ADF/PrtEs4+4MAsd0C3KsnnSD1+u6665btdlmmx1qdiWT22nSpj1oGgK4j8/Lb8INggPogRHnHeIylTh21arh0xdTiGbs/rbAmjVjz2CCdwLctr8l3VS6xgF0njFBfPHIyMqTOncN6VFj7R7CfrnTdsm8o+Pjr4UwsIekjQOoEG4WvhxXCaUHjoxsftZyf48a/W+xwOrx8Uckgh2qesVW9IMtGwdQcxY21F4/d1VreN+a3ZtuZoGgr+4UcRCTrs7D6Nj4bwHs3tVBusy8cQAOBlaZ3nXVqltd4kAysF3797XrsklrKr5mzc27MCkMpXigW+MAXKZPfOLIyMovu5A0fZemBUZHR58IJlbwdaBbTxzA6OjobmBiddwHuhE6stVq9exuvObHaKBtOqjCj42NPV3gJ/tb/hrA4Cp3GxkZ+YOLHs4HHjfeeONWaTZ03SAflrQNpPKgkZGRH7sYq+m7NC0wNjZ2kMDo9Q96bC3lEyu33morNzxHZwdgSq0ZGzuXYDeq5PbKZmtvvGHltttvvxC6bK9E6Z9xlusqRdLw2Pj4vwCO9M9suElC4Det1vB93Kg8rzzGxsYOFwY3tFTQu1e1Wi9zNVbTf+laYM3Y2DsJvnxQNST01Far9XlX+b1WAAbgMD6+9psCHuU64OL351/Wr7tp32222ca7OMXi69BIENsCV199dWvzlcO/AHCvcN419uuzBnGnmMZAOH1kZPjQKgzGSXwvB2AjmMFWrhz+/GA5Af0uT9NHb7X55lGLXTpZvOnctxYYHx+/XVniqyDu27dCzhZMOP2mm8YP32677cZ8ZPZ2ADZYtRJ4cgkcR8DOBIL4+ShQj0aXEPjI8PDwSSQjFOasN2rTa/AsYIVLxtauPQrC8/s4MEgbisyeC+i9rVbrCz5f/qmZifbC3nCDtsyysTsmSbJZv0y7pFzSv0ZGRq7uF5kaOQbHAqtXr946SZLb99MzXZblzXneutL1tH8+q0dzAIMzrb2XdLmervfe0s2IrhZoHICrxZr+jQWWkAUaB7CEJrNRpbGAqwUaB+BqsaZ/Y4ElZIHGAQzKZDYHCV2aqSVu2A7qNQ6gS49Vw7axwCBYoHEAgzBLjYyNBbpkgcYBdMmwDdvGAoNggcYBDMIsNTI2FuiSBRoH0CXDNmwXssASP3gboMlvHMAATVYjah9ZYIn4sMYB9NEztakoS+Qp62sbL2/h/j9e9X+msbqjgQAAAABJRU5ErkJggg=="
                />
              </defs>
            </svg>
          </button>
        </div>
      </div>

      {/* Main Content - Responsive Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Session History */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Historique des sessions</CardTitle>
              <CardDescription>Appels</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableBody>
                    {sessionHistory.map((session) => (
                      <TableRow
                        key={session.id}
                        className="border-b hover:bg-gray-50"
                      >
                        <TableCell className="w-10">
                          {session.status === "en_cours" ? (
                            <span className="flex items-center">
                              <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">
                                En cours
                              </Badge>
                            </span>
                          ) : session.status === "repondue" ? (
                            <span className="inline-flex items-center">
                              <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                              <span className="text-sm text-green-600">
                                Répondue
                              </span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center">
                              <span className="h-2 w-2 rounded-full bg-red-500 mr-2"></span>
                              <span className="text-sm text-red-600">
                                Non répondue
                              </span>
                            </span>
                          )}
                        </TableCell>
                        <TableCell>
                          <div>
                            <h4 className="font-medium text-gray-800">
                              Nom du cours
                            </h4>
                            <p className="text-sm text-gray-500">
                              {session.courseName}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          <div>
                            <p className="font-medium">{session.time}</p>
                            <p className="text-sm text-gray-500">
                              {session.date}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          <span className="text-sm text-gray-500">
                            {session.type}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal size={16} />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Participation Rates */}
        <div>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <CardTitle>Taux de participation</CardTitle>
              <Badge variant="outline" className="text-xs">
                Ce semestre
              </Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              {participationData.map((course, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>{course.courseName}</span>
                    <span className="font-medium">{course.rate}%</span>
                  </div>
                  <Progress value={course.rate} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );

  return isMobile ? (
    <MobileCourseLayout title="Tableau de bord">
      {dashboardContent}
    </MobileCourseLayout>
  ) : (
    <GestionnaireDeCoursLayout>
      <div className="max-w-7xl mx-auto">{dashboardContent}</div>
    </GestionnaireDeCoursLayout>
  );
}
