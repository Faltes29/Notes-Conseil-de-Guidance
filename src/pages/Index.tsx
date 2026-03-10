"use client";

import React from 'react';
import StudentHeader, { studentsList } from "@/components/StudentHeader";
import CourseSelector from "@/components/CourseSelector";
import SkillsSelector from "@/components/SkillsSelector";
import AutonomousWork from "@/components/AutonomousWork";
import ObservationFields from "@/components/ObservationFields";
import RemediationSection from "@/components/RemediationSection";
import SensitiveInfo from "@/components/SensitiveInfo";
import { Button } from "@/components/ui/button";
import { GraduationCap, Save, Trash2, Users, Database, ChevronRight } from "lucide-react";
import { showSuccess, showError } from "@/utils/toast";
import { MadeWithDyad } from "@/components/made-with-dyad";
import { Link } from "react-router-dom";

const Index = () => {
  const [selectedStudent, setSelectedStudent] = React.useState<string>(studentsList[0]);

  const handleSave = () => {
    showSuccess(`Le bilan de ${selectedStudent} a été enregistré avec succès !`);
  };

  const handleNextStudent = () => {
    // 1. Enregistrer le bilan actuel
    handleSave();

    // 2. Trouver l'index de l'élève actuel
    const currentIndex = studentsList.indexOf(selectedStudent);
    
    // 3. Sélectionner l'élève suivant s'il existe
    if (currentIndex < studentsList.length - 1) {
      const nextStudent = studentsList[currentIndex + 1];
      setSelectedStudent(nextStudent);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      showSuccess("Vous avez terminé la saisie pour tous les élèves de cette liste !");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <header className="text-center space-y-4 mb-8 relative">
          <div className="absolute right-0 top-0 flex flex-col sm:flex-row gap-2">
            <Link to="/students">
              <Button variant="outline" className="w-full sm:w-auto rounded-xl border-indigo-100 text-indigo-600 hover:bg-indigo-50">
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
          
          <div className="inline-flex items-center justify-center p-3 bg-indigo-600 rounded-2xl shadow-indigo-200 shadow-xl mb-2">
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
            selectedStudent={selectedStudent} 
            onStudentChange={setSelectedStudent} 
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
              className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-6 rounded-2xl text-lg font-semibold shadow-lg shadow-indigo-100 transition-all hover:scale-105"
            >
              <Save className="w-5 h-5 mr-2" />
              Enregistrer
            </Button>

            <Button 
              onClick={handleNextStudent}
              disabled={studentsList.indexOf(selectedStudent) === studentsList.length - 1}
              className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-6 rounded-2xl text-lg font-semibold shadow-lg shadow-emerald-100 transition-all hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
            >
              Élève suivant
              <ChevronRight className="w-5 h-5 ml-2" />
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