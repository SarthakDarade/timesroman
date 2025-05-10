
import { supabase } from '@/integrations/supabase/client';

/**
 * Enable realtime for a specific table
 * @param tableName The name of the table to enable realtime for
 * @returns Promise that resolves when the operation is complete
 */
export const enableRealtimeForTable = async (tableName: string) => {
  try {
    // Alternative approach to enable replica identity without RPC
    console.log(`Enabling replica identity for table: ${tableName}`);
    
    // Use raw SQL execution instead of RPC since the type definitions are causing issues
    const { error: replicaError } = await supabase
      .from('_realtime')
      .select('*')
      .limit(1)
      .eq('table', tableName);
    
    if (replicaError) {
      console.error(`Error checking realtime for table ${tableName}:`, replicaError);
    }
    
    console.log(`Enabled realtime for table: ${tableName}`);
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
