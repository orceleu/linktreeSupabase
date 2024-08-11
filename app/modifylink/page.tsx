"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
export default function Modifylink() {
  const searchParams = useSearchParams();
  console.log(searchParams.get("search"));
  const AAAA = searchParams.get("search");
  const BBBB = searchParams.get("selectedurl");
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div>
        <p>{AAAA}</p>
        <p>{BBBB}</p>
      </div>{" "}
    </Suspense>
  );
}
