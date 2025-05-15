
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import axios from "axios";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    company: "",
    serviceType: "",
    message: "",
    gdprConsent: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, serviceType: value }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, gdprConsent: checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.gdprConsent) {
      toast({
        title: "Consentement requis",
        description:
          "Veuillez accepter le traitement de vos données pour envoyer votre message.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const dataToSend = {
        ...formData,
        createdAt: new Date().toISOString(),
      };

      const response = await axios.post(
        import.meta.env.VITE_N8N_WEBHOOK,
        dataToSend
      );

      toast({
        title: "Message envoyé !",
        description: "Nous vous répondrons dans les plus brefs délais.",
      });

      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        company: "",
        serviceType: "",
        message: "",
        gdprConsent: false,
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description:
          "Une erreur est survenue lors de l'envoi du message. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-theme-black text-white">
      {/* Hero Section - Simplified to match the design in the reference image */}
      <section className="py-20 px-4 md:px-10 lg:px-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8">
            Nous sommes là pour vous aider
          </h1>
        </div>
      </section>

      {/* Contact Form Section - Simplified to match the reference image */}
      <section className="pb-20 px-4 md:px-10 lg:px-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Form */}
            <div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-white">
                    Nom
                  </Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="ex. John Smith"
                    required
                    className="bg-theme-gray/20 border-theme-gray/30 text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white">
                    Adresse email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="ex. exemple@gmail.com"
                    required
                    className="bg-theme-gray/20 border-theme-gray/30 text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-white">
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Dites-nous comment nous pouvons vous aider"
                    rows={6}
                    required
                    className="bg-theme-gray/20 border-theme-gray/30 text-white"
                  />
                </div>

                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="gdprConsent"
                    checked={formData.gdprConsent}
                    onCheckedChange={handleCheckboxChange}
                  />
                  <Label htmlFor="gdprConsent" className="text-sm text-gray-300">
                    J'accepte que mes données soient traitées pour me
                    recontacter concernant ma demande.
                  </Label>
                </div>

                <Button
                  type="submit"
                  className="w-auto bg-white hover:bg-gray-100 text-black rounded-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-black"
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
                      Envoi en cours...
                    </div>
                  ) : (
                    <div className="flex items-center px-4 py-2">
                      Envoyer le message
                    </div>
                  )}
                </Button>
              </form>
            </div>

            {/* Testimonial */}
            <div className="relative">
              <div className="bg-theme-black border border-theme-gray/30 p-8 rounded-lg shadow-lg relative z-10">
                <div className="mb-4">
                  <svg width="120" height="30" viewBox="0 0 120 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="120" height="30" fill="none" />
                    <text x="0" y="20" fontSize="20" fontWeight="bold" fill="white">CommunikAI</text>
                  </svg>
                </div>
                <p className="text-white mb-2">
                  <span className="font-bold">"CommunikAI</span> a réduit les délais de projet de 30%
                </p>
                <p className="text-gray-400 mb-6">
                  et transformé notre communication d'équipe globale,
                  nous faisant gagner des heures chaque semaine."
                </p>
                <svg width="60" height="30" viewBox="0 0 60 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="60" height="30" fill="none" />
                  <text x="0" y="20" fontSize="16" fontWeight="bold" fill="#ea384c">Client</text>
                </svg>
              </div>
              {/* Red glow effect */}
              <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-theme-red/20 rounded-full blur-3xl opacity-70"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer with links - Styled to match reference image */}
      <footer className="py-16 px-4 md:px-10 lg:px-20 bg-theme-black border-t border-theme-gray/20">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between flex-wrap">
            <div className="mb-10">
              <svg width="120" height="30" viewBox="0 0 120 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="120" height="30" fill="none" />
                <text x="0" y="20" fontSize="20" fontWeight="bold" fill="white">CommunikAI</text>
              </svg>
              <div className="flex mt-6 space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"></path>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path>
                  </svg>
                </a>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16">
              <div>
                <h3 className="text-white font-semibold mb-4">Entreprise</h3>
                <ul className="space-y-3">
                  <li><a href="/equipe" className="text-gray-400 hover:text-white">À propos</a></li>
                  <li><a href="/contact" className="text-gray-400 hover:text-white">Contactez-nous</a></li>
                  <li><a href="/services" className="text-gray-400 hover:text-white">Services</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-white font-semibold mb-4">Produit</h3>
                <ul className="space-y-3">
                  <li><a href="/services" className="text-gray-400 hover:text-white">Fonctionnalités</a></li>
                  <li><a href="/services" className="text-gray-400 hover:text-white">Intégrations</a></li>
                  <li><a href="/pricing" className="text-gray-400 hover:text-white">Tarifs</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-white font-semibold mb-4">Ressources</h3>
                <ul className="space-y-3">
                  <li><a href="/blog" className="text-gray-400 hover:text-white">Blog</a></li>
                  <li><a href="/help" className="text-gray-400 hover:text-white">Centre d'aide</a></li>
                  <li><a href="/realisations" className="text-gray-400 hover:text-white">Réalisations</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-white font-semibold mb-4">Plateforme</h3>
                <ul className="space-y-3">
                  <li><a href="/dashboard" className="text-gray-400 hover:text-white">Dashboard</a></li>
                  <li><a href="/infrastructure" className="text-gray-400 hover:text-white">Infrastructure</a></li>
                  <li><a href="/security" className="text-gray-400 hover:text-white">Sécurité</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Contact;
