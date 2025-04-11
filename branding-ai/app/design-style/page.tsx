"use client";
import { useRouter } from "next/navigation";

const styles = ["Retro", "Futuristic", "Minimal", "Artistic"];

export default function StylePage() {
  const router = useRouter();
  const handleSelect = (style: string) => {
    localStorage.setItem("style", style);
    router.push("/result");
  };

  return (
    <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
      <h2 className="col-span-2 text-lg font-bold mb-2">Select Design Style</h2>
      {styles.map((item) => (
        <button key={item} className="btn" onClick={() => handleSelect(item)}>{item}</button>
      ))}
    </div>
  );
}