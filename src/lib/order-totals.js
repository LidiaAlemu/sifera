function buildPricedOrderItems(formItems, menuItems) {
  if (!Array.isArray(formItems) || formItems.length === 0) {
    throw new Error("At least one item is required");
  }

  const quantitiesByMenuItemId = new Map();

  for (const item of formItems) {
    if (!item.id || typeof item.id !== "number") {
      throw new Error("Invalid item ID");
    }

    if (
      !item.quantity ||
      typeof item.quantity !== "number" ||
      !Number.isInteger(item.quantity) ||
      item.quantity < 1
    ) {
      throw new Error("Invalid item quantity");
    }

    quantitiesByMenuItemId.set(
      item.id,
      (quantitiesByMenuItemId.get(item.id) || 0) + item.quantity
    );
  }

  if (!Array.isArray(menuItems) || menuItems.length !== quantitiesByMenuItemId.size) {
    throw new Error("One or more menu items are unavailable");
  }

  const pricedItems = menuItems.map((menuItem) => {
    const unitPrice = Number(menuItem.price);
    const quantity = quantitiesByMenuItemId.get(menuItem.id) || 0;

    if (!Number.isFinite(unitPrice) || unitPrice <= 0 || quantity <= 0) {
      throw new Error("Invalid order total");
    }

    return {
      menuItemId: menuItem.id,
      quantity,
      unitPrice,
      subtotal: unitPrice * quantity,
    };
  });

  const subtotal = pricedItems.reduce((sum, item) => sum + item.subtotal, 0);

  if (subtotal <= 0) {
    throw new Error("Invalid order total");
  }

  return { pricedItems, subtotal };
}

module.exports = {
  buildPricedOrderItems,
};
