import { supabase } from "./supabaseClient";

/**
 * Handles newsletter subscriptions and lead magnet captures.
 * @param {string} email - The user's email address.
 * @param {string} source - Where the user signed up (e.g., 'lead-magnet' or 'footer').
 */
export const handleSubscription = async (email, source = 'general') => {
  // Basic validation
  if (!email || !email.includes("@")) {
    return { success: false, message: "Please enter a valid professional email." };
  }

  try {
    // 1. Check if the user already exists to prevent duplicates
    const { data: existingUser } = await supabase
      .from("users")
      .select("email")
      .eq("email", email)
      .single();

    if (existingUser) {
      return { success: true, message: "You're already on the list! Check your inbox." };
    }

    // 2. Insert new user with the source tag
    const { error } = await supabase
      .from("users")
      .insert([
        { 
          email: email, 
          source: source 
        }
      ]);

    if (error) throw error;

    return { success: true, message: "Welcome! Your Free Prompt Pack is on the way." };
  } catch (error) {
    // Handle the unique constraint error if RLS or a DB rule blocks duplicates
    if (error.code === '23505') {
       return { success: true, message: "You're already on the list!" };
    }
    
    console.error("Subscription Error:", error.message);
    return { success: false, message: "Service temporarily busy. Please try again later." };
  }
};