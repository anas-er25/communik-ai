import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { auth } from "@/lib/firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import { useToast } from "@/components/ui/use-toast";
import { Mail } from "lucide-react";

const PasswordReset = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await sendPasswordResetEmail(auth, email);
      setIsSubmitted(true);
      toast({
        title: "Email envoyé",
        description: "Vérifiez votre boîte mail pour réinitialiser votre mot de passe.",
      });
    } catch (error: any) {
      let message = "Une erreur est survenue";
      if (error.code === "auth/user-not-found") {
        message = "Aucun compte associé à cet email";
      } else if (error.code === "auth/invalid-email") {
        message = "L'adresse email est invalide";
      }
      toast({
        variant: "destructive",
        title: "Erreur",
        description: message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] bg-gradient-to-b from-theme-black via-theme-darkRed to-theme-black flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white bg-opacity-5 border-theme-gray/30 backdrop-blur-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-white">
            Réinitialiser le mot de passe
          </CardTitle>
          <CardDescription className="text-gray-400">
            Nous vous enverrons un lien pour réinitialiser votre mot de passe
          </CardDescription>
        </CardHeader>

        {isSubmitted ? (
          <CardContent className="space-y-4">
            <div className="bg-theme-charcoal/60 p-4 rounded-md text-gray-300">
              <p className="text-center">
                Un email a été envoyé à{" "}
                <span className="font-medium text-white">{email}</span>. Veuillez vérifier
                votre boîte de réception et suivre les instructions.
              </p>
            </div>
            <div className="flex justify-center">
              <Link to="/auth/login">
                <Button variant="outline" className="mt-4 bg-theme-gray/50 border-theme-gray/30 text-gray-300 hover:bg-theme-red hover:text-white rounded-full">
                  Retour à la page de connexion
                </Button>
              </Link>
            </div>
          </CardContent>
        ) : (
          <form onSubmit={handleResetPassword}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-300">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="votre@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-9 bg-theme-charcoal border-theme-gray/30 text-gray-300 placeholder-gray-400"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-theme-red text-white hover:bg-theme-brightRed rounded-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
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
                  "Envoyer le lien de réinitialisation"
                )}
              </Button>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <div className="text-center text-sm">
                <Link
                  to="/auth/login"
                  className="text-gray-300 hover:text-theme-brightRed"
                >
                  Retour à la connexion
                </Link>
              </div>
            </CardFooter>
          </form>
        )}
      </Card>
    </div>
  );
};

export default PasswordReset;