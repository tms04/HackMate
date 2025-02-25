import { BackgroundGradient } from "../components/CardBg";
// import jordanImage from "../assets/jordans.webp"; // Ensure you have an image

export function BackgroundGradientDemo() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <BackgroundGradient className="rounded-[22px] max-w-sm p-4 sm:p-10 bg-white dark:bg-zinc-900">
        {/* <img
          src={jordanImage}
          alt="Air Jordan"
          className="object-contain w-full h-64"
        /> */}
        <p className="text-base sm:text-xl text-black mt-4 mb-2 dark:text-neutral-200">
          Air Jordan 4 Retro Reimagined
        </p>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          The Air Jordan 4 Retro Reimagined Bred will release on February 17, 2024.
        </p>
        <button className="rounded-full pl-4 pr-1 py-1 text-white flex items-center space-x-1 bg-black mt-4 text-xs font-bold dark:bg-zinc-800">
          <span>Buy now </span>
          <span className="bg-zinc-700 rounded-full text-[0.6rem] px-2 py-0 text-white">
            $100
          </span>
        </button>
      </BackgroundGradient>
    </div>
  );
}
