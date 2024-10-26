'use client';

const getCounts = async () => {
  try {
    const response = await fetch(
      'https://social-programs-portal-backend.vercel.app/api/publications/counts',
      { cache: 'no-store' }
    );
    return response.json();
  } catch (error) {
    console.error(error);
  }
};

export const Page = async () => {
  const counts = await getCounts();

  return (
    <div>
      <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight text-zinc-950 lg:text-4xl">
        Статистика
      </h1>

      <div className="mt-10 flex grid-cols-3 flex-col gap-5 lg:grid">
        <div className="flex flex-col items-center gap-2 rounded-lg border border-gray-50 bg-white px-5 py-4 shadow-md">
          <span className="text-lg font-semibold">Кружки и секции</span>
          <span>{counts.clubs}</span>
        </div>
        <div className="flex flex-col items-center gap-2 rounded-lg border border-gray-50 bg-white px-5 py-4 shadow-md">
          <span className="text-lg font-semibold">Мероприятия</span>
          <span>{counts.events}</span>
        </div>
        <div className="flex flex-col items-center gap-2 rounded-lg border border-gray-50 bg-white px-5 py-4 shadow-md">
          <span className="text-lg font-semibold">Программы</span>
          <span>{counts.programs}</span>
        </div>
      </div>
    </div>
  );
};
