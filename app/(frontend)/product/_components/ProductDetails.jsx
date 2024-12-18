import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import parse from "html-react-parser";
import { Calendar, HandCoinsIcon, Truck } from "lucide-react";
import Link from "next/link";
const ProductDetails = ({ product }) => {
  return (
    <Accordion type="" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger className="font-bold">
          Product Details
        </AccordionTrigger>
        <AccordionContent>{parse(product.description)}</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger className="font-bold">
          Delivery options
        </AccordionTrigger>
        <AccordionContent>
          <div>
            <p>Standard Delivery</p>
            <div>
              <div className="flex gap-5 my-4">
                <div>
                  <Truck />
                </div>
                <div className="text-slate-800">
                  <p className="text-[16px] font-bold">
                    Free delivery on orders above SAR 149
                  </p>
                  <p>(SAR 20 delivery charge below SAR 149)</p>
                </div>
              </div>
              <div className="flex gap-5 my-4">
                <div>
                  <Calendar />
                </div>
                <div className="text-slate-800">
                  <p className="text-[16px] font-bold">
                    Delivery within 3-5 working days
                  </p>
                </div>
              </div>
              <div className="flex gap-5 my-4">
                <div>
                  <HandCoinsIcon />
                </div>
                <div className="text-slate-800">
                  <p className="text-[16px] font-bold">
                    SAR 10 for Cash On Delivery
                  </p>
                </div>
              </div>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger className="font-bold">
          Terms & Conditions
        </AccordionTrigger>
        <AccordionContent>
          For more info about terms and conditions, please visit our{" "}
          <Link href="/terms" className="text-blue-500">
            Terms and Conditions{" "}
          </Link>
          page.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-4">
        <AccordionTrigger className="font-bold">
          Return & Exchange
        </AccordionTrigger>
        <AccordionContent>
          <ul className="list-disc px-10">
            <li>Free 14 days returns & exchange.</li>
            <li>
              {" "}
              For more information about returns & exchange, please visit our{" "}
              <Link href="/terms" className="text-blue-500">
                Returns Policy
              </Link>{" "}
              page.
            </li>
          </ul>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default ProductDetails;
