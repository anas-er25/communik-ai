
import { createContext, useState, useEffect, useContext, ReactNode } from "react";
import {
  auth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  signInWithPopup,
  googleProvider,
  githubProvider,
  User,
  updateProfile,
} from "@/lib/firebase";
import { useToast } from "@/components/ui/use-toast";

type AuthContextType = {
  currentUser: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, displayName: string) => Promise<void>;
  signOut: () => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signInWithGithub: () => Promise<void>;
  updateUserProfile: (displayName: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast({
        title: "Connecté avec succès",
        description: "Bienvenue sur CommunikAI !",
      });
    } catch (error: any) {
      let message = "Une erreur est survenue lors de la connexion";
      if (error.code === "auth/user-not-found" || error.code === "auth/wrong-password") {
        message = "Email ou mot de passe incorrect";
      }
      toast({
        variant: "destructive",
        title: "Erreur de connexion",
        description: message,
      });
      throw error;
    }
  };

  const signUp = async (email: string, password: string, displayName: string) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      if (result.user) {
        await updateProfile(result.user, { displayName });
      }
      toast({
        title: "Compte créé avec succès",
        description: "Bienvenue sur CommunikAI !",
      });
    } catch (error: any) {
      let message = "Une erreur est survenue lors de la création du compte";
      if (error.code === "auth/email-already-in-use") {
        message = "Cet email est déjà utilisé";
      } else if (error.code === "auth/weak-password") {
        message = "Le mot de passe est trop faible";
      }
      toast({
        variant: "destructive",
        title: "Erreur d'inscription",
        description: message,
      });
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      toast({
        title: "Déconnexion réussie",
        description: "À bientôt !",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur de déconnexion",
        description: "Une erreur est survenue lors de la déconnexion",
      });
      throw error;
    }
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      toast({
        title: "Connecté avec succès",
        description: "Bienvenue sur CommunikAI !",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur de connexion",
        description: "Une erreur est survenue lors de la connexion avec Google",
      });
      throw error;
    }
  };

  const signInWithGithub = async () => {
    try {
      await signInWithPopup(auth, githubProvider);
      toast({
        title: "Connecté avec succès",
        description: "Bienvenue sur CommunikAI !",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur de connexion",
        description: "Une erreur est survenue lors de la connexion avec GitHub",
      });
      throw error;
    }
  };

  const updateUserProfile = async (displayName: string) => {
    try {
      if (currentUser) {
        await updateProfile(currentUser, { displayName });
        // Force refresh the user
        setCurrentUser({ ...currentUser, displayName });
        toast({
          title: "Profil mis à jour",
          description: "Votre profil a été mis à jour avec succès",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur de mise à jour",
        description: "Une erreur est survenue lors de la mise à jour du profil",
      });
      throw error;
    }
  };

  const value = {
    currentUser,
    loading,
    signIn,
    signUp,
    signOut,
    signInWithGoogle,
    signInWithGithub,
    updateUserProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
