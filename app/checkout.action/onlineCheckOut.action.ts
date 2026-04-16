"use server";
import getMyToken from "../utilities/getMyToken";
import getUserEmail from "../utilities/getUserEmail";
import { sendOrderConfirmationEmail } from "../utilities/sendOrderConfirmationEmail";
import { CheckOutSchemaType } from "./../schema/checkOut.schma";

export async function onlinePayment(
  cartId: string,
  url: string,
  formValues: CheckOutSchemaType,
) {
  const token = await getMyToken();
  if (!token) throw new Error("❌ Please Login First");
  let res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`,
    {
      method: "POST",
      headers: {
        token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formValues),
    },
  );
  let payload = await res.json();

  if (payload?.status === "success") {
    try {
      const userEmail = await getUserEmail();
      if (userEmail) {
        await sendOrderConfirmationEmail(userEmail, cartId, formValues);
      }
    } catch (error) {
      console.error("Failed to send order confirmation email:", error);
    }
  }

  return payload;
}
