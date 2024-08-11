"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
export default function modifylink() {
  const searchParams = useSearchParams();
  console.log(searchParams.get("search"));
  const AAAA = searchParams.get("search");
  const BBBB = searchParams.get("selectedurl");
  return (
    <div>
      <p>{AAAA}</p>
      <p>{BBBB}</p>
    </div>
  );
}
