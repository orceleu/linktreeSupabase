"use client";
import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { Button, Input } from "@nextui-org/react";
import { FaSync } from "react-icons/fa";
import {
  updateSingleComponentText,
  updateSingleComponentUrl,
} from "../dashboard/supabaseFunction";
import { supabase } from "../supabase/supabaseInstance";
import { BsArrowReturnLeft, BsBackpack2Fill } from "react-icons/bs";
import { useRouter } from "next/navigation";
import { Separator } from "@radix-ui/react-separator";
interface ComponentType {
  id: string;
  is_active: boolean;
  position: number;
  type: string;
  texte: string;
  photo_url: string;
  click: number;
  url: string;
  for_link_url: string;
}

function Search() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  let componentData1 = useRef<ComponentType[]>([]);
  const searchParams = useSearchParams();
  const searchPos = searchParams.get("search");
  const selectedUrl = searchParams.get("selectedurl");
  const witchComponent = searchParams.get("witchComponent");
  const id = searchParams.get("id");
  const fetchCompData = async () => {
    const { data, error } = await supabase
      .from("component")
      .select("*")
      .eq("id", id);

    if (error) console.log(error);
    if (data) {
      console.log(data);
      componentData1.current = data;
      setTitle(componentData1.current[0]?.texte);
      setUrl(componentData1.current[0]?.url);
    }
  };

  useEffect(() => {
    fetchCompData();
  }, []);
  const update = () => {
    if (id) {
      updateSingleComponentText(id, title);
      updateSingleComponentUrl(id, url);
    }
  };
  const returnComponent = (witchComponent: string | null) => {
    switch (witchComponent) {
      case "COMPONENT_LINK":
        return (
          <>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              className="p-5"
              label="Title."
            />

            <Input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://yourUrl"
              className="p-5"
              label="Url."
            />
          </>
        );

      case "COMPONENT_TEXT":
        return (
          <>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Your text"
              className="p-10"
            />
          </>
        );

      default:
        return (
          <>
            <Input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://yourUrl"
              className="p-10"
            />
          </>
        );
    }
  };

  return (
    <div>
      <div className="p-5 flex justify-start">
        <Button variant="ghost" onPress={() => router.back()}>
          <BsArrowReturnLeft />
        </Button>
      </div>

      <p className="text-center text-2xl font-bold">Edit.</p>
      <Separator className="my-5 p-5" />
      {returnComponent(witchComponent)}
      <br />
      <div className="flex justify-center">
        <Button onPress={update}>
          Update <FaSync />
        </Button>
      </div>
    </div>
  );
}

export default function Modifylink() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Search />
    </Suspense>
  );
}
