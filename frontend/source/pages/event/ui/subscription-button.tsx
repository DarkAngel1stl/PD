'use client';

import { Button } from '@/shared/ui/button';
import { IEvent } from '@/entities/event';
import { useAuth } from '@/app/contexts/auth-context';
import axios from 'axios';
import { useState } from 'react';

interface SubscriptionButtonProps {
  event: IEvent;
}

export const SubscriptionButton = ({ event }: SubscriptionButtonProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { user } = useAuth();

  const userId = user?.id.toString();

  const unsubscribe = async () => {
    setLoading(true);
    axios
      .post(
        `https://social-programs-portal-backend.vercel.app/api/publications/events/unsubscribe`,
        { userId, eventId: event.id }
      )
      .then(() => {
        event.subscriptions = event.subscriptions.filter(
          (subscription) => subscription.userId !== userId
        );
        setLoading(false);
      });
  };

  const subscribe = async () => {
    if (!userId) return;

    setLoading(true);

    axios
      .post(
        `https://social-programs-portal-backend.vercel.app/api/publications/events/subscribe`,
        { userId, eventId: event.id }
      )
      .then(() => {
        event.subscriptions.push({ userId });
        setLoading(false);
      });
  };

  const isSubscribed = event.subscriptions.filter(
    (subscription) => subscription.userId === userId
  ).length;

  if (!userId) {
    return null;
  }

  if (isSubscribed) {
    return (
      <Button onClick={unsubscribe} disabled={loading}>
        Отписаться от события
      </Button>
    );
  }

  return (
    <Button onClick={subscribe} disabled={loading}>
      Подписаться на событие
    </Button>
  );
};
