"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Settings as SettingsIcon, Save, ArrowLeft, MessageSquareQuote } from "lucide-react";
import { Link } from "react-router-dom";
import { showSuccess } from "@/utils/toast";
import { MadeWithDyad } from "@/components/made-with-dyad";

const periods = ["Période 1", "Période 2", "Période 3"];
const cases = ["Cas 1", "Cas 2", "Cas 3"];

const Settings = () => {
  const handleSave = () => {
    showSuccess("Les modèles de commentaires ont été enregistrés !");
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
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
              <p className="text-slate-500">Configurez vos modèles de commentaires par période et par situation.</p>
            </div>
          </div>
        </header>

        <main className="space-y-8">
          <Card className="border-none shadow-xl bg-white/80 backdrop-blur-sm overflow-hidden">
            <CardHeader className="border-b border-slate-100 bg-white/50">
              <div className="flex items-center gap-2">
                <MessageSquareQuote className="w-5 h-5 text-violet-500" />
                <CardTitle>Modèles de commentaires</CardTitle>
              </div>
              <CardDescription>
                Ces textes pourront être utilisés comme base pour vos commentaires dans le carnet de progression.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {periods.map((period) => (
                  <div key={period} className="space-y-6">
                    <h3 className="font-bold text-lg text-slate-800 border-b pb-2 border-violet-100">
                      {period}
                    </h3>
                    <div className="space-y-4">
                      {cases.map((cas) => (
                        <div key={`${period}-${cas}`} className="space-y-2">
                          <Label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                            {period} - {cas}
                          </Label>
                          <Textarea 
                            placeholder={`Saisissez le modèle pour le ${cas.toLowerCase()}...`}
                            className="min-h-[120px] rounded-xl border-slate-200 focus-visible:ring-violet-500 bg-white resize-none"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10 flex justify-end">
                <Button 
                  onClick={handleSave}
                  className="bg-violet-600 hover:bg-violet-700 text-white px-8 py-6 rounded-2xl text-lg font-bold shadow-lg shadow-violet-100 transition-all hover:scale-105"
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