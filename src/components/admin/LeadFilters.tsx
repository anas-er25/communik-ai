import React from 'react';
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from 'lucide-react';

interface LeadFiltersProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  statusFilter: string;
  setStatusFilter: (value: string) => void;
  serviceFilter: string;
  setServiceFilter: (value: string) => void;
  dateFilter: string;
  setDateFilter: (value: string) => void;
  scoreFilter: string;
  setScoreFilter: (value: string) => void;
}

const LeadFilters: React.FC<LeadFiltersProps> = ({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  serviceFilter,
  setServiceFilter,
  dateFilter,
  setDateFilter,
  scoreFilter,
  setScoreFilter,
}) => {
  const filterConfigs = [
    {
      label: "Statut",
      value: statusFilter,
      onChange: setStatusFilter,
      options: [
        { value: "all", label: "Tous les statuts" },
        { value: "new", label: "Nouveaux" },
        { value: "contacted", label: "Contactés" },
        { value: "qualified", label: "Qualifiés" },
        { value: "converted", label: "Convertis" },
        { value: "lost", label: "Perdus" },
      ],
    },
    {
      label: "Service",
      value: serviceFilter,
      onChange: setServiceFilter,
      options: [
        { value: "all", label: "Tous les services" },
        { value: "branding", label: "Branding" },
        { value: "web", label: "Site web" },
        { value: "ia", label: "Stratégie IA" },
        { value: "auto", label: "Automatisation" },
        { value: "other", label: "Autre" },
      ],
    },
    {
      label: "Date",
      value: dateFilter,
      onChange: setDateFilter,
      options: [
        { value: "all", label: "Toutes les dates" },
        { value: "today", label: "Aujourd'hui" },
        { value: "week", label: "Cette semaine" },
        { value: "month", label: "Ce mois" },
      ],
    },
    {
      label: "Score",
      value: scoreFilter,
      onChange: setScoreFilter,
      options: [
        { value: "all", label: "Tous les scores" },
        { value: "high", label: "Élevé (70+)" },
        { value: "medium", label: "Moyen (40-69)" },
        { value: "low", label: "Faible (0-39)" },
      ],
    },
  ];

  return (
    <div className="flex flex-col md:flex-row md:items-end gap-4 mb-6">
      <div className="flex-grow" role="search">
        <label htmlFor="search" className="block text-sm font-medium text-gray-300 mb-1">
          Recherche
        </label>
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" aria-hidden="true" />
          <Input
            id="search"
            type="search"
            placeholder="Rechercher par nom, email, entreprise..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 bg-theme-charcoal border-theme-gray/30 text-gray-300 placeholder-gray-400"
            aria-label="Rechercher des leads"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {filterConfigs.map((filter) => (
          <div key={filter.label}>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              {filter.label}
            </label>
            <Select value={filter.value} onValueChange={filter.onChange}>
              <SelectTrigger 
                className="bg-theme-charcoal border-theme-gray/30 text-gray-300"
                aria-label={`Filtrer par ${filter.label.toLowerCase()}`}
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-theme-charcoal border-theme-gray/30 text-gray-300">
                {filter.options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeadFilters;