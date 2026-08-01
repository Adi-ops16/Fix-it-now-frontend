"use server";

import { getTokenDetails } from "@/service/getToken";

export const getCurrentUserAction = async () => {
  return getTokenDetails();
};
