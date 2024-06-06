"use client";
import Image from "next/image";

import { Database } from "./database.type";
import { supabase } from "./supabase/supabaseInstance";
import { QueryResult, QueryData, QueryError } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Button } from "@nextui-org/react";
import { NextUIProvider } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { Slider } from "@nextui-org/react";
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
// Create a single supabase client for interacting with your database
export default function Home({
  Component,
  pageProps,
}: {
  Component: any;
  pageProps: any;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
  useEffect(() => {
    //fetchdata();
  }, []);

  return (
    <NextUIProvider>
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
            <Link href="#">Login</Link>
          </NavbarItem>
          <NavbarItem>
            <Button as={Link} color="primary" href="#" variant="flat">
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
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <p>helloooo ,this is my first supabase postgres database.</p>
        <Button color="success" className="text-blue-500">
          Click me
        </Button>
        <Input
          type="email"
          color="primary"
          label="Email"
          placeholder="Enter your email"
          defaultValue="junior@nextui.org"
          className="max-w-[220px]"
        />
        <Slider
          label="Temperature"
          step={0.01}
          maxValue={1}
          minValue={0}
          defaultValue={0.4}
          className="max-w-md"
        />
      </main>
    </NextUIProvider>
  );
}
