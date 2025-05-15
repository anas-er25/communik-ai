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
import { Mail, Phone, MapPin, Send, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
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

  // Animation variants for sections
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  // Animation variants for form fields and contact info
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  // Animation variants for buttons
  const buttonVariants = {
    hover: { scale: 1.1, transition: { duration: 0.3 } },
    tap: { scale: 0.95 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-theme-black via-theme-darkRed to-theme-black">
      {/* Hero Section */}
      <motion.section
        className="relative py-20 overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1
              className="text-4xl md:text-6xl font-bold mb-6 text-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Transformons vos idées en{" "}
              <span className="text-theme-red">réalité</span>
            </motion.h1>
            <motion.p
              className="text-xl text-gray-300 mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Une question ? Un projet ? Nous sommes là pour vous accompagner dans
              votre transformation digitale.
            </motion.p>
            <motion.div
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <a href="#form" className="inline-flex items-center">
                <Button className="bg-theme-red hover:bg-theme-brightRed text-white px-8 py-6 rounded-full">
                  Commencer un projet
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </motion.div>
                </Button>
              </a>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Contact Section */}
      <motion.section
        className="py-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
            {/* Contact Info */}
            <div className="space-y-12">
              <motion.div variants={itemVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <h2 className="text-3xl font-bold text-white mb-8">
                  Parlons de votre projet
                </h2>
                <p className="text-gray-300 mb-8">
                  Que vous ayez un projet concret ou simplement une idée, nous
                  sommes là pour échanger et vous conseiller sur les meilleures
                  solutions pour votre entreprise.
                </p>
              </motion.div>

              <div className="space-y-6">
                {[
                  {
                    icon: <MapPin className="h-6 w-6 text-theme-red" />,
                    title: "Notre bureau",
                    content: "123 Rue de l'Innovation, 75000 Paris",
                  },
                  {
                    icon: <Mail className="h-6 w-6 text-theme-red" />,
                    title: "Email",
                    content: "contact@communik-ai.fr",
                  },
                  {
                    icon: <Phone className="h-6 w-6 text-theme-red" />,
                    title: "Téléphone",
                    content: "+33 1 23 45 67 89",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center space-x-4 text-gray-300"
                    variants={itemVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 }}
                  >
                    <motion.div
                      className="bg-theme-red bg-opacity-20 p-3 rounded-full"
                      whileHover={{ scale: 1.2 }}
                      transition={{ duration: 0.3 }}
                    >
                      {item.icon}
                    </motion.div>
                    <div>
                      <h3 className="font-semibold text-white">{item.title}</h3>
                      <p>{item.content}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                className="border-t border-gray-700 pt-8"
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <h3 className="text-xl font-semibold text-white mb-4">
                  Nos horaires
                </h3>
                <div className="space-y-2 text-gray-300">
                  {[
                    { day: "Lundi - Vendredi", hours: "10h - 18h" },
                    { day: "Samedi", hours: "Sur rendez-vous" },
                    { day: "Dimanche", hours: "Fermé" },
                  ].map((schedule, index) => (
                    <motion.div
                      key={index}
                      className="flex justify-between"
                      variants={itemVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <span>{schedule.day}</span>
                      <span>{schedule.hours}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Contact Form */}
            <motion.div
              id="form"
              className="bg-white bg-opacity-5 p-8 rounded-2xl backdrop-blur-sm border border-gray-600"
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.h2
                className="text-2xl font-bold text-white mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Envoyez-nous un message
              </motion.h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <motion.div
                  className="grid grid-cols-1 sm:grid-cols-2 gap-6"
                  variants={itemVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-white">
                      Prénom <RequiredCp />
                    </Label>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="Votre prénom"
                        required
                        className="bg-white bg-opacity-5 border-gray-500 text-white placeholder-gray-400"
                      />
                    </motion.div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-white">
                      Nom <RequiredCp />
                    </Label>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Input
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Votre nom"
                        required
                        className="bg-white bg-opacity-5 border-gray-500 text-white placeholder-gray-400"
                      />
                    </motion.div>
                  </div>
                </motion.div>

                <motion.div
                  className="grid grid-cols-1 sm:grid-cols-2 gap-6"
                  variants={itemVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                >
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-white">
                      Email <RequiredCp />
                    </Label>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="votre@email.com"
                        required
                        className="bg-white bg-opacity-5 border-gray-500 text-white placeholder-gray-400"
                      />
                    </motion.div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phoneNumber" className="text-white">
                      Téléphone
                    </Label>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Input
                        id="phoneNumber"
                        name="phoneNumber"
                        type="tel"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        placeholder="Votre numéro"
                        className="bg-white bg-opacity-5 border-gray-500 text-white placeholder-gray-400"
                      />
                    </motion.div>
                  </div>
                </motion.div>

                <motion.div
                  className="space-y-2"
                  variants={itemVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  <Label htmlFor="company" className="text-white">
                    Entreprise
                  </Label>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Input
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Nom de votre entreprise"
                      className="bg-white bg-opacity-5 border-gray-500 text-white placeholder-gray-400"
                    />
                  </motion.div>
                </motion.div>

                <motion.div
                  className="space-y-2"
                  variants={itemVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  <Label htmlFor="serviceType" className="text-white">
                    Type de service <RequiredCp />
                  </Label>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Select
                      value={formData.serviceType}
                      onValueChange={handleSelectChange}
                    >
                      <SelectTrigger className="bg-white bg-opacity-5 border-gray-500 text-white">
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
                  </motion.div>
                </motion.div>

                <motion.div
                  className="space-y-2"
                  variants={itemVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                >
                  <Label htmlFor="message" className="text-white">
                    Message <RequiredCp />
                  </Label>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Décrivez votre projet"
                      rows={6}
                      required
                      className="bg-white bg-opacity-5 border-gray-500 text-white placeholder-gray-400"
                    />
                  </motion.div>
                </motion.div>

                <motion.div
                  className="flex items-start space-x-3"
                  variants={itemVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                >
                  <Checkbox
                    id="gdprConsent"
                    checked={formData.gdprConsent}
                    onCheckedChange={handleCheckboxChange}
                    className="mt-1"
                  />
                  <Label
                    htmlFor="gdprConsent"
                    className="text-sm text-gray-300 leading-relaxed"
                  >
                    J'accepte que mes données soient traitées pour me recontacter
                    concernant ma demande. Pour en savoir plus sur la gestion de
                    vos données et vos droits, consultez notre politique de
                    confidentialité.
                  </Label>
                </motion.div>

                <motion.div
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <Button
                    type="submit"
                    className="w-full bg-theme-red hover:bg-theme-brightRed text-white"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center">
                        <motion.svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          animate={{ rotate: 360 }}
                          transition={{ repeat: Infinity, duration: 1 }}
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
                        </motion.svg>
                        Envoi en cours...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        <motion.div
                          animate={{ x: [0, 5, 0] }}
                          transition={{ repeat: Infinity, duration: 1.5 }}
                        >
                          <Send className="mr-2 h-5 w-5" />
                        </motion.div>
                        Envoyer le message
                      </div>
                    )}
                  </Button>
                </motion.div>
              </form>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Map Section */}
      <motion.section
        className="py-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              className="overflow-hidden rounded-2xl border border-gray-800"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <iframe
                title="Carte Google Maps"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2879.2712013001124!2d-8.030016025224263!3d31.640861541180602!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xdafef96ad478ef9%3A0x9a4265bf810cd3da!2sCOMMUNIK!5e1!3m2!1sen!2sma!4v1746218886829!5m2!1sen!2sma"
                width="100%"
                height="400"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default Contact;

const RequiredCp = () => {
  return (
    <motion.span
      className="text-theme-red"
      animate={{ scale: [1, 1.2, 1] }}
      transition={{ repeat: Infinity, duration: 2 }}
    >
      *
    </motion.span>
  );
};