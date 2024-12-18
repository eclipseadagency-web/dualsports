import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import prisma from "@/prismaClient";
import DeleteVariation from "./DeleteVariation";

const VariationTable = async ({ variation }) => {
  let variations = [];
  if (variation == "size") {
    variations = await prisma.size.findMany({ orderBy: { createdAt: "desc" } });
  } else {
    variations = await prisma.color.findMany({
      orderBy: { createdAt: "desc" },
    });
  }

  return (
    <div className="mt-10">
      <Table>
        <TableCaption>A list of all {variation} variations.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="capitalize">{variation + "_id"}</TableHead>
            <TableHead className="capitalize">{variation}</TableHead>
            <TableHead className="capitalize">actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {variations.length > 0 ? (
            variations.map((vari) => (
              <TableRow key={vari.id}>
                <TableCell>{vari.id}</TableCell>
                <TableCell>{vari.name}</TableCell>
                <TableCell>
                  <DeleteVariation
                    variationId={vari.id}
                    variation={variation}
                  />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <p>..there are no variations to show</p>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default VariationTable;
