"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertCircle, HelpCircle, XCircle, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

export type Status = 'none' | 'failure' | 'difficulty' | 'not-evaluable';

interface Course {
  id: string;
  name: string;
  status: Status;
}

const coursesList = [
  "Mathématiques", "Français", "Histoire-Géographie", "Sciences", 
  "Anglais", "EPS", "Arts Plastiques", "Musique"
];

const CourseSelector = () => {
  const [courses, setCourses] = React.useState<Course[]>(
    coursesList.map(name => ({ id: name, name, status: 'none' }))
  );

  const updateStatus = (id: string, status: Status) => {
    setCourses(prev => prev.map(c => 
      c.id === id ? { ...c, status: c.status === status ? 'none' : status } : c
    ));
  };

  const getStatusIcon = (status: Status) => {
    switch (status) {
      case 'failure': return <XCircle className="w-4 h-4 mr-1" />;
      case 'difficulty': return <AlertCircle className="w-4 h-4 mr-1" />;
      case 'not-evaluable': return <HelpCircle className="w-4 h-4 mr-1" />;
      default: return null;
    }
  };

  return (
    <Card className="border-none shadow-lg bg-white/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-slate-800 flex items-center gap-2">
          <CheckCircle2 className="text-indigo-500" />
          Résultats par Matière
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        {courses.map((course) => (
          <div key={course.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-xl bg-white border border-slate-100 transition-all hover:shadow-md gap-3">
            <span className="font-medium text-slate-700">{course.name}</span>
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => updateStatus(course.id, 'failure')}
                className={cn(
                  "rounded-full text-xs transition-all",
                  course.status === 'failure' ? "bg-red-100 text-red-700 border-red-200 hover:bg-red-200" : "hover:bg-slate-50"
                )}
              >
                <XCircle className="w-3 h-3 mr-1" /> Échec
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => updateStatus(course.id, 'difficulty')}
                className={cn(
                  "rounded-full text-xs transition-all",
                  course.status === 'difficulty' ? "bg-amber-100 text-amber-700 border-amber-200 hover:bg-amber-200" : "hover:bg-slate-50"
                )}
              >
                <AlertCircle className="w-3 h-3 mr-1" /> Difficulté
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => updateStatus(course.id, 'not-evaluable')}
                className={cn(
                  "rounded-full text-xs transition-all",
                  course.status === 'not-evaluable' ? "bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200" : "hover:bg-slate-50"
                )}
              >
                <HelpCircle className="w-3 h-3 mr-1" /> Non éval.
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default CourseSelector;