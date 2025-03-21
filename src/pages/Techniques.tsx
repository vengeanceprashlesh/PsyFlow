import React from 'react';
import Layout from '@/components/layout/Layout';
import PsychologyTechniques from '@/components/techniques/PsychologyTechniques';

const TechniquesPage = () => {
  return (
    <Layout>
      <div className="flex flex-col">
        <h1 className="heading-lg mb-4">Psychology Techniques</h1>
        <p className="paragraph mb-6">
          Explore evidence-based psychology techniques to build resilience, manage stress, and improve your mental wellbeing.
        </p>
        <PsychologyTechniques />
      </div>
    </Layout>
  );
};

export default TechniquesPage; 