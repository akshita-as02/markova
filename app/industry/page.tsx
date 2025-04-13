"use client";
import { useRouter } from "next/navigation";

const industries = ["Music", "Blockchain", "AI", "Gaming", "Healthcare", "Education"];

export default function IndustryPage() {
  const router = useRouter();
  const handleSelect = (industry: string) => {
    localStorage.setItem("industry", industry);
    router.push("/design-style");
  };

  return (
    <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
      <h2 className="col-span-2 text-lg font-bold mb-2">Select Industry</h2>
      {industries.map((item) => (
        <button key={item} className="btn" onClick={() => handleSelect(item)}>{item}</button>
      ))}
    </div>
  );
}
