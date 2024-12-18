import React from "react";
import FilterImage from "./FilterImage";
import filter1 from "@/public/filter1.webp";
import filter2 from "@/public/filter2.webp";
import filter3 from "@/public/filter3.webp";
import filter4 from "@/public/filter4.webp";
const FilterImageGrid = () => {
  return (
    <div className="grid grid-cols-1 gap-10 my-20 lg:grid-cols-2">
      <FilterImage imgSrc={filter1} />
      <FilterImage imgSrc={filter2} />
      <FilterImage imgSrc={filter3} />
      <FilterImage imgSrc={filter4} />
    </div>
  );
};

export default FilterImageGrid;
