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

const VariationTable = async () => {
  const sizes = await prisma.size.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="mt-10">
      <Table>
        <TableCaption>A list of all size variations.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="capitalize">Size</TableHead>
            <TableHead className="capitalize">size type</TableHead>
            <TableHead className="capitalize">actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sizes.length > 0 ? (
            sizes.map((vari) => (
              <TableRow key={vari.id}>
                <TableCell>{vari.name}</TableCell>
                <TableCell>{vari.size_type}</TableCell>
                <TableCell>
                  <DeleteVariation variationId={vari.id} />
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
