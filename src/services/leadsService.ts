
import { supabase } from "@/integrations/supabase/client";

export interface Lead {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number?: string;
  company?: string;
  service_type?: string;
  message?: string;
  gdpr_consent?: boolean;
  created_at: string;
  status: "new" | "contacted" | "qualified" | "converted" | "lost";
  score: number;
  enriched: boolean;
  last_contact?: string;
  next_follow_up?: string;
  notes?: string;
  sheet_id?: string;
}

/**
 * Fetches all leads from the database
 */
export async function fetchLeadsFromDB() {
  const { data, error } = await supabase
    .from('leads')
    .select('*');
  
  if (error) {
    console.error('Error fetching leads from Supabase:', error);
    throw error;
  }
  
  return data as Lead[];
}

/**
 * Syncs a lead from Google Sheets to the database
 */
export async function syncSheetLeadToDB(sheetLead: any) {
  // Check if lead already exists in DB based on email
  const { data: existingLeads, error: fetchError } = await supabase
    .from('leads')
    .select('*')
    .eq('email', sheetLead.email)
    .maybeSingle();
  
  if (fetchError) {
    console.error('Error checking existing lead:', fetchError);
    throw fetchError;
  }
  
  // If lead exists, return it (we prioritize DB values)
  if (existingLeads) {
    return existingLeads as Lead;
  }
  
  // If lead doesn't exist, insert it
  const newLead = {
    first_name: sheetLead.firstName || sheetLead.first_name || '',
    last_name: sheetLead.lastName || sheetLead.last_name || '',
    email: sheetLead.email || '',
    phone_number: sheetLead.phoneNumber || sheetLead.phone_number || '',
    company: sheetLead.company || '',
    service_type: sheetLead.serviceType || sheetLead.service_type || '',
    message: sheetLead.message || '',
    gdpr_consent: sheetLead.gdprConsent || sheetLead.gdpr_consent || false,
    status: sheetLead.status || 'new',
    score: sheetLead.score || 50,
    sheet_id: sheetLead.id || null
  };
  
  const { data: insertedLead, error: insertError } = await supabase
    .from('leads')
    .insert(newLead)
    .select()
    .single();
  
  if (insertError) {
    console.error('Error inserting new lead:', insertError);
    throw insertError;
  }
  
  return insertedLead as Lead;
}

/**
 * Updates a lead in the database
 */
export async function updateLeadInDB(id: string, leadData: Partial<Lead>) {
  const { data, error } = await supabase
    .from('leads')
    .update(leadData)
    .eq('id', id)
    .select()
    .single();
  
  if (error) {
    console.error('Error updating lead:', error);
    throw error;
  }
  
  return data as Lead;
}

/**
 * Syncs all leads from Google Sheets to the database
 */
export async function syncAllLeadsFromSheet(sheetLeads: any[]) {
  const synced = await Promise.all(
    sheetLeads.map(lead => syncSheetLeadToDB(lead).catch(err => {
      console.error(`Failed to sync lead ${lead.email}:`, err);
      return null;
    }))
  );
  
  return synced.filter(Boolean) as Lead[];
}
