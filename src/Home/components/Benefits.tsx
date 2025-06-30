// src/components/Benefits.tsx
import React from 'react';
import '../Styling/Benefits.scss';
import { Zap, Target, Users } from 'lucide-react';

const benefits = [
  {
    title: 'AI-Powered Enhancement',
    description:
      'Our AI analyzes your content and suggests powerful improvements that make your achievements shine brighter and your pitch more compelling.',
    icon: <Zap className="benefits__icon" />,
    bg: 'blue-indigo',
  },
  {
    title: 'Industry-Specific Templates',
    description:
      'Choose from professionally designed templates optimized for your industry. Each template highlights what matters most to your target employers.',
    icon: <Target className="benefits__icon" />,
    bg: 'indigo-purple',
  },
  {
    title: 'Personal Pitch Coach',
    description:
      'Get personalized advice on how to present your career story, handle career changes, and position yourself as the ideal candidate for any role.',
    icon: <Users className="benefits__icon" />,
    bg: 'purple-pink',
  },
];

const Benefits = () => {
  return (
    <section className="benefits">
      <div className="benefits__container">
        <div className="benefits__header">
          <h2>Why Your Pitch Matters More Than Ever</h2>
          <p>
            In today's competitive job market, having great skills isn't enough. 
            You need to pitch yourself effectively to stand out and land your dream role.
          </p>
        </div>

        <div className="benefits__grid">
          {benefits.map((benefit, index) => (
            <div className="benefits__card" key={index}>
              <div className={`benefits__icon-wrap ${benefit.bg}`}>
                {benefit.icon}
              </div>
              <h3>{benefit.title}</h3>
              <p>{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
