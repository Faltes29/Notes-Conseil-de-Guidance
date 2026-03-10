"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { LifeBuoy, AlertCircle, Info } from "lucide-react";

const coursesList = [
  "Mathématiques", "Français", "Histoire-Géographie", "Sciences", 
  "Anglais", "EPS", "Arts Plastiques", "Musique"
];

const RemediationSection = () => {
  return (
    <Card className="border-none shadow-lg bg-white/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-slate-800 flex items-center gap-2">
          <LifeBuoy className="text-orange-500" />
          Remédiation
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {[1, 2, 3].map((row) => (
          <div key={row} className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-xl bg-white border border-slate-100 items-center">
            <div className="space-y-2">
              <Label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Matière {row}</Label>
              <Select>
                <SelectTrigger className="rounded-xl border-slate-200 bg-slate-50/50">
                  <SelectValue placeholder="Sélectionner une matière" />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  {coursesList.map((course) => (
                    <SelectItem key={course} value={course.toLowerCase()}>{course}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Statut de la remédiation</Label>
              <RadioGroup defaultValue="conseillee" className="flex gap-4 pt-1">
                <div className="flex items-center space-x-2 bg-orange-50/50 px-3 py-2 rounded-lg border border-orange-100 cursor-pointer hover:bg-orange-50 transition-colors flex-1">
                  <RadioGroupItem value="obligatoire" id={`row-${row}-obli`} className="text-orange-600 border-orange-300" />
                  <Label htmlFor={`row-${row}-obli`} className="cursor-pointer text-orange-800 text-sm font-medium flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> Obligatoire
                  </Label>
                </div>
                <div className="flex items-center space-x-2 bg-blue-50/50 px-3 py-2 rounded-lg border border-blue-100 cursor-pointer hover:bg-blue-50 transition-colors flex-1">
                  <RadioGroupItem value="conseillee" id={`row-${row}-cons`} className="text-blue-600 border-blue-300" />
                  <Label htmlFor={`row-${row}-cons`} className="cursor-pointer text-blue-800 text-sm font-medium flex items-center gap-1">
                    <Info className="w-3 h-3" /> Conseillée
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default RemediationSection;