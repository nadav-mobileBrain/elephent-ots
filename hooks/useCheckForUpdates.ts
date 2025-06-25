import { useEffect } from 'react';
import * as Updates from 'expo-updates';

export const useCheckUpdates = () => {
  useEffect(() => {
    if (!__DEV__) {
      const check = async () => {
        try {
          console.log('🔍 Checking for updates...');
          const update = await Updates.checkForUpdateAsync();
          console.log('📦 Update available:', update.isAvailable);
          if (update.isAvailable) {
            console.log('⬇️ Fetching update...');
            await Updates.fetchUpdateAsync();
            console.log('✅ Update fetched. Reloading...');
            await Updates.reloadAsync();
          } else {
            console.log('⚠️ No update found.');
          }
        } catch (error) {
          console.log('❌ Update error:', error);
        }
      };
      check();
    }
  }, []);
};
