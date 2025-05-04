import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { LogOut, Filter, User, Mail, Building, Calendar, Send, RefreshCw, Search, Plus } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { enrichLead } from '@/lib/lead-enrichment';
import { scheduleFollowUp } from '@/lib/lead-automation';
import { mockLeads } from '@/data/mock-leads';
import axios from 'axios';

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
  status: 'new' | 'contacted' | 'qualified' | 'converted' | 'lost';
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
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [serviceFilter, setServiceFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [scoreFilter, setScoreFilter] = useState('all');

  // Load leads when component mounts
  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const response = await axios.get(
          `https://sheets.googleapis.com/v4/spreadsheets/${import.meta.env.VITE_SHEET_SHARE}/values/Sheet1?key=${import.meta.env.VITE_GOOGLE_API_KEY}`
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
            status: 'new',
            score: Math.floor(Math.random() * 100),
            enriched: false
          };
        });

        setLeads(leadsData);
        setFilteredLeads(leadsData);
      } catch (error) {
        console.error('Erreur de chargement Google Sheets:', error);
        toast({
          title: "Erreur",
          description: "Impossible de charger les données depuis Google Sheets.",
          variant: "destructive"
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
        description: "Vous avez été déconnecté avec succès."
      });
      navigate('/auth/login');
    } catch (error) {
      console.error('Error signing out:', error);
      toast({
        title: "Erreur de déconnexion",
        description: "Une erreur est survenue lors de la déconnexion.",
        variant: "destructive"
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
        filtered = filtered.filter(lead =>
          lead.firstName.toLowerCase().includes(searchLower) ||
          lead.lastName.toLowerCase().includes(searchLower) ||
          lead.email.toLowerCase().includes(searchLower) ||
          lead.company.toLowerCase().includes(searchLower)
        );
      }

      // Status filter
      if (statusFilter !== 'all') {
        filtered = filtered.filter(lead => lead.status === statusFilter);
      }

      // Service filter
      if (serviceFilter !== 'all') {
        filtered = filtered.filter(lead => lead.serviceType === serviceFilter);
      }

      // Date filter
      if (dateFilter !== 'all') {
        const now = new Date();
        const cutoffDate = new Date();

        if (dateFilter === 'today') {
          cutoffDate.setDate(now.getDate() - 1);
        } else if (dateFilter === 'week') {
          cutoffDate.setDate(now.getDate() - 7);
        } else if (dateFilter === 'month') {
          cutoffDate.setMonth(now.getMonth() - 1);
        }

        filtered = filtered.filter(lead => new Date(lead.createdAt) >= cutoffDate);
      }

      // Score filter
      if (scoreFilter !== 'all') {
        if (scoreFilter === 'high') {
          filtered = filtered.filter(lead => lead.score >= 70);
        } else if (scoreFilter === 'medium') {
          filtered = filtered.filter(lead => lead.score >= 40 && lead.score < 70);
        } else if (scoreFilter === 'low') {
          filtered = filtered.filter(lead => lead.score < 40);
        }
      }

      setFilteredLeads(filtered);
    }
  }, [searchTerm, statusFilter, serviceFilter, dateFilter, scoreFilter, leads, isLoading]);

  // Enrich a lead with additional data
  const handleEnrichLead = async (leadId: string) => {
    try {
      const leadIndex = leads.findIndex(lead => lead.id === leadId);
      if (leadIndex === -1) return;

      toast({
        title: "Enrichissement en cours",
        description: "Recherche d'informations complémentaires...",
      });

      // In a real app, this would call an API like Clearbit
      const enrichedData = await enrichLead(leads[leadIndex].email, leads[leadIndex].company);

      // Update the lead with enriched data
      const updatedLeads = [...leads];
      updatedLeads[leadIndex] = {
        ...updatedLeads[leadIndex],
        enriched: true,
        enrichmentData: enrichedData
      };

      setLeads(updatedLeads);

      toast({
        title: "Enrichissement terminé",
        description: "Les données complémentaires ont été ajoutées."
      });
    } catch (error) {
      toast({
        title: "Erreur d'enrichissement",
        description: "Impossible d'enrichir ce lead actuellement.",
        variant: "destructive"
      });
    }
  };

  // Schedule an automated follow-up
  const handleScheduleFollowUp = async (leadId: string) => {
    try {
      const leadIndex = leads.findIndex(lead => lead.id === leadId);
      if (leadIndex === -1) return;

      toast({
        title: "Programmation de suivi",
        description: "Configuration du suivi automatisé...",
      });

      const lead = leads[leadIndex];

      // In a real app, this would set up an automation workflow
      const nextFollowUp = await scheduleFollowUp(lead);

      // Update the lead with follow-up data
      const updatedLeads = [...leads];
      updatedLeads[leadIndex] = {
        ...updatedLeads[leadIndex],
        nextFollowUp: nextFollowUp
      };

      setLeads(updatedLeads);

      toast({
        title: "Suivi programmé",
        description: `Le prochain contact est programmé pour ${new Date(nextFollowUp).toLocaleDateString()}.`
      });
    } catch (error) {
      toast({
        title: "Erreur de programmation",
        description: "Impossible de programmer le suivi actuellement.",
        variant: "destructive"
      });
    }
  };

  // Mark a lead as contacted
  const handleMarkAsContacted = (leadId: string) => {
    const leadIndex = leads.findIndex(lead => lead.id === leadId);
    if (leadIndex === -1) return;

    const updatedLeads = [...leads];
    updatedLeads[leadIndex] = {
      ...updatedLeads[leadIndex],
      status: 'contacted' as const,
      lastContact: new Date().toISOString()
    };

    setLeads(updatedLeads);

    toast({
      title: "Statut mis à jour",
      description: "Le lead a été marqué comme contacté."
    });
  };

  // Update lead status
  const handleUpdateStatus = (leadId: string, status: Lead['status']) => {
    const leadIndex = leads.findIndex(lead => lead.id === leadId);
    if (leadIndex === -1) return;

    const updatedLeads = [...leads];
    updatedLeads[leadIndex] = {
      ...updatedLeads[leadIndex],
      status: status
    };

    setLeads(updatedLeads);

    toast({
      title: "Statut mis à jour",
      description: `Le statut du lead a été changé en "${status}".`
    });
  };

  // Get status badge color based on lead status
  const getStatusBadge = (status: Lead['status']) => {
    switch (status) {
      case 'new':
        return <Badge variant="outline" className="bg-blue-100 text-blue-600 hover:bg-blue-100">Nouveau</Badge>;
      case 'contacted':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-600 hover:bg-yellow-100">Contacté</Badge>;
      case 'qualified':
        return <Badge variant="outline" className="bg-purple-100 text-purple-600 hover:bg-purple-100">Qualifié</Badge>;
      case 'converted':
        return <Badge variant="outline" className="bg-green-100 text-green-600 hover:bg-green-100">Converti</Badge>;
      case 'lost':
        return <Badge variant="outline" className="bg-gray-100 text-gray-600 hover:bg-gray-100">Perdu</Badge>;
      default:
        return <Badge variant="outline">Inconnu</Badge>;
    }
  };

  // Display score with appropriate color
  const getScoreDisplay = (score: number) => {
    let color = '';
    if (score >= 70) {
      color = 'bg-green-500';
    } else if (score >= 40) {
      color = 'bg-yellow-500';
    } else {
      color = 'bg-red-500';
    }

    return (
      <div className="flex items-center">
        <Progress value={score} className={`h-2 w-16 mr-2 ${color}`} />
        <span>{score}</span>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="container flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="flex items-center justify-center mb-4">
            <svg className="animate-spin h-8 w-8 text-communikAI-purple" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
          <p className="text-lg">Chargement du tableau de bord...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Tableau de Bord Admin</h1>
          <p className="text-gray-600">Gérez vos leads et suivez leur progression</p>
        </div>
        <Button variant="outline" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          Déconnexion
        </Button>
      </div>

      <Tabs defaultValue="leads" className="mb-8">
        <TabsList className="mb-6">
          <TabsTrigger value="leads">Leads</TabsTrigger>
          <TabsTrigger value="analytics">Analytiques</TabsTrigger>
        </TabsList>

        <TabsContent value="leads">
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex flex-col md:flex-row md:items-end gap-4 mb-6">
              <div className="flex-grow">
                <label className="block text-sm font-medium text-gray-700 mb-1">Recherche</label>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Rechercher par nom, email, entreprise..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Statut</label>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Tous les statuts" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tous les statuts</SelectItem>
                      <SelectItem value="new">Nouveaux</SelectItem>
                      <SelectItem value="contacted">Contactés</SelectItem>
                      <SelectItem value="qualified">Qualifiés</SelectItem>
                      <SelectItem value="converted">Convertis</SelectItem>
                      <SelectItem value="lost">Perdus</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Service</label>
                  <Select value={serviceFilter} onValueChange={setServiceFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Tous les services" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tous les services</SelectItem>
                      <SelectItem value="branding">Branding</SelectItem>
                      <SelectItem value="web">Site web</SelectItem>
                      <SelectItem value="ia">Stratégie IA</SelectItem>
                      <SelectItem value="auto">Automatisation</SelectItem>
                      <SelectItem value="other">Autre</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <Select value={dateFilter} onValueChange={setDateFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Toutes les dates" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Toutes les dates</SelectItem>
                      <SelectItem value="today">Aujourd'hui</SelectItem>
                      <SelectItem value="week">Cette semaine</SelectItem>
                      <SelectItem value="month">Ce mois</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Score</label>
                  <Select value={scoreFilter} onValueChange={setScoreFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Tous les scores" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tous les scores</SelectItem>
                      <SelectItem value="high">Élevé (70+)</SelectItem>
                      <SelectItem value="medium">Moyen (40-69)</SelectItem>
                      <SelectItem value="low">Faible (0-39)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Contact</TableHead>
                    <TableHead>Service</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Score</TableHead>
                    <TableHead>Enrichi</TableHead>
                    <TableHead>Suivi</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLeads.length > 0 ? (
                    filteredLeads.map((lead) => (
                      <TableRow key={lead.id}>
                        <TableCell>
                          <div className="font-medium">{lead.firstName} {lead.lastName}</div>
                          <div className="text-sm text-muted-foreground">{lead.email}</div>
                          {lead.company && <div className="text-sm text-muted-foreground">{lead.company}</div>}
                        </TableCell>
                        <TableCell>{lead.serviceType}</TableCell>
                        <TableCell>{new Date(lead.createdAt).toLocaleDateString()}</TableCell>
                        <TableCell>{getStatusBadge(lead.status)}</TableCell>
                        <TableCell>{getScoreDisplay(lead.score)}</TableCell>
                        <TableCell>
                          {lead.enriched ? (
                            <Badge variant="outline" className="bg-green-100 text-green-600 hover:bg-green-100">Enrichi</Badge>
                          ) : (
                            <Badge variant="outline" className="bg-gray-100 text-gray-600 hover:bg-gray-100">Non</Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          {lead.nextFollowUp ? (
                            <span className="text-sm">{new Date(lead.nextFollowUp).toLocaleDateString()}</span>
                          ) : (
                            <span className="text-sm text-gray-500">Non planifié</span>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            <Button variant="outline" size="sm" onClick={() => handleEnrichLead(lead.id)} disabled={lead.enriched}>
                              <Plus className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => handleScheduleFollowUp(lead.id)}>
                              <Calendar className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => handleMarkAsContacted(lead.id)} disabled={lead.status !== 'new'}>
                              <Send className="h-4 w-4" />
                            </Button>
                            <Select onValueChange={(value) => handleUpdateStatus(lead.id, value as Lead['status'])}>
                              <SelectTrigger className="h-8 w-[140px]">
                                <SelectValue placeholder="Changer statut" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="new">Nouveau</SelectItem>
                                <SelectItem value="contacted">Contacté</SelectItem>
                                <SelectItem value="qualified">Qualifié</SelectItem>
                                <SelectItem value="converted">Converti</SelectItem>
                                <SelectItem value="lost">Perdu</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={9} className="text-center py-8">
                        <div className="text-muted-foreground">Aucun lead ne correspond à vos critères de recherche</div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="analytics">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Vue d'ensemble</CardTitle>
                <CardDescription>Statistiques globales des leads</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Total des leads</span>
                    <span className="font-bold">{leads.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Taux de conversion</span>
                    <span className="font-bold">
                      {Math.round((leads.filter(l => l.status === 'converted').length / leads.length) * 100)}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Score moyen</span>
                    <span className="font-bold">
                      {Math.round(leads.reduce((acc, l) => acc + l.score, 0) / leads.length)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Distribution par service</CardTitle>
                <CardDescription>Répartition des demandes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {['branding', 'web', 'ia', 'auto', 'other'].map(service => {
                    const count = leads.filter(l => l.serviceType === service).length;
                    const percentage = Math.round((count / leads.length) * 100);

                    return (
                      <div key={service} className="space-y-1">
                        <div className="flex justify-between items-center text-sm">
                          <span>{service.charAt(0).toUpperCase() + service.slice(1)}</span>
                          <span>{percentage}%</span>
                        </div>
                        <Progress value={percentage} className="h-2" />
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Statuts des leads</CardTitle>
                <CardDescription>Progression dans le funnel</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {['new', 'contacted', 'qualified', 'converted', 'lost'].map(status => {
                    const count = leads.filter(l => l.status === status).length;
                    const percentage = Math.round((count / leads.length) * 100);

                    return (
                      <div key={status} className="space-y-1">
                        <div className="flex justify-between items-center text-sm">
                          <span>{status.charAt(0).toUpperCase() + status.slice(1)}</span>
                          <span>{count} ({percentage}%)</span>
                        </div>
                        <Progress value={percentage} className="h-2" />
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
