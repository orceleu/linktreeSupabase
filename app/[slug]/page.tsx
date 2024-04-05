"use client";
import React, { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

import { Database } from "../database.type";
import { QueryResult, QueryData, QueryError } from "@supabase/supabase-js";
import Link from "next/link";
import Image from "next/image";
import claireremovebg from "../../public/claireremovebg.png";
interface CountrieType {
  username: string;
  userdesc: string;
}

interface Reseaux {
  facebook: string;
  youtube: string;
  instagram: string;
  x: string;
  snapchat: string;
  github: string;
  onlyfans: string;
  pinterest: string;
  discord: string;
}
interface ReseauxClick {
  facebookclick: number;
  youtubeclick: number;
  instagramclick: number;
  xclick: number;
  snapchatclick: number;
  githubclick: number;
  onlyfansclick: number;
  pinterestclick: number;
  discordclick: number;
}

export default function Page({ params }: { params: { slug: string } }) {
  const [table, setTable] = useState("");
  const [country, setCountrie] = useState<CountrieType[]>([]);
  const [reseaux, setReseaux] = useState<Reseaux[]>([]);
  const [reseauxClick, setReseauxClick] = useState<ReseauxClick[]>([]);

  const [isfbnull, setFbnull] = useState(true);
  const [isytnull, setytnull] = useState(true);
  const [isignull, setignull] = useState(true);
  const [isxnull, setxnull] = useState(true);
  const [issnapnull, setsnapnull] = useState(true);
  const [isgitnull, setgitnull] = useState(true);
  const [isonlynull, setonlynull] = useState(true);
  const [ispintnull, setpintnull] = useState(true);
  const [isdisconull, setdisconull] = useState(true);
  const supabase = createClient<Database>(
    "https://otuqsjkpvrkthepuffcs.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im90dXFzamtwdnJrdGhlcHVmZmNzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE0NjU0NTcsImV4cCI6MjAyNzA0MTQ1N30.ebAshwk3B9i7Vlh99ZiWBa-qIa0q6CzirgCA6NldONg"
  );
  const fetchdata = async () => {
    const countriesWithCitiesQuery = supabase
      .from("users")
      .select(
        `username,
         userdesc
         `
      )
      .eq("userurl", table);

    type CountriesWithCities = QueryData<typeof countriesWithCitiesQuery>;

    const { data, error } = await countriesWithCitiesQuery;

    if (error) throw error;
    const countriesWithCities: CountriesWithCities = data;

    setCountrie(countriesWithCities);
    console.log(countriesWithCities);
  };

  const fetchreseaux = async () => {
    const reseauxdata = supabase
      .from("usersreseaux")
      .select(
        `facebook,
        youtube,
        instagram,
        x,
        snapchat,
        github,
        discord,
        pinterest,
        onlyfans`
      )
      .eq("usersreseauxid", table);

    type reseauxdata = QueryData<typeof reseauxdata>;
    const { data, error } = await reseauxdata;
    if (error) throw error;
    const result: reseauxdata = data;

    setReseaux(result);
    if (reseaux[0]?.facebook !== null && reseaux[0]?.facebook !== undefined) {
      setFbnull(false);
    }
    if (reseaux[0]?.youtube !== null && reseaux[0]?.youtube !== undefined) {
      setytnull(false);
    }
    if (reseaux[0]?.instagram !== null && reseaux[0]?.instagram !== undefined) {
      setignull(false);
    }
    if (reseaux[0]?.x !== null && reseaux[0]?.x !== undefined) {
      setxnull(false);
    }
    if (reseaux[0]?.snapchat !== null && reseaux[0]?.snapchat !== undefined) {
      setsnapnull(false);
    }
    if (reseaux[0]?.discord !== null && reseaux[0]?.discord !== undefined) {
      setdisconull(false);
    }
    if (reseaux[0]?.onlyfans !== null && reseaux[0]?.onlyfans !== undefined) {
      setonlynull(false);
    }
    if (reseaux[0]?.github !== null && reseaux[0]?.github !== undefined) {
      setgitnull(false);
    }
    if (reseaux[0]?.pinterest !== null && reseaux[0]?.pinterest !== undefined) {
      setpintnull(false);
    }

    console.log(result);
  };

  const fetchreseauxClick = async () => {
    const reseauxclickdata = supabase
      .from("usersreseauxclick")
      .select(
        `facebookclick,
        youtubeclick,
        instagramclick,
        xclick,
        snapchatclick,
        githubclick,
        discordclick,
        pinterestclick,
        onlyfansclick`
      )
      .eq("usersreseauxidclick", table);

    type reseauxclickdata = QueryData<typeof reseauxclickdata>;
    const { data, error } = await reseauxclickdata;
    if (error) throw error;
    const result: reseauxclickdata = data;

    if (result !== null && result !== undefined) {
      console.log(result);
      setReseauxClick(result);
      console.log(reseauxClick[0]?.facebookclick);
    }
  };
  const updateFacebookClick = async (initialclick: number) => {
    let prevclick = initialclick;
    const { error } = await supabase
      .from("usersreseauxclick")
      .update({ facebookclick: prevclick + 1 })
      .eq("usersreseauxidclick", table);
  };
  const updateYoutubeClick = async (initialclick: number) => {
    let prevclick = initialclick;
    const { error } = await supabase
      .from("usersreseauxclick")
      .update({ youtubeclick: prevclick + 1 })
      .eq("usersreseauxidclick", table);
  };
  const updateXClick = async (initialclick: number) => {
    let prevclick = initialclick;
    const { error } = await supabase
      .from("usersreseauxclick")
      .update({ xclick: prevclick + 1 })
      .eq("usersreseauxidclick", table);
  };
  const updateGithubClick = async (initialclick: number) => {
    let prevclick = initialclick;
    const { error } = await supabase
      .from("usersreseauxclick")
      .update({ githubclick: prevclick + 1 })
      .eq("usersreseauxidclick", table);
  };
  const updateInstagramClick = async (initialclick: number) => {
    let prevclick = initialclick;
    const { error } = await supabase
      .from("usersreseauxclick")
      .update({ instagramclick: prevclick + 1 })
      .eq("usersreseauxidclick", table);
  };
  const updatePinterestClick = async (initialclick: number) => {
    let prevclick = initialclick;
    const { error } = await supabase
      .from("usersreseauxclick")
      .update({ pinterestclick: prevclick + 1 })
      .eq("usersreseauxidclick", table);
  };

  useEffect(() => {
    if (params.slug !== undefined && params.slug !== null) {
      setTable(params.slug);
      if (table !== "") {
        fetchdata();
        fetchreseaux();
        fetchreseauxClick();
      }
    }
  }, [table, reseaux[0]?.facebook]);
  return (
    <div
      className={`bg-gradient-to-b from-[#3047f5] to-[#fc0101] w-full h-screen`}
    >
      <div className="  flex justify-center mt-6">
        <div className="grid mx-auto">
          <Image
            src={claireremovebg}
            alt=""
            className="w-[60px] h-[60px] rounded-[60px] mx-auto my-2 "
          />
          <p className="text-xl text-center">{country[0]?.username}</p>
          <p className="mt-5 text-gray-300 ">{country[0]?.userdesc}</p>

          <div>
            {isfbnull ? null : (
              <a
                href={`https://www.${reseaux[0]?.facebook}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div
                  className="max-w-sm rounded overflow-hidden shadow-lg bg-emerald-200 m-4 cursor-pointer hover:bg-slate-400"
                  onClick={() => {
                    console.log("facebook cliked");
                    updateFacebookClick(reseauxClick[0]?.facebookclick);
                  }}
                >
                  <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">facebook</div>
                  </div>
                </div>
              </a>
            )}
          </div>
          <div>
            {isytnull ? null : (
              <a
                href={`https://www.${reseaux[0]?.youtube}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div
                  className="max-w-sm rounded overflow-hidden shadow-lg bg-emerald-200 m-4 cursor-pointer hover:bg-slate-400"
                  onClick={() => {
                    console.log("youtube cliked");
                    updateYoutubeClick(reseauxClick[0]?.youtubeclick);
                  }}
                >
                  <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">youtube</div>
                  </div>
                </div>
              </a>
            )}
          </div>
          <div>
            {isignull ? null : (
              <a
                href={`https://www.${reseaux[0]?.instagram}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div
                  className="max-w-sm rounded overflow-hidden shadow-lg bg-emerald-200 m-4 cursor-pointer hover:bg-slate-400"
                  onClick={() => {
                    console.log("instagram cliked");
                    updateInstagramClick(reseauxClick[0]?.instagramclick);
                  }}
                >
                  <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">instagram</div>
                  </div>
                </div>
              </a>
            )}
          </div>

          <div>
            {isxnull ? null : (
              <a
                href={`https://www.${reseaux[0]?.x}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div
                  className="max-w-sm rounded overflow-hidden shadow-lg bg-emerald-200 m-4 cursor-pointer hover:bg-slate-400"
                  onClick={() => {
                    console.log("X cliked");
                    updateXClick(reseauxClick[0]?.xclick);
                  }}
                >
                  <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">X</div>
                  </div>
                </div>
              </a>
            )}
          </div>
          <div>
            {isgitnull ? null : (
              <a
                href={`https://www.${reseaux[0]?.github}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div
                  className="max-w-sm rounded overflow-hidden shadow-lg bg-emerald-200 m-4 cursor-pointer hover:bg-slate-400"
                  onClick={() => {
                    console.log("Github cliked");
                    updateGithubClick(reseauxClick[0]?.githubclick);
                  }}
                >
                  <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">Github</div>
                  </div>
                </div>
              </a>
            )}
          </div>
          <div>
            {ispintnull ? null : (
              <a
                href={`https://www.${reseaux[0]?.pinterest}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div
                  className="max-w-sm rounded overflow-hidden shadow-lg bg-emerald-200 m-4 cursor-pointer hover:bg-slate-400"
                  onClick={() => {
                    console.log("pinterest cliked");
                    updatePinterestClick(reseauxClick[0]?.pinterestclick);
                  }}
                >
                  <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">Pinterest</div>
                  </div>
                </div>
              </a>
            )}
          </div>

          <div>
            {isonlynull ? null : (
              <a
                href={`https://www.${reseaux[0]?.onlyfans}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div
                  className="max-w-sm rounded overflow-hidden shadow-lg bg-emerald-200 m-4 cursor-pointer hover:bg-slate-400"
                  onClick={() => {
                    console.log("Only cliked");
                  }}
                >
                  <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">Only</div>
                  </div>
                </div>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
