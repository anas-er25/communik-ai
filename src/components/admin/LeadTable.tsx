
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Send, RefreshCw } from 'lucide-react';
import { Lead } from '@/services/leadsService';

interface LeadTableProps {
  leads: Lead[];
  onEnrichLead: (leadId: string) => void;
  onScheduleFollowUp: (leadId: string) => void;
  onMarkAsContacted: (leadId: string) => void;
  onUpdateStatus: (leadId: string, status: Lead["status"]) => void;
  onSort: (key: keyof Lead) => void;
  sortKey: keyof Lead | null;
  sortOrder: "asc" | "desc";
}

const LeadTable: React.FC<LeadTableProps> = ({
  leads,
  onEnrichLead,
  onScheduleFollowUp,
  onMarkAsContacted,
  onUpdateStatus,
  onSort,
  sortKey,
  sortOrder,
}) => {
  const getStatusBadge = (status: Lead["status"]) => {
    const statusConfig = {
      new: { text: "Nouveau", className: "bg-theme-charcoal text-theme-red border-theme-red" },
      contacted: { text: "Contacté", className: "bg-theme-charcoal text-yellow-400 border-yellow-400" },
      qualified: { text: "Qualifié", className: "bg-theme-charcoal text-blue-400 border-blue-400" },
      converted: { text: "Converti", className: "bg-theme-charcoal text-green-400 border-green-400" },
      lost: { text: "Perdu", className: "bg-theme-charcoal text-gray-400 border-gray-400" },
    };

    const config = statusConfig[status] || { text: "Inconnu", className: "" };

    return (
      <Badge variant="outline" className={config.className}>
        {config.text}
      </Badge>
    );
  };

  const getScoreDisplay = (score: number) => {
    const getScoreColor = (score: number) => {
      if (score >= 70) return "bg-green-500";
      if (score >= 40) return "bg-yellow-500";
      return "bg-red-500";
    };

    return (
      <div className="flex items-center" role="meter" aria-label={`Score: ${score}`} aria-valuenow={score}>
        <Progress value={score} className={`h-2 w-16 mr-2 ${getScoreColor(score)}`} />
        <span className="text-gray-300">{score}</span>
      </div>
    );
  };

  const getSortIcon = (key: keyof Lead) => {
    if (sortKey !== key) return null;
    return sortOrder === "asc" ? "↑" : "↓";
  };

  // Helper function to map sorting values to aria-sort attribute values
  const getAriaSortValue = (key: keyof Lead): "none" | "ascending" | "descending" | "other" => {
    if (sortKey !== key) return "none";
    return sortOrder === "asc" ? "ascending" : "descending";
  };

  return (
    <div className="overflow-x-auto" role="region" aria-label="Tableau des leads">
      <Table>
        <TableHeader>
          <TableRow className="border-theme-gray/30 hover:bg-theme-red/10">
            <TableHead 
              className="cursor-pointer" 
              onClick={() => onSort("first_name")}
              aria-sort={getAriaSortValue("first_name")}
            >
              Nom {getSortIcon("first_name")}
            </TableHead>
            <TableHead 
              className="cursor-pointer" 
              onClick={() => onSort("email")}
              aria-sort={getAriaSortValue("email")}
            >
              Email {getSortIcon("email")}
            </TableHead>
            <TableHead 
              className="cursor-pointer" 
              onClick={() => onSort("company")}
              aria-sort={getAriaSortValue("company")}
            >
              Entreprise {getSortIcon("company")}
            </TableHead>
            <TableHead 
              className="cursor-pointer" 
              onClick={() => onSort("status")}
              aria-sort={getAriaSortValue("status")}
            >
              Statut {getSortIcon("status")}
            </TableHead>
            <TableHead 
              className="cursor-pointer" 
              onClick={() => onSort("score")}
              aria-sort={getAriaSortValue("score")}
            >
              Score {getSortIcon("score")}
            </TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leads.map((lead) => (
            <TableRow key={lead.id} className="border-theme-gray/30 hover:bg-theme-red/10">
              <TableCell className="font-medium text-gray-300">
                {lead.first_name} {lead.last_name}
              </TableCell>
              <TableCell className="text-gray-300">{lead.email}</TableCell>
              <TableCell className="text-gray-300">{lead.company}</TableCell>
              <TableCell>
                <select
                  value={lead.status}
                  onChange={(e) => onUpdateStatus(lead.id, e.target.value as Lead["status"])}
                  className="bg-transparent text-gray-300 border-none focus:outline-none focus:ring-2 focus:ring-theme-red rounded"
                  aria-label="Changer le statut"
                >
                  <option value="new">Nouveau</option>
                  <option value="contacted">Contacté</option>
                  <option value="qualified">Qualifié</option>
                  <option value="converted">Converti</option>
                  <option value="lost">Perdu</option>
                </select>
              </TableCell>
              <TableCell>{getScoreDisplay(lead.score)}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onMarkAsContacted(lead.id)}
                    className="text-theme-red hover:text-white hover:bg-theme-red"
                    aria-label="Marquer comme contacté"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onEnrichLead(lead.id)}
                    className="text-theme-red hover:text-white hover:bg-theme-red"
                    disabled={lead.enriched}
                    aria-label="Enrichir les données"
                  >
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default LeadTable;
