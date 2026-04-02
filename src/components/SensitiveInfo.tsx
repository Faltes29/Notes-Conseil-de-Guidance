"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Lock, UserCog, CalendarDays, MessageSquareQuote } from "lucide-react";

const resourcePersons = [
  "Psychologue scolaire",
  "Infirmière scolaire",
  "Assistante sociale",
  "Directeur / Directrice",
  "Médecin scolaire",
  "Enseignant référent (ASH)",
  "CPE"
];

interface SensitiveInfoProps {
  values: {
    notes: string;
    follow_up: Array<{ person: string; reason: string }>;
  };
  onChange: (values: any) => void;
}

const SensitiveInfo = ({ values, onChange }: SensitiveInfoProps) => {
  const updateFollowUp = (index: number, field: string, value: string) => {
    const newFollowUp = [...values.follow_up];
    newFollowUp[index] = { ...newFollowUp[index], [field]: value };
    onChange({ ...values, follow_up: newFollowUp });
  };

  return (
    <Card className="border-none shadow-lg bg-rose-50/30 backdrop-blur-sm border-l-4 border-l-rose-500">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-rose-900 flex items-center gap-2">
          <Lock className="w-5 h-5 text-rose-600" />
          Informations Sensibles & Suivi
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-rose-800/70">
            <MessageSquareQuote className="w-4 h-4" />
            <Label className="font-semibold">Notes confidentielles</Label>
          </div>
          <Textarea 
            value={values.notes}
            onChange={(e) => onChange({ ...values, notes: e.target.value })}
            placeholder="Informations médicales, familiales ou sociales importantes (accès restreint)..." 
            className="min-h-[100px] bg-white border-rose-100 focus-visible:ring-rose-500 rounded-xl resize-none"
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2 text-rose-800/70">
            <UserCog className="w-4 h-4" />
            <Label className="font-semibold">Suivi Personnes Ressources</Label>
          </div>
          
          {values.follow_up.map((item, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-xl bg-white border border-rose-100 items-end">
              <div className="space-y-2">
                <Label className="text-xs font-bold text-rose-500 uppercase tracking-wider">Personne ressource {index + 1}</Label>
                <Select value={item.person} onValueChange={(val) => updateFollowUp(index, 'person', val)}>
                  <SelectTrigger className="rounded-xl border-rose-100 bg-rose-50/20">
                    <SelectValue placeholder="Sélectionner un intervenant" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    {resourcePersons.map((person) => (
                      <SelectItem key={person} value={person}>{person}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label className="text-xs font-bold text-rose-500 uppercase tracking-wider">Motif du rendez-vous</Label>
                <div className="relative">
                  <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-rose-400" />
                  <Input 
                    value={item.reason}
                    onChange={(e) => updateFollowUp(index, 'reason', e.target.value)}
                    placeholder="Ex: Bilan, suivi régulier..." 
                    className="pl-10 rounded-xl border-rose-100 bg-rose-50/20 focus-visible:ring-rose-500"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SensitiveInfo;