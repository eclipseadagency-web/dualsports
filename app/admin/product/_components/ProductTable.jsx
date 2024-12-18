import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import parse from "html-react-parser";

import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import DeleteProduct from "./DeleteProduct";
import { truncate } from "@/lib/utils";

const ProductTable = async ({ products }) => {
  return (
    <>
      {products.length > 0 ? (
        <Table>
          <TableCaption>A list of Products</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="capitalize">name</TableHead>

              <TableHead className="hidden md:table-cell">
                Description
              </TableHead>
              <TableHead className="hidden md:table-cell">image</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium capitalize truncate  ">
                  {truncate(product.name, 15)}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {parse(product.short_description)}
                </TableCell>

                <TableCell className="hidden md:table-cell">
                  <Image
                    src={product.images[0].url}
                    height={100}
                    width={100}
                    className="rounded-full"
                    alt="product image"
                  />
                </TableCell>
                <TableCell>
                  <div className="flex gap-10 items-center flex-col md:flex-row">
                    <Button variant="outline">
                      <Link href={`/admin/product/edit-product/${product.id}`}>
                        Edit Product
                      </Link>
                    </Button>

                    <DeleteProduct
                      productId={product.id}
                      productImages={product.images}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <p className="uppercase text-center mt-20">
          there are no products to show
        </p>
      )}
    </>
  );
};

export default ProductTable;
