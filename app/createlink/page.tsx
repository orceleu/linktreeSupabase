"use client";
import React, { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { v4 } from "uuid";

import { Database } from "../database.type";
import { QueryResult, QueryData, QueryError } from "@supabase/supabase-js";
interface UserType {
  userurl: string;
}

export default function Createlink() {
  const supabase = createClient<Database>(
    "https://otuqsjkpvrkthepuffcs.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im90dXFzamtwdnJrdGhlcHVmZmNzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE0NjU0NTcsImV4cCI6MjAyNzA0MTQ1N30.ebAshwk3B9i7Vlh99ZiWBa-qIa0q6CzirgCA6NldONg"
  );
  const [value, setValue] = useState("");
  const [name, setname] = useState("");
  const [desc, setdesc] = useState("");
  const [usersurl, setuserurl] = useState<UserType[]>([]);
  const [isuserUrlDispo, setUserUrlDispo] = useState(false);
  const [textDispo, setTextDispo] = useState("");
  const fetchdata = async () => {
    const countriesWithCitiesQuery = supabase
      .from("users")
      .select(
        `userurl
             `
      )
      .eq("userurl", value);

    type CountriesWithCities = QueryData<typeof countriesWithCitiesQuery>;

    const { data, error } = await countriesWithCitiesQuery;

    if (error) throw error;
    const countriesWithCities: CountriesWithCities = data;

    setuserurl(countriesWithCities);
    console.log(countriesWithCities);
  };

  const addNameUrl = async () => {
    if (value !== "createlink") {
      if (isuserUrlDispo) {
        const { data, error } = await supabase
          .from("users")
          .insert({
            userid: `${v4().substring(0, 8)}`,
            userplan: "3",
            userurl: value,
            username: name,
            userdesc: desc,
          })
          .select();

        console.log(data);
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
  return (
    <div
      className={`bg-gradient-to-b from-[#bec5fa] to-[#f7a9a9] w-full h-screen`}
    >
      <br />
      <br />
      <br />
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
  );
}
