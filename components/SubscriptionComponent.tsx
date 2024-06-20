"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useSubscription } from '@/utils/supabase/hooks/useSubscription';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const SubscriptionComponent: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [height, setHeight] = useState<number | null>(null);
  const { subscribe, loading, error } = useSubscription();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      setHeight(containerRef.current.clientHeight);
    }
  }, []);

  const handleSubscribe = async () => {
    const success = await subscribe(email);
    if (success) {
      setSubscribed(true);
      sendWelcomeEmail(email);
    }
  };

  const sendWelcomeEmail = async (email: string) => {
    try {
      const response = await fetch('/api/sendWelcomeEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error('Failed to send welcome email');
      }
    } catch (error) {
      console.error('Error sending welcome email:', error);
    }
  };

  return (
    <div
      ref={containerRef}
      style={{ minHeight: height ? `${height}px` : 'auto' }}
      className="flex flex-col items-center justify-center border border-gray-300 rounded-lg bg-white shadow-sm p-6 max-w-[1088px] w-full mx-auto mt-4"
    >
      {subscribed ? (
        <>
          <h2 className="text-xl font-bold">You are subscribed</h2>
          <p className="text-gray-600">You will get daily alerts when new jobs match your preferences.</p>
        </>
      ) : (
        <>
          <h2 className="text-xl font-bold">Be the first to know about new jobs</h2>
          <p className="text-gray-600">Get daily alerts when new jobs match your current filters.</p>
          <div className="flex w-full max-w-sm items-center space-x-2 mt-4">
            <Input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-300 p-2 rounded-l-lg"
            />
            <Button variant="outline" onClick={handleSubscribe} className="rounded-r-lg" disabled={loading}>
              {loading ? 'Subscribing...' : 'Get alerts'}
            </Button>
          </div>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </>
      )}
    </div>
  );
};

export default SubscriptionComponent;