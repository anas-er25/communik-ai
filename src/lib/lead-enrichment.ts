
/**
 * Lead enrichment service
 * In a real application, this would connect to an external API like Clearbit
 * For this demo, it simulates enrichment with mock data
 */

export async function enrichLead(email: string, company: string) {
  // Simulate API call with a delay
  return new Promise<any>((resolve) => {
    setTimeout(() => {
      // Mock enrichment data based on domain from email
      const domain = email.split('@')[1] || '';
      
      // Generate mock data
      const mockData = {
        companySize: getRandomCompanySize(),
        industry: getRandomIndustry(),
        location: getRandomLocation(),
        website: company ? `https://www.${company.toLowerCase().replace(/\s/g, '')}.com` : `https://www.${domain}`,
        linkedIn: company ? `https://www.linkedin.com/company/${company.toLowerCase().replace(/\s/g, '')}` : null,
        twitter: Math.random() > 0.5 ? `@${company.toLowerCase().replace(/\s/g, '')}` : null,
        revenue: getRandomRevenue(),
        foundedYear: getRandomFoundedYear()
      };
      
      resolve(mockData);
    }, 1500);
  });
}

// Helper functions to generate realistic looking mock data
function getRandomCompanySize() {
  const sizes = ['1-10', '11-50', '51-200', '201-500', '501-1000', '1001-5000', '5000+'];
  return sizes[Math.floor(Math.random() * sizes.length)];
}

function getRandomIndustry() {
  const industries = [
    'Technology', 'Finance', 'Healthcare', 'Education', 'Retail', 
    'Manufacturing', 'Media', 'Consulting', 'Real Estate', 'Travel'
  ];
  return industries[Math.floor(Math.random() * industries.length)];
}

function getRandomLocation() {
  const locations = [
    'Paris, France', 'Lyon, France', 'Marseille, France', 'Bordeaux, France', 
    'Lille, France', 'Toulouse, France', 'Nice, France', 'Strasbourg, France'
  ];
  return locations[Math.floor(Math.random() * locations.length)];
}

function getRandomRevenue() {
  const revenues = [
    '< 1M€', '1M€ - 5M€', '5M€ - 10M€', '10M€ - 50M€', '50M€ - 100M€', '> 100M€'
  ];
  return revenues[Math.floor(Math.random() * revenues.length)];
}

function getRandomFoundedYear() {
  const currentYear = new Date().getFullYear();
  return Math.floor((currentYear - 30) + Math.random() * 29).toString();
}
