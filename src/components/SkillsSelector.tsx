"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { BrainCircuit } from "lucide-react";

const skillsList = [
  { id: 'autonomy', label: 'Autonomie et initiative' },
  { id: 'collaboration', label: 'Travail en équipe' },
  { id: 'communication', label: 'Communication orale et écrite' },
  { id: 'organization', label: 'Organisation et méthode' },
  { id: 'critical', label: 'Esprit critique' },
  { id: 'digital', label: 'Maîtrise des outils numériques' }
];

const SkillsSelector = () => {
  return (
    <Card className="border-none shadow-lg bg-white/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-slate-800 flex items-center gap-2">
          <BrainCircuit className="text-emerald-500" />
          Compétences Transversales
        </CardTitle>
      </CardHeader>
      <CardContent className="grid sm:grid-cols-2 gap-4">
        {skillsList.map((skill) => (
          <div key={skill.id} className="flex items-center space-x-3 p-3 rounded-xl bg-white border border-slate-100 transition-all hover:bg-emerald-50/30">
            <Checkbox id={skill.id} className="data-[state=checked]:bg-emerald-500 data-[state=checked]:border-emerald-500" />
            <Label 
              htmlFor={skill.id} 
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer text-slate-700"
            >
              {skill.label}
            </Label>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default SkillsSelector;