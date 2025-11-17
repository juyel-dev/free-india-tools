export const formatRating = (rating) => {
  return rating ? rating.toFixed(1) : '0.0';
};

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(amount);
};

export const formatDateTime = (dateString) => {
  return new Date(dateString).toLocaleString();
};
