"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  CheckCircle2, 
  AlertCircle, 
  BellRing, 
  BookOpen, 
  BrainCircuit, 
  UserCheck, 
  TrendingUp, 
  AlertTriangle, 
  Lightbulb,
  LifeBuoy,
  Lock
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ReportDetailsCardProps {
  report: any;
}

const ReportDetailsCard = ({ report }: ReportDetailsCardProps) => {
  const { 
    student_name, 
    class_name, 
    period, 
    course_results = {}, 
    transversal_skills = [], 
    autonomous_work = {}, 
    observations = {},
    remediation = [],
    sensitive_info = {}
  } = report;

  const hasResults = Object.values(course_results).some(v => v !== 'none');
  const hasSkills = transversal_skills.length > 0;
  const hasAutonomous = Object.values(autonomous_work).some(v => v !== null && v !== '');
  const hasRemediation = remediation.length > 0;
  
  const getSituationIcon = (situation: string) => {
    switch (situation) {
      case 'well': return <CheckCircle2 className="w-5 h-5 text-emerald-500" />;
      case 'difficulties': return <AlertCircle className="w-5 h-5 text-amber-500" />;
      case 'alarm': return <BellRing className="w-5 h-5 text-rose-500" />;
      default: return null;
    }
  };

  const getSituationLabel = (situation: string) => {
    switch (situation) {
      case 'well': return 'Tout va bien';
      case 'difficulties': return 'Difficultés';
      case 'alarm': return "Sonnette d'alarme";
      default: return '';
    }
  };

  return (
    <div className="space-y-6 py-4">
      {/* Header Info */}
      <div className="flex items-center justify-between bg-slate-50 p-4 rounded-2xl border border-slate-100">
        <div>
          <h3 className="text-xl font-bold text-slate-900">{student_name}</h3>
          <p className="text-sm text-slate-500">{class_name} • {period}</p>
        </div>
        {observations.situation && (
          <div className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-xl border border-slate-200 shadow-sm">
            {getSituationIcon(observations.situation)}
            <span className="text-sm font-semibold text-slate-700">{getSituationLabel(observations.situation)}</span>
          </div>
        )}
      </div>

      {/* Progression Comment */}
      {observations.progression_comment && (
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-blue-600 font-semibold text-sm">
            <BookOpen className="w-4 h-4" />
            Commentaire du carnet
          </div>
          <p className="text-slate-700 bg-blue-50/30 p-4 rounded-xl border border-blue-100 italic leading-relaxed">
            "{observations.progression_comment}"
          </p>
        </div>
      )}

      {/* Results & Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Results */}
        {hasResults && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-violet-600 font-semibold text-sm">
              <CheckCircle2 className="w-4 h-4" />
              Résultats par matière
            </div>
            <div className="flex flex-wrap gap-2">
              {Object.entries(course_results).map(([subject, status]: [string, any]) => (
                status !== 'none' && (
                  <Badge key={subject} variant="outline" className={cn(
                    "rounded-lg px-2 py-1",
                    status === 'failure' ? "bg-red-50 text-red-700 border-red-200" : 
                    status === 'difficulty' ? "bg-amber-50 text-amber-700 border-amber-200" : 
                    "bg-slate-50 text-slate-700 border-slate-200"
                  )}>
                    {subject}: {status === 'failure' ? 'Échec' : status === 'difficulty' ? 'Diff.' : 'Non éval.'}
                  </Badge>
                )
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {hasSkills && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-emerald-600 font-semibold text-sm">
              <BrainCircuit className="w-4 h-4" />
              Compétences transversales
            </div>
            <div className="flex flex-wrap gap-2">
              {transversal_skills.map((skill: string) => (
                <Badge key={skill} variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 rounded-lg">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Observations (Forces, Freins, Conseils) */}
      {(observations.forces || observations.freins || observations.conseils) && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {observations.forces && (
            <div className="p-3 rounded-xl bg-emerald-50/50 border border-emerald-100">
              <div className="flex items-center gap-2 text-emerald-700 font-bold text-xs uppercase mb-2">
                <TrendingUp className="w-3 h-3" /> Forces
              </div>
              <p className="text-sm text-slate-700">{observations.forces}</p>
            </div>
          )}
          {observations.freins && (
            <div className="p-3 rounded-xl bg-amber-50/50 border border-amber-100">
              <div className="flex items-center gap-2 text-amber-700 font-bold text-xs uppercase mb-2">
                <AlertTriangle className="w-3 h-3" /> Freins
              </div>
              <p className="text-sm text-slate-700">{observations.freins}</p>
            </div>
          )}
          {observations.conseils && (
            <div className="p-3 rounded-xl bg-indigo-50/50 border border-indigo-100">
              <div className="flex items-center gap-2 text-indigo-700 font-bold text-xs uppercase mb-2">
                <Lightbulb className="w-3 h-3" /> Conseils
              </div>
              <p className="text-sm text-slate-700">{observations.conseils}</p>
            </div>
          )}
        </div>
      )}

      {/* Autonomous Work */}
      {hasAutonomous && (
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-blue-600 font-semibold text-sm">
            <UserCheck className="w-4 h-4" />
            Travail Autonome
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {Object.entries(autonomous_work).map(([skill, value]: [string, any]) => (
              value !== null && skill !== 'notes' && (
                <div key={skill} className="flex items-center justify-between p-2 rounded-lg bg-white border border-slate-100 text-xs">
                  <span className="text-slate-600">{skill}</span>
                  <Badge variant="outline" className={cn(
                    "text-[10px] px-1.5 py-0",
                    value === true ? "bg-emerald-50 text-emerald-700 border-emerald-100" : "bg-red-50 text-red-700 border-red-100"
                  )}>
                    {value === true ? 'Maîtrisé' : 'Non maîtrisé'}
                  </Badge>
                </div>
              )
            ))}
          </div>
          {autonomous_work.notes && (
            <p className="text-xs text-slate-500 italic px-2">Note: {autonomous_work.notes}</p>
          )}
        </div>
      )}

      {/* Remediation */}
      {hasRemediation && (
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-orange-600 font-semibold text-sm">
            <LifeBuoy className="w-4 h-4" />
            Remédiation
          </div>
          <div className="flex flex-wrap gap-2">
            {remediation.map((rem: any, idx: number) => (
              <Badge key={idx} variant="outline" className={cn(
                "rounded-lg",
                rem.status === 'obligatoire' ? "bg-orange-50 text-orange-700 border-orange-200" : "bg-blue-50 text-blue-700 border-blue-200"
              )}>
                {rem.subject} ({rem.status})
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Sensitive Info */}
      {(sensitive_info.notes || (sensitive_info.follow_up && sensitive_info.follow_up.length > 0)) && (
        <div className="p-4 rounded-2xl bg-rose-50/50 border border-rose-100 space-y-3">
          <div className="flex items-center gap-2 text-rose-700 font-bold text-sm">
            <Lock className="w-4 h-4" />
            Informations Sensibles
          </div>
          {sensitive_info.notes && <p className="text-sm text-slate-700">{sensitive_info.notes}</p>}
          {sensitive_info.follow_up && sensitive_info.follow_up.map((f: any, idx: number) => (
            <div key={idx} className="text-xs text-rose-600 font-medium">
              • {f.person} : {f.reason}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReportDetailsCard;