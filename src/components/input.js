import { h } from 'preact';

const Input = () => {
  return (
    <div class="w-2/5">
      <div class="mt-1 relative rounded-md shadow-sm">
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <span class="text-gray-500 sm:text-sm">
            <img src="https://r.bing.com/rp/u0V1KSppFr5k3WaIM205OchFLo4.png" class="bing-logo"></img>
          </span>
        </div>
        <input
          type="text"
          name="newtab-search"
          id="newtab-search"
          class="focus:ring-indigo-500 focus:border-indigo-500 block w-full py-3 pl-20 pr-12 sm:text-base border-gray-300 rounded-md text-black" 
          placeholder="Search Bing!"  
        />
      </div>
    </div>
  )
};

export default Input;
