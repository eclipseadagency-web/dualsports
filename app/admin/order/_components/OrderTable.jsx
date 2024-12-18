import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { formatPrice, truncate } from "@/lib/utils";

const OrderTable = ({ orders, isAdmin }) => {
  return (
    <>
      {orders.length > 0 ? (
        <Table>
          <TableCaption>A list of Orders</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="">Order</TableHead>

              <TableHead className="hidden lg:table-cell">
                total amount
              </TableHead>
              <TableHead className="hidden lg:table-cell">status</TableHead>
              <TableHead className="hidden lg:table-cell">
                payment methods
              </TableHead>
              <TableHead className="hidden lg:table-cell">
                payment status
              </TableHead>
              <TableHead>actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium capitalize">
                  {truncate(order.id, 15)}
                </TableCell>
                <TableCell className="font-medium capitalize hidden lg:table-cell">
                  {formatPrice(order.totalAmount)}
                </TableCell>

                <TableCell className="hidden lg:table-cell">
                  {order.status}
                </TableCell>
                <TableCell className="hidden lg:table-cell">
                  {order.paymentMethod}
                </TableCell>
                <TableCell className="hidden lg:table-cell">
                  {order.paymentStatus}
                </TableCell>

                <TableCell>
                  <div className="flex gap-10 items-center">
                    <Button asChild variant="outline">
                      <Link
                        href={
                          isAdmin
                            ? `/admin/order/edit-order/${order.id}`
                            : `/profile/orders/${order.id}`
                        }
                      >
                        {isAdmin ? "Edit order" : "Show order"}
                      </Link>
                    </Button>
                    {/* <DeleteCategory orderId={order.id} /> */}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <p className="uppercase text-center mt-20">
          there are no orders to show
        </p>
      )}
    </>
  );
};

export default OrderTable;
