import React, { useState } from 'react';
import './IndustrySelect.css';

interface Industry {
  id: string;
  name: string;
}

const industries: Industry[] = [
  { id: 'ai', name: 'AI' },
  { id: 'gaming', name: 'Gaming' },
  { id: 'blockchain', name: 'Blockchain' },
  { id: 'healthcare', name: 'Healthcare' },
  { id: 'art', name: 'Art' },
  { id: 'music', name: 'Music' },
];

const IndustrySelect: React.FC = () => {
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);

  const toggleIndustry = (industryId: string) => {
    setSelectedIndustries(prev => {
      if (prev.includes(industryId)) {
        return prev.filter(id => id !== industryId);
      }
      if (prev.length < 3) {
        return [...prev, industryId];
      }
      return prev;
    });
  };

  const handleNext = () => {
    // Handle next step logic here
    console.log('Selected industries:', selectedIndustries);
  };

  return (
    <div className="industry-select">
      <div className="industry-select-content">
        <h1 className="industry-select-title">What is your industry?</h1>
        <p className="industry-select-subtitle">
          Select up to 3 options that describe your brand's industry most closely
        </p>
        
        <div className="industry-grid">
          {industries.map((industry) => (
            <button
              key={industry.id}
              className={`industry-option ${
                selectedIndustries.includes(industry.id) ? 'selected' : ''
              }`}
              onClick={() => toggleIndustry(industry.id)}
            >
              <span className="checkbox">
                {selectedIndustries.includes(industry.id) && '✓'}
              </span>
              {industry.name}
            </button>
          ))}
        </div>

        <div className="navigation-buttons">
          <button className="btn btn-secondary">Back</button>
          <button 
            className="btn btn-primary"
            disabled={selectedIndustries.length === 0}
            onClick={handleNext}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default IndustrySelect; 