"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Database as DatabaseIcon, ArrowLeft, Download, Search, Filter } from "lucide-react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";

const mockData = [
  { id: 1, name: "Alice Martin", class: "CM1", period: "Période 1", date: "12/05/2024", status: "Complet", teacher: "M. Dupont" },
  { id: 2, name: "Lucas Bernard", class: "CM1", period: "Période 1", date: "10/05/2024", status: "En cours", teacher: "M. Dupont" },
  { id: 3, name: "Emma Petit", class: "CE2", period: "Période 2", date: "08/05/2024", status: "Complet", teacher: "Mme. Leroy" },
  { id: 4, name: "Thomas Richard", class: "6ème", period: "Période 1", date: "15/05/2024", status: "Complet", teacher: "M. Simon" },
  { id: 5, name: "Chloé Durand", class: "CM1", period: "Période 2", date: "14/05/2024", status: "Complet", teacher: "M. Dupont" },
  { id: 6, name: "Alice Martin", class: "CM1", period: "Période 2", date: "20/06/2024", status: "En cours", teacher: "M. Dupont" },
  { id: 7, name: "Julien Faure", class: "CP", period: "Période 1", date: "05/04/2024", status: "Complet", teacher: "Mme. Morel" },
];

const Database = () => {
  const [searchTerm, setSearchTerm] = React.useState("");

  const filteredData = mockData.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.class.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <Link to="/" className="text-indigo-600 hover:text-indigo-700 flex items-center gap-2 text-sm font-medium mb-2">
              <ArrowLeft className="w-4 h-4" />
              Retour au formulaire
            </Link>
            <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
              <DatabaseIcon className="text-indigo-600" />
              Base de Données des Bilans
            </h1>
          </div>
          <Button className="bg-indigo-600 hover:bg-indigo-700 rounded-xl">
            <Download className="w-4 h-4 mr-2" />
            Exporter (CSV)
          </Button>
        </div>

        {/* Filters */}
        <Card className="border-none shadow-sm bg-white">
          <CardContent className="p-4 flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input 
                placeholder="Rechercher un élève ou une classe..." 
                className="pl-10 rounded-xl border-slate-200"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" className="rounded-xl border-slate-200">
              <Filter className="w-4 h-4 mr-2" />
              Filtres avancés
            </Button>
          </CardContent>
        </Card>

        {/* Table */}
        <Card className="border-none shadow-lg bg-white overflow-hidden">
          <Table>
            <TableHeader className="bg-slate-50">
              <TableRow>
                <TableHead className="font-bold text-slate-700">Élève</TableHead>
                <TableHead className="font-bold text-slate-700">Classe</TableHead>
                <TableHead className="font-bold text-slate-700">Période</TableHead>
                <TableHead className="font-bold text-slate-700">Date</TableHead>
                <TableHead className="font-bold text-slate-700">Enseignant</TableHead>
                <TableHead className="font-bold text-slate-700">Statut</TableHead>
                <TableHead className="text-right font-bold text-slate-700">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((row) => (
                <TableRow key={row.id} className="hover:bg-slate-50/50 transition-colors">
                  <TableCell className="font-medium text-slate-900">{row.name}</TableCell>
                  <TableCell>{row.class}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-100">
                      {row.period}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-slate-500">{row.date}</TableCell>
                  <TableCell className="text-slate-600">{row.teacher}</TableCell>
                  <TableCell>
                    <Badge variant={row.status === 'Complet' ? 'default' : 'secondary'}>
                      {row.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" className="text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50">
                      Voir
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {filteredData.length === 0 && (
            <div className="py-12 text-center text-slate-500">
              Aucun résultat trouvé pour "{searchTerm}"
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Database;