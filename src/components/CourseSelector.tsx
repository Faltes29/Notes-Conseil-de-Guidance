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
}

const CourseSelector = ({ degree }: CourseSelectorProps) => {
  const subjects = degreeData[degree as keyof typeof degreeData]?.subjects || [];
  
  const [courses, setCourses] = React.useState<Course[]>([]);

  // Réinitialiser les cours quand le degré change
  React.useEffect(() => {
    setCourses(subjects.map(name => ({ id: name, name, status: 'none' })));
  }, [degree]);

  const updateStatus = (id: string, status: Status) => {
    setCourses(prev => prev.map(c => 
      c.id === id ? { ...c, status: c.status === status ? 'none' : status } : c
    ));
  };

  const sortedCourses = [...courses].sort((a, b) => {
    const priority: Record<Status, number> = { 
      'failure': 1, 
      'difficulty': 2, 
      'not-evaluable': 3, 
      'none': 4 
    };
    return priority[a.status] - priority[b.status];
  });

  return (
    <Card className="border-none shadow-lg bg-white/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-slate-800 flex items-center gap-2">
          <CheckCircle2 className="text-violet-500" />
          Résultats par Matière
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        {sortedCourses.map((course) => (
          <div 
            key={course.id} 
            className={cn(
              "flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-xl bg-white border transition-all gap-3",
              course.status !== 'none' ? "border-violet-200 shadow-sm" : "border-slate-100 hover:shadow-md"
            )}
          >
            <span className={cn(
              "font-medium",
              course.status !== 'none' ? "text-violet-900" : "text-slate-700"
            )}>
              {course.name}
            </span>
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => updateStatus(course.id, 'failure')}
                className={cn(
                  "rounded-full text-xs transition-all text-red-600 border-red-200 hover:bg-red-50",
                  course.status === 'failure' && "bg-red-100 border-red-300 font-bold"
                )}
              >
                <XCircle className="w-3 h-3 mr-1" /> Échec
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => updateStatus(course.id, 'difficulty')}
                className={cn(
                  "rounded-full text-xs transition-all text-amber-600 border-amber-200 hover:bg-amber-50",
                  course.status === 'difficulty' && "bg-amber-100 border-amber-300 font-bold"
                )}
              >
                <AlertCircle className="w-3 h-3 mr-1" /> Difficulté
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => updateStatus(course.id, 'not-evaluable')}
                className={cn(
                  "rounded-full text-xs transition-all text-blue-600 border-blue-200 hover:bg-blue-50",
                  course.status === 'not-evaluable' && "bg-blue-100 border-blue-300 font-bold"
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