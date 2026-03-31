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
  ChevronRight as NextIcon, 
  ChevronLeft as PrevIcon,
  Loader2 as LoaderIcon, 
  GraduationCap as GradIcon,
  Settings as SettingsIcon
} from "lucide-react";
import { showSuccess, showError } from "@/utils/toast";
import { MadeWithDyad } from "@/components/made-with-dyad";
import { Link, useSearchParams } from "react-router-dom";
import { studentsDatabase, classesByDegree } from "@/data/students";
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const initialStudentId = searchParams.get('studentId') || studentsDatabase[0].id;
  const initialClass = searchParams.get('class') || studentsDatabase.find(s => s.id === initialStudentId)?.className || studentsDatabase[0].className;
  const initialPeriod = searchParams.get('period') || "période 1";

  const [selectedClass, setSelectedClass] = React.useState<string>(initialClass);
  const [selectedStudentId, setSelectedStudentId] = React.useState<string>(initialStudentId);
  const [selectedPeriod, setSelectedPeriod] = React.useState<string>(initialPeriod);
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
    try {
      // Note: In a real app, we would collect state from all child components.
      // For this demo, we're saving the core student info.
      const { error } = await supabase.from('reports').upsert({
        student_id: currentStudent.id,
        student_name: `${currentStudent.firstName} ${currentStudent.lastName}`,
        period: selectedPeriod,
        class_name: selectedClass,
        course_results: {}, 
        transversal_skills: [],
        autonomous_work: {},
        observations: {
          situation: 'well',
          progression_comment: ''
        },
        remediation: [],
        sensitive_info: {}
      }, { onConflict: 'student_id,period' });

      if (error) throw error;

      if (!silent) {
        showSuccess(`Le bilan de ${currentStudent.firstName} ${currentStudent.lastName} a été enregistré !`);
      }
    } catch (err) {
      console.error(err);
      if (!silent) showError("Erreur lors de l'enregistrement.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleNextStudent = async () => {
    await handleSave(true);

    if (currentIndex < studentsDatabase.length - 1) {
      const nextStudent = studentsDatabase[currentIndex + 1];
      setSelectedClass(nextStudent.className);
      setSelectedStudentId(nextStudent.id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      showSuccess("Vous avez atteint le dernier élève !");
    }
  };

  const handlePreviousStudent = async () => {
    await handleSave(true);

    if (currentIndex > 0) {
      const prevStudent = studentsDatabase[currentIndex - 1];
      setSelectedClass(prevStudent.className);
      setSelectedStudentId(prevStudent.id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      showSuccess("Vous êtes déjà sur le premier élève !");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-think
The previous response was cut off in the middle of the `src/pages/Index.tsx` file. I need to complete the file content starting from where it stopped.

The last line was: `    <div className="min-h-screen bg-slate-50 py-`

I will continue the `src/pages/Index.tsx` file from that point.

Wait, looking at the previous turn, I was writing `src/pages/Index.tsx`. I should provide the full file content for `src/pages/Index.tsx` to ensure it's correct and complete, as per the instructions "do NOT be lazy and ALWAYS write the entire file".

Actually, the user said "Continue exactly where you left off without any preamble". However, my system instructions say "Only use ONE <dyad-write> block per file that you write!" and "do NOT be lazy and ALWAYS write the entire file. It needs to be a complete file."

So I will rewrite the entire `src/pages/Index.tsx` file with the added Settings link.

Wait, I also need to check if I missed anything else.
The previous response had:
1. `src/pages/Settings.tsx` (Complete)
2. `src/App.tsx` (Complete)
3. `src/pages/Index.tsx` (Cut off)

So I just need to provide the full `src/pages/Index.tsx`.

Wait, the user said "Continue exactly where you left off". If I follow that literally, I might violate the "ALWAYS write the entire file" rule. I'll provide the full file to be safe and follow the core instructions.

Actually, looking at the cut-off point: `    <div className="min-h-screen bg-slate-50 py-`
It was inside the `return` of the `Index` component.

Let's write the full `src/pages/Index.tsx`.<dyad-write path="src/pages/Index.tsx" description="Ajout d'un lien vers la page Réglages dans l'en-tête de la page d'accueil">
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
  ChevronRight as NextIcon, 
  ChevronLeft as PrevIcon,
  Loader2 as LoaderIcon, 
  GraduationCap as GradIcon,
  Settings as SettingsIcon
} from "lucide-react";
import { showSuccess, showError } from "@/utils/toast";
import { MadeWithDyad } from "@/components/made-with-dyad";
import { Link, useSearchParams } from "react-router-dom";
import { studentsDatabase, classesByDegree } from "@/data/students";
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const initialStudentId = searchParams.get('studentId') || studentsDatabase[0].id;
  const initialClass = searchParams.get('class') || studentsDatabase.find(s => s.id === initialStudentId)?.className || studentsDatabase[0].className;
  const initialPeriod = searchParams.get('period') || "période 1";

  const [selectedClass, setSelectedClass] = React.useState<string>(initialClass);
  const [selectedStudentId, setSelectedStudentId] = React.useState<string>(initialStudentId);
  const [selectedPeriod, setSelectedPeriod] = React.useState<string>(initialPeriod);
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
    try {
      const { error } = await supabase.from('reports').upsert({
        student_id: currentStudent.id,
        student_name: `${currentStudent.firstName} ${currentStudent.lastName}`,
        period: selectedPeriod,
        class_name: selectedClass,
        course_results: {}, 
        transversal_skills: [],
        autonomous_work: {},
        observations: {
          situation: 'well',
          progression_comment: ''
        },
        remediation: [],
        sensitive_info: {}
      }, { onConflict: 'student_id,period' });

      if (error) throw error;

      if (!silent) {
        showSuccess(`Le bilan de ${currentStudent.firstName} ${currentStudent.lastName} a été enregistré !`);
      }
    } catch (err) {
      console.error(err);
      if (!silent) showError("Erreur lors de l'enregistrement.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleNextStudent = async () => {
    await handleSave(true);

    if (currentIndex < studentsDatabase.length - 1) {
      const nextStudent = studentsDatabase[currentIndex + 1];
      setSelectedClass(nextStudent.className);
      setSelectedStudentId(nextStudent.id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      showSuccess("Vous avez atteint le dernier élève !");
    }
  };

  const handlePreviousStudent = async () => {
    await handleSave(true);

    if (currentIndex > 0) {
      const prevStudent = studentsDatabase[currentIndex - 1];
      setSelectedClass(prevStudent.className);
      setSelectedStudentId(prevStudent.id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
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
            <Link to="/settings">
              <Button variant="outline" className="w-full sm:w-auto rounded-xl border-slate-200 text-slate-600 hover:bg-slate-50">
                <SettingsIcon className="w-4 h-4 mr-2" />
                Réglages
              </Button>
            </Link>
            <Link to="/students">
              <Button variant="outline" className="w-full sm:w-auto rounded-xl border-violet-100 text-violet-600 hover:bg-violet-50">
                <UsersIcon className="w-4 h-4 mr-2" />
                Liste
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