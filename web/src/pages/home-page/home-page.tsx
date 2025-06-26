import { HomePageForm } from './home-page-form';
import { HomePageHeader } from './home-page-header';
import { HomePageLinksList } from './home-page-links-list';

export function HomePage() {
  return (
    <div className="h-screen sm:overflow-hidden sm:h-screen bg-gray-200">
      <div className="grid grid-cols-1 sm:grid-cols-2 px-3 py-8 gap-3 max-w-[1280px] mx-auto">
        <HomePageHeader />
        <HomePageForm />
        <HomePageLinksList />
      </div>
    </div>
  );
}
