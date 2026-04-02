"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, HelpCircle, XCircle, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { degreeData } from "@/data/students";

export type Status = 'none' | 'failure' | 'difficulty' | 'not-evaluable';

interface Course {
  id: string;
  name: string;
  status: Status;
}

interface CourseSelectorProps {
  degree: string;
  values: Record<string, Status>;
  onChange: (values: Record<string, Status>) => void;
}

const CourseSelector = ({ degree, values, onChange }: CourseSelectorProps) => {
  const subjects = degreeData[degree as keyof typeof degreeData]?.subjects || [];
  
  const updateStatus = (id: string, status: Status) => {
    const newStatus = values[id] === status ? 'none' : status;
    onChange({ ...values, [id]: newStatus });
  };

  return (
    <Card className="border-none shadow-lg bg-white/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-slate-800 flex items-center gap-2">
          <CheckCircle2 className="text-violet-500" />
          Résultats par Matière
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        {subjects.map((subject) => (
          <div 
            key={subject} 
            className={cn(
              "flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-xl bg-white border transition-all gap-3",
              values[subject] && values[subject] !== 'none' ? "border-violet-200 shadow-sm" : "border-slate-100 hover:shadow-md"
            )}
          >
            <span className={cn(
              "font-medium",
              values[subject] && values[subject] !== 'none' ? "text-violet-900" : "text-slate-700"
            )}>
              {subject}
            </span>
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => updateStatus(subject, 'failure')}
                className={cn(
                  "rounded-full text-xs transition-all text-red-600 border-red-200 hover:bg-red-50",
                  values[subject] === 'failure' && "bg-red-100 border-red-300 font-bold"
                )}
              >
                <XCircle className="w-3 h-3 mr-1" /> Échec
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => updateStatus(subject, 'difficulty')}
                className={cn(
                  "rounded-full text-xs transition-all text-amber-600 border-amber-200 hover:bg-amber-50",
                  values[subject] === 'difficulty' && "bg-amber-100 border-amber-300 font-bold"
                )}
              >
                <AlertCircle className="w-3 h-3 mr-1" /> Difficulté
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => updateStatus(subject, 'not-evaluable')}
                className={cn(
                  "rounded-full text-xs transition-all text-blue-600 border-blue-200 hover:bg-blue-50",
                  values[subject] === 'not-evaluable' && "bg-blue-100 border-blue-300 font-bold"
                )}
              >
                <HelpCircle className="w-3 h-3 mr-1" /> NE
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default CourseSelector;