
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from "@/components/ui/use-toast";
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    serviceType: '',
    message: '',
    gdprConsent: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, serviceType: value }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, gdprConsent: checked }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.gdprConsent) {
      toast({
        title: "Consentement requis",
        description: "Veuillez accepter le traitement de vos données pour envoyer votre message.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // Simuler un envoi de formulaire
    setTimeout(() => {
      console.log("Form submitted:", formData);
      
      toast({
        title: "Message envoyé !",
        description: "Nous vous répondrons dans les plus brefs délais.",
      });

      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        company: '',
        serviceType: '',
        message: '',
        gdprConsent: false,
      });
      
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-communikAI-blue text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Contactez-nous
            </h1>
            <p className="text-xl text-gray-200">
              Une question, un projet à discuter ? Nous sommes à votre écoute.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Info */}
              <div className="bg-gray-50 p-8 rounded-lg">
                <h2 className="text-2xl font-bold mb-6">Informations de contact</h2>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-communikAI-purple bg-opacity-10 p-3 rounded-full">
                      <MapPin className="text-communikAI-purple h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Adresse</h3>
                      <p className="text-gray-600">123 Rue de l'Innovation, 75000 Paris</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="bg-communikAI-purple bg-opacity-10 p-3 rounded-full">
                      <Mail className="text-communikAI-purple h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Email</h3>
                      <p className="text-gray-600">contact@communik-ai.fr</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="bg-communikAI-purple bg-opacity-10 p-3 rounded-full">
                      <Phone className="text-communikAI-purple h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Téléphone</h3>
                      <p className="text-gray-600">+33 1 23 45 67 89</p>
                    </div>
                  </div>
                </div>

                <div className="mt-12">
                  <h2 className="text-2xl font-bold mb-6">Horaires d'ouverture</h2>
                  <div className="space-y-2">
                    <p className="flex justify-between">
                      <span className="font-medium">Lundi - Vendredi</span>
                      <span className="text-gray-600">9h - 18h</span>
                    </p>
                    <p className="flex justify-between">
                      <span className="font-medium">Samedi</span>
                      <span className="text-gray-600">Sur rendez-vous</span>
                    </p>
                    <p className="flex justify-between">
                      <span className="font-medium">Dimanche</span>
                      <span className="text-gray-600">Fermé</span>
                    </p>
                  </div>
                </div>

                <div className="mt-12">
                  <h2 className="text-2xl font-bold mb-6">Suivez-nous</h2>
                  <div className="flex space-x-4">
                    <a href="#" className="bg-gray-200 hover:bg-communikAI-purple hover:text-white transition-colors p-3 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                      </svg>
                    </a>
                    <a href="#" className="bg-gray-200 hover:bg-communikAI-purple hover:text-white transition-colors p-3 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                      </svg>
                    </a>
                    <a href="#" className="bg-gray-200 hover:bg-communikAI-purple hover:text-white transition-colors p-3 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                        <rect x="2" y="9" width="4" height="12"></rect>
                        <circle cx="4" cy="4" r="2"></circle>
                      </svg>
                    </a>
                    <a href="#" className="bg-gray-200 hover:bg-communikAI-purple hover:text-white transition-colors p-3 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>

              {/* Form */}
              <div>
                <h2 className="text-2xl font-bold mb-6">Envoyez-nous un message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">Prénom <span className="text-red-500">*</span></Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="Votre prénom"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Nom <span className="text-red-500">*</span></Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Votre nom"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email <span className="text-red-500">*</span></Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="votre@email.com"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company">Entreprise</Label>
                      <Input
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Nom de votre entreprise (optionnel)"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="serviceType">Type de service <span className="text-red-500">*</span></Label>
                    <Select onValueChange={handleSelectChange} value={formData.serviceType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez un service" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="branding">Branding</SelectItem>
                        <SelectItem value="web">Création de site web</SelectItem>
                        <SelectItem value="ia">Stratégie IA</SelectItem>
                        <SelectItem value="auto">Automatisation</SelectItem>
                        <SelectItem value="other">Autre</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message <span className="text-red-500">*</span></Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Décrivez votre projet ou votre demande"
                      rows={6}
                      required
                    />
                  </div>

                  <div className="flex items-start space-x-2">
                    <Checkbox 
                      id="gdprConsent" 
                      checked={formData.gdprConsent}
                      onCheckedChange={handleCheckboxChange}
                    />
                    <Label htmlFor="gdprConsent" className="text-sm text-gray-600">
                      J'accepte que mes données soient traitées pour me recontacter concernant ma demande. 
                      Pour en savoir plus sur la gestion de vos données et vos droits, consultez notre politique de confidentialité.
                    </Label>
                  </div>

                  <Button 
                    type="submit" 
                    className="btn-primary w-full" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Envoi en cours...
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <Send className="mr-2 h-5 w-5" />
                        Envoyer ma demande
                      </div>
                    )}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="section-padding bg-gray-50 py-0">
        <div className="h-96 w-full bg-gray-300 flex items-center justify-center">
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-2">Carte Google Maps</h3>
            <p className="text-gray-600">Une carte interactive serait intégrée ici</p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Questions fréquentes</h2>
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold mb-3">Quel est le délai moyen pour un projet ?</h3>
                <p className="text-gray-600">
                  La durée dépend de la complexité du projet. Un site vitrine simple peut prendre 2-3 semaines, 
                  tandis qu'un projet plus complexe nécessitera 2-3 mois. Nous établissons toujours un calendrier précis au démarrage.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3">Comment se déroule la collaboration ?</h3>
                <p className="text-gray-600">
                  Nous commençons par un appel ou une réunion pour comprendre vos besoins, puis nous établissons une proposition 
                  détaillée. Une fois validée, nous travaillons par étapes avec des points de validation réguliers.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3">Proposez-vous un support après la livraison du projet ?</h3>
                <p className="text-gray-600">
                  Oui, nous offrons un support technique après la livraison et proposons également des contrats de maintenance 
                  pour assurer le bon fonctionnement et l'évolution de votre projet.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3">Quel est le coût moyen d'un projet ?</h3>
                <p className="text-gray-600">
                  Les tarifs varient en fonction de la nature et de l'ampleur du projet. Nous établissons des devis personnalisés 
                  après avoir évalué précisément vos besoins. N'hésitez pas à nous contacter pour obtenir une estimation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
