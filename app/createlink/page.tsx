"use client";
import React, { useEffect, useRef, useState } from "react";
//import { createClient } from "@supabase/supabase-js";
import { v4 } from "uuid";
import { supabaseBrowserClient, supabase } from "../supabase/supabaseInstance";
//import { createBrowserClient } from "@supabase/ssr";
import { useRouter } from "next/navigation";
import { Database } from "../database.type";
import { QueryResult, QueryData, QueryError } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface UserType {
  userurl: string;
}
interface Link_type {
  link_url: string;
}
type Guid = string & { _guidBrand: undefined };
export default function Createlink() {
  const [value, setValue] = useState("");
  const [name, setname] = useState("");
  const [desc, setdesc] = useState("");
  const [usersurl, setuserurl] = useState<UserType[]>([]);
  const linkurl = useRef<Link_type[]>([]);
  const [isuserUrlDispo, setUserUrlDispo] = useState(false);
  const [textDispo, setTextDispo] = useState("");
  const [linkcreated, setlinkcreated] = useState(false);
  const [email, setEmail] = useState("");
  const userEmail = useRef("");
  const userId = useRef("");
  const route = useRouter();

  const isLogin = async () => {
    const { data, error } = await supabaseBrowserClient.auth.getUser();
    if (error || !data?.user) {
      //route.push("/login");
    }
    if (data.user?.email !== null && data.user?.email !== undefined) {
      setEmail(data.user.email);
    }
  };
  const fetchdata = async () => {
    const { data, error } = await supabase
      .from("link")
      .select("*")
      .eq("link_url", value);

    if (error) console.log(error);

    if (data) setuserurl(data);
    console.log(data);
  };
  const selectLink = async () => {
    const { data, error } = await supabase
      .from("link")
      .select("link_url")
      .eq("for_users_id", makeGuid(userId.current));

    if (error) console.log(error);

    if (data) linkurl.current = data;
    console.log(linkurl.current[0].link_url);
  };

  /*const isUserCreated= async () => {
    const { data, error } = await supabase
      .from("users")
      .select("user_email")
      .eq("link_url", value);

    if (error) console.log(error);

    if (data) user;
    console.log(data);
  }*/
  function makeGuid(text: string): Guid {
    // todo: add some validation and normalization here
    return text as Guid;
  }
  const addNameUrl = async () => {
    if (value !== "createlink") {
      if (isuserUrlDispo) {
        if (name !== "") {
          const { data, error } = await supabase.from("link").insert({
            is_active: true,
            is_pro: true,
            user_name: name,
            user_desc: desc,
            template: "",
            grid: "",
            monthly_click: 566,
            weekly_click: 45,
            daily_click: 3,
            link_url: value,
            for_users_id: makeGuid(userId.current),
          });

          console.log(data);
          // console.log("your link is live")
          setlinkcreated(true);
        } else {
          alert(" empty");
        }
      } else {
        alert("name indisponible!");
      }
    } else {
      alert("wong name choosen");
    }
  };

  const onChange = (e: any) => {
    var value = e.target.value;
    setValue(value);
    setname(value);
  };

  const onChangedesc = (e: any) => {
    var value = e.target.value;
    setdesc(value);
  };
  const onChangename = (e: any) => {
    var value = e.target.value;
    setname(value);
  };
  useEffect(() => {
    // isLogin();
    if (value.length < 5) {
      console.log("your name is too short!");
    } else {
      setTimeout(
        () => {
          fetchdata();
        },

        2000
      );
    }
  }, [value]);

  useEffect(() => {
    if (usersurl[0]?.userurl == null && usersurl[0]?.userurl == undefined) {
      setUserUrlDispo(true);
      setTextDispo("disponible");
      console.log("disponible");
    } else {
      setUserUrlDispo(false);
      setTextDispo("non disponible");
      console.log("non disponible");
    }
  }, [usersurl]);
  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    const { data, error } = await supabaseBrowserClient.auth.getUser();
    if (error || !data?.user) {
      // route.push("/login");
    }

    if (data.user?.email !== null && data.user?.email !== undefined) {
      userEmail.current = data.user.email;
      userId.current = data.user.id;
      console.log(userEmail.current);
      console.log(userId.current);

      createUser();
    }
  };
  const createUser = async () => {
    const { data, error } = await supabase.from("users").insert({
      user_id: makeGuid(userId.current),
      user_plan: "a",
      user_email: userEmail.current,
    });
    console.log(data);
  };

  return (
    <div
      className={`bg-gradient-to-b from-[#bec5fa] to-[#f7a9a9] w-full h-screen`}
    >
      {" "}
      {linkcreated ? (
        <>
          <div className="flex justify-center">
            <div className="flex items-center gap-3">
              <Link href={`/${value}`}>
                <Button>see it live</Button>
              </Link>
              <Link href={`/dashboard`}>
                <Button>go to dashboard</Button>
              </Link>
            </div>
          </div>
        </>
      ) : (
        <div>
          <Button onClick={selectLink}>show all link</Button>
          <div className="  flex justify-center mt-6">
            <div className="grid mx-auto">
              <div>
                <input
                  value={value}
                  onChange={onChange}
                  placeholder="your name"
                  className="bg-gray-700   "
                />
                <p>
                  dispo? <span>{textDispo}</span>
                </p>
              </div>
              <input
                value={name}
                onChange={onChangename}
                placeholder="your name"
                className="bg-gray-700 my-10"
              />
              <input
                value={desc}
                onChange={onChangedesc}
                placeholder="your description"
                className="bg-gray-700"
              />
              <button onClick={addNameUrl}>add</button>
              <p>your will be able to add any linka after</p>
            </div>
          </div>
        </div>
      )}
      <br />
      <br />
      <br />
    </div>
  );
}
