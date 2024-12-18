import prisma from "@/prismaClient";

const crypto = require("crypto");

export const POST = async (request) => {
  const requestBody = await request.json(); // Parse the JSON request body
  console.log(requestBody);
  console.log(requestBody?.obj.id);
  console.log("request object");
  console.log(requestBody?.obj);
  console.log("shipping_data ");
  console.log(requestBody?.obj?.order?.shipping_data);
  console.log("billing_data");
  console.log(requestBody?.obj?.payment_key_claims?.billing_data);
  const merchantOrderId = requestBody.obj.order.merchant_order_id;
  const CartId = requestBody.obj.order.items[0].name;
  console.log("merchantOrderId...." + merchantOrderId);
  console.log("cartItems...." + requestBody.obj.order.items);
  console.log(requestBody.obj.order.items[0].name);
  const url = new URL(request.url);
  const searchParams = url.searchParams;
  const hmac = searchParams.get("hmac");

  const {
    amount_cents,
    created_at,
    currency,
    error_occured,
    has_parent_transaction,
    integration_id,
    is_3d_secure,
    is_auth,
    is_capture,
    is_refunded,
    is_standalone_payment,
    is_voided,
    owner,
    pending,
    success,
  } = requestBody.obj;

  const objId = requestBody?.obj?.id;
  const orderId = requestBody?.obj.order?.id;
  const sourceDataPan = requestBody?.obj.source_data?.pan;
  const sourceDataSubtype = requestBody?.obj.source_data?.sub_type;
  const sourceDataType = requestBody?.obj.source_data?.type;

  const string =
    amount_cents +
    created_at +
    currency +
    error_occured +
    has_parent_transaction +
    objId +
    integration_id +
    is_3d_secure +
    is_auth +
    is_capture +
    is_refunded +
    is_standalone_payment +
    is_voided +
    orderId +
    owner +
    pending +
    sourceDataPan +
    sourceDataSubtype +
    sourceDataType +
    success;

  const results = await validateHmac(string, hmac);

  const cart = await prisma.cart.findUnique({
    where: {
      id: CartId,
    },
    include: {
      cartItems: {
        include: {
          productVariation: true,
        },
      },
    },
  });
  console.log(cart);

  if (!cart) {
    throw new Error("cart is not found");
  }
  try {
    await prisma.$transaction(async (tx) => {
      // first will update the order
      await prisma.order.update({
        where: {
          id: merchantOrderId,
        },
        data: {
          paymentStatus: "PAID",
          Trnx_ID: objId,
        },
      });
      // then will reduce the order quantity from the stock quantity...which is is the product variation
      await Promise.all(
        cart.cartItems.map(async (cartItem) => {
          const product = await tx.productVariation.findUnique({
            where: { id: cartItem.productVariationId },
          });

          if (!product || product.quantity < cartItem.quantity) {
            throw new Error(
              `Not enough stock for product ${cartItem.productVariationId}`
            );
          }

          await tx.productVariation.update({
            where: { id: cartItem.productVariationId },
            data: {
              quantity: {
                decrement: cartItem.quantity,
              },
            },
          });
        })
      );
      // and in the end will delete the cart with all the cart items
      await tx.cart.delete({
        where: {
          id: cart.id,
        },
      });
    });
  } catch (error) {
    console.log(error);
  }

  console.log(results);
  return Response.json("success");
};

const validateHmac = async (string, hmac) => {
  const HMAC_SECRET = "6DD302FDFACB7D0CFE0C4EDDA207EA55";
  const Hashedhmac = crypto.createHmac("sha512", HMAC_SECRET);

  Hashedhmac.update(string);

  const calculatedHmac = Hashedhmac.digest("hex");

  if (calculatedHmac === hmac) {
    return true;
  } else {
    throw new Error("problem in payment security");
  }
};
