"use server";

import { cookies } from "next/headers";
import type { Locale } from "./config";

const ONE_YEAR = 60 * 60 * 24 * 365;

export async function setLocale(locale: Locale) {
  const store = await cookies();

  store.set("locale", locale, {
    path: "/",
    maxAge: ONE_YEAR,
    sameSite: "lax",
  });
}
