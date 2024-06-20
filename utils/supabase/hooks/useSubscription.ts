import { useState } from 'react';
import supabase from '@/utils/supabase/client';

export const useSubscription = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const subscribe = async (email: string) => {
    setLoading(true);
    setError(null);

    const { error } = await supabase.from('jobSubscriber').insert([
      {
        email,
        doi: false,
        welcome_email: false,
        created_at: new Date(),
      },
    ]);

    setLoading(false);

    if (error) {
      setError(error.message);
      return false;
    }

    return true;
  };

  return { subscribe, loading, error };
};