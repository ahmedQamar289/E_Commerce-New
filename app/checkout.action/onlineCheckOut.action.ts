"use server";
import getUserEmail from "../utilities/getUserEmail";
import { sendOrderConfirmationEmail } from "../utilities/sendOrderConfirmationEmail";
import { CheckOutSchemaType } from "./../schema/checkOut.schma";

export async function onlinePayment(
  cartId: string,
  url: string,
  formValues: CheckOutSchemaType,
) {
  // Simulate successful payment
  console.log("Processing payment for cart:", cartId);

  try {
    // Simulate sending confirmation email
    const userEmail = await getUserEmail();
    if (userEmail) {
      await sendOrderConfirmationEmail(userEmail, cartId, formValues);
    }
  } catch (error) {
    console.error("Failed to send order confirmation email:", error);
  }

  return {
    status: "success",
    message: "✅ Payment processed successfully",
    session: {
      url: url,
    },
  };
}
