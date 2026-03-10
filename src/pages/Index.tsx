"use client";

import React from 'react';
import CourseSelector from "@/components/CourseSelector";
import SkillsSelector from "@/components/SkillsSelector";
import { Button } from "@/components/ui/button";
import { GraduationCap, Save, Trash2 } from "lucide-react";
import { showSuccess } from "@/utils/toast";
import { MadeWithDyad } from "@/components/made-with-dyad";

const Index = () => {
  const handleSave = () => {
    showSuccess("Les résultats ont été enregistrés avec succès !");
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <header className="text-center space-y-4 mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-indigo-600 rounded-2xl shadow-indigo-200 shadow-xl mb-4">
            <GraduationCap className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-slate-900 tracking-tight">
            Suivi des Résultats Scolaires
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Saisissez les évaluations et les compétences pour un suivi personnalisé de la progression de l'élève.
          </p>
        </header>

        {/* Main Content */}
        <main className="space-y-8">
          <CourseSelector />
          <SkillsSelector />
          
          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
            <Button 
              onClick={handleSave}
              className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-6 rounded-2xl text-lg font-semibold shadow-lg shadow-indigo-100 transition-all hover:scale-105"
            >
              <Save className="w-5 h-5 mr-2" />
              Enregistrer le bilan
            </Button>
            <Button 
              variant="outline"
              className="w-full sm:w-auto border-slate-200 text-slate-600 hover:bg-red-50 hover:text-red-600 hover:border-red-100 px-8 py-6 rounded-2xl text-lg font-semibold transition-all"
            >
              <Trash2 className="w-5 h-5 mr-2" />
              Réinitialiser
            </Button>
          </div>
        </main>

        <footer className="pt-12">
          <MadeWithDyad />
        </footer>
      </div>
    </div>
  );
};

export default Index;