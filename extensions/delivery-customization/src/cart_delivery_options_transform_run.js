// @ts-check

/**
 * @typedef {import("../generated/api").RunInput} RunInput
 * @typedef {import("../generated/api").CartDeliveryOptionsTransformRunResult} CartDeliveryOptionsTransformRunResult
 * @typedef {import("../generated/api").DeliveryOptionHideOperation} DeliveryOptionHideOperation
 */

/**
 * @type {CartDeliveryOptionsTransformRunResult}
 */
const NO_CHANGES = { operations: [] };

/**
 * Show or hide free shipping based on cart total and threshold.
 *
 * @param {RunInput} input
 * @returns {CartDeliveryOptionsTransformRunResult}
 */
export function cartDeliveryOptionsTransformRun(input) {
  

  const config = input?.deliveryCustomization?.metafield?.jsonValue;
   let operations = [];
  if (!config) {
    return NO_CHANGES;
  }
  const shippingEnabled = String(config.shipping) === 'true' || Number(config.shipping) === 1;
  console.log('shippingenabled',shippingEnabled);

if (!shippingEnabled) {
  console.log("Shipping rule disabled");
  return NO_CHANGES;
}


  const threshold = Number(config.shippingamount);
  if (!Number.isFinite(threshold)) {
    return NO_CHANGES;
  }

  const cartTotal = Number(input.cart?.cost?.totalAmount?.amount || 0);
  console.log(` Cart total: ${cartTotal}, Shipping threshold: ${threshold}`);

  if (cartTotal >= threshold) {
    console.log(" Cart total meets/exceeds threshold, free shipping remains visible.");
    return NO_CHANGES;
  }

 
  const deliveryGroups = input.cart?.deliveryGroups ?? [];

  for (const group of deliveryGroups) {
    const options = group?.deliveryOptions ?? [];
    for (const option of options) {
      const rawAmount = option?.cost?.amount;
      console.log('rawamount',rawAmount);
      if (rawAmount == null) continue;

      const optionCost = Number(rawAmount);
      if (optionCost === 0) {
        console.log(`Hiding free shipping option: ${option.handle}`);
        operations.push({
          deliveryOptionHide: {
            deliveryOptionHandle: option.handle,
          },
        });
      }
    }
  }

  return operations.length > 0 ? { operations } : NO_CHANGES;
}
