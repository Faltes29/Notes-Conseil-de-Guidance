"use client";

import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { User, School, Users } from "lucide-react";

const classes = ["CP", "CE1", "CE2", "CM1", "CM2", "6ème", "5ème", "4ème", "3ème"];
const students = ["Alice Martin", "Lucas Bernard", "Emma Petit", "Thomas Richard", "Chloé Durand"];

const StudentHeader = () => {
  return (
    <Card className="border-none shadow-lg bg-white/80 backdrop-blur-md overflow-hidden">
      <div className="h-2 bg-indigo-500 w-full" />
      <CardContent className="p-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Classe */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-slate-600 mb-1">
            <School className="w-4 h-4" />
            <Label htmlFor="class-select" className="font-semibold">Classe</Label>
          </div>
          <Select>
            <SelectTrigger id="class-select" className="rounded-xl border-slate-200 bg-white focus:ring-indigo-500">
              <SelectValue placeholder="Choisir une classe" />
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
          <Select>
            <SelectTrigger id="student-select" className="rounded-xl border-slate-200 bg-white focus:ring-indigo-500">
              <SelectValue placeholder="Sélectionner l'élève" />
            </SelectTrigger>
            <SelectContent className="rounded-xl border-slate-200">
              {students.map((s) => (
                <SelectItem key={s} value={s.toLowerCase().replace(' ', '-')}>{s}</SelectItem>
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
          <RadioGroup defaultValue="f" className="flex gap-4 pt-2">
            <div className="flex items-center space-x-2 bg-slate-50 px-4 py-2 rounded-xl border border-slate-100 cursor-pointer hover:bg-indigo-50 transition-colors">
              <RadioGroupItem value="f" id="sex-f" className="text-indigo-600 border-slate-300" />
              <Label htmlFor="sex-f" className="cursor-pointer text-slate-700 font-medium">Fille</Label>
            </div>
            <div className="flex items-center space-x-2 bg-slate-50 px-4 py-2 rounded-xl border border-slate-100 cursor-pointer hover:bg-indigo-50 transition-colors">
              <RadioGroupItem value="m" id="sex-m" className="text-indigo-600 border-slate-300" />
              <Label htmlFor="sex-m" className="cursor-pointer text-slate-700 font-medium">Garçon</Label>
            </div>
          </RadioGroup>
        </div>
      </CardContent>
    </Card>
  );
};

export default StudentHeader;