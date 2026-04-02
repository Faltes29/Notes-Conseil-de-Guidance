"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { UserCheck, Check, X, MessageSquareText } from "lucide-react";
import { cn } from "@/lib/utils";

const autonomousSkills = [
  "Gestion du temps",
  "Respect des consignes",
  "Organisation du matériel",
  "Persévérance face à la difficulté",
  "Capacité à demander de l'aide"
];

interface AutonomousWorkProps {
  values: Record<string, boolean | null>;
  notes: string;
  onChange: (values: Record<string, boolean | null>, notes: string) => void;
}

const AutonomousWork = ({ values, notes, onChange }: AutonomousWorkProps) => {
  const toggleSkill = (skill: string, value: boolean) => {
    const newValue = values[skill] === value ? null : value;
    onChange({ ...values, [skill]: newValue }, notes);
  };

  return (
    <Card className="border-none shadow-lg bg-white/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-slate-800 flex items-center gap-2">
          <UserCheck className="text-blue-500" />
          Travail Autonome
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-3">
          {autonomousSkills.map((skill) => (
            <div key={skill} className="flex items-center justify-between p-3 rounded-xl bg-white border border-slate-100 transition-all hover:shadow-sm">
              <span className="text-sm font-medium text-slate-700">{skill}</span>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => toggleSkill(skill, true)}
                  className={cn(
                    "rounded-full px-3 h-8 text-xs transition-all",
                    values[skill] === true 
                      ? "bg-emerald-100 text-emerald-700 border-emerald-200 hover:bg-emerald-200" 
                      : "hover:bg-slate-50"
                  )}
                >
                  <Check className="w-3 h-3 mr-1" /> Maîtrisé
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => toggleSkill(skill, false)}
                  className={cn(
                    "rounded-full px-3 h-8 text-xs transition-all",
                    values[skill] === false 
                      ? "bg-red-100 text-red-700 border-red-200 hover:bg-red-200" 
                      : "hover:bg-slate-50"
                  )}
                >
                  <X className="w-3 h-3 mr-1" /> Non maîtrisé
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2 text-slate-600">
            <MessageSquareText className="w-4 h-4" />
            <Label className="font-semibold">Notes complémentaires</Label>
          </div>
          <Textarea 
            value={notes}
            onChange={(e) => onChange(values, e.target.value)}
            placeholder="Observations spécifiques sur le comportement en autonomie..." 
            className="min-h-[100px] bg-white border-slate-200 focus-visible:ring-blue-500 rounded-xl resize-none"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default AutonomousWork;