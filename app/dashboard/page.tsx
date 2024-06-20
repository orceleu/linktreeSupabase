"use client";
import { useRouter } from "next/navigation";

import { supabaseBrowserClient, supabase } from "../supabase/supabaseInstance";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Properties } from "csstype";
import { Children, useEffect, useRef, useState } from "react";
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
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import "chart.js/auto";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  FacebookIcon,
  InstagramIcon,
  PlusIcon,
  SnailIcon,
  TrashIcon,
  TwitchIcon,
  TwitterIcon,
} from "lucide-react";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
} from "@nextui-org/react";

import {
  BarChart4,
  HomeIcon,
  Link2Icon,
  Square,
  SquareMinus,
} from "lucide-react";
interface Itemdnd {
  is_active: boolean;
  position: number;
  card_name: string;
  reseaux_url: string;
  photo_url: string;
  click: number;
  for_link_url: string;
}

const initialItemsUserReseaux: Itemdnd[] = [
  {
    is_active: true,
    position: 0,
    card_name: "name1",
    reseaux_url: "google.com/1",
    photo_url: "photo.com",
    click: 23,
    for_link_url: "orceleuler",
  },
  {
    is_active: true,
    position: 1,
    card_name: "name2",
    reseaux_url: "google.com/2",
    photo_url: "photo.com",
    click: 23,
    for_link_url: "orceleuler",
  },
  {
    is_active: true,
    position: 2,
    card_name: "name3",
    reseaux_url: "google.com/3",
    photo_url: "photo.com",
    click: 23,
    for_link_url: "orceleuler",
  },
];

interface UserType {
  link_url: string;
}
type Guid = string & { _guidBrand: undefined };

type Item = {
  id: number;
  name: string;
  label: string;
};

interface LinkRetriv {
  is_active: boolean;
  is_pro: boolean;
  user_name: string;
  user_desc: string;
  template: string;
  grid: string;
  monthly_click: number;
  weekly_click: number;
  daily_click: number;
  link_url: string;
}
interface ReseauxData {
  is_active: boolean;
  position: number;
  card_name: string;
  reseaux_url: string;
  photo_url: string;
  click: number;
  for_link_url: string;
}

const reseauLinkToAdd: string[] = [];

