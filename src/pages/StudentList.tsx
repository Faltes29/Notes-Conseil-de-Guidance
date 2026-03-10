"use client";

import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Search, FileText, ArrowLeft, Calendar, UserCircle, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const classes = ["CP", "CE1", "CE2", "CM1", "CM2", "6ème", "5ème", "4ème", "3ème"];
const periods = ["Période 1", "Période 2", "Période 3"];

// Données simulées enrichies avec les périodes
const mockStudents = [
  { id: 1, name: "Alice Martin", class: "cm1", period: "période 1", lastUpdate: "12/05/2024", status: "Complet" },
  { id: 2, name: "Lucas Bernard", class: "cm1", period: "période 1", lastUpdate: "10/05/2024", status: "En cours" },
  { id: 3, name: "Emma Petit", class: "ce2", period: "période 2", lastUpdate: "08/05/2024", status: "Complet" },
  { id: 4, name: "Thomas Richard", class: "6ème", period: "période 1", lastUpdate: "15/05/2024", status: "Complet" },
  { id: 5, name: "Chloé Durand", class: "cm1", period: "période 2", lastUpdate: "14/05/2024", status: "Complet" },
  { id: 6, name: "Alice Martin", class: "cm1", period: "période 2", lastUpdate: "20/06/2024", status: "En cours" },
];

const StudentList = () => {
  const [selectedClass, setSelectedClass] = React.useState<string>("");
  const [selectedPeriod, setSelectedPeriod] = React.useState<string>("all");

  const filteredStudents = mockStudents.filter(s => {
    const matchClass = selectedClass ? s.class.toLowerCase() === selectedClass.toLowerCase() : false;
    const matchPeriod = selectedPeriod === "all" ? true : s.period.toLowerCase() === selectedPeriod.toLowerCase();
    return matchClass && matchPeriod;
  });

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col gap-6">
          <div className="space-y-1">
            <Link to="/" className="text-indigo-600 hover:text-indigo-700 flex items-center gap-2 text-sm font-medium mb-2">
              <ArrowLeft className="w-4 h-4" />
              Retour au formulaire
            </Link>
            <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
              <Users className="text-indigo-600" />
              Liste des Élèves
            </h1>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Classe</label>
              <Select onValueChange={setSelectedClass}>
                <SelectTrigger className="rounded-xl border-slate-200 bg-white shadow-sm">
                  <SelectValue placeholder="Choisir une classe" />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  {classes.map((c) => (
                    <SelectItem key={c} value={c.toLowerCase()}>{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Période</label>
              <Select defaultValue="all" onValueChange={setSelectedPeriod}>
                <SelectTrigger className="rounded-xl border-slate-200 bg-white shadow-sm">
                  <SelectValue placeholder="Toutes les périodes" />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  <SelectItem value="all">Toutes les périodes</SelectItem>
                  {periods.map((p) => (
                    <SelectItem key={p} value={p.toLowerCase()}>{p}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Content */}
        {selectedClass ? (
          <div className="grid gap-4">
            {filteredStudents.length > 0 ? (
              filteredStudents.map((student) => (
                <Card key={student.id} className="border-none shadow-md hover:shadow-lg transition-shadow bg-white overflow-hidden group">
                  <CardContent className="p-0">
                    <div className="flex items-center justify-between p-5">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                          <UserCircle className="w-7 h-7" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-bold text-slate-800 text-lg">{student.name}</h3>
                            <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-100 text-[10px] uppercase">
                              {student.period}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-3 text-sm text-slate-500 mt-1">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              Mis à jour : {student.lastUpdate}
                            </span>
                            <Badge variant={student.status === 'Complet' ? 'default' : 'secondary'} className="text-[10px] uppercase tracking-wider">
                              {student.status}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" className="rounded-full hover:bg-indigo-50 hover:text-indigo-600">
                        <FileText className="w-5 h-5" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-200">
                <Search className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-500 font-medium">Aucun bilan trouvé pour ces critères.</p>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-20 bg-indigo-50/50 rounded-3xl border-2 border-dashed border-indigo-100">
            <Users className="w-12 h-12 text-indigo-200 mx-auto mb-4" />
            <p className="text-indigo-600 font-medium">Veuillez sélectionner une classe pour voir les élèves.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentList;