"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CheckCircle2, AlertCircle, BellRing, BookOpenText, LayoutList, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const situations = [
  {
    id: "well",
    label: "Tout va bien",
    case: "Cas 1",
    icon: CheckCircle2,
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
    borderColor: "border-emerald-200",
  },
  {
    id: "difficulties",
    label: "Des échecs et difficultés",
    case: "Cas 2",
    icon: AlertCircle,
    color: "text-amber-600",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-200",
  },
  {
    id: "alarm",
    label: "Sonnette d'alarme",
    case: "Cas 3",
    icon: BellRing,
    color: "text-rose-600",
    bgColor: "bg-rose-50",
    borderColor: "border-rose-200",
  }
];

interface StudentSituationProps {
  student: any;
  period: string;
  comment: string;
  onCommentChange: (val: string) => void;
  situation: string;
  onSituationChange: (val: string) => void;
}

const StudentSituation = ({ 
  student, 
  period, 
  comment, 
  onCommentChange,
  situation,
  onSituationChange
}: StudentSituationProps) => {

  const loadTemplate = () => {
    const savedTemplates = localStorage.getItem('comment_templates');
    if (!savedTemplates) return;

    const templates = JSON.parse(savedTemplates);
    const sit = situations.find(s => s.id === situation);
    if (!sit) return;

    // Formater la période pour correspondre aux clés (ex: "Période 1")
    const periodKey = period.charAt(0).toUpperCase() + period.slice(1);
    const templateKey = `${periodKey}-${sit.case}`;
    const template = templates[templateKey] || "";

    if (template) {
      // Remplacement des variables
      const replacements: Record<string, string> = {
        "{{prenom}}": student?.firstName || "",
        "{{sexe}}": student?.gender === 'f' ? "Elle" : "Il",
      };

      let processedTemplate = template;
      Object.entries(replacements).forEach(([key, val]) => {
        processedTemplate = processedTemplate.replaceAll(key, val);
      });

      onCommentChange(processedTemplate);
    }
  };

  // Charger le template quand la période ou la situation change
  React.useEffect(() => {
    if (period && situation) {
      loadTemplate();
    }
  }, [period, situation]);

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
            value={situation} 
            onValueChange={onSituationChange}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            {situations.map((sit) => (
              <div 
                key={sit.id}
                onClick={() => onSituationChange(sit.id)}
                className={cn(
                  "relative flex flex-col items-center justify-center p-6 rounded-2xl border-2 cursor-pointer transition-all hover:scale-[1.02]",
                  situation === sit.id 
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
                    situation === sit.id ? sit.color : "text-slate-600"
                  )}
                >
                  {sit.label}
                </Label>
                {situation === sit.id && (
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
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl font-semibold text-slate-800 flex items-center gap-2">
            <BookOpenText className="text-blue-500" />
            Commentaire du carnet de progression
          </CardTitle>
          <div className="flex items-center gap-1 text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-lg">
            <Sparkles className="w-3 h-3" />
            Généré automatiquement
          </div>
        </CardHeader>
        <CardContent>
          <Textarea 
            value={comment}
            onChange={(e) => onCommentChange(e.target.value)}
            placeholder="Saisissez ici le commentaire qui apparaîtra dans le carnet de progression..." 
            className="min-h-[150px] bg-white border-slate-200 focus-visible:ring-blue-500 rounded-2xl resize-none p-4 text-slate-700 leading-relaxed"
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentSituation;