"use client";

import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { User, School, Users, CalendarDays } from "lucide-react";
import { studentsDatabase, classes, periods, Student } from "@/data/students";

interface StudentHeaderProps {
  selectedStudentId: string;
  onStudentChange: (id: string) => void;
}

const StudentHeader = ({ selectedStudentId, onStudentChange }: StudentHeaderProps) => {
  const currentStudent = studentsDatabase.find(s => s.id === selectedStudentId);

  return (
    <Card className="border-none shadow-lg bg-white/80 backdrop-blur-md overflow-hidden">
      <div className="h-2 bg-indigo-500 w-full" />
      <CardContent className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Période */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-slate-600 mb-1">
            <CalendarDays className="w-4 h-4" />
            <Label htmlFor="period-select" className="font-semibold">Période</Label>
          </div>
          <Select defaultValue="période 1">
            <SelectTrigger id="period-select" className="rounded-xl border-slate-200 bg-white focus:ring-indigo-500">
              <SelectValue placeholder="Choisir la période" />
            </SelectTrigger>
            <SelectContent className="rounded-xl border-slate-200">
              {periods.map((p) => (
                <SelectItem key={p} value={p.toLowerCase()}>{p}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Classe */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-slate-600 mb-1">
            <School className="w-4 h-4" />
            <Label htmlFor="class-select" className="font-semibold">Classe</Label>
          </div>
          <Select value={currentStudent?.className}>
            <SelectTrigger id="class-select" className="rounded-xl border-slate-200 bg-white focus:ring-indigo-500">
              <SelectValue placeholder="Classe de l'élève" />
            </SelectTrigger>
            <SelectContent className="rounded-xl border-slate-200">
              {classes.map((c) => (
                <SelectItem key={c} value={c.toLowerCase()}>{c}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Élève */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-slate-600 mb-1">
            <Users className="w-4 h-4" />
            <Label htmlFor="student-select" className="font-semibold">Élève</Label>
          </div>
          <Select value={selectedStudentId} onValueChange={onStudentChange}>
            <SelectTrigger id="student-select" className="rounded-xl border-slate-200 bg-white focus:ring-indigo-500">
              <SelectValue placeholder="Sélectionner l'élève" />
            </SelectTrigger>
            <SelectContent className="rounded-xl border-slate-200">
              {studentsDatabase.map((s) => (
                <SelectItem key={s.id} value={s.id}>{s.firstName} {s.lastName}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Sexe */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-slate-600 mb-1">
            <User className="w-4 h-4" />
            <Label className="font-semibold">Sexe</Label>
          </div>
          <RadioGroup value={currentStudent?.gender} className="flex gap-3 pt-1">
            <div className="flex items-center space-x-2 bg-slate-50 px-3 py-2 rounded-xl border border-slate-100 cursor-pointer hover:bg-indigo-50 transition-colors flex-1">
              <RadioGroupItem value="f" id="sex-f" className="text-indigo-600 border-slate-300" />
              <Label htmlFor="sex-f" className="cursor-pointer text-slate-700 font-medium text-sm">Fille</Label>
            </div>
            <div className="flex items-center space-x-2 bg-slate-50 px-3 py-2 rounded-xl border border-slate-100 cursor-pointer hover:bg-indigo-50 transition-colors flex-1">
              <RadioGroupItem value="m" id="sex-m" className="text-indigo-600 border-slate-300" />
              <Label htmlFor="sex-m" className="cursor-pointer text-slate-700 font-medium text-sm">Garçon</Label>
            </div>
          </RadioGroup>
        </div>
      </CardContent>
    </Card>
  );
};

export default StudentHeader;