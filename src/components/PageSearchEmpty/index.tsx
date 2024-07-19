import Image from 'next/image';

export function PageSearchEmpty() {
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-6rem)] text-center px-4 sm:px-6 lg:px-8">
      <h1 className="mb-2 text-xl sm:text-2xl lg:text-2xl font-semibold text-customGrayNeutral">
        Procure pelo Nome ou Nome de Usuário
      </h1>
      <p className="mb-5 text-sm sm:text-base lg:text-lg text-customGrayNeutral">
        Encontre os repositórios de algum usuário digitando no campo acima
      </p>
      <div className="w-full max-w-[150px] sm:max-w-[200px] md:max-w-[200px] lg:max-w-[300px]">
        <Image src="/people_search.svg" width={150} height={150} alt="People Search" className="object-cover w-full h-full" priority/>
      </div>
    </div>
  );
}
