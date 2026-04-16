"use server";

import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT) : 587,
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendOrderConfirmationEmail(
  email: string,
  cartId: string,
  orderDetails: { details: string; phone: string; city: string }
) {
  if (!process.env.EMAIL_FROM) {
    console.error("Missing EMAIL_FROM environment variable for order confirmation email.");
    return;
  }

  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111;">
      <h2>شكراً لطلبك!</h2>
      <p>تم إنشاء طلبك بنجاح. هذه رسالة تأكيد طلبك.</p>
      <ul>
        <li><strong>معرف الطلب:</strong> ${cartId}</li>
        <li><strong>المدينة:</strong> ${orderDetails.city}</li>
        <li><strong>رقم الهاتف:</strong> ${orderDetails.phone}</li>
        <li><strong>التفاصيل:</strong> ${orderDetails.details}</li>
      </ul>
      <p>سوف نتواصل معك قريباً بعد تأكيد الدفع لاستكمال الطلب.</p>
      <p>شكراً لاختيارك متجرنا.</p>
    </div>
  `;

  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: email,
    subject: "تأكيد طلبك - تم استلام الطلب",
    text: `شكراً لطلبك!\n\nمعرف الطلب: ${cartId}\nالمدينة: ${orderDetails.city}\nرقم الهاتف: ${orderDetails.phone}\nالتفاصيل: ${orderDetails.details}\n\nسوف نتواصل معك قريباً بعد تأكيد الدفع.",
    html,
  });
}
