import React from 'react';
import { Check } from 'lucide-react';

const B2CourseContent = () => {
  const courseTopics = [
    "Advanced connectors or sentence connectors",
    "-ed and -ing adjectives",
    "The verb 'to need'",
    "The verb 'to wish'",
    "Phrasal verbs",
    "Indefinite pronouns",
    "Active and passive voice",
    "Transitive and intransitive verbs",
    "Reported speech",
    "Relative clauses",
    "Direct and indirect speech"
  ];

  return (
    <div className="flex flex-col md:flex-row gap-8 p-6 max-w-6xl mx-auto">
      <div className="flex-1 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-emerald-600 mb-4">
          B2 · INTERMEDIO
        </h2>
        <ul className="space-y-3">
          {courseTopics.map((topic, index) => (
            <li key={index} className="flex items-start gap-3">
              <Check className="w-5 h-5 text-emerald-500 mt-1 flex-shrink-0" />
              <span className="text-gray-700">{topic}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex-1">
        <img
          src="/api/placeholder/600/400"
          alt="Students studying"
          className="rounded-lg w-full h-auto shadow-lg"
        />
      </div>
    </div>
  );
};

export default B2CourseContent;
