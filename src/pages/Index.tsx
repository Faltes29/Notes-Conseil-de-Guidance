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
import { GraduationCap, Save, Trash2, Users, Database, Loader2 } from "lucide-react";
import { showSuccess, showError } from "@/utils/toast";
import { MadeWithDyad } from "@/components/made-with-dyad";
import { Link } from "react-router-dom";
import { supabase } from "@/lib/supabase";

const Index = () => {
  const [isSaving, setIsSaving] = React.useState(false);
  const [formData, setFormData] = React.useState({
    period: "période 1",
    class: "",
    student: "",
    sex: "f",
    courses: {},
    skills: [],
    autonomous: {},
    autonomousNotes: "",
    forces: "",
    freins: "",
    conseils: "",
    remediation: [],
    sensitiveNotes: "",
    resourcePersons: []
  });

  const handleSave = async () => {
    if (!formData.student || !formData.class) {
      showError("Veuillez au moins sélectionner un élève et une classe.");
      return;
    }

    setIsSaving(true);
    try {
      const { error } = await supabase
        .from('bilans')
        .insert([
          { 
            student_name: formData.student,
            class_name: formData.class,
            period: formData.period,
            data: formData,
            created_at: new Date().toISOString()
          }
        ]);

      if (error) throw error;
      
      showSuccess("Le bilan de l'élève a été enregistré dans la base de données !");
    } catch (error: any) {
      showError("Erreur lors de l'enregistrement : " + error.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    if (window.confirm("Êtes-vous sûr de vouloir réinitialiser tout le formulaire ?")) {
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
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

        <main className="space-y-8">
          <StudentHeader 
            value={{ period: formData.period, class: formData.class, student: formData.student, sex: formData.sex }}
            onChange={(val) => setFormData(prev => ({ ...prev, ...val }))}
          />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <CourseSelector 
              value={formData.courses}
              onChange={(courses) => setFormData(prev => ({ ...prev, courses }))}
            />
            <div className="space-y-8">
              <SkillsSelector 
                value={formData.skills}
                onChange={(skills) => setFormData(prev => ({ ...prev, skills }))}
              />
              <AutonomousWork 
                value={{ eval: formData.autonomous, notes: formData.autonomousNotes }}
                onChange={(val) => setFormData(prev => ({ ...prev, autonomous: val.eval, autonomousNotes: val.notes }))}
              />
            </div>
          </div>

          <ObservationFields 
            value={{ forces: formData.forces, freins: formData.freins, conseils: formData.conseils }}
            onChange={(val) => setFormData(prev => ({ ...prev, ...val }))}
          />
          
          <RemediationSection 
            value={formData.remediation}
            onChange={(remediation) => setFormData(prev => ({ ...prev, remediation }))}
          />

          <SensitiveInfo 
            value={{ notes: formData.sensitiveNotes, persons: formData.resourcePersons }}
            onChange={(val) => setFormData(prev => ({ ...prev, sensitiveNotes: val.notes, resourcePersons: val.persons }))}
          />
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
            <Button 
              onClick={handleSave}
              disabled={isSaving}
              className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-6 rounded-2xl text-lg font-semibold shadow-lg shadow-indigo-100 transition-all hover:scale-105"
            >
              {isSaving ? (
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              ) : (
                <Save className="w-5 h-5 mr-2" />
              )}
              Enregistrer le bilan
            </Button>
            <Button 
              onClick={handleReset}
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