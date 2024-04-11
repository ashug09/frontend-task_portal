import React from 'react';
import Image from 'next/image'

import nothing from "../images/nothingFav.png";
const Favorite = () => {
  return (
    <div className="flex flex-col items-center justify-center my-10">
      <Image src={nothing} width={500} height={500}/>
      <p className="text-gray-500 text-lg mt-2">Nothing is favorite right now</p>
    </div>
  );
};

export default Favorite;
