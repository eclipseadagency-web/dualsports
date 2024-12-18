import Image from "next/image";
import React from "react";

const FilterImage = ({ imgSrc }) => {
  return (
    <div>
      <Image src={imgSrc} width={"full"} height={"full"} alt="filter" />
    </div>
  );
};

export default FilterImage;
