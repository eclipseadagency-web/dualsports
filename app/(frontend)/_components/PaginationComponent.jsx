"use client";

import { Button } from "@/components/ui/button";
import { MoveLeft, MoveRight } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React from "react";

const PaginationComponent = ({ totalCount, pageSize, page }) => {
  const searchparams = useSearchParams();
  const router = useRouter();
  const totalPages = Math.ceil(totalCount / pageSize);

  const changePage = (pagenum) => {
    const params = new URLSearchParams(searchparams);
    params.set("page", pagenum.toString());
    router.push(`?${params.toString()}`);
  };
  if (totalPages <= 1) {
    return null;
  }
  return (
    <div className="flex gap-5 my-10 justify-center">
      <Button
        variant="outline"
        size="sm"
        disabled={page == 1}
        onClick={() => {
          changePage(+page - 1);
        }}
      >
        <MoveLeft className="w-4" />
      </Button>

      <Button variant="outline" size="sm" onClick={() => {}}>
        {page} /{totalPages}
      </Button>

      <Button
        variant="outline"
        size="sm"
        disabled={page == totalPages}
        onClick={() => {
          changePage(+page + 1);
        }}
      >
        <MoveRight className="w-4" />
      </Button>
    </div>
  );
};

export default PaginationComponent;