export default function Dashboard() {
  const [email, setEmail] = useState("");
  const [value, setValue] = useState("");
  const [selectedlink, setselectedLink] = useState("");
  const [name, setname] = useState("");
  const [desc, setdesc] = useState("");
  const [usersurl, setuserurl] = useState<UserType[]>([]);
  const [isuserUrlDispo, setUserUrlDispo] = useState(false);
  const [isfacebooklinkdisable, setFacebooklinkdisable] = useState(false);
  const [isinstagramlinkdisable, setInstagramlinkdisable] = useState(false);
  const [isXlinkdisable, setXlinkdisable] = useState(false);
  const [items, setItems] = useState<Item[]>([]);
  const [inputs, setInputs] = useState<
    { id: number; value: string; label: string }[]
  >([]);
  const [labelselected, setlabelselected] = useState("");
  const [textDispo, setTextDispo] = useState("");
  const [paymentData, setPaymentData] = useState(null);
  const userId = useRef("");
  const [yourlink, setyourlink] = useState<LinkRetriv[]>([]);
  const [itemsdnd, setItemsdnd] = useState<Itemdnd[]>([]);

  const [buttonlayoutShow, setbuttonLayoutShow] = useState(false);
  const [gridlayoutShow, setgridLayoutShow] = useState(false);
  const [appearrancelayoutShow, setappearanceLayoutShow] = useState(false);
  const [isHome, setHome] = useState(true);
  const [isanalytics, setAnalytics] = useState(false);
  const [isshortlink, setshortlink] = useState(false);
  //url user selectionne
  const selectedUrl = useRef("*");

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = itemsdnd.findIndex(
        (item) => item.position === active.id
      );
      const newIndex = itemsdnd.findIndex((item) => item.position === over.id);

      const newItems: any = arrayMove(itemsdnd, oldIndex, newIndex).map(
        (item, index) => ({
          ...item,
          position: index,
        })
      );

      setItemsdnd(newItems);

      console.log(newItems);
      updateReseauxPosition(newItems);
    }
  };
  //1---supabase postgres functions

  //donne tout les liens cree par les users
  const fetchAllLink = async () => {
    const { data, error } = await supabase
      .from("link")
      .select("*")
      .eq("for_users_id", makeGuid(userId.current));
    if (error) console.log(error);

    if (data) {
      setyourlink(data);
      setselectedLink(data[0]?.link_url);
      setname(data[0].user_name);
      setdesc(data[0].user_desc);
    }

    fetchReseauxLink();
  };
  const fetchdata = async () => {
    const { data, error } = await supabase
      .from("link")
      .select("link_url")
      .eq("link_url", selectedUrl.current);

    if (error) console.log(error);

    if (data) setuserurl(data);

    console.log(`link url feching: ${data}`);
  };
  const fetchReseauxLink = async () => {
    const { data, error } = await supabase
      .from("users_reseaux")
      .select("*")
      .eq("for_link_url", "orceleuler");

    if (error) console.log(error);

    if (data) setItemsdnd(data);

    console.log(`reseaux feching: ${data}`);
  };
  const changeName = async () => {
    const { data, error } = await supabase
      .from("link")
      .update({ user_name: name })
      .eq("link_url", selectedUrl.current);

    if (error) console.log(error);

    //if (data) setuserurl(data);
    console.log(data);
  };
  const changeDesc = async () => {
    const { data, error } = await supabase
      .from("link")
      .update({ user_desc: desc })
      .eq("link_url", selectedUrl.current);

    if (error) console.log(error);

    //if (data) setuserurl(data);
    console.log(data);
  };
  const changeLinkUrl = async () => {
    if (value !== "createlink") {
      if (!isuserUrlDispo) {
        if (name !== "") {
          const { data, error } = await supabase
            .from("link")
            .update({ link_url: name })
            .eq("link_url", selectedUrl.current);

          if (error) console.log(error);

          //if (data) setuserurl(data);
          console.log(data);
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

  const addLinkUrl = async () => {
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
          if (error) console.log(error);
          console.log(data);

          // addReseauxLink();

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
  const addReseauxLink = async () => {
    let newCardReseauxTablePositon1: ReseauxData[] = [
      {
        is_active: true,
        position: 3,
        card_name: "card name",
        reseaux_url: "google.com/3",
        photo_url: "photo.com",
        click: 1,
        for_link_url: selectedUrl.current,
      },
      {
        is_active: true,
        position: 4,
        card_name: "card name",
        reseaux_url: "google.com/4",
        photo_url: "photo.com",
        click: 1,
        for_link_url: selectedUrl.current,
      },
    ];
    const { data, error } = await supabase
      .from("users_reseaux")
      .insert(newCardReseauxTablePositon1);
    if (error) console.log(error);
    console.log(data);
  };

  const updateReseauxPosition = async (dataForUpdate: any) => {
    itemsdnd.map(
      async (update) => {
        const { data, error } = await supabase

          .from("users_reseaux") // Remplacez par le nom de votre table
          .update({ position: update.position }) // Remplacez par la colonne et la valeur à mettre à jour
          .eq("reseaux_url", update.reseaux_url);
      } // Critères de sélection pour l'enregistrement à mettre à jour
    );
  };
  const addSitesLink = async (
    is_active: boolean,
    position: number,
    card_name: string,
    site_url: string,
    photo_url: string,
    click: number,
    for_link_url: string
  ) => {
    const { data, error } = await supabase
      .from(" users_site")
      .insert({
        is_active: is_active,
        position: position,
        card_name: card_name,
        site_url: site_url,
        photo_url: photo_url,
        click: click,
        for_link_url: for_link_url,
      })
      .select();
  };
  /* const handleContentChange = (id: string, newContent: string) => {
    setItemsdnd((items) =>
      items.map((item) =>
        item.id === id ? { ...item, content: newContent } : item
      )
    );
  };*/
  ////////////////////////////////////////////////////////////////////////

  const handleInputChange = (id: number, value: string) => {
    setInputs((prevInputs) =>
      prevInputs.map((input) => (input.id === id ? { ...input, value } : input))
    );
  };

  const handleLabelChange = (id: number, label: string) => {
    setInputs((prevInputs) =>
      prevInputs.map((input) => (input.id === id ? { ...input, label } : input))
    );
  };

  const addItem = () => {
    const newId = items.length + 1;
    setItems((prevItems) => [
      ...prevItems,
      { id: newId, name: "", label: labelselected },
    ]);
    setInputs((prevInputs) => [
      ...prevInputs,
      { id: newId, value: "", label: "" },
    ]);
  };

  const handleSave = (id: number) => {
    const input = inputs.find((input) => input.id === id);
    if (input) {
      setItems((prevItems) =>
        prevItems.map((item) =>
          item.id === id
            ? { ...item, name: input.value, label: input.label }
            : item
        )
      );
    }
  };
  const handleDelete = (id: number) => {
    const updatedItems = items.filter((item) => item.id !== id);
    const updatedInputs = inputs.filter((input) => input.id !== id);

    const rearrangedItems = updatedItems.map((item, index) => ({
      ...item,
      id: index + 1,
    }));

    const rearrangedInputs = updatedInputs.map((input, index) => ({
      ...input,
      id: index + 1,
    }));

    setItems(rearrangedItems);
    setInputs(rearrangedInputs);
  };

  const handlePaymentSuccess = (paymentMethod: any) => {
    console.log("Payment successful", paymentMethod);
    setPaymentData(paymentMethod);
  };
  const route = useRouter();

  const isLogin = async () => {
    const { data, error } = await supabaseBrowserClient.auth.getUser();
    if (error || !data?.user) {
      // route.push("/login");
    }
    if (data.user?.email !== null && data.user?.email !== undefined) {
      setEmail(data.user.email);
      userId.current = data.user.id;

      fetchAllLink();
    }
  };

  useEffect(() => {
    isLogin();
  }, []);

  const logOut = async () => {
    const { error } = await supabaseBrowserClient.auth.signOut();
    console.log("logged out!");
    route.push("/login");
    if (error) {
      console.log(error);
    }
  };
  function makeGuid(text: string): Guid {
    // todo: add some validation and normalization here
    return text as Guid;
  }

  const onChange = (e: any) => {
    var value = e.target.value;
    setValue(value);
    selectedUrl.current = value;

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
    if (usersurl[0]?.link_url == null && usersurl[0]?.link_url == undefined) {
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
        <ScrollArea className="w-4/6  bg-white p-10 mt-5">
          <p className="fixed top-2 text-blue-600 font-bold text-3xl ">
            ssply.
            <span className="text-emerald-500 font-bold text-3xl">bio</span>
          </p>

          <div className="grid mx-auto">
            <Tabs
              aria-label="Options"
              color="primary"
              variant="underlined"
              className="my-5"
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
                <p className="my-5">All link</p>
                {yourlink.map((link, index) => (
                  <p
                    key={index}
                    onClick={() => {
                      selectedUrl.current = link.link_url;
                      setselectedLink(link.link_url);
                      setname(link.user_name);
                      setdesc(link.user_desc);
                    }}
                    className="text-blue-600"
                  >
                    {link.link_url}
                  </p>
                ))}
                <div>
                  <Input
                    value={value}
                    maxLength={15}
                    onChange={onChange}
                    placeholder={selectedlink}
                    startContent={
                      <div className="pointer-events-none flex items-center">
                        <p className="text-default-400 text-small">
                          https://linktree/
                        </p>
                      </div>
                    }
                  />
                  <p>
                    dispo? <span>{textDispo}</span>
                  </p>
                </div>

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

                <Separator className="my-5" />

                <p>add social link vertical? horizontal?</p>

                <div className="mt-10">
                  <ul>
                    {items.map((item: any) => (
                      <li key={item.id}>
                        <p>
                          {inputs.find((input) => input.id === item.id)
                            ?.label || ""}
                        </p>
                        <Input
                          type="text"
                          value={
                            inputs.find((input) => input.id === item.id)
                              ?.value || ""
                          }
                          onChange={(e) => {
                            handleInputChange(item.id, e.target.value);
                            handleLabelChange(item.id, labelselected);

                            //addStringToArray(`${item.id}${item.name}`);
                          }}
                          placeholder="Enter Url social media link"
                        />
                        <div className="flex items-center gap-2 my-2 end-3">
                          <Button onClick={() => handleSave(item.id)}>
                            Save
                          </Button>

                          <Button
                            onClick={() => {
                              handleDelete(item.id);
                              // setId((prev) => prev - 1);
                              //delete must be de bas en haut
                              //remove the link to add
                              console.log(labelselected);
                              if (labelselected == "facebook link") {
                                setFacebooklinkdisable(false);
                              }
                              if (labelselected == "instagram link") {
                                setInstagramlinkdisable(false);
                              }
                              if (labelselected == "x link") {
                                setXlinkdisable(false);
                              }
                            }}
                          >
                            Delete
                          </Button>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <p>
                    All items:{" "}
                    {items
                      .map((item) => `${item.id}${item.name}`)
                      .filter(Boolean)
                      .join(", ")}
                  </p>
                </div>
                <Button
                  onClick={() => {
                    /* items.map((item) => {
                      //addStringToArray(`${item.id}${item.name}`);
                    });*/
                    console.log(`${items[0]?.id}${items[0]?.name}`);
                    console.log(`${items[1]?.id}${items[1]?.name}`);
                    console.log(`${items[2]?.id}${items[2]?.name}`);
                    // console.log(reseauLinkToAdd[0].toString());
                    //console.log(reseauLinkToAdd[1].toString());
                    //console.log(reseauLinkToAdd[2].toString());
                  }}
                >
                  show reseau link added
                </Button>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">
                      Add social link <PlusIcon />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Add link</DialogTitle>
                      <DialogDescription>
                        Choose your social media link.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="flex items-center space-x-2">
                      <div className="grid flex-1 gap-2">
                        <ScrollArea className="w-full  rounded-md border">
                          <div className="grig grid-cols-3 gap-3 ">
                            <DialogClose asChild>
                              <Button
                                variant="outline"
                                className="mx-2 my-2"
                                disabled={isfacebooklinkdisable}
                                onClick={() => {
                                  console.log(
                                    "facebook selected,so it can be showing"
                                  );

                                  setlabelselected("facebook link");
                                  setFacebooklinkdisable(true);
                                  addItem();
                                }}
                              >
                                <FacebookIcon />
                              </Button>
                            </DialogClose>
                            <DialogClose asChild>
                              <Button
                                variant="outline"
                                className="mx-2 my-2"
                                disabled={isinstagramlinkdisable}
                                onClick={() => {
                                  console.log(
                                    "facebook selected,so it can be showing"
                                  );

                                  setlabelselected("instagram link");
                                  setInstagramlinkdisable(true);
                                  addItem();
                                }}
                              >
                                <InstagramIcon />
                              </Button>
                            </DialogClose>
                            <DialogClose asChild>
                              <Button
                                variant="outline"
                                className="mx-2 my-2"
                                disabled={isXlinkdisable}
                                onClick={() => {
                                  console.log(
                                    "facebook selected,so it can be showing"
                                  );

                                  setlabelselected("x link");
                                  setXlinkdisable(true);
                                  addItem();
                                }}
                              >
                                <TwitterIcon />
                              </Button>
                            </DialogClose>
                            <DialogClose asChild>
                              <Button
                                variant="outline"
                                className="mx-2 my-2"
                                onClick={() => {
                                  console.log(
                                    "facebook selected,so it can be showing"
                                  );

                                  setlabelselected("twitch link");
                                  setFacebooklinkdisable(true);
                                  addItem();
                                }}
                              >
                                <TwitchIcon />
                              </Button>
                            </DialogClose>
                            <DialogClose asChild>
                              <Button
                                variant="outline"
                                className="mx-2 my-2"
                                disabled={isfacebooklinkdisable}
                                onClick={() => {
                                  console.log(
                                    "facebook selected,so it can be showing"
                                  );

                                  setlabelselected("facebook link");
                                  setFacebooklinkdisable(true);
                                  addItem();
                                }}
                              >
                                <SnailIcon />
                              </Button>
                            </DialogClose>
                            <Button className="mx-2 my-2">click</Button>
                            <Button className="mx-2 my-2">click</Button>
                            <Button className="mx-2 my-2">click</Button>
                            <Button className="mx-2 my-2">click</Button>
                            <Button className="mx-2 my-2">click</Button>
                            <Button className="mx-2 my-2">click</Button>
                            <Button className="mx-2 my-2">click</Button>
                            <Button className="mx-2 my-2">click</Button>
                            <Button className="mx-2 my-2">click</Button>
                            <Button className="mx-2 my-2">click</Button>
                            <Button className="mx-2 my-2">click</Button>
                            <Button className="mx-2 my-2">click</Button>
                          </div>
                        </ScrollArea>
                      </div>
                    </div>
                    <DialogFooter className="sm:justify-start">
                      <DialogClose asChild>
                        <Button type="button" variant="secondary">
                          Close
                        </Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                <p>your will be able to add any link after</p>
              </>
            ) : null}

            {appearrancelayoutShow ? <>{AppearanceLayout()}</> : null}

            <br />
            <div className="flex justify-center">
              <Button
                variant="outline"
                onClick={addLinkUrl}
                className="rounded-[50px] fixed bottom-2  bg-red-200 w-1/3 mx-10"
              >
                add
              </Button>
              <Button
                onClick={() => {
                  addReseauxLink();
                  console.log(selectedUrl.current);
                }}
              >
                add reseaux
              </Button>
            </div>
          </div>
        </ScrollArea>

        <Divider orientation="vertical" className="mx-2" />
        <div className=" w-2/6 flex justify-center ">
          <div className="grid ">
            <Snippet color="success" className="my-3">
              <p>
                http://localhost:3000/<span>{selectedlink}</span>
              </p>
            </Snippet>
            <Tabs
              aria-label="Options"
              className="my-4"
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

                <p className="my-5 mx-10 text-gray-500 text-center text-[12px] ">
                  {desc}
                </p>

                <DndContext
                  collisionDetection={closestCenter}
                  onDragEnd={handleDragEnd}
                >
                  <SortableContext
                    items={itemsdnd.map((item) => item.position)}
                    strategy={verticalListSortingStrategy}
                  >
                    {itemsdnd.map((item) => (
                      <SortableItem
                        key={item.position}
                        item={item}
                        isDragOn={true}
                      />
                    ))}
                  </SortableContext>
                </DndContext>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  function analytics() {
    const options = {
      maintainAspectRatio: false, // Permet de désactiver le ratio d'aspect fixe
    };
    return (
      <>
        <div>
          <p className="mt-10 ml-10 text-4xl font-bold underline">Analytics</p>
          <br />
          <br />
          <br />
          <br />
          <p className="text-blue-500 font-semibold">Link bio</p>
          <br />
          <div className="rounded-md shadow-md p-10 lg:size-[600px] mx-5">
            <Line
              data={{
                labels: ["A", "B", "C", "D", "E", "F", "G", "H", "I"],
                datasets: [
                  {
                    label: "revenue",
                    data: [300, 200, 400, 34, 345, 500, 700, 1000, 1500],
                  },
                ],
              }}
              options={options}
            />
          </div>
          <Separator className="my-[100px]" />

          <p className="text-blue-500 font-semibold">Link shorter</p>
          <br />
          <div className="rounded-md shadow-md p-10 lg:size-[600px] mx-5">
            <Line
              data={{
                labels: ["A", "B", "C", "D", "E", "F", "G", "H", "I"],
                datasets: [
                  {
                    label: "revenue",
                    data: [300, 200, 400, 34, 345, 500, 700, 1000, 1500],
                  },
                ],
              }}
              options={options}
            />
          </div>
        </div>
      </>
    );
  }
  function shortlink() {
    return (
      <>
        <p className="mt-10 ml-10 text-4xl font-bold underline">shortlink</p>
      </>
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
    <div className="grid">
      <p>appearance layout</p>
    </div>
  );
}
async function checkStringAndAddLinkToReseauTable(str: string, word: string) {
  const regex = new RegExp(`\\b${word}\\b`);
  if (regex.test(str)) {
  } else {
    console.log(`Le mot "${word}" n'a pas été trouvé dans la chaîne.`);
  }
}
//pour de decodage de la position
function removeLeadingCharacter(str: string, charToRemove: string): string {
  if (str.startsWith(charToRemove)) {
    return str.slice(1);
  }
  return str;
}
function addStringToArray(str: string): void {
  reseauLinkToAdd.push(str);
}
interface SortableItemProps {
  item: Itemdnd;
  isDragOn: boolean;
}
//react dnd,dnd/sorted
const SortableItem: React.FC<SortableItemProps> = ({ item, isDragOn }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item.position });
  const [isDraganddropOn, isDragandDropOff] = useState(isDragOn);
  let listenersOnstate = isDraganddropOn ? { ...listeners } : undefined;
  const style: Properties = {
    transform: CSS.Transform.toString(transform),
    transition,
    padding: "16px",
    margin: "5px",
    backgroundColor: "#f0f0f0",
    border: "1px solid #ccc",

    borderRadius: "10px",
    touchAction: "none", // Important for mobile devices
    userSelect: "none", // Prevents text selection during drag
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listenersOnstate}
      className="flex justify-center"
    >
      <div>
        <h4>{item.reseaux_url}</h4>
      </div>
    </div>
  );
};
