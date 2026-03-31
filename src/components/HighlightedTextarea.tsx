"use client";

import React from 'react';
import { cn } from "@/lib/utils";

interface HighlightedTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  onValueChange?: (value: string) => void;
}

const HighlightedTextarea = React.forwardRef<HTMLTextAreaElement, HighlightedTextareaProps>(
  ({ className, value, onChange, onValueChange, ...props }, ref) => {
    const [text, setText] = React.useState(String(value || ""));

    React.useEffect(() => {
      setText(String(value || ""));
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newValue = e.target.value;
      setText(newValue);
      if (onChange) onChange(e);
      if (onValueChange) onValueChange(newValue);
    };

    // Fonction pour colorer les variables {{...}}
    const getHighlightedText = (content: string) => {
      const parts = content.split(/(\{\{[^}]+\}\})/g);
      return parts.map((part, i) => {
        if (part.startsWith("{{") && part.endsWith("}}")) {
          // Déterminer la couleur en fonction du contenu de la variable
          let colorClass = "bg-violet-100 text-violet-700 border-violet-200";
          if (part.includes("prenom")) colorClass = "bg-blue-100 text-blue-700 border-blue-200";
          if (part.includes("echecs")) colorClass = "bg-red-100 text-red-700 border-red-200";
          if (part.includes("difficulte")) colorClass = "bg-amber-100 text-amber-700 border-amber-200";
          if (part.includes("competence") || part.includes("forces")) colorClass = "bg-emerald-100 text-emerald-700 border-emerald-200";
          if (part.includes("freins")) colorClass = "bg-rose-100 text-rose-700 border-rose-200";
          if (part.includes("conseils")) colorClass = "bg-indigo-100 text-indigo-700 border-indigo-200";
          if (part.includes("remediation")) colorClass = "bg-orange-100 text-orange-700 border-orange-200";
          if (part.includes("ressource") || part.includes("rdv")) colorClass = "bg-cyan-100 text-cyan-700 border-cyan-200";

          return (
            <span key={i} className={cn("px-1 rounded-md font-bold border", colorClass)}>
              {part}
            </span>
          );
        }
        return <span key={i}>{part}</span>;
      });
    };

    return (
      <div className="relative w-full min-h-[120px] font-sans text-sm leading-relaxed">
        {/* Couche de rendu (Highlight) */}
        <div 
          className={cn(
            "absolute inset-0 p-4 pointer-events-none whitespace-pre-wrap break-words overflow-hidden text-transparent border border-transparent",
            className
          )}
          aria-hidden="true"
        >
          {getHighlightedText(text)}
          {/* Petit hack pour s'assurer que le défilement correspond si le texte finit par un saut de ligne */}
          {text.endsWith('\n') ? '\n' : ''}
        </div>

        {/* Couche de saisie (Textarea) */}
        <textarea
          ref={ref}
          value={text}
          onChange={handleChange}
          className={cn(
            "relative w-full min-h-[120px] p-4 bg-transparent text-slate-900 caret-slate-900 resize-none focus:outline-none block",
            className
          )}
          {...props}
        />
      </div>
    );
  }
);

HighlightedTextarea.displayName = "HighlightedTextarea";

export default HighlightedTextarea;