"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Settings as SettingsIcon, Save, ArrowLeft, MessageSquareQuote, Info, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { showSuccess } from "@/utils/toast";
import { MadeWithDyad } from "@/components/made-with-dyad";

const periods = ["Période 1", "Période 2", "Période 3"];
const cases = ["Cas 1", "Cas 2", "Cas 3"];

const variables = [
  { id: "{{prenom}}", label: "Prénom", color: "bg-blue-100 text-blue-700 border-blue-200" },
  { id: "{{echecs}}", label: "Échecs", color: "bg-red-100 text-red-700 border-red-200" },
  { id: "{{difficultes}}", label: "Difficultés", color: "bg-amber-100 text-amber-700 border-amber-200" },
  { id: "{{non_evalues}}", label: "Non-évalués", color: "bg-slate-100 text-slate-700 border-slate-200" },
  { id: "{{competences}}", label: "Compétences", color: "bg-emerald-100 text-emerald-700 border-emerald-200" },
  { id: "{{forces}}", label: "Forces", color: "bg-emerald-50 text-emerald-600 border-emerald-100" },
  { id: "{{freins}}", label: "Freins", color: "bg-rose-50 text-rose-600 border-rose-100" },
  { id: "{{conseils}}", label: "Conseils", color: "bg-indigo-50 text-indigo-600 border-indigo-100" },
  { id: "{{autonomie}}", label: "Autonomie", color: "bg-violet-50 text-violet-600 border-violet-100" },
];

const Settings = () => {
  const [activeField, setActiveField] = React.useState<string | null>(null);
  const textareasRef = React.useRef<Record<string, HTMLTextAreaElement | null>>({});

  const handleSave = () => {
    showSuccess("Les modèles de commentaires ont été enregistrés !");
  };

  const insertVariable = (variableId: string) => {
    if (!activeField) return;
    
    const textarea = textareasRef.current[activeField];
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const before = text.substring(0, start);
    const after = text.substring(end);

    textarea.value = before + variableId + after;
    textarea.focus();
    
    // Déplacer le curseur après la variable insérée
    const newPos = start + variableId.length;
    textarea.setSelectionRange(newPos, newPos);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <header className="space-y-4 mb-8">
          <Link to="/" className="text-violet-600 hover:text-violet-700 flex items-center gap-2 text-sm font-medium mb-2">
            <ArrowLeft className="w-4 h-4" />
            Retour à l'accueil
          </Link>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-violet-600 rounded-2xl shadow-lg shadow-violet-100">
              <SettingsIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Réglages</h1>
              <p className="text-slate-500">Configurez vos modèles de commentaires intelligents.</p>
            </div>
          </div>
        </header>

        <main className="space-y-8">
          {/* Guide des variables */}
          <Card className="border-none shadow-md bg-white/80 backdrop-blur-sm border-l-4 border-l-violet-500">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2 text-slate-800">
                <Sparkles className="w-5 h-5 text-violet-500" />
                Variables dynamiques
              </CardTitle>
              <CardDescription>
                Cliquez sur une variable pour l'insérer dans le dernier champ sélectionné. Elles seront remplacées par les données réelles lors de la génération.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {variables.map((v) => (
                  <Button
                    key={v.id}
                    variant="outline"
                    size="sm"
                    onClick={() => insertVariable(v.id)}
                    className={`rounded-xl border-2 transition-all hover:scale-105 ${v.color}`}
                  >
                    {v.label} <span className="ml-1 opacity-50 text-[10px]">{v.id}</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-xl bg-white/80 backdrop-blur-sm overflow-hidden">
            <CardHeader className="border-b border-slate-100 bg-white/50">
              <div className="flex items-center gap-2">
                <MessageSquareQuote className="w-5 h-5 text-violet-500" />
                <CardTitle>Modèles de commentaires</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {periods.map((period) => (
                  <div key={period} className="space-y-6">
                    <h3 className="font-bold text-lg text-slate-800 border-b pb-2 border-violet-100 flex items-center justify-between">
                      {period}
                      <Badge variant="secondary" className="text-[10px] bg-slate-100">Modèles</Badge>
                    </h3>
                    <div className="space-y-4">
                      {cases.map((cas) => {
                        const fieldId = `${period}-${cas}`;
                        return (
                          <div key={fieldId} className="space-y-2">
                            <Label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center justify-between">
                              {cas}
                              {activeField === fieldId && <span className="text-violet-500 animate-pulse">● Actif</span>}
                            </Label>
                            <Textarea 
                              ref={(el) => (textareasRef.current[fieldId] = el)}
                              onFocus={() => setActiveField(fieldId)}
                              placeholder={`Ex: {{prenom}} a rencontré des difficultés en {{difficultes}}...`}
                              className={`min-h-[150px] rounded-xl border-slate-200 focus-visible:ring-violet-500 bg-white resize-none transition-all ${activeField === fieldId ? 'ring-2 ring-violet-100 border-violet-300' : ''}`}
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <div className="flex items-center gap-2 text-slate-500 text-sm">
                  <Info className="w-4 h-4" />
                  <span>Les modifications sont enregistrées localement.</span>
                </div>
                <Button 
                  onClick={handleSave}
                  className="w-full sm:w-auto bg-violet-600 hover:bg-violet-700 text-white px-8 py-6 rounded-2xl text-lg font-bold shadow-lg shadow-violet-100 transition-all hover:scale-105"
                >
                  <Save className="w-5 h-5 mr-2" />
                  Enregistrer les modèles
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>

        <footer className="pt-12">
          <MadeWithDyad />
        </footer>
      </div>
    </div>
  );
};

export default Settings;