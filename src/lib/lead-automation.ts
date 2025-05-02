
/**
 * Lead automation service
 * In a real application, this would connect to an automation platform like n8n or Zapier
 * For this demo, it simulates scheduling automation with mock data
 */

interface Lead {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  serviceType: string;
  message: string;
  createdAt: string;
  status: 'new' | 'contacted' | 'qualified' | 'converted' | 'lost';
  score: number;
  enriched: boolean;
}

export async function scheduleFollowUp(lead: Lead): Promise<string> {
  // Simulate API call with a delay
  return new Promise<string>((resolve) => {
    setTimeout(() => {
      // Schedule follow-up based on lead score and status
      const followUpDate = calculateFollowUpDate(lead);
      
      // In a real app, this would create a scheduled task in n8n, Zapier, etc.
      console.log(`Scheduled follow-up for lead ${lead.id} on ${followUpDate}`);
      
      resolve(followUpDate.toISOString());
    }, 1000);
  });
}

function calculateFollowUpDate(lead: Lead): Date {
  const now = new Date();
  const followUpDate = new Date(now);
  
  // Determine follow-up timing based on lead score and status
  if (lead.score >= 80) {
    // High priority lead - follow up quickly
    followUpDate.setDate(now.getDate() + 1); // Next day
  } else if (lead.score >= 50) {
    // Medium priority lead
    followUpDate.setDate(now.getDate() + 3); // In 3 days
  } else {
    // Low priority lead
    followUpDate.setDate(now.getDate() + 7); // In a week
  }
  
  // Adjust based on status
  if (lead.status === 'contacted') {
    // If already contacted, give a bit more time
    followUpDate.setDate(followUpDate.getDate() + 2);
  } else if (lead.status === 'qualified') {
    // If qualified, follow up more aggressively
    followUpDate.setDate(followUpDate.getDate() - 1);
  }
  
  return followUpDate;
}

// Function to determine which type of follow-up should be sent
export function determineFollowUpType(lead: Lead): 'email' | 'call' | 'meeting' {
  if (lead.score >= 80) {
    return 'meeting';
  } else if (lead.score >= 50) {
    return 'call';
  } else {
    return 'email';
  }
}

// Function to generate follow-up message template
export function generateFollowUpMessage(lead: Lead): string {
  const templates = {
    new: `Bonjour ${lead.firstName},\n\nMerci pour votre intérêt pour nos services de ${lead.serviceType}. Je souhaiterais en savoir plus sur votre projet. Pouvons-nous prévoir un échange ?\n\nCordialement,\nL'équipe CommunikAI`,
    
    contacted: `Bonjour ${lead.firstName},\n\nSuite à notre précédent échange concernant votre projet de ${lead.serviceType}, je souhaitais savoir si vous aviez des questions supplémentaires ou si vous souhaitiez avancer à l'étape suivante.\n\nCordialement,\nL'équipe CommunikAI`,
    
    qualified: `Bonjour ${lead.firstName},\n\nNous avons préparé une proposition détaillée pour votre projet de ${lead.serviceType}. Pouvons-nous prévoir un rendez-vous pour la présenter et discuter des prochaines étapes ?\n\nCordialement,\nL'équipe CommunikAI`
  };
  
  // Return the appropriate template based on lead status
  if (lead.status === 'new') {
    return templates.new;
  } else if (lead.status === 'contacted') {
    return templates.contacted;
  } else {
    return templates.qualified;
  }
}
