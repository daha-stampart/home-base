"use client";

import { useState } from "react";

type InspectionCheckboxProps = {
  title: string;
  description?: string;
  options: string[];
  value: string[];
  onChange: (value: string[]) => void;
  error?: string;
  className?: string;
};

export default function InspectionCheckbox({
  title,
  description,
  options,
  value,
  onChange,
  error,
  className,
}: InspectionCheckboxProps) {

//const [selected, setSelected] = useState<string[]>([]);
const hasBaik = value.includes("Baik");
const hasOplos = value.includes("Oplos");
const hasTidakAda = value.includes("Tidak Ada");

const hasDamage = value.some(
  (item) =>
  !["Baik", "Oplos", "Tidak Ada"].includes(item)
);

return (
 <div className={`space-y-1 ${className ?? ""}`}>
     <h3 className="mt-4 text-center text-lg font-bold text-blue-300">
         {title}
     </h3>

     {description && (
       <p className="mt-1 text-center text-sm italic text-white/60">
         {description}
       </p>
     )}

     {error && (
       <div className="mt-2 rounded-lg border border-red-500/40 bg-red-500/50 px-3 py-2">
         <p className="text-center text-sm font-semibold text-white">
           ⚠ {error}
         </p>
       </div>
      )}

     <div className="mt-8 mx-auto grid w-fit grid-cols-2 gap-x-25 gap-y-6">
            {options.map((option) => (

            <label
             key={option}
             className="flex items-center gap-2 text-white"
             >

             <input
               type="checkbox"
               checked={value.includes(option)}
               onChange={() => {
                 if (value.includes(option)) {
                   onChange(value.filter((item) => item !== option));
                   return;
                 }

                 if (option === "Baik") {
                   const hasOplos = value.includes("Oplos");

                   onChange(
                   hasOplos
                   ? ["Baik", "Oplos"]
                    : ["Baik"]
                    );

                   return;
                  }

                 if (option === "Tidak Ada") {
                   onChange(["Tidak Ada"]);
                   return;
                 }

                  onChange([
                   ...value.filter(
                   (item) => item !== "Baik" && item !== "Tidak Ada"
                   ),
                   option,
                 ]);
               }}
            
               disabled={
                 (hasTidakAda && option !== "Tidak Ada") ||

                 (hasBaik &&
                 option !== "Baik" &&
                 option !== "Oplos") ||

                 (hasDamage &&
                 (option === "Baik" || option === "Tidak Ada")) ||

                 (hasOplos &&
                 hasDamage &&
                 option === "Tidak Ada")
                }

               className="h-4 w-4 accent-red-500"
             />

             {option}

            </label>

            ))}

        </div>

    </div>
  );
}