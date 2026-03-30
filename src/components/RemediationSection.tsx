"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { LifeBuoy, AlertCircle, Info, Plus, Trash2 } from "lucide-react";

const coursesList = [
  "Mathématiques", "Français", "Histoire-Géographie", "Sciences", 
  "Anglais", "EPS", "Arts Plastiques", "Musique"
];

interface RemediationRow {
  id: number;
}

const RemediationSection = () => {
  const [rows, setRows] = React.useState<RemediationRow[]>([{ id: Date.now() }]);

  const addRow = () => {
    setRows([...rows, { id: Date.now() }]);
  };

  const removeRow = (id: number) => {
    if (rows.length > 1) {
      setRows(rows.filter(row => row.id !== id));
    }
  };

  return (
    <Card className="border-none shadow-lg bg-white/50 backdrop-blur-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-semibold text-slate-800 flex items-center gap-2">
          <LifeBuoy className="text-orange-500" />
          Remédiation
        </CardTitle>
        <Button 
          onClick={addRow}
          variant="outline" 
          size="sm" 
          className="rounded-xl border-orange-200 text-orange-600 hover:bg-orange-50 hover:text-orange-700"
        >
          <Plus className="w-4 h-4 mr-1" />
          Ajouter
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {rows.map((row, index) => (
          <div key={row.id} className="relative grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-xl bg-white border border-slate-100 items-center group">
            <div className="space-y-2">
              <Label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Matière {index + 1}</Label>
              <Select>
                <SelectTrigger className="rounded-xl border-slate-200 bg-slate-50/50">
                  <SelectValue placeholder="Sélectionner une matière" />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  {coursesList.map((course) => (
                    <SelectItem key={course} value={course.toLowerCase()}>{course}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Statut de la remédiation</Label>
              <div className="flex gap-4 items-center">
                <RadioGroup defaultValue="conseillee" className="flex gap-4 pt-1 flex-1">
                  <div className="flex items-center space-x-2 bg-orange-50/50 px-3 py-2 rounded-lg border border-orange-100 cursor-pointer hover:bg-orange-50 transition-colors flex-1">
                    <RadioGroupItem value="obligatoire" id={`row-${row.id}-obli`} className="text-orange-600 border-orange-300" />
                    <Label htmlFor={`row-${row.id}-obli`} className="cursor-pointer text-orange-800 text-sm font-medium flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> Obligatoire
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 bg-blue-50/50 px-3 py-2 rounded-lg border border-blue-100 cursor-pointer hover:bg-blue-50 transition-colors flex-1">
                    <RadioGroupItem value="conseillee" id={`row-${row.id}-cons`} className="text-blue-600 border-blue-300" />
                    <Label htmlFor={`row-${row.id}-cons`} className="cursor-pointer text-blue-800 text-sm font-medium flex items-center gap-1">
                      <Info className="w-3 h-3" /> Conseillée
                    </Label>
                  </div>
                </RadioGroup>
                
                {rows.length > 1 && (
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => removeRow(row.id)}
                    className="text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default RemediationSection;