export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

export const validateUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch (_) {
    return false;
  }
};

export const validateToolName = (name) => {
  return name.length >= 3 && name.length <= 50;
};

export const validateDescription = (description) => {
  return description.length >= 20 && description.length <= 500;
};
