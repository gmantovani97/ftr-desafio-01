import { getUserSessionId } from '@/utils/userSession';
import { useEffect, useState } from 'react';
import { HomePageForm } from './home-page-form';
import { HomePageHeader } from './home-page-header';
import { HomePageLinksList } from './home-page-links-list';

interface Link {
  id: string;
  shortUrl: string;
  originalUrl: string;
  visits: number;
  createdAt: Date;
}

export function HomePage() {
  const [links, setLinks] = useState<Link[] | undefined>(undefined);
  const retrieveLinks = async (): Promise<Link[] | undefined> => {
    const userSessionId = getUserSessionId();

    const response = await fetch(
      `http://localhost:3333/links/${userSessionId}`
    );

    if (response.ok) {
      console.log('Links retrieved successfully');
      return response.json();
    } else {
      console.error('Failed to retrieve links');
      return undefined;
    }
  };

  useEffect(() => {
    retrieveLinks().then(setLinks);
  }, []);

  const handleCreateLink = async () => {
    const userSessionId = getUserSessionId();

    const originalUrl = 'https://www.google.com';
    const shortUrl = 'https://brev.ly/google';

    const response = await fetch('http://localhost:3333/link', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        originalUrl,
        shortUrl,
        userSessionId,
      }),
    });

    if (response.ok) {
      console.log('Link created successfully');
    } else {
      console.error('Failed to create link');
    }
  };

  return (
    <div className="h-full sm:overflow-hidden sm:h-screen bg-gray-200">
      <div className="grid grid-cols-1 sm:grid-cols-2 px-3 py-8 gap-3 max-w-[1920px] mx-auto">
        <HomePageHeader />
        <HomePageForm />
        <HomePageLinksList />
      </div>
    </div>
  );
}
