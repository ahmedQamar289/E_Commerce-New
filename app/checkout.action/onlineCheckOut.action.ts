"use server";
import getMyToken from "../utilities/getMyToken";
import { CheckOutSchemaType } from './../schema/checkOut.schma';

export async function onlinePayment(
    cartId: string, 
    url: string, 
    formValues: CheckOutSchemaType) {
    const token = await getMyToken();
    if (!token) throw new Error("❌ Please Login First");
    let res = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`, {
        method: "POST", 
        headers: {
token,
"Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
        }
    );
    let payload = await res.json();
    return payload;  
    }