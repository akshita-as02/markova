"use client";
import { useEffect, useState } from "react";

export default function ResultPage() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const brandingData = {
      ...JSON.parse(localStorage.getItem("brandingForm") || '{}'),
      industry: localStorage.getItem("industry"),
      style: localStorage.getItem("style"),
    };

    // Simulate result generation
    setTimeout(() => {
      setData({
        logo: `🎨 [Logo for ${brandingData.name} in ${brandingData.style} style]`,
        tagline: `Empowering ${brandingData.industry} innovation with ${brandingData.name}`,
        campaigns: [
          `Launch campaign for ${brandingData.name} on LinkedIn`,
          `Instagram reels showcasing ${brandingData.style} design`,
          `Email teaser with mission: ${brandingData.mission}`,
        ]
      });
    }, 1000);
  }, []);

  if (!data) return <p>Generating results...</p>;

  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Your Branding Results</h1>
      <p className="mb-2">{data.logo}</p>
      <p className="italic mb-4">{data.tagline}</p>
      <ul className="list-disc list-inside">
        {data.campaigns.map((item:any, idx:any) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
    </div>
  );
}