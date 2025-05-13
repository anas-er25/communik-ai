
import { useToast, toast } from "@/hooks/use-toast";

// Enhanced toast with our theme colors
const enhancedToast = {
  ...toast,
  success: (message: string) => 
    toast({
      title: "Success",
      description: message,
      variant: "default",
      className: "bg-gradient-to-r from-theme-darkRed to-theme-red text-white border-theme-red/20",
    }),
  error: (message: string) => 
    toast({
      title: "Error",
      description: message,
      variant: "destructive",
      className: "bg-gradient-to-r from-theme-black to-theme-darkRed text-white border-theme-red/20",
    }),
  info: (message: string) => 
    toast({
      title: "Info",
      description: message,
      variant: "default",
      className: "bg-gradient-to-r from-theme-black to-theme-gray text-white border-theme-gray/20",
    })
};

export { useToast, enhancedToast as toast };
