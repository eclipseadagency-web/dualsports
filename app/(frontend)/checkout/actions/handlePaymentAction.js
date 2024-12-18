import axios from "axios";
const PAYMOB_API_KEY =
  "ZXlKaGJHY2lPaUpJVXpVeE1pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SmpiR0Z6Y3lJNklrMWxjbU5vWVc1MElpd2ljSEp2Wm1sc1pWOXdheUk2T1Rrd09Ua3hMQ0p1WVcxbElqb2lhVzVwZEdsaGJDSjkuQV8wbWZHTExzb1VfMWpWNzlieGVGRlNUZ0N2UmhvZUFrdmR5Zi1aSGwwMEpld0NscE1oT3liYzZ1OHRQTnpJUXY2UkpNT1hkTUFsYXU3cDBlbEo4WlE=";

export const handlePaymentAction = async () => {
  const response = await axios.post(
    "https://accept.paymobsolutions.com/api/auth/tokens",
    {
      api_key: PAYMOB_API_KEY,
    }
  );

  return response.data.token;
};

export const createOrder = async (
  accessToken,
  amountCents,
  myOrderId,
  cartId
) => {
  const orderResponse = await axios.post(
    "https://accept.paymobsolutions.com/api/ecommerce/orders",
    {
      auth_token: accessToken,
      delivery_needed: "false",
      amount_cents: amountCents,
      currency: "EGP",
      items: [
        {
          name: cartId,
          amount_cents: 0,
          quantity: 1,
        },
      ],
      merchant_order_id: myOrderId,
    }
  );

  return orderResponse.data.id;
};
export const generatePaymentKey = async (
  accessToken,
  orderId,
  amountCents,
  formData,
  userData,
  myOrderId
) => {
  try {
    const paymentKeyResponse = await axios.post(
      "https://accept.paymobsolutions.com/api/acceptance/payment_keys",
      {
        auth_token: accessToken,
        amount_cents: amountCents,
        expiration: 3600,
        order_id: orderId,
        billing_data: {
          // Fill with customer billing details
          userId: userData.id,
          apartment: formData.apartment,
          email: userData.email,
          floor: formData.floor,
          first_name: userData.name,
          street: formData.street,
          building: formData.building,
          phone_number: formData.phone_number,
          shipping_method: "PKG",
          postal_code: formData.postal_code,
          city: formData.city,
          country: "egypt",
          last_name: "user",
          state: formData.city,
        },
        currency: "EGP",
        integration_id: "4631676",
      }
    );

    return paymentKeyResponse.data.token;
  } catch (error) {
    console.log(error);
  }
};
