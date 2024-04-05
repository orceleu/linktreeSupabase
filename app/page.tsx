"use client";
import Image from "next/image";

import { createClient } from "@supabase/supabase-js";
import { Database } from "./database.type";
//import Profil from "./pages/profils/[slug]";

import { QueryResult, QueryData, QueryError } from "@supabase/supabase-js";
import { useEffect } from "react";
import { useRouter } from "next/router";

// Create a single supabase client for interacting with your database

export default function Home() {
  const supabase = createClient<Database>(
    "https://otuqsjkpvrkthepuffcs.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im90dXFzamtwdnJrdGhlcHVmZmNzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE0NjU0NTcsImV4cCI6MjAyNzA0MTQ1N30.ebAshwk3B9i7Vlh99ZiWBa-qIa0q6CzirgCA6NldONg"
  );
  const fetchdata = async () => {
    const countriesWithCitiesQuery = supabase.from("countries").select(`
      id,
      name,
      cities (
        id,
        name
      )
    `);
    type CountriesWithCities = QueryData<typeof countriesWithCitiesQuery>;

    const { data, error } = await countriesWithCitiesQuery;

    if (error) throw error;
    const countriesWithCities: CountriesWithCities = data;
    console.log(countriesWithCities);
  };

  const addData = async () => {
    console.log("cliked!");
    const { error, data, statusText, status } = await supabase
      .from("countries")
      .insert({ id: 5, name: "Belgique" })
      .select();
    console.log(statusText, status);
  };
  const deleteData = async () => {
    console.log("cliked!");
    const { error, data, statusText, status } = await supabase
      .from("countries")
      .delete()
      .eq("id", 5);
    console.log(statusText, status);
  };
  useEffect(() => {
    fetchdata();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <p>helloooo ,this is my first supabase postgres database.</p>
      <button onClick={addData}>add data</button>
      <button onClick={deleteData}>delete</button>
    </main>
  );
}
