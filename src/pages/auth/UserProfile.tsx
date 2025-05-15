import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { User } from "lucide-react";

const UserProfile = () => {
  const { currentUser, updateUserProfile, signOut } = useAuth();
  const [displayName, setDisplayName] = useState(
    currentUser?.displayName || ""
  );
  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);

    try {
      await updateUserProfile(displayName);
    } catch (error) {
      console.error("Failed to update profile:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Failed to sign out:", error);
    }
  };

  if (!currentUser) {
    return (
      <div className="min-h-[80vh] bg-gradient-to-b from-theme-black via-theme-darkRed to-theme-black flex items-center justify-center">
        <Card className="w-full max-w-md bg-white bg-opacity-5 border-theme-gray/30 backdrop-blur-sm">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-gray-300">Vous n'êtes pas connecté.</p>
              <Button className="mt-4 bg-theme-red text-white hover:bg-theme-brightRed rounded-full">
                <a href="/auth/login">Se connecter</a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] bg-gradient-to-b from-theme-black via-theme-darkRed to-theme-black flex items-center justify-center">
      <Card className="w-full max-w-md bg-white bg-opacity-5 border-theme-gray/30 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-white">Votre profil</CardTitle>
          <CardDescription className="text-gray-400">Gérer vos informations personnelles</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex justify-center">
            {currentUser.photoURL ? (
              <img
                src={currentUser.photoURL}
                alt="Profile"
                className="h-24 w-24 rounded-full object-cover border-2 border-theme-red"
              />
            ) : (
              <div className="h-24 w-24 rounded-full bg-theme-charcoal flex items-center justify-center">
                <User className="h-12 w-12 text-gray-400" />
              </div>
            )}
          </div>

          <div className="space-y-1">
            <Label className="text-sm text-gray-400">Email</Label>
            <p className="font-medium text-gray-300">{currentUser.email}</p>
          </div>

          <form onSubmit={handleUpdateProfile} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="displayName" className="text-gray-300">Nom d'affichage</Label>
              <Input
                id="displayName"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Votre nom"
                className="bg-theme-charcoal border-theme-gray/30 text-gray-300 placeholder-gray-400"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-theme-red text-white hover:bg-theme-brightRed rounded-full"
              disabled={isUpdating}
            >
              {isUpdating ? (
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
                  Mise à jour...
                </div>
              ) : (
                "Mettre à jour le profil"
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button
            variant="outline"
            className="w-full bg-theme-charcoal border-theme-gray/30 text-gray-300 hover:bg-theme-red hover:text-white rounded-full"
            onClick={handleLogout}
          >
            Se déconnecter
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default UserProfile;