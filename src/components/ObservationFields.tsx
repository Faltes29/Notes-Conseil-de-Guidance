"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { TrendingUp, AlertTriangle, Lightbulb } from "lucide-react";

const ObservationFields = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Forces */}
      <Card className="border-none shadow-lg bg-emerald-50/30 backdrop-blur-sm border-l-4 border-l-emerald-500">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold text-emerald-800 flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Forces
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea 
            placeholder="Points forts, réussites, talents..." 
            className="min-h-[120px] bg-white border-emerald-100 focus-visible:ring-emerald-500 rounded-xl resize-none"
          />
        </CardContent>
      </Card>

      {/* Freins */}
      <Card className="border-none shadow-lg bg-amber-50/30 backdrop-blur-sm border-l-4 border-l-amber-500">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold text-amber-800 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            Freins
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea 
            placeholder="Difficultés rencontrées, obstacles..." 
            className="min-h-[120px] bg-white border-amber-100 focus-visible:ring-amber-500 rounded-xl resize-none"
          />
        </CardContent>
      </Card>

      {/* Conseils */}
      <Card className="border-none shadow-lg bg-indigo-50/30 backdrop-blur-sm border-l-4 border-l-indigo-500">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold text-indigo-800 flex items-center gap-2">
            <Lightbulb className="w-5 h-5" />
            Conseils
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea 
            placeholder="Pistes d'amélioration, recommandations..." 
            className="min-h-[120px] bg-white border-indigo-100 focus-visible:ring-indigo-500 rounded-xl resize-none"
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default ObservationFields;