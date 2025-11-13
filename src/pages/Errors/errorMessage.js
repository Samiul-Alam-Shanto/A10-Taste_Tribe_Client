export const errorMessage = (errorCode) => {
  let friendlyMessage = "An unexpected error occurred. Please try again.";

  if (
    errorCode === "auth/invalid-credential" ||
    errorCode === "auth/wrong-password" ||
    errorCode === "auth/user-not-found"
  ) {
    friendlyMessage =
      "Invalid email or password. Please check your credentials.";
  } else if (errorCode === "auth/email-already-in-use") {
    friendlyMessage =
      "This email is already registered. Please log in instead.";
  } else if (errorCode === "auth/weak-password") {
    friendlyMessage =
      "The password is too weak. It must be at least 6 characters.";
  } else if (errorCode === "auth/popup-closed-by-user") {
    friendlyMessage = "The sign-in window was closed. Please try again.";
  } else if (errorCode === "auth/account-exists-with-different-credential") {
    friendlyMessage =
      "An account with this email already exists. Please sign in with your original method.";
  } else if (errorCode === "auth/user-disabled") {
    friendlyMessage = "This account has been disabled. Please contact support.";
  } else if (errorCode === "auth/too-many-requests") {
    friendlyMessage =
      "Access temporarily disabled due to too many failed login attempts. Try again later.";
  } else if (errorCode === "auth/invalid-email") {
    friendlyMessage = "The email address format is invalid.";
  } else if (errorCode === "auth/network-request-failed") {
    friendlyMessage = "Network error. Please check your internet connection.";
  }

  return friendlyMessage;
};
