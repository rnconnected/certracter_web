import { auth } from "@/app/firebase/config";

export const ResetPassword = async (email) => {
  try {
    await auth.sendPasswordResetEmail(email);
    return {
      success: true,
      message: "Password reset email sent successfully.",
    };
  } catch (error) {
    return { success: false, message: error.message };
  }
};
