import logo from '@/assets/logo.svg';

export function HomePageHeader() {
  return (
    <div className="flex items-center justify-between mb-3 justify-self-center md:justify-self-start sm:col-span-full">
      <img src={logo} alt="logo" className="h-[25px]" />
    </div>
  );
}
