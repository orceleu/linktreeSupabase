"use client";
import { createContext, useCallback, useContext } from "react";
//import React, { useMemo, memo, useCallback } from "react";
import { supabase } from "./supabase/supabaseInstance";
import { QueryResult, QueryData, QueryError } from "@supabase/supabase-js";
import { useState } from "react";
import { Button } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/react";
import Link from "next/link";
type ComponentProps = {
  selected: string;
};

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  /* const [set1, setset1] = useState(false);
  const [set2, setset2] = useState(false);
  const Test = () => {
    console.log("test component rendered");
    return <div>Test Content</div>;
  };
  const setset11 = useCallback(() => {
    console.log("set1 rerended");
    setset1(!set1);
  }, [set1]);

  const setset22 = useCallback(() => {
    console.log("set2 rendered");
    setset2(!set2);
  }, [set2]);*/
  /*
  const [count1, setCount1] = useState<number>(0);
  const [count2, setCount2] = useState<number>(0);

  const incrementCount1 = useCallback(() => {
    setCount1((prevCount) => prevCount + 1);
  }, []);

  const incrementCount2 = useCallback(() => {
    setCount2((prevCount) => prevCount + 1);
  }, []);

  const memoizedValue = useMemo(() => {
    console.log("Calculating memoized value");
    return count1 * 2;
  }, [count1]);
*/

  const menuItems = [
    "Profile",
    "Dashboard",
    "Activity",
    "Analytics",
    "System",
    "Deployments",
    "My Settings",
    "Team Settings",
    "Help & Feedback",
    "Log Out",
  ];

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

  return (
    <main>
      {" "}
      <Navbar onMenuOpenChange={setIsMenuOpen} className="fixed top">
        <NavbarContent>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden"
          />
          <NavbarBrand>
            <p className="font-bold text-inherit">ACME</p>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem>
            <Link color="foreground" href="#">
              Features
            </Link>
          </NavbarItem>
          <NavbarItem isActive>
            <Link href="#" aria-current="page">
              Customers
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="#">
              Integrations
            </Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem className="hidden lg:flex">
            <Link href="/login">Login</Link>
          </NavbarItem>
          <NavbarItem>
            <Button
              as={Link}
              color="primary"
              href="/signup"
              variant="flat"
              className="text-fuchsia-800 font-bold"
            >
              Sign Up
            </Button>
          </NavbarItem>
        </NavbarContent>
        <NavbarMenu>
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={
                  index === 2
                    ? "primary"
                    : index === menuItems.length - 1
                    ? "danger"
                    : "foreground"
                }
                className="w-full"
                href="#"
              >
                {item}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>
      <main className="flex min-h-screen flex-col items-center p-10">
        <br />
        <br />
        <br />
        <br />
        <p className="text-4xl font-semibold my-4 text-center max-w-[500px]">
          Build your own landing page ,
          <span className="text-amber-600">Get,track, & manage</span> all your
          link in one place
        </p>
        <Input
          className="max-w-[500px] my-4"
          placeholder="quicklnk/your link"
        />{" "}
        <Button variant="solid" className="text-fuchsia-800 font-bold">
          Get your link
        </Button>
        <div className="rounded-[20px] bg-gray-50 my-10   h-[700px] w-full"></div>
      </main>
      <div
        style={{
          background: `linear-gradient(180deg,rgba(255, 255, 255, 1),rgba(213, 0, 198, 1)   )`,
        }}
        className="flex justify-center h-[1000px] w-full  "
      >
        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-10 mx-10">
          <div className="flex items-center ">
            <p className="text-white font-bold text-xl lg:text-2xl mt-10 max-w-[200px]">
              achieve more people make impact & track the perfomance
            </p>
            <div className="rounded-sm shadow-md  h-[300px] w-[600px] bg-white"></div>
          </div>
          <div className="flex items-center ">
            <p className="text-white font-bold text-2xl mt-10 max-w-[200px]">
              drag & drop editor user friendly
            </p>
            <div className="rounded-sm shadow-md  h-[300px] w-[600px] bg-white"></div>
          </div>

          <div className="flex items-center ">
            <p className="text-white font-bold text-2xl mt-10 max-w-[200px]">
              Multiple link in one place
            </p>
            <div className="rounded-sm shadow-md  h-[300px] w-[600px] bg-white"></div>
          </div>
        </div>
      </div>
    </main>
  );
}

/*<div>
        <Test />
        <p>{set1}</p>
        <p>{set2}</p>
        <Button onPress={() => setset11()}>click set1</Button>
        <Button onPress={() => setset22()}>click set2</Button>
      </div>*/
