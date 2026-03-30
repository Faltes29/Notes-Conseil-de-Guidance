"use client";

import React from 'react';
import StudentHeader from "@/components/StudentHeader";
import CourseSelector from "@/components/CourseSelector";
import SkillsSelector from "@/components/SkillsSelector";
import AutonomousWork from "@/components/AutonomousWork";
import ObservationFields from "@/components/ObservationFields";
import RemediationSection from "@/components/RemediationSection";
import SensitiveInfo from "@/components/SensitiveInfo";
import StudentSituation from "@/components/StudentSituation";
import { Button } from "@/components/ui/button";
import { 
  Save as SaveIcon, 
  Users as UsersIcon, 
  Database as DbIcon, 
  ChevronRight as NextIcon, 
  ChevronLeft as PrevIcon,
  Loader2 as LoaderIcon, 
  GraduationCap as GradIcon 
} from "lucide-react";
import { showSuccess } from "@/utils/toast";
import { MadeWithDyad } from "@/components/made-with-dyad";
import { Link } from "react-router-dom";
import { studentsDatabase, classesByDegree } from "@/data/students";

const Index = () => {
  const [selectedClass, setSelectedClass] = React.useState<string>(studentsDatabase[0].className);
  const [selectedStudentId, setSelectedStudentId] = React.useState<string>(studentsDatabase[0].id);
  const [isSaving, setIsSaving] = React.useState(false);

  // Trouver le degré correspondant à la classe
  const selectedDegree = React.useMemo(() => {
    for (const [degree, classes] of Object.entries(classesByDegree)) {
      if (classes.includes(selectedClass)) return degree;
    }
    return "1er degré";
  }, [selectedClass]);

  const currentStudent = studentsDatabase.find(s => s.id === selectedStudentId);
  const currentIndex = studentsDatabase.findIndex(s => s.id === selectedStudentId);

  const handleClassChange = (className: string) => {
    setSelectedClass(className);
    const firstInClass = studentsDatabase.find(s => s.className === className);
    if (firstInClass) {
      setSelectedStudentId(firstInClass.id);
    }
  };

  const handleSave = async (silent = false) => {
    if (!currentStudent) return;
    
    setIsSaving(true);
    // Simulation d'un délai réseau
    await new Promise(resolve => setTimeout(resolve, 600));
    
    if (!silent) {
      showSuccess(`Le bilan de ${currentStudent.firstName} ${currentStudent.lastName} a été enregistré !`);
    }
    setIsSaving(false);
  };

  const handleNextStudent = async () => {
    await handleSave(true); // Sauvegarde silencieuse avant de changer

    if (currentIndex < studentsDatabase.length - 1) {
      const nextStudent = studentsDatabase[currentIndex + 1];
      setSelectedClass(nextStudent.className);
      setSelectedStudentId(nextStudent.id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      showSuccess(`Passage à l'élève suivant : ${nextStudent.firstName}`);
    } else {
      showSuccess("Vous avez atteint le dernier élève !");
    }
  };

  const handlePreviousStudent = async () => {
    await handleSave(true); // Sauvegarde silencieuse avant de changer

    if (currentIndex > 0) {
      const prevStudent = studentsDatabase[currentIndex - 1];
      setSelectedClass(prevStudent.className);
      setSelectedStudentId(prevStudent.id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      showSuccess(`Retour à l'élève précédent : ${prevStudent.firstName}`);
    } else {
      showSuccess("Vous êtes déjà sur le premier élève !");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8 pb-32">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <header className="text-center space-y-4 mb-8 relative">
          <div className="absolute right-0 top-0 flex flex-col sm:flex-row gap-2">
            <Link to="/students">
              <Button variant="outline" className="w-full sm:w-auto rounded-xl border-violet-100 text-violet-600 hover:bg-violet-50">
                <UsersIcon className="w-4 h-4 mr-2" />
                Liste
              </Button>
            </Link>
            <Link to="/database">
              <Button variant="outline" className="w-full sm:w-auto rounded-xl border-slate-200 text-slate-600 hover:bg-slate-50">
                <DbIcon className="w-4 h-4 mr-2" />
                Base de données
              </Button>
            </Link>
          </div>
          
          <div className="inline-flex items-center justify-center p-3 bg-violet-600 rounded-2xl shadow-violet-200 shadow-xl mb-2">
            <GradIcon className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-slate-900 tracking-tight">
            Prise de notes - Conseil de guidance
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
            selectedClass={selectedClass}
            onClassChange={handleClassChange}
            selectedDegree={selectedDegree}
          />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <CourseSelector degree={selectedDegree} />
            <div className="space-y-8">
              <SkillsSelector degree={selectedDegree} />
              <AutonomousWork />
            </div>
          </div>

          <ObservationFields />
          
          <RemediationSection degree={selectedDegree} />

          <SensitiveInfo />

          <StudentSituation />
        </main>

        {/* Floating Action Bar */}
        <div className="fixed bottom-8 left-0 right-0 flex justify-center px-4 z-50 pointer-events-none">
          <div className="bg-white/90 backdrop-blur-xl border border-slate-200 p-2 rounded-3xl shadow-2xl flex items-center gap-2 pointer-events-auto max-w-full overflow-x-auto">
            <Button 
              variant="ghost"
              onClick={handlePreviousStudent}
              disabled={isSaving || currentIndex === 0}
              className="rounded-2xl h-14 px-4 text-slate-600 hover:bg-slate-100 disabled:opacity-30"
            >
              <PrevIcon className="w-5 h-5 mr-2" />
              <span className="hidden sm:inline">Précédent</span>
            </Button>

            <div className="w-px h-8 bg-slate-200 mx-1 hidden sm:block" />

            <Button 
              onClick={() => handleSave()}
              disabled={isSaving}
              className="bg-violet-600 hover:bg-violet-700 text-white h-14 px-8 rounded-2xl font-bold shadow-lg shadow-violet-100 transition-all hover:scale-105 min-w-[140px]"
            >
              {isSaving ? <LoaderIcon className="w-5 h-5 mr-2 animate-spin" /> : <SaveIcon className="w-5 h-5 mr-2" />}
              Enregistrer
            </Button>

            <div className="w-px h-8 bg-slate-200 mx-1 hidden sm:block" />

            <Button 
              onClick={handleNextStudent}
              disabled={isSaving || currentIndex === studentsDatabase.length - 1}
              className="bg-emerald-600 hover:bg-emerald-700 text-white h-14 px-6 rounded-2xl font-bold shadow-lg shadow-emerald-100 transition-all hover:scale-105 disabled:opacity-30"
            >
              <span className="hidden sm:inline">Suivant</span>
              <NextIcon className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>

        <footer className="pt-12">
          <MadeWithDyad />
        </footer>
      </div>
    </div>
  );
};

export default Index;