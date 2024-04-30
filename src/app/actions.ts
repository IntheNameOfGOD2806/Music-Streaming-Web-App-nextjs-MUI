"use server";

import { revalidateTag } from "next/cache";

export default async function actionRevaliDateLikedTag() {
  revalidateTag("liked");
}