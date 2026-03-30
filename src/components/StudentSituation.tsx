"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CheckCircle2, AlertCircle, BellRing, BookOpenText, LayoutList } from "lucide-react";
import { cn } from "@/lib/utils";

const situations = [
  {
    id: "well",
    label: "Tout va bien",
    icon: CheckCircle2,
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
    borderColor: "border-emerald-200",
    ringColor: "text-emerald-600"
  },
  {
    id: "difficulties",
    label: "Des échecs et difficultés",
    icon: AlertCircle,
    color: "text-amber-600",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-200",
    ringColor: "text-amber-600"
  },
  {
    id: "alarm",
    label: "Sonnette d'alarme",
    icon: BellRing,
    color: "text-rose-600",
    bgColor: "bg-rose-50",
    borderColor: "border-rose-200",
    ringColor: "text-rose-600"
  }
];

const StudentSituation = () => {
  const [selectedSituation, setSelectedSituation] = React.useState("well");

  return (
    <div className="space-y-8">
      {/* Situation de l'élève */}
      <Card className="border-none shadow-lg bg-white/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-slate-800 flex items-center gap-2">
            <LayoutList className="text-indigo-500" />
            Situation de l'élève
          </CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup 
            value={selectedSituation} 
            onValueChange={setSelectedSituation}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            {situations.map((sit) => (
              <div 
                key={sit.id}
                onClick={() => setSelectedSituation(sit.id)}
                className={cn(
                  "relative flex flex-col items-center justify-center p-6 rounded-2xl border-2 cursor-pointer transition-all hover:scale-[1.02]",
                  selectedSituation === sit.id 
                    ? cn(sit.bgColor, sit.borderColor, "shadow-md") 
                    : "bg-white border-slate-100 hover:border-slate-200"
                )}
              >
                <RadioGroupItem value={sit.id} id={sit.id} className="sr-only" />
                <sit.icon className={cn("w-8 h-8 mb-3", sit.color)} />
                <Label 
                  htmlFor={sit.id} 
                  className={cn(
                    "font-bold text-center cursor-pointer",
                    selectedSituation === sit.id ? sit.color : "text-slate-600"
                  )}
                >
                  {sit.label}
                </Label>
                {selectedSituation === sit.id && (
                  <div className={cn("absolute top-3 right-3", sit.color)}>
                    <CheckCircle2 className="w-5 h-5 fill-current text-white" />
                  </div>
                )}
              </div>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Commentaire du carnet de progression */}
      <Card className="border-none shadow-lg bg-white/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-slate-800 flex items-center gap-2">
            <BookOpenText className="text-blue-500" />
            Commentaire du carnet de progression
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea 
            placeholder="Saisissez ici le commentaire qui apparaîtra dans le carnet de progression..." 
            className="min-h-[150px] bg-white border-slate-200 focus-visible:ring-blue-500 rounded-2xl resize-none p-4 text-slate-700 leading-relaxed"
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentSituation;