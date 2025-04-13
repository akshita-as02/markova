"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function HomePage() {
  const [form, setForm] = useState({ name: "", mission: "", vision: "" });
  const router = useRouter();

  const handleChange = (e:any) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleNext = () => {
    localStorage.setItem("brandingForm", JSON.stringify(form));
    router.push("/industry");
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h1 className="text-xl font-bold mb-4">Enter Company Details</h1>
      <input name="name" placeholder="Company Name" className="input" onChange={handleChange} />
      <input name="mission" placeholder="Mission" className="input mt-2" onChange={handleChange} />
      <input name="vision" placeholder="Vision" className="input mt-2" onChange={handleChange} />
      <button onClick={handleNext} className="btn mt-4">Next</button>
    </div>
  );
}
