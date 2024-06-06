"use client";
import { useRouter } from "next/navigation";

import { createBrowserClient } from "@supabase/ssr";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { v4 } from "uuid";
import { supabase } from "../supabase/supabaseInstance";
import { Database } from "../database.type";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import undraw_male_avatar_g98d from "../../public/undraw_male_avatar_g98d.svg";
import { Snippet } from "@nextui-org/react";
import { Switch } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { Tabs, Tab } from "@nextui-org/react";
import { Separator } from "@/components/ui/separator";
import { Divider } from "@nextui-org/react";
import GooglePayButton from "@google-pay/button-react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
  User,
} from "@nextui-org/react";

import { QueryResult, QueryData, QueryError } from "@supabase/supabase-js";
import {
  BarChart4,
  GalleryVertical,
  HomeIcon,
  Link2Icon,
  Music2Icon,
  Square,
  SquareMinus,
  VideotapeIcon,
  ViewIcon,
} from "lucide-react";
interface UserType {
  userurl: string;
}

export default function Dashboard() {
  const [email, setEmail] = useState("");
  const [isSelected, setIsSelected] = useState(true);
  const [value, setValue] = useState("");
  const [name, setname] = useState("");
  const [desc, setdesc] = useState("");
  const [usersurl, setuserurl] = useState<UserType[]>([]);
  const [isuserUrlDispo, setUserUrlDispo] = useState(false);

  const [textDispo, setTextDispo] = useState("");
  const [paymentData, setPaymentData] = useState(null);

  const [buttonlayoutShow, setbuttonLayoutShow] = useState(false);
  const [gridlayoutShow, setgridLayoutShow] = useState(false);
  const [appearrancelayoutShow, setappearanceLayoutShow] = useState(false);
  const [isHome, setHome] = useState(true);
  const [isanalytics, setAnalytics] = useState(false);
  const [isshortlink, setshortlink] = useState(false);
  useEffect(() => {
    // Initialization and configuration of Google Pay
  }, []);

  const handlePaymentSuccess = (paymentMethod: any) => {
    console.log("Payment successful", paymentMethod);
    setPaymentData(paymentMethod);
  };
  const route = useRouter();
  const supabase = createBrowserClient(
    "https://otuqsjkpvrkthepuffcs.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im90dXFzamtwdnJrdGhlcHVmZmNzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE0NjU0NTcsImV4cCI6MjAyNzA0MTQ1N30.ebAshwk3B9i7Vlh99ZiWBa-qIa0q6CzirgCA6NldONg"
  );
  const isLogin = async () => {
    const { data, error } = await supabase.auth.getUser();
    if (error || !data?.user) {
      // route.push("/login");
    }
    if (data.user?.email !== null && data.user?.email !== undefined) {
      setEmail(data.user.email);
    }
  };

  useEffect(() => {
    isLogin();
  }, []);

  const logOut = async () => {
    const { error } = await supabase.auth.signOut();
    console.log("logged out!");
    route.push("/login");
    if (error) {
      console.log(error);
    }
  };

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
        if (name !== "") {
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
          alert("your page now is live!");
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
    isLogin();
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
    <div className="flex h-screen">
      <div className="w-auto bg-gray-100 h-[700px]">
        <div className="grid">
          <Button
            variant="outline"
            className="mx-2 mt-5"
            onClick={() => {
              setHome(true);
              setAnalytics(false);
              setshortlink(false);
            }}
          >
            <HomeIcon />
          </Button>
          <Button
            className="my-5 mx-2"
            variant="outline"
            onClick={() => {
              setHome(false);
              setAnalytics(true);
              setshortlink(false);
            }}
          >
            <BarChart4 />
          </Button>
          <Button
            variant="outline"
            className="mx-2"
            onClick={() => {
              setHome(false);
              setAnalytics(false);
              setshortlink(true);
            }}
          >
            <Link2Icon />
          </Button>
        </div>

        <div className=" fixed bottom-5 mx-2">
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">{email}</p>
              </DropdownItem>
              <DropdownItem key="settings">My Settings</DropdownItem>
              <DropdownItem key="team_settings">Team Settings</DropdownItem>
              <DropdownItem key="analytics">Analytics</DropdownItem>
              <DropdownItem key="system">System</DropdownItem>
              <DropdownItem key="configurations">Configurations</DropdownItem>
              <DropdownItem key="help_and_feedback">
                Help & Feedback
              </DropdownItem>
              <DropdownItem key="logout" color="danger" onClick={logOut}>
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>

      <div className="flex w-full">
        {isHome ? <>{home()}</> : null}
        {isanalytics ? <>{analytics()}</> : null}
        {isshortlink ? <>{shortlink()}</> : null}
      </div>
    </div>
  );

  function home() {
    return (
      <div className="flex w-full">
        <div className="w-3/5  bg-white flex justify-center ">
          <div className="grid mx-auto">
            <Tabs
              aria-label="Options"
              color="primary"
              variant="underlined"
              className="mt-5"
              onSelectionChange={(key: any) => {
                console.log(key);

                if (key == "createlink") {
                  setbuttonLayoutShow(false);
                  setgridLayoutShow(true);
                  setappearanceLayoutShow(false);
                } else if (key == "grid") {
                  setbuttonLayoutShow(true);
                  setgridLayoutShow(false);
                  setappearanceLayoutShow(false);
                } else if (key == "appearance") {
                  setbuttonLayoutShow(false);
                  setgridLayoutShow(false);
                  setappearanceLayoutShow(true);
                }
              }}
            >
              <Tab
                key="createlink"
                title={
                  <div className="flex items-center space-x-2">
                    <span>Create bio link</span>
                  </div>
                }
              />
              <Tab
                key="grid"
                title={
                  <div className="flex items-center space-x-2">
                    <span>Grid</span>
                  </div>
                }
              />
              <Tab
                key="appearance"
                title={
                  <div className="flex items-center space-x-2">
                    <span>Appearance</span>
                  </div>
                }
              />
            </Tabs>

            {buttonlayoutShow ? <>{ButtonLayout()}</> : null}
            {gridlayoutShow ? (
              <>
                <div>
                  <Input
                    value={value}
                    maxLength={15}
                    onChange={onChange}
                    placeholder="your extension name"
                    startContent={
                      <div className="pointer-events-none flex items-center">
                        <span className="text-default-400 text-small">
                          https://linktree/
                        </span>
                      </div>
                    }
                  />
                  <p>
                    dispo? <span>{textDispo}</span>
                  </p>
                </div>
                <Switch isSelected={isSelected} onValueChange={setIsSelected}>
                  Airplane mode
                </Switch>
                <Input
                  value={name}
                  onChange={onChangename}
                  placeholder="your name"
                />
                <Input
                  value={desc}
                  maxLength={100}
                  onChange={onChangedesc}
                  placeholder="your description"
                  className="my-5"
                />
                <Button
                  variant="outline"
                  onClick={addNameUrl}
                  className="rounded-[50px]"
                >
                  add
                </Button>
                <p>your will be able to add any linka after</p>
              </>
            ) : null}

            {appearrancelayoutShow ? <>{AppearanceLayout()}</> : null}

            <br />
          </div>

          <Divider orientation="vertical" className="mx-10" />
        </div>

        <div className=" w-2/5 flex justify-center ">
          <div className="grid ">
            <Snippet color="success" className="my-3">
              http://localhost:3000/orcel
            </Snippet>
            <Tabs
              aria-label="Options"
              color="primary"
              variant="bordered"
              onSelectionChange={(key: any) => {
                console.log(key);
              }}
            >
              <Tab
                key="photos"
                title={
                  <div className="flex items-center space-x-2">
                    <SquareMinus />
                    <span>Mobile</span>
                  </div>
                }
              />
              <Tab
                key="music"
                title={
                  <div className="flex items-center space-x-2">
                    <Square />
                    <span>Desktop</span>
                  </div>
                }
              />
              <Tab
                key="videos"
                title={
                  <div className="flex items-center space-x-2">
                    <Square />
                    <span>Tablet</span>
                  </div>
                }
              />
            </Tabs>
            <div className=" bg-white w-[300px] h-[500px] border-gray-300 rounded-3xl shadow-md p-6 border-[5px]">
              <div className="grid mx-auto">
                <Image
                  src={undraw_male_avatar_g98d}
                  alt=""
                  className="w-[60px] h-[60px] rounded-[60px] mx-auto my-2 "
                />
                <p className="text-xl text-center">
                  @<span>{name}</span>
                </p>
                <div className="mx-10">
                  <p className="my-5 text-gray-500 text-center text-[12px] ">
                    {desc}
                  </p>
                </div>

                <div className=" bg-white w-[250px] h-[50px] border-emerald-300 rounded-3xl  p-6 border-[2px]">
                  <p className="text-center mb-2">youtube</p>
                </div>

                <div className=" bg-white w-[250px] h-[50px] border-emerald-300 rounded-3xl mt-4 p-6 border-[2px]">
                  <p className="text-center mb-2">facebook</p>
                </div>

                <div className=" bg-white w-[250px] h-[50px] border-emerald-300 rounded-3xl mt-4  p-6 border-[2px]">
                  <p className="text-center mb-2">instagram</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  function analytics() {
    return (
      <div>
        <p>analytics</p>
      </div>
    );
  }
  function shortlink() {
    return (
      <div>
        <p>shortlink</p>
      </div>
    );
  }
}

function GridLayout() {
  return (
    <div>
      <p>grid layout</p>
    </div>
  );
}
function ButtonLayout() {
  return (
    <div>
      <p>button layout</p>
    </div>
  );
}
function AppearanceLayout() {
  return (
    <div>
      <p>appearance layout</p>
    </div>
  );
}
