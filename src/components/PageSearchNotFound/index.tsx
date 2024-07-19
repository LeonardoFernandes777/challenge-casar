import Image from 'next/image'

type Props = {
  search: string | null;
};

export function PageSearchNotFound({ search }: Props){
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-6rem)] text-center px-4 sm:px-6 lg:px-8">
      <h1 className="mb-2 text-xl sm:text-2xl lg:text-2xl font-semibold text-customBlue">
        &quot;{search}&quot;
      </h1>
      <h1 className="mb-2 text-xl sm:text-2xl lg:text-2xl font-semibold text-customGrayNeutral">
        Nenhum usuário encontrado
      </h1>
      <p className="mb-5 text-sm sm:text-base lg:text-lg text-customGrayNeutral">
        Verifique se a escrita está correta e tente novamente
      </p>
      <div className="w-full max-w-[150px] sm:max-w-[200px] md:max-w-[200px] lg:max-w-[300px]">
        <Image src="/taken.svg" width={150} height={150} alt="taken" className="object-cover w-full h-full" priority/>
      </div>
    </div>
  );
}
