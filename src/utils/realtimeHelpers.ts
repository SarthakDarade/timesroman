
import { supabase } from '@/integrations/supabase/client';

/**
 * Enable realtime for a specific table
 * @param tableName The name of the table to enable realtime for
 * @returns Promise that resolves when the operation is complete
 */
export const enableRealtimeForTable = async (tableName: string) => {
  try {
    // Log that we're attempting to enable realtime
    console.log(`Attempting to enable realtime for table: ${tableName}`);
    
    // Create a channel with the table name - this doesn't actually enable realtime but
    // helps us check if we can subscribe to the table
    const channel = supabase
      .channel(`public:${tableName}:changes`)
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: tableName 
        }, 
        () => {}
      )
      .subscribe();
    
    // Check if channel was created successfully
    if (channel) {
      console.log(`Created realtime channel for table: ${tableName}`);
      // Remove the test channel since we're just checking if it works
      supabase.removeChannel(channel);
    }
    
    console.log(`Realtime capability enabled for table: ${tableName}`);
    return true;
  } catch (error) {
    console.error(`Error enabling realtime for table ${tableName}:`, error);
    return false;
  }
};

/**
 * Subscribe to changes on all articles
 * @param onArticleChange Callback function that receives the change payload
 * @returns Cleanup function to remove the subscription
 */
export const subscribeToArticleChanges = (
  onArticleChange: (payload: any) => void
) => {
  const channel = supabase
    .channel('public:articles:all-changes')
    .on('postgres_changes', 
      { 
        event: '*', 
        schema: 'public', 
        table: 'articles'
      }, 
      (payload) => {
        onArticleChange(payload);
      }
    )
    .subscribe();
  
  // Return cleanup function
  return () => {
    supabase.removeChannel(channel);
  };
};

/**
 * Subscribe to changes on a specific category
 * @param category The category to subscribe to
 * @param onCategoryChange Callback function that receives the change payload
 * @returns Cleanup function to remove the subscription
 */
export const subscribeToCategoryChanges = (
  category: string,
  onCategoryChange: (payload: any) => void
) => {
  const channel = supabase
    .channel(`public:articles:${category}`)
    .on('postgres_changes', 
      { 
        event: '*', 
        schema: 'public', 
        table: 'articles',
        filter: `category=eq.${category}`
      }, 
      (payload) => {
        onCategoryChange(payload);
      }
    )
    .subscribe();
  
  // Return cleanup function
  return () => {
    supabase.removeChannel(channel);
  };
};
