"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { deleteReview, setStatus, type ReviewStatus } from "@/lib/reviews";
import {
  ADMIN_COOKIE,
  ADMIN_TTL_SECONDS,
  checkAdminPassword,
  makeAdminToken,
  verifyAdminToken,
} from "@/lib/security";

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

async function requireAdmin() {
  const jar = await cookies();
  if (!verifyAdminToken(jar.get(ADMIN_COOKIE)?.value)) throw new Error("Unauthorized");
}

export async function login(formData: FormData) {
  const ok = checkAdminPassword(String(formData.get("password") ?? ""));
  if (!ok) {
    await new Promise((r) => setTimeout(r, 700)); // slows down password guessing
    redirect("/admin?e=1");
  }
  const jar = await cookies();
  jar.set(ADMIN_COOKIE, makeAdminToken(), {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    maxAge: ADMIN_TTL_SECONDS,
    path: "/admin",
  });
  redirect("/admin");
}

export async function logout() {
  const jar = await cookies();
  jar.delete({ name: ADMIN_COOKIE, path: "/admin" });
  redirect("/admin");
}

function refresh() {
  revalidatePath("/admin");
  revalidatePath("/");
  revalidatePath("/reviews");
}

export async function moderate(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "") as ReviewStatus;
  if (!UUID.test(id) || !["pending", "approved", "rejected"].includes(status)) return;
  await setStatus(id, status);
  refresh();
}

export async function remove(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!UUID.test(id)) return;
  await deleteReview(id);
  refresh();
}
