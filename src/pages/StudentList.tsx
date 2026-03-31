"use client";

import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Users, ArrowLeft, Download, Filter, Search, AlertCircle, CheckCircle2, BellRing } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { classes, periods } from "@/data/students";

const StudentList = () => {
  const [selectedClass, setSelectedClass] = React.useState<string>("all");
  const [selectedPeriod, setSelectedPeriod] = React.useState<string>("all");

  const { data: reports, isLoading } = useQuery({
    queryKey: ['reports', selectedClass, selectedPeriod],
    queryFn: async () => {
      let query = supabase.from('reports').select('*').order('created_at', { ascending: false });
      
      if (selectedClass !== "all") {
        query = query.eq('class_name', selectedClass);
      }
      if (selectedPeriod !== "all") {
        query = query.eq('period', selectedPeriod);
      }
      
      const { data, error } = await query;
      if (error) throw error;
      return data;
    }
  });

  const getSituationIcon = (situation: string) => {
    switch (situation) {
      case 'well': return <CheckCircle2 className="w-4 h-4 text-emerald-500" />;
      case 'difficulties': return <AlertCircle className="w-4 h-4 text-amber-500" />;
      case 'alarm': return <BellRing className="w-4 h-4 text-rose-500" />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1600px] mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <Link to="/" className="text-violet-600 hover:text-violet-700 flex items-center gap-2 text-sm font-medium mb-2">
              <ArrowLeft className="w-4 h-4" />
              Retour au formulaire
            </Link>
            <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
              <Users className="text-violet-600" />
              Suivi Global des Élèves
            </h1>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <div className="w-40">
              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger className="rounded-xl bg-white">
                  <SelectValue placeholder="Classe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les classes</SelectItem>
                  {classes.map((c) => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="w-40">
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="rounded-xl bg-white">
                  <SelectValue placeholder="Période" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les périodes</SelectItem>
                  {periods.map((p) => (
                    <SelectItem key={p} value={p.toLowerCase()}>{p}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button variant="outline" className="rounded-xl border-slate-200">
              <Download className="w-4 h-4 mr-2" />
              Exporter
            </Button>
          </div>
        </div>

        {/* Table Card */}
        <Card className="border-none shadow-xl bg-white/80 backdrop-blur-sm overflow-hidden">
          <CardContent className="p-0">
            <ScrollArea className="w-full whitespace-nowrap">
              <Table>
                <TableHeader className="bg-slate-50/50">
                  <TableRow>
                    <TableHead className="font-bold text-slate-700">Élève</TableHead>
                    <TableHead className="font-bold text-slate-700">Classe</TableHead>
                    <TableHead className="font-bold text-slate-700">Période</TableHead>
                    <TableHead className="font-bold text-slate-700">Situation</TableHead>
                    <TableHead className="font-bold text-slate-700">Résultats</TableHead>
                    <TableHead className="font-bold text-slate-700">Compétences</TableHead>
                    <TableHead className="font-bold text-slate-700">Autonomie</TableHead>
                    <TableHead className="font-bold text-slate-700">Observations</TableHead>
                    <TableHead className="font-bold text-slate-700">Remédiation</TableHead>
                    <TableHead className="font-bold text-slate-700">Commentaire Carnet</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    <TableRow>
                      <TableCell colSpan={10} className="h-32 text-center text-slate-500">
                        Chargement des données...
                      </TableCell>
                    </TableRow>
                  ) : reports?.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={10} className="h-32 text-center text-slate-500">
                        Aucune donnée enregistrée pour ces critères.
                      </TableCell>
                    </TableRow>
                  ) : (
                    reports?.map((report) => (
                      <TableRow key={report.id} className="hover:bg-slate-50/50 transition-colors">
                        <TableCell className="font-semibold text-slate-900">{report.student_name}</TableCell>
                        <TableCell>
                          <Badge variant="secondary" className="bg-violet-50 text-violet-700 border-violet-100">
                            {report.class_name}
                          </Badge>
                        </TableCell>
                        <TableCell className="capitalize">{report.period}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getSituationIcon(report.observations?.situation)}
                            <span className="text-xs font-medium">
                              {report.observations?.situation === 'well' ? 'Bien' : 
                               report.observations?.situation === 'difficulties' ? 'Difficultés' : 
                               report.observations?.situation === 'alarm' ? 'Alarme' : '-'}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1 max-w-[200px]">
                            {Object.entries(report.course_results || {}).map(([subject, status]: [string, any]) => (
                              status !== 'none' && (
                                <Badge key={subject} variant="outline" className={
                                  status === 'failure' ? "border-red-200 text-red-600 bg-red-50" : 
                                  status === 'difficulty' ? "border-amber-200 text-amber-600 bg-amber-50" : 
                                  "border-slate-200 text-slate-600"
                                }>
                                  {subject}
                                </Badge>
                              )
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1 max-w-[200px]">
                            {(report.transversal_skills || []).map((skill: string) => (
                              <Badge key={skill} variant="outline" className="text-[10px] border-emerald-100 text-emerald-700 bg-emerald-50">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-xs space-y-1">
                            {Object.entries(report.autonomous_work || {}).map(([skill, value]: [string, any]) => (
                              value !== null && (
                                <div key={skill} className="flex items-center gap-1">
                                  {value ? <CheckCircle2 className="w-3 h-3 text-emerald-500" /> : <AlertCircle className="w-3 h-3 text-red-400" />}
                                  <span className="truncate max-w-[100px]">{skill}</span>
                                </div>
                              )
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="max-w-[250px] text-xs space-y-1">
                            {report.observations?.forces && <p><span className="font-bold text-emerald-600">Forces:</span> {report.observations.forces}</p>}
                            {report.observations?.freins && <p><span className="font-bold text-amber-600">Freins:</span> {report.observations.freins}</p>}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-xs">
                            {(report.remediation || []).map((rem: any, i: number) => (
                              <div key={i} className="flex items-center gap-1">
                                <Badge variant="outline" className="text-[10px]">{rem.subject}</Badge>
                                <span className={rem.status === 'obligatoire' ? "text-red-500 font-bold" : "text-blue-500"}>
                                  {rem.status}
                                </span>
                              </div>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          <p className="max-w-[200px] truncate text-xs italic text-slate-500">
                            {report.observations?.progression_comment || "Aucun commentaire"}
                          </p>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentList;