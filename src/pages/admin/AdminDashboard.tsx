import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LogOut } from "lucide-react";
import { enrichLead } from "@/lib/lead-enrichment";
import { scheduleFollowUp } from "@/lib/lead-automation";
import { mockLeads } from "@/data/mock-leads";
import { motion } from "framer-motion";
import axios from "axios";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import LeadFilters from "@/components/admin/LeadFilters";
import LeadTable from "@/components/admin/LeadTable";
import LeadPagination from "@/components/admin/LeadPagination";

interface Lead {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  company: string;
  serviceType: string;
  message: string;
  gdprConsent: boolean;
  createdAt: string;
  status: "new" | "contacted" | "qualified" | "converted" | "lost";
  score: number;
  enriched: boolean;
  enrichmentData?: {
    companySize?: string;
    industry?: string;
    location?: string;
    website?: string;
    linkedIn?: string;
    twitter?: string;
    revenue?: string;
    foundedYear?: string;
  };
  lastContact?: string;
  nextFollowUp?: string;
  notes?: string;
}

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { currentUser, signOut } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>([]);

  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [serviceFilter, setServiceFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [scoreFilter, setScoreFilter] = useState("all");

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const paginatedLeads = filteredLeads.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const totalPages = Math.ceil(filteredLeads.length / itemsPerPage);

  // Sorting states
  const [sortKey, setSortKey] = useState<keyof Lead | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  // Load leads when component mounts
  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const response = await axios.get(
          `https://sheets.googleapis.com/v4/spreadsheets/${import.meta.env.VITE_SHEET_SHARE
          }/values/Sheet1?key=${import.meta.env.VITE_GOOGLE_API_KEY}`
        );

        // Convertir les données de la feuille en objets
        const [headers, ...rows] = response.data.values;
        const leadsData = rows.map((row: any[], index: number) => {
          const lead: any = {};
          headers.forEach((header: string, i: number) => {
            lead[header] = row[i];
          });
          return {
            ...lead,
            id: index.toString(),
            status: "new",
            score: Math.floor(Math.random() * 100),
            enriched: false,
          };
        });

        setLeads(leadsData);
        setFilteredLeads(leadsData);
      } catch (error) {
        console.error("Erreur de chargement Google Sheets:", error);
        toast({
          title: "Erreur",
          description:
            "Impossible de charger les données depuis Google Sheets.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchLeads();
  }, []);

  // Handle logging out
  const handleLogout = async () => {
    try {
      await signOut();
      toast({
        title: "Déconnexion réussie",
        description: "Vous avez été déconnecté avec succès.",
      });
      navigate("/auth/login");
    } catch (error) {
      console.error("Error signing out:", error);
      toast({
        title: "Erreur de déconnexion",
        description: "Une erreur est survenue lors de la déconnexion.",
        variant: "destructive",
      });
    }
  };

  // Apply filters whenever filter states change
  useEffect(() => {
    if (!isLoading) {
      let filtered = [...leads];

      // Search filter
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        filtered = filtered.filter(
          (lead) =>
            lead.firstName.toLowerCase().includes(searchLower) ||
            lead.lastName.toLowerCase().includes(searchLower) ||
            lead.email.toLowerCase().includes(searchLower) ||
            lead.company.toLowerCase().includes(searchLower)
        );
      }

      // Status filter
      if (statusFilter !== "all") {
        filtered = filtered.filter((lead) => lead.status === statusFilter);
      }

      // Service filter
      if (serviceFilter !== "all") {
        filtered = filtered.filter(
          (lead) => lead.serviceType === serviceFilter
        );
      }

      // Date filter
      if (dateFilter !== "all") {
        const now = new Date();
        const cutoffDate = new Date();

        if (dateFilter === "today") {
          cutoffDate.setDate(now.getDate() - 1);
        } else if (dateFilter === "week") {
          cutoffDate.setDate(now.getDate() - 7);
        } else if (dateFilter === "month") {
          cutoffDate.setMonth(now.getMonth() - 1);
        }

        filtered = filtered.filter(
          (lead) => new Date(lead.createdAt) >= cutoffDate
        );
      }

      // Score filter
      if (scoreFilter !== "all") {
        if (scoreFilter === "high") {
          filtered = filtered.filter((lead) => lead.score >= 70);
        } else if (scoreFilter === "medium") {
          filtered = filtered.filter(
            (lead) => lead.score >= 40 && lead.score < 70
          );
        } else if (scoreFilter === "low") {
          filtered = filtered.filter((lead) => lead.score < 40);
        }
      }

      // Apply sorting
      if (sortKey) {
        filtered = filtered.sort((a, b) => {
          const aValue = a[sortKey];
          const bValue = b[sortKey];

          if (typeof aValue === "number" && typeof bValue === "number") {
            return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
          }

          return sortOrder === "asc"
            ? String(aValue).localeCompare(String(bValue))
            : String(bValue).localeCompare(String(aValue));
        });
      }

      setFilteredLeads(filtered);
    }
  }, [
    searchTerm,
    statusFilter,
    serviceFilter,
    dateFilter,
    scoreFilter,
    leads,
    isLoading,
    sortKey,
    sortOrder,
  ]);

  // Enrich a lead with additional data
  const handleEnrichLead = async (leadId: string) => {
    try {
      const leadIndex = leads.findIndex((lead) => lead.id === leadId);
      if (leadIndex === -1) return;

      toast({
        title: "Enrichissement en cours",
        description: "Recherche d'informations complémentaires...",
      });

      const enrichedData = await enrichLead(
        leads[leadIndex].email,
        leads[leadIndex].company
      );

      const updatedLeads = [...leads];
      updatedLeads[leadIndex] = {
        ...updatedLeads[leadIndex],
        enriched: true,
        enrichmentData: enrichedData,
      };

      setLeads(updatedLeads);

      toast({
        title: "Enrichissement terminé",
        description: "Les données complémentaires ont été ajoutées.",
      });
    } catch (error) {
      toast({
        title: "Erreur d'enrichissement",
        description: "Impossible d'enrichir ce lead actuellement.",
        variant: "destructive",
      });
    }
  };

  // Schedule an automated follow-up
  const handleScheduleFollowUp = async (leadId: string) => {
    try {
      const leadIndex = leads.findIndex((lead) => lead.id === leadId);
      if (leadIndex === -1) return;

      toast({
        title: "Programmation de suivi",
        description: "Configuration du suivi automatisé...",
      });

      const lead = leads[leadIndex];
      const nextFollowUp = await scheduleFollowUp(lead);

      const updatedLeads = [...leads];
      updatedLeads[leadIndex] = {
        ...updatedLeads[leadIndex],
        nextFollowUp: nextFollowUp,
      };

      setLeads(updatedLeads);

      toast({
        title: "Suivi programmé",
        description: `Le prochain contact est programmé pour ${new Date(
          nextFollowUp
        ).toLocaleDateString()}.`,
      });
    } catch (error) {
      toast({
        title: "Erreur de programmation",
        description: "Impossible de programmer le suivi actuellement.",
        variant: "destructive",
      });
    }
  };

  // Mark a lead as contacted
  const handleMarkAsContacted = (leadId: string) => {
    const leadIndex = leads.findIndex((lead) => lead.id === leadId);
    if (leadIndex === -1) return;

    const updatedLeads = [...leads];
    updatedLeads[leadIndex] = {
      ...updatedLeads[leadIndex],
      status: "contacted" as const,
      lastContact: new Date().toISOString(),
    };

    setLeads(updatedLeads);

    toast({
      title: "Statut mis à jour",
      description: "Le lead a été marqué comme contacté.",
    });
  };

  // Update lead status
  const handleUpdateStatus = (leadId: string, status: Lead["status"]) => {
    const leadIndex = leads.findIndex((lead) => lead.id === leadId);
    if (leadIndex === -1) return;

    const updatedLeads = [...leads];
    updatedLeads[leadIndex] = {
      ...updatedLeads[leadIndex],
      status: status,
    };

    setLeads(updatedLeads);

    toast({
      title: "Statut mis à jour",
      description: `Le statut du lead a été changé en "${status}".`,
    });
  };

  // Handle column sorting
  const handleSort = (key: keyof Lead) => {
    setSortKey(key);
    setSortOrder(sortKey === key && sortOrder === "asc" ? "desc" : "asc");
  };

  // Get status badge color based on lead status
  const getStatusBadge = (status: Lead["status"]) => {
    switch (status) {
      case "new":
        return (
          <Badge
            variant="outline"
            className="bg-theme-charcoal text-theme-red border-theme-red"
          >
            Nouveau
          </Badge>
        );
      case "contacted":
        return (
          <Badge
            variant="outline"
            className="bg-theme-charcoal text-yellow-400 border-yellow-400"
          >
            Contacté
          </Badge>
        );
      case "qualified":
        return (
          <Badge
            variant="outline"
            className="bg-theme-charcoal text-blue-400 border-blue-400"
          >
            Qualifié
          </Badge>
        );
      case "converted":
        return (
          <Badge
            variant="outline"
            className="bg-theme-charcoal text-green-400 border-green-400"
          >
            Converti
          </Badge>
        );
      case "lost":
        return (
          <Badge
            variant="outline"
            className="bg-theme-charcoal text-gray-400 border-gray-400"
          >
            Perdu
          </Badge>
        );
      default:
        return <Badge variant="outline">Inconnu</Badge>;
    }
  };

  // Display score with appropriate color
  const getScoreDisplay = (score: number) => {
    let color = "";
    if (score >= 70) {
      color = "bg-green-500";
    } else if (score >= 40) {
      color = "bg-yellow-500";
    } else {
      color = "bg-red-500";
    }

    return (
      <div className="flex items-center">
        <Progress value={score} className={`h-2 w-16 mr-2 ${color}`} />
        <span className="text-gray-300">{score}</span>
      </div>
    );
  };

  // Animation variants
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  const buttonVariants = {
    hover: { scale: 1.1, transition: { duration: 0.3 } },
    tap: { scale: 0.95 },
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-theme-black via-theme-darkRed to-theme-black flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1 }}
            className="flex items-center justify-center mb-4"
          >
            <svg
              className="h-8 w-8 text-theme-red"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </motion.div>
          <p className="text-lg text-gray-300">Chargement du tableau de bord...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-b from-theme-black via-theme-darkRed to-theme-black"
      initial="hidden"
      animate="visible"
      variants={sectionVariants}
    >
      <div className="container mx-auto px-4 py-8">
        <motion.div
          className="flex justify-between items-center mb-8"
          variants={itemVariants}
        >
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Tableau de Bord Admin
            </h1>
            <p className="text-gray-300">
              Gérez vos leads et suivez leur progression
            </p>
          </div>
          <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
            <Button
              className="bg-theme-red hover:bg-theme-brightRed text-white rounded-full"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Déconnexion
            </Button>
          </motion.div>
        </motion.div>

        <Tabs defaultValue="leads" className="mb-8">
          <motion.div variants={itemVariants}>
            <TabsList className="bg-theme-charcoal border-theme-gray/30 mb-6">
              <TabsTrigger
                value="leads"
                className="data-[state=active]:bg-theme-red data-[state=active]:text-white"
              >
                Leads
              </TabsTrigger>
              <TabsTrigger
                value="analytics"
                className="data-[state=active]:bg-theme-red data-[state=active]:text-white"
              >
                Analytiques
              </TabsTrigger>
            </TabsList>
          </motion.div>

          <TabsContent value="leads">
            <motion.div
              className="bg-white bg-opacity-5 rounded-2xl backdrop-blur-sm border border-theme-gray/30 p-6 mb-6"
              variants={itemVariants}
            >
              <motion.div variants={itemVariants}>
                <LeadFilters
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  statusFilter={statusFilter}
                  setStatusFilter={setStatusFilter}
                  serviceFilter={serviceFilter}
                  setServiceFilter={setServiceFilter}
                  dateFilter={dateFilter}
                  setDateFilter={setDateFilter}
                  scoreFilter={scoreFilter}
                  setScoreFilter={setScoreFilter}
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <LeadTable
                  leads={paginatedLeads}
                  onEnrichLead={handleEnrichLead}
                  onScheduleFollowUp={handleScheduleFollowUp}
                  onMarkAsContacted={handleMarkAsContacted}
                  onUpdateStatus={handleUpdateStatus}
                  onSort={handleSort}
                  sortKey={sortKey}
                  sortOrder={sortOrder}
                />
                <LeadPagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </motion.div>
            </motion.div>
          </TabsContent>

          <TabsContent value="analytics">
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={itemVariants}
            >
              {[
                {
                  title: "Vue d'ensemble",
                  description: "Statistiques globales des leads",
                  stats: [
                    { label: "Total des leads", value: leads.length },
                    {
                      label: "Taux de conversion",
                      value: `${Math.round(
                        (leads.filter((l) => l.status === "converted").length /
                          leads.length) *
                        100
                      )}%`,
                    },
                    {
                      label: "Score moyen",
                      value: Math.round(
                        leads.reduce((acc, l) => acc + l.score, 0) /
                        leads.length
                      ),
                    },
                  ],
                },
                {
                  title: "Distribution par service",
                  description: "Répartition des demandes",
                  services: ["branding", "web", "ia", "auto", "other"],
                },
                {
                  title: "Statuts des leads",
                  description: "Progression dans le funnel",
                  statuses: ["new", "contacted", "qualified", "converted", "lost"],
                },
              ].map((card, index) => (
                <motion.div
                  key={card.title}
                  variants={itemVariants}
                  transition={{ delay: index * 0.2 }}
                >
                  <Card className="bg-white bg-opacity-5 border-theme-gray/30 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="text-white">{card.title}</CardTitle>
                      <CardDescription className="text-gray-400">
                        {card.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {card.stats && card.stats.map((stat, i) => (
                          <motion.div
                            key={i}
                            className="flex justify-between items-center"
                            variants={itemVariants}
                            transition={{ delay: i * 0.1 }}
                          >
                            <span className="text-sm text-gray-300">{stat.label}</span>
                            <span className="font-bold text-white">{stat.value}</span>
                          </motion.div>
                        ))}
                        {card.services && card.services.map((service) => {
                          const count = leads.filter(
                            (l) => l.serviceType === service
                          ).length;
                          const percentage = Math.round((count / leads.length) * 100);
                          return (
                            <motion.div
                              key={service}
                              className="space-y-1"
                              variants={itemVariants}
                            >
                              <div className="flex justify-between items-center text-sm text-gray-300">
                                <span>
                                  {service.charAt(0).toUpperCase() + service.slice(1)}
                                </span>
                                <span>{percentage}%</span>
                              </div>
                              <Progress
                                value={percentage}
                                className="h-2 bg-theme-gray/30"
                              />
                            </motion.div>
                          );
                        })}
                        {card.statuses && card.statuses.map((status) => {
                          const count = leads.filter(
                            (l) => l.status === status
                          ).length;
                          const percentage = Math.round(
                            (count / leads.length) * 100
                          );
                          return (
                            <motion.div
                              key={status}
                              className="space-y-1"
                              variants={itemVariants}
                            >
                              <div className="flex justify-between items-center text-sm text-gray-300">
                                <span>
                                  {status.charAt(0).toUpperCase() + status.slice(1)}
                                </span>
                                <span>
                                  {count} ({percentage}%)
                                </span>
                              </div>
                              <Progress
                                value={percentage}
                                className="h-2 bg-theme-gray/30"
                              />
                            </motion.div>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </motion.div>
  );
};

export default AdminDashboard;