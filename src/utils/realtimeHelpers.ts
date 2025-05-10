
import { supabase } from '@/integrations/supabase/client';

/**
 * Enable realtime for a specific table
 * @param tableName The name of the table to enable realtime for
 * @returns Promise that resolves when the operation is complete
 */
export const enableRealtimeForTable = async (tableName: string) => {
  try {
    // Enable replica identity for the table (required for realtime)
    await supabase.rpc('notify_replica_identity', { 
      table_name: tableName 
    });
    
    // Add the table to the realtime publication
    await supabase.rpc('notify_realtime', { 
      table_name: tableName,
      enable: true 
    });
    
    console.log(`Realtime enabled for table: ${tableName}`);
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
