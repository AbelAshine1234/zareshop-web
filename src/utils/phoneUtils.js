// Format Ethiopian phone number by prepending +251
export const formatEthiopianPhone = (phoneLocal) => {
  // Remove any existing +251 or 251 prefix if present
  const cleanPhone = phoneLocal.replace(/^(\+251|251)/, '')
  return `+251${cleanPhone}`
}

// Validate Ethiopian phone number format (should start with 9 and be 9 digits)
export const validateEthiopianPhone = (phone) => {
  const phoneRegex = /^9\d{8}$/
  return phoneRegex.test(phone)
}
