import { Button } from "@/components/ui/button";
import { Building2, GraduationCap, Briefcase, User } from "lucide-react";
import Link from "next/link";

type Role = "admin" | "student" | "employee";
type RoleSelectionProps = {
  institutionType: "university" | "enterprise";
  onSelectRole: (role: Role) => void;
};

const RoleSelection = ({
  institutionType,
  onSelectRole,
}: RoleSelectionProps) => {
  const isUniversity = institutionType === "university";

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-2">Choose your role</h3>
        <p className="text-muted-foreground">
          Select how you want to use CheckMe
        </p>
      </div>

      <div className="flex flex-col space-y-4 px-5">
        <Link
          href="/admin/admin-registration"
          className="flex flex-col cursor-pointer items-center justify-center h-auto w-auto  py-6 px-6 border border-input bg-whitess hover:bg-brand-50 transition-all duration-200 hover:scale-[1.02] hover:shadow-md"
          onClick={() => onSelectRole("admin")}
        >
          <div className="w-16 h-16 rounded-full bg-brand-100 flex items-center justify-center mb-4">
            <svg
              style={{ width: "25px", height: "25px" }}
              viewBox="0 0 21 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
            >
              <rect
                x="0.142578"
                width="20"
                height="20"
                fill="url(#pattern0_3412_1242)"
              />
              <defs>
                <pattern
                  id="pattern0_3412_1242"
                  patternContentUnits="objectBoundingBox"
                  width="1"
                  height="1"
                >
                  <use xlinkHref="#image0_3412_1242" transform="scale(0.01)" />
                </pattern>
                <image
                  id="image0_3412_1242"
                  width="100"
                  height="100"
                  preserveAspectRatio="none"
                  xlinkHref="data:image/png;base64,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"
                />
              </defs>
            </svg>
          </div>
          <div className="text-center">
            <p className="text-base font-archivo-semibold text-gray-800">
              Administrator
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Manage {isUniversity ? "university" : "enterprise"} settings and
              users
            </p>
          </div>
        </Link>

        <Button
          variant="outline"
          className="flex flex-col items-center justify-center h-auto py-6 px-4 border border-input bg-white hover:bg-brand-50 transition-all duration-200 hover:scale-[1.02] hover:shadow-md"
          onClick={() => onSelectRole(isUniversity ? "student" : "employee")}
        >
          <div className="w-16 h-16 rounded-full bg-brand-100 flex items-center justify-center mb-4">
            {isUniversity ? (
              <svg
                style={{ width: "25px", height: "25px" }}
                viewBox="0 0 21 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
              >
                <rect
                  x="0.142578"
                  width="25"
                  height="25"
                  fill="url(#pattern0_3412_1248)"
                />
                <defs>
                  <pattern
                    id="pattern0_3412_1248"
                    patternContentUnits="objectBoundingBox"
                    width="1"
                    height="1"
                  >
                    <use
                      xlinkHref="#image0_3412_1248"
                      transform="scale(0.00416667)"
                    />
                  </pattern>
                  <image
                    id="image0_3412_1248"
                    width="240"
                    height="240"
                    preserveAspectRatio="none"
                    xlinkHref="data:image/png;base64,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"
                  />
                </defs>
              </svg>
            ) : (
              <Briefcase className="w-8 h-8 text-brand-500" />
            )}
          </div>
          <div className="text-center">
            <p className="text-base font-archivo-semibold text-gray-800">
              {isUniversity ? "Student" : "Employee"}
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              {isUniversity
                ? "Track your attendance and view reports"
                : "Mark your attendance and view schedules"}
            </p>
          </div>
        </Button>
      </div>
    </div>
  );
};

export default RoleSelection;
