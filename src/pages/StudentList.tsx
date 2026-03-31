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
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Users, ArrowLeft, Download, CheckCircle2, AlertCircle, BellRing, Edit2, Calendar } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { classes, periods } from "@/data/students";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { showSuccess } from "@/utils/toast";

const StudentList = () => {
  const navigate = useNavigate();
  const [selectedClass, setSelectedClass] = React.useState<string>("all");
  const [selectedPeriod, setSelectedPeriod] = React.useState<string>("all");
  const [selectedIds, setSelectedIds] = React.useState<Set<string>>(new Set());

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

  const toggleSelectAll = (checked: boolean) => {
    if (checked && reports) {
      setSelectedIds(new Set(reports.map(r => r.id)));
    } else {
      setSelectedIds(new Set());
    }
  };

  const toggleSelectRow = (id: string, checked: boolean) => {
    const newSelected = new Set(selectedIds);
    if (checked) {
      newSelected.add(id);
    } else {
      newSelected.delete(id);
    }
    setSelectedIds(newSelected);
  };

  const handleExport = () => {
    const count = selectedIds.size > 0 ? selectedIds.size : (reports?.length || 0);
    showSuccess(`Exportation de ${count} enregistrement(s) en cours...`);
    // Logique d'exportation réelle à implémenter ici (CSV/PDF)
  };

  const getSituationIcon = (situation: string) => {
    switch (situation) {
      case 'well': return <CheckCircle2 className="w-4 h-4 text-emerald-500" />;
      case 'difficulties': return <AlertCircle className="w-4 h-4 text-amber-500" />;
      case 'alarm': return <BellRing className="w-4 h-4 text-rose-500" />;
      default: return null;
    }
  };

  const handleEdit = (report: any) => {
    navigate(`/?studentId=${report.student_id}&period=${report.period}&class=${report.class_name}`);
  };

  const isAllSelected = reports && reports.length > 0 && selectedIds.size === reports.length;

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

            <Button 
              onClick={handleExport}
              variant="outline" 
              className="rounded-xl border-slate-200 bg-white hover:bg-slate-50"
            >
              <Download className="w-4 h-4 mr-2" />
              {selectedIds.size > 0 ? `Exporter (${selectedIds.size})` : "Tout exporter"}
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
                    <TableHead className="w-[50px]">
                      <div className="flex items-center justify-center">
                        <Checkbox 
                          checked={isAllSelected}
                          onCheckedChange={(checked) => toggleSelectAll(!!checked)}
                          aria-label="Tout sélectionner"
                          className="border-slate-300 data-[state=checked]:bg-violet-600 data-[state=checked]:border-violet-600"
                        />
                      </div>
                    </TableHead>
                    <TableHead className="font-bold text-slate-700">Date / Heure</TableHead>
                    <TableHead className="font-bold text-slate-700">Élève</TableHead>
                    <TableHead className="font-bold text-slate-700">Classe</TableHead>
                    <TableHead className="font-bold text-slate-700">Période</TableHead>
                    <TableHead className="font-bold text-slate-700">Situation</TableHead>
                    <TableHead className="font-bold text-slate-700">Résultats</TableHead>
                    <TableHead className="font-bold text-slate-700">Compétences</TableHead>
                    <TableHead className="font-bold text-slate-700">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    <TableRow>
                      <TableCell colSpan={9} className="h-32 text-center text-slate-500">
                        Chargement des données...
                      </TableCell>
                    </TableRow>
                  ) : reports?.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={9} className="h-32 text-center text-slate-500">
                        Aucune donnée enregistrée pour ces critères.
                      </TableCell>
                    </TableRow>
                  ) : (
                    reports?.map((report) => (
                      <TableRow key={report.id} className="hover:bg-slate-50/50 transition-colors">
                        <TableCell>
                          <div className="flex items-center justify-center">
                            <Checkbox 
                              checked={selectedIds.has(report.id)}
                              onCheckedChange={(checked) => toggleSelectRow(report.id, !!checked)}
                              aria-label={`Sélectionner ${report.student_name}`}
                              className="border-slate-300 data-[state=checked]:bg-violet-600 data-[state=checked]:border-violet-600"
                            />
                          </div>
                        </TableCell>
                        <TableCell className="text-xs text-slate-500">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {format(new Date(report.created_at), "dd/MM/yyyy HH:mm", { locale: fr })}
                          </div>
                        </TableCell>
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
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => handleEdit(report)}
                            className="text-violet-600 hover:text-violet-700 hover:bg-violet-50 rounded-lg"
                          >
                            <Edit2 className="w-4 h-4 mr-2" />
                            Modifier
                          </Button>
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