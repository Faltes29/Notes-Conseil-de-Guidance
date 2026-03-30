"use client";

import React from 'react';
import StudentHeader from "@/components/StudentHeader";
import CourseSelector from "@/components/CourseSelector";
import SkillsSelector from "@/components/SkillsSelector";
import AutonomousWork from "@/components/AutonomousWork";
import ObservationFields from "@/components/ObservationFields";
import RemediationSection from "@/components/RemediationSection";
import SensitiveInfo from "@/components/SensitiveInfo";
import { Button } from "@/components/ui/button";
import { GraduationCap, Save, Trash2, Users, Database, ChevronRight, Loader2 } from "lucide-react";
import { showSuccess } from "@/utils/toast";
import { MadeWithDyad } from "@/components/made-with-dyad";
import { Link } from "react-router-dom";
import { studentsDatabase } from "@/data/students";

const Index = () => {
  const [selectedStudentId, setSelectedStudentId] = React.useState<string>(studentsDatabase[0].id);
  const [isSaving, setIsSaving] = React.useState(false);

  const currentStudent = studentsDatabase.find(s => s.id === selectedStudentId);

  const handleSave = async () => {
    if (!currentStudent) return;
    
    setIsSaving(true);
    // Simulation d'une sauvegarde locale
    await new Promise(resolve => setTimeout(resolve, 800));
    
    showSuccess(`Le bilan de ${currentStudent.firstName} ${currentStudent.lastName} a été enregistré localement !`);
    setIsSaving(false);
  };

  const handleNextStudent = async () => {
    await handleSave();

    const currentIndex = studentsDatabase.findIndex(s => s.id === selectedStudentId);
    
    if (currentIndex < studentsDatabase.length - 1) {
      const nextStudent = studentsDatabase[currentIndex + 1];
      setSelectedStudentId(nextStudent.id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      showSuccess("Vous avez terminé la saisie pour tous les élèves !");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <header className="text-center space-y-4 mb-8 relative">
          <div className="absolute right-0 top-0 flex flex-col sm:flex-row gap-2">
            <Link to="/students">
              <Button variant="outline" className="w-full sm:w-auto rounded-xl border-violet-100 text-violet-600 hover:bg-violet-50">
                <Users className="w-4 h-4 mr-2" />
                Liste
              </Button>
            </Link>
            <Link to="/database">
              <Button variant="outline" className="w-full sm:w-auto rounded-xl border-slate-200 text-slate-600 hover:bg-slate-50">
                <Database className="w-4 h-4 mr-2" />
                Base de données
              </Button>
            </Link>
          </div>
          
          <div className="inline-flex items-center justify-center p-3 bg-violet-600 rounded-2xl shadow-violet-200 shadow-xl mb-2">
            <GraduationCap className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-slate-900 tracking-tight">
            Bilan Scolaire Personnalisé
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Complétez les informations ci-dessous pour générer le suivi de l'élève.
          </p>
        </header>

        {/* Main Content */}
        <main className="space-y-8">
          <StudentHeader 
            selectedStudentId={selectedStudentId} 
            onStudentChange={setSelectedStudentId} 
          />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <CourseSelector />
            <div className="space-y-8">
              <SkillsSelector />
              <AutonomousWork />
            </div>
          </div>

          <ObservationFields />
          
          <RemediationSection />

          <SensitiveInfo />
          
          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
            <Button 
              onClick={handleSave}
              disabled={isSaving}
              className="w-full sm:w-auto bg-violet-600 hover:bg-violet-700 text-white px-8 py-6 rounded-2xl text-lg font-semibold shadow-lg shadow-violet-100 transition-all hover:scale-105"
            >
              {isSaving ? <Loader2 className="w-5 h-5 mr-2 animate-spin" /> : <Save className="w-5 h-5 mr-2" />}
              Enregistrer
            </Button>

            <Button 
              onClick={handleNextStudent}
              disabled={isSaving || studentsDatabase.findIndex(s => s.id === selectedStudentId) === studentsDatabase.length - 1}
              className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-6 rounded-2xl text-lg font-semibold shadow-lg shadow-emerald-100 transition-all hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
            >
              Élève suivant
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>

            <Button 
              variant="outline"
              disabled={isSaving}
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