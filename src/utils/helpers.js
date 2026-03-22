export const formatCurrency = (value) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value || 0);

export const calculateTax = (subtotal, taxRate = 0.08) => subtotal * taxRate;

export const calculateCartSubtotal = (items) =>
  items.reduce((sum, item) => sum + item.price * item.quantity, 0);
