"use client";
import { useRouter } from "next/navigation";
import { supabaseBrowserClient, supabase } from "../supabase/supabaseInstance";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { v4 } from "uuid";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Properties } from "csstype";
import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";

import Image from "next/image";
import undraw_male_avatar_g98d from "../../public/undraw_male_avatar_g98d.svg";
import { Slider, Snippet } from "@nextui-org/react";
import { Switch } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { Tabs, Tab } from "@nextui-org/react";
import { Separator } from "@/components/ui/separator";
import { Divider } from "@nextui-org/react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import "chart.js/auto";
import { FaFacebook, FaLocationArrow, FaPatreon } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import {
  BsCheck2Circle,
  BsDiscord,
  BsPhone,
  BsSpotify,
  BsTwitch,
  BsTwitterX,
  BsYoutube,
} from "react-icons/bs";
import { Badge } from "@/components/ui/badge";
import { BsFillPatchCheckFill } from "react-icons/bs";
import { IconType } from "react-icons/lib";
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
  ChevronDownIcon,
  FacebookIcon,
  InstagramIcon,
  LinkIcon,
  LockIcon,
  LockOpenIcon,
  PlusIcon,
  SeparatorHorizontalIcon,
  SmartphoneIcon,
  SnailIcon,
  TextIcon,
  TrashIcon,
  TwitchIcon,
  TwitterIcon,
  YoutubeIcon,
} from "lucide-react";

import { Button } from "@nextui-org/button";
import { ButtonGroup } from "@nextui-org/button";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/dropdown";
import { Avatar } from "@nextui-org/avatar";
import {
  BarChart4,
  HomeIcon,
  Link2Icon,
  Square,
  SquareMinus,
} from "lucide-react";
import { RgbaStringColorPicker } from "react-colorful";
import Link from "next/link";
import { setTimeout } from "timers";
import { SortableItem } from "./Devicednd";
import {
  addComponent,
  addReseauxLink,
  deleteComponentUrl,
  updateActiveUrl,
  updateComponentCardText,
  updateComponentPosition,
  updateComponentUrl,
} from "./supabaseFunction";
import { returnReseauxIcon, ReturnIconMain } from "./ReturnIcon";
import { link } from "fs";

interface ReseauxUrl {
  id: string;
  is_active: boolean;
  position: number;
  icon: string;
  reseaux_url: string;
  click: number;
  for_link_url: string;
}

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

interface UserType {
  link_url: string;
}
type Guid = string & { _guidBrand: undefined };

interface LinkRetriv {
  is_active: boolean;
  is_pro: boolean;
  photo_url: string;
  user_name: string;
  user_desc: string;
  template: string;
  grid: string;
  monthly_click: number;
  weekly_click: number;
  daily_click: number;
  link_url: string;
}

export default function Dashboard() {
  //input for link
  const [value, setValue] = useState("");
  const [photoUrl, setphotoUrl] = useState(
    "https://otuqsjkpvrkthepuffcs.supabase.co/storage/v1/object/public/OrcelEuler/avatar.jpg?t=2024-06-27T21%3A40%3A00.058Z"
  );
  const router = useRouter();
  const [name, setname] = useState("");
  const [desc, setdesc] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [newname, setNewname] = useState("");
  const [newdesc, setnewdesc] = useState("");
  const [usersurl, setuserurl] = useState<UserType[]>([]);
  const [isuserUrlDispo, setUserUrlDispo] = useState(false);

  const [email, setEmail] = useState("");
  const [selectedlink, setselectedLink] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [reseauxitems, setreseauxItems] = useState<ReseauxUrl[]>([]);
  const [reseauxitemsForAdd, setreseauxItemsForADD] = useState<ReseauxUrl[]>(
    []
  );
  const [itemsdnd, setItemsdnd] = useState<ComponentType[]>([]);
  const [itemsdndforAdd, setItemsdndForADD] = useState<ComponentType[]>([]);
  const [inputs, setInputs] = useState<ComponentType[]>([]);
  const [textDispo, setTextDispo] = useState("");
  const userId = useRef("");
  const [yourlink, setyourlink] = useState<LinkRetriv[]>([]);

  const [bgcolor1, setbgColor1] = useState(" rgba(255, 255, 255, 1)");
  const [bgcolor2, setbgColor2] = useState(" rgba(255, 255, 255, 1)");
  const [color1, setColor] = useState(" rgba(0, 0, 0, 1)");
  const [cardcolor, setCardColor] = useState(" rgba(152, 205, 166, 0)");
  const [cardBorderRadius, setCardBorderRadius] = useState<number | number[]>(
    15
  );
  const [cardBorderRadiusColor, setCardBorderRadiusColor] = useState(
    " rgba(255, 0, 213, 1)"
  );
  const [cardPadding, setCardPadding] = useState<number | number[]>(15);
  const [cardmargin, setCardmargin] = useState<number | number[]>(7);
  const [colorDegres, setColorDegres] = useState<number | number[]>(45);
  //

  const [buttonlayoutShow, setbuttonLayoutShow] = useState(false);
  const [gridlayoutShow, setgridLayoutShow] = useState(false);
  const [appearrancelayoutShow, setappearanceLayoutShow] = useState(false);

  //url user selectionne
  let selectedUrl = useRef("*");
  //let updatedItem = useRef<SiteUrl[]>([]);
  const [selectedOption, setSelectedOption] = useState("");
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  const [isHolding, setIsHolding] = useState("");
  const [outlinecolorMainSotableitem, setOutlineColor] = useState(
    "rgba(255, 255, 255, 1)"
  );
  const [isDraggable, setDraggable] = useState(false);
  //function color picker
  const setBgColor1 = useCallback((color: string) => {
    setbgColor1(color);
  }, []);
  const setBgColor2 = useCallback((color: string) => {
    setbgColor2(color);
  }, []);
  const setCardColorr = useCallback((color: string) => {
    setCardColor(color);
  }, []);
  const setCardBorderRadiusColorr = useCallback((color: string) => {
    setCardBorderRadiusColor(color);
  }, []);

  //debounce function to delay
  const debounce = (func: any, delay: any) => {
    let timeoutId: any;
    return function (...args: any) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const debounceSearch = debounce(setBgColor1, 1000);

  interface SortableItemProps {
    item: ComponentType;
    index: number;
    isDragOn: boolean;
    backgroundColor: string;
    borderRadius: number | number[];
    borderRadiusColor: string;
    padding: number | number[];
    margin: number | number[];
    isHolding: string;
    witchComponent: string;
  }

  const [focusedInputId, setFocusedInputId] = useState<string>("0");
  const inputRef = useRef<{ [key: string]: HTMLInputElement | null }>({});
  const handleInputFocus = (id: string) => {
    setFocusedInputId(id);
  };
  useEffect(() => {
    if (focusedInputId && inputRef.current[focusedInputId]) {
      inputRef.current[focusedInputId]?.focus();
    }
  }, [focusedInputId, inputs]);
  // main item

  const lockUnlock = () => {
    if (isHolding === "") {
      setOutlineColor("rgba(51, 204, 140, 1)");
      setDraggable(true);
      setIsHolding("none");
    } else {
      setOutlineColor("rgba(255, 255, 255, 1)");
      setDraggable(false);
      setIsHolding("");
    }
  };
  const MainSortableItem: React.FC<SortableItemProps> = ({
    item,
    index,
    isDragOn,
    backgroundColor,
    borderRadius,
    borderRadiusColor,
    padding,
    margin,
    isHolding,
    witchComponent,
  }) => {
    const { attributes, listeners, setNodeRef, transform, transition } =
      useSortable({ id: item.position });
    let listenersOnstate = isDragOn ? { ...listeners } : undefined;
    const style: Properties = {
      transform: CSS.Transform.toString(transform),
      transition,
      padding: "8px",
      borderRadius: "20px ",
      marginTop: `20px`,
      marginBottom: `1px`,
      backgroundColor: "rgba(255, 255, 255, 1)",
      border: `1px solid ${outlinecolorMainSotableitem}`,
      touchAction: isHolding, // Important for mobile devices
      userSelect: "none", // Prevents text selection during drag
    };

    return (
      <>
        <div style={style} className="flex justify-between ">
          <div className="flex items-center gap-2 lg:gap-7 ">
            <div
              ref={setNodeRef}
              {...attributes}
              {...listenersOnstate}
              style={{
                padding: "5px",
                cursor: "grab",
              }}
            >
              {isDraggable ? (
                <p className="text-emerald-600">|||</p>
              ) : (
                <p className="text-gray-200 lg:text-black">|||</p>
              )}
            </div>

            {ReturnIconMain(witchComponent)}
          </div>

          <div>
            {returnMainComponent(witchComponent, index, item, setNodeRef)}
          </div>
        </div>{" "}
      </>
    );
  };
  function returnMainComponent(
    witchComponent: string,
    index: number,
    item: any,
    setNodeRef: any
  ) {
    const handleLabelChangeForSite = (id: number, label: string) => {
      setItemsdnd((prevInputs) =>
        prevInputs.map((input) =>
          input.position === id ? { ...input, texte: label } : input
        )
      );
      setItemsdndForADD((prevInputs) =>
        prevInputs.map((input) =>
          input.position === id ? { ...input, texte: label } : input
        )
      );
    };

    const handleInputChangeForSite = (id: number, value: string) => {
      setItemsdnd((prevInputs) =>
        prevInputs.map((input) =>
          input.position === id ? { ...input, url: value } : input
        )
      );
      setItemsdndForADD((prevInputs) =>
        prevInputs.map((input) =>
          input.position === id ? { ...input, url: value } : input
        )
      );
    };

    const handleIsVisibleChangeForSite = (id: number, value: boolean) => {
      setItemsdnd((prevInputs) =>
        prevInputs.map((input) =>
          input.position === id ? { ...input, is_active: value } : input
        )
      );
    };

    switch (witchComponent) {
      case "COMPONENT_LINK":
        return (
          <>
            <br />
            <div className="grid grid-cols-1 lg:grid-cols-2 lg:p-3  gap-2">
              <Input
                type="text"
                value={item.texte}
                onChange={(e) => {
                  handleLabelChangeForSite(item.position, e.target.value);
                  // handleInputFocus(item.position.toString());
                }}
                onFocus={() => handleInputFocus(item.position.toString())}
                autoFocus={item.position.toString() === focusedInputId}
                onFocusChange={(isFocused) => {
                  !isFocused ? handleInputFocus("") : null;
                }}
                placeholder="Ex: My facebook page"
              />

              <Input
                ref={setNodeRef}
                type="text"
                value={item.url}
                onChange={(e) => {
                  handleInputChangeForSite(item.position, e.target.value);
                  //focus problem
                  // handleInputFocus((item.position + 50).toString());
                }}
                onFocus={() =>
                  handleInputFocus((item.position + 50).toString())
                }
                autoFocus={(item.position + 50).toString() === focusedInputId}
                onFocusChange={(isFocused) => {
                  !isFocused ? handleInputFocus("") : null;
                }}
                placeholder="Your URL"
              />
            </div>
            <br />
            <div className="flex justify-end">
              <div className="flex items-center gap-2 lg:gap-5">
                <p className="text-gray-500 text-sm">show on page:</p>
                <Switch
                  isSelected={item.is_active}
                  aria-label="Automatic updates"
                  onChange={() =>
                    handleIsVisibleChangeForSite(item.position, !item.is_active)
                  }
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onPress={() => {
                    handleDelete(item.position); //delete item on ui
                    deleteComponentUrl(item.id);
                    updateComponentPosition(itemsdnd); //delete item on database
                  }}
                >
                  <TrashIcon />
                </Button>
              </div>
            </div>
          </>
        );

      case "COMPONENT_YOUTUBE_EMB":
        return (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2    gap-2">
              <Input
                ref={setNodeRef}
                type="text"
                value={item.url}
                onChange={(e) => {
                  handleInputChangeForSite(item.position, e.target.value);
                  //focus problem
                  // handleInputFocus((item.position + 50).toString());
                }}
                onFocus={() =>
                  handleInputFocus((item.position + 50).toString())
                }
                autoFocus={(item.position + 50).toString() === focusedInputId}
                onFocusChange={(isFocused) => {
                  !isFocused ? handleInputFocus("") : null;
                }}
                placeholder="youtube video url"
                className="lg:mt-10"
              />
              <div className="flex justify-end">
                <div className="flex items-center gap-2 lg:gap-5">
                  <p className="text-gray-500 text-sm">show on page:</p>
                  <Switch
                    isSelected={item.is_active}
                    aria-label="Automatic updates"
                    onChange={() =>
                      handleIsVisibleChangeForSite(
                        item.position,
                        !item.is_active
                      )
                    }
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onPress={() => {
                      handleDelete(item.position); //delete item on ui
                      deleteComponentUrl(item.id); //delete item on database
                      updateComponentPosition(itemsdnd);
                    }}
                  >
                    <TrashIcon />
                  </Button>
                </div>
              </div>{" "}
            </div>
          </>
        );
      case "COMPONENT_SPOTIFY":
        return (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2    gap-2 ">
              <Input
                ref={setNodeRef}
                type="text"
                value={item.url}
                onChange={(e) => {
                  handleInputChangeForSite(item.position, e.target.value);
                  //focus problem
                  // handleInputFocus((item.position + 50).toString());
                }}
                onFocus={() =>
                  handleInputFocus((item.position + 50).toString())
                }
                autoFocus={(item.position + 50).toString() === focusedInputId}
                onFocusChange={(isFocused) => {
                  !isFocused ? handleInputFocus("") : null;
                }}
                placeholder="spotify url"
                className="lg:mt-10"
              />
              <div className="flex justify-end">
                <div className="flex items-center gap-2 lg:gap-5">
                  <p className="text-gray-500 text-sm">show on page:</p>
                  <Switch
                    isSelected={item.is_active}
                    aria-label="Automatic updates"
                    onChange={() =>
                      handleIsVisibleChangeForSite(
                        item.position,
                        !item.is_active
                      )
                    }
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onPress={() => {
                      handleDelete(item.position); //delete item on ui
                      deleteComponentUrl(item.id); //delete item on database
                      updateComponentPosition(itemsdnd);
                    }}
                  >
                    <TrashIcon />
                  </Button>
                </div>
              </div>{" "}
            </div>
          </>
        );
      case "COMPONENT_SEPARATOR":
        return (
          <div className="flex ">
            <div className="flex justify-end mt-10 ">
              <Button
                variant="ghost"
                size="sm"
                onPress={() => {
                  handleDelete(item.position); //delete item on ui
                  deleteComponentUrl(item.id); //delete item on database
                  updateComponentPosition(itemsdnd);
                }}
              >
                <TrashIcon />
              </Button>
            </div>
          </div>
        );

      case "COMPONENT_TEXT":
        return (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2   gap-2">
              <Input
                type="text"
                value={item.texte}
                onChange={(e) => {
                  handleLabelChangeForSite(item.position, e.target.value);
                  // handleInputFocus(item.position.toString());
                }}
                onFocus={() => handleInputFocus(item.position.toString())}
                autoFocus={item.position.toString() === focusedInputId}
                onFocusChange={(isFocused) => {
                  !isFocused ? handleInputFocus("") : null;
                }}
                placeholder="Ex: My facebook page"
                className="lg:mt-10"
              />
            </div>
            <br />
            <div className="flex justify-end">
              <Button
                variant="ghost"
                size="sm"
                onPress={() => {
                  handleDelete(item.position); //delete item on ui
                  deleteComponentUrl(item.id); //delete item on database
                  updateComponentPosition(itemsdnd);
                }}
              >
                <TrashIcon />
              </Button>
            </div>
          </>
        );

      default:
        null;
        break;
    }
  }

  /*const descriptionsMap = {
    merge:
      "All commits from the source branch are added to the destination branch via a merge commit.",
    squash:
      "All commits from the source branch are added to the destination branch as a single commit.",
    rebase:
      "All commits from the source branch are added to the destination branch individually.",
  };*/

  const labelsMap: any = {
    merge: "Create a merge commit",
    squash: "Squash and merge",
    rebase: "Rebase and merge",
  };

  // Convert the Set to an Array and get the first value.
  // const selectedOptionValue = Array.from(selectedOption)[0];

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = itemsdnd.findIndex(
        (item) => item.position === active.id
      );
      const newIndex = itemsdnd.findIndex((item) => item.position === over.id);

      const newItems: ComponentType[] = arrayMove(
        itemsdnd,
        oldIndex,
        newIndex
      ).map((item, index) => ({
        ...item,
        position: index,
      }));

      setItemsdnd(newItems);
      //updatedItem.current = newItems;
      console.log(newItems);

      updateComponentPosition(newItems);
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
      setphotoUrl(data[0].photo_url);
      setSelectedOption(data[0]?.link_url);
      setname(data[0].user_name);
      setdesc(data[0].user_desc);
    }

    fetchReseauxLink();
    fetchSiteLink();
  };
  const is_url_dispo = async () => {
    const { data, error } = await supabase
      .from("link")
      .select("link_url")
      .eq("link_url", newUrl);

    if (error) console.log(error);

    if (data) setuserurl(data);

    console.log(`link url verification: ${data}`);
  };
  const fetchSiteLink = async () => {
    const { data, error } = await supabase
      .from("component")
      .select("*")
      .eq("for_link_url", selectedUrl.current)
      .order("position", { ascending: true });

    if (error) console.log(error);
    if (data) setItemsdnd(data);
    console.log(`site feching: ${data}`);
  };
  const fetchReseauxLink = async () => {
    const { data, error } = await supabase
      .from("users_reseaux")
      .select("*")
      .eq("for_link_url", selectedUrl.current)
      .order("position", { ascending: true });

    if (error) console.log(error);
    if (data) setreseauxItems(data);
    console.log(`reseaux feching: ${data}`);
  };
  const updatePhotoUrl = async (url: string) => {
    const { data, error } = await supabase
      .from("link")
      .update({ photo_url: url })
      .eq("link_url", selectedUrl.current);

    if (error) console.log(error);

    //if (data) setuserurl(data);
    console.log(data);
    window.location.reload();
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

  const addLinkUrl = async (
    user_name: string,
    desc: string,
    link_url: string
  ) => {
    if (link_url !== "createlink") {
      if (isuserUrlDispo) {
        if (user_name !== "") {
          const { data, error } = await supabase.from("link").insert({
            is_active: true,
            is_pro: true,
            photo_url: photoUrl,
            user_name: user_name,
            user_desc: desc,
            template: "",
            grid: "",
            monthly_click: 0,
            weekly_click: 0,
            daily_click: 0,
            link_url: link_url,
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

  //******************************Supabase File Upload*/

  const uploadProfileImg = async (e: any) => {
    e.preventDefault();
    let avatarFile = e.target[0]?.files[0];
    let user = userId.current;
    let filename = v4().slice(0, 6);
    const { data, error } = await supabase.storage
      .from("OrcelEuler")
      .upload(user + "/" + filename, avatarFile, {
        cacheControl: "3600",
        upsert: false,
      });
    retieveUrl(data?.path);
  };
  const retieveUrl = async (path: any) => {
    const { data } = supabase.storage.from("OrcelEuler").getPublicUrl(path);
    console.log(data.publicUrl);
    updatePhotoUrl(data.publicUrl);
  };

  ////////////////////////////////////////////////////////////////////////

  const handleResauxUrlChange = (id: number, value: string) => {
    setreseauxItems((prevInputs) =>
      prevInputs.map((input) =>
        input.position === id ? { ...input, reseaux_url: value } : input
      )
    );
    setreseauxItemsForADD((prevInputs) =>
      prevInputs.map((input) =>
        input.position === id ? { ...input, reseaux_url: value } : input
      )
    );
  };
  const addReseauxItem = (icon: string) => {
    const newId = reseauxitems.length;
    setreseauxItems((prevItem) => [
      ...prevItem,
      {
        id: v4().slice(0, 6).toString(),
        is_active: true,
        position: newId,
        icon: icon,
        reseaux_url: "",
        click: 0,
        for_link_url: selectedUrl.current,
      },
    ]);

    setreseauxItemsForADD((prevItem) => [
      ...prevItem,
      {
        id: v4().slice(0, 6).toString(),
        is_active: true,
        position: newId,
        icon: icon,
        reseaux_url: "",
        click: 0,
        for_link_url: selectedUrl.current,
      },
    ]);
  };
  const handleDeleteReseaux = (id: number) => {
    const updatedItems = reseauxitems.filter((item) => item.position !== id);
    //const updatedInputs = inputs.filter((input) => input.position !== id);

    const rearrangedItems = updatedItems.map((item, index) => ({
      ...item,
      position: index + 1,
    }));

    /* const rearrangedInputs = updatedInputs.map((input, index) => ({
      ...input,
      position: index + 1,
    }));*/

    setreseauxItems(rearrangedItems);
    //setInputs(rearrangedInputs);
  };

  const addItem = (witchComponent: string) => {
    const newId = itemsdnd.length;
    setItemsdnd((prevItems) => [
      ...prevItems,
      {
        id: v4().slice(0, 5).toString(),
        is_active: true,
        position: newId,
        type: witchComponent,
        texte: "",

        photo_url: "photo.com",
        click: 0,
        url: "",
        for_link_url: selectedUrl.current,
      },
    ]);
    setItemsdndForADD((prevItems) => [
      ...prevItems,
      {
        id: v4().slice(0, 5).toString(),
        is_active: true,
        position: newId,
        type: witchComponent,
        texte: "",

        photo_url: "photo.com",
        click: 0,
        url: "",
        for_link_url: selectedUrl.current,
      },
    ]);
    setInputs((prevInputs) => [
      ...prevInputs,
      {
        id: v4().slice(0, 5).toString(),
        is_active: true,
        position: newId,
        type: witchComponent,
        texte: "",

        photo_url: "",
        click: 23,
        url: "",
        for_link_url: selectedUrl.current,
      },
    ]);
  };

  const handleDelete = (id: number) => {
    const updatedItems = itemsdnd.filter((item) => item.position !== id);
    const updatedInputs = inputs.filter((input) => input.position !== id);

    const rearrangedItems = updatedItems.map((item, index) => ({
      ...item,
      position: index + 1,
    }));

    const rearrangedInputs = updatedInputs.map((input, index) => ({
      ...input,
      position: index + 1,
    }));

    setItemsdnd(rearrangedItems);
    setInputs(rearrangedInputs);
  };

  const isLogin = async () => {
    const { data, error } = await supabaseBrowserClient.auth.getUser();
    //const {data, error} = await supabase.auth.getSession();
    if (error || !data?.user) {
      router.push("/login");
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
    router.push("/login");
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
  const onChangeNewUrl = (e: any) => {
    var value = e.target.value;
    setNewUrl(value);
    setNewname(value);
  };
  const onChangedesc = (e: any) => {
    var value = e.target.value;
    setdesc(value);
  };
  const onChangeNewdesc = (e: any) => {
    var value = e.target.value;
    setnewdesc(value);
  };
  const onChangename = (e: any) => {
    var value = e.target.value;
    setname(value);
  };
  const onChangeNewname = (e: any) => {
    var value = e.target.value;
    setNewname(value);
  };
  useEffect(() => {
    isLogin();
    if (newUrl.length < 5) {
      console.log("your name is too short!");
    } else {
      setTimeout(
        () => {
          is_url_dispo();
        },

        2000
      );
    }
  }, [newUrl]);

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
  useEffect(() => {
    //fetchAlldatawithClick(yourlink[0])
    selectedUrl.current = yourlink[0]?.link_url;
    setselectedLink(yourlink[0]?.link_url);
    setphotoUrl(yourlink[0]?.photo_url);
    setname(yourlink[0]?.user_name);
    setdesc(yourlink[0]?.user_desc);
    fetchReseauxLink();
    fetchSiteLink();
  }, [selectedOption]);

  return (
    <>
      <div className="hidden lg:flex h-screen">
        <div className=" w-auto bg-gray-200 h-[700px]">
          <div className="grid mx-2">
            <Button
              size="sm"
              variant="bordered"
              className=" mt-5"
              onPress={() => {
                router.push("/dashboard");
              }}
            >
              <HomeIcon />
            </Button>
            <Button
              size="sm"
              className="my-5 "
              variant="bordered"
              onPress={() => {
                router.push("/navigation/Analytics");
              }}
            >
              <BarChart4 />
            </Button>
            <Button
              size="sm"
              variant="bordered"
              onPress={() => {
                router.push("/navigation/Urlshorter");
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

        <div className="hidden lg:flex w-full ">{home()}</div>
      </div>
      <div className="lg:hidden flex w-full">{homeForMobile()}</div>
    </>
  );

  function home() {
    return (
      <div className="flex w-full">
        <ScrollArea className="w-4/6  bg-gray-100 p-10 ">
          <br />

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
                <div className="flex items-start ">
                  <ButtonGroup variant="flat">
                    <Button>{selectedOption}</Button>
                    <Dropdown placement="bottom-end">
                      <DropdownTrigger>
                        <Button isIconOnly>
                          <ChevronDownIcon />
                        </Button>
                      </DropdownTrigger>
                      <DropdownMenu
                        disallowEmptySelection
                        aria-label="Merge options"
                        selectedKeys={selectedOption}
                        selectionMode="single"
                        onSelectionChange={(key: any) => setSelectedOption(key)}
                        className="max-w-[300px]"
                      >
                        {yourlink.map((item, index) => (
                          <DropdownItem
                            key={item.link_url}
                            onClick={() => {
                              //fetch all data with the current selected url
                              selectedUrl.current = item.link_url;
                              setselectedLink(item.link_url);
                              setphotoUrl(item.photo_url);
                              setname(item.user_name);
                              setdesc(item.user_desc);
                              fetchReseauxLink();
                              fetchSiteLink();
                            }}
                          >
                            {item.link_url}
                          </DropdownItem>
                        ))}
                      </DropdownMenu>
                    </Dropdown>
                  </ButtonGroup>
                </div>

                <div>
                  {" "}
                  <div className="flex justify-end">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="bordered" size="sm">
                          Create new link
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                          <DialogTitle>Create new Link</DialogTitle>
                          <DialogDescription>
                            Create a new link.
                          </DialogDescription>
                        </DialogHeader>
                        <div>
                          <Input
                            value={newUrl}
                            maxLength={15}
                            onChange={onChangeNewUrl}
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
                          <br />
                          <Input
                            value={newname}
                            onChange={onChangeNewname}
                            placeholder="your name"
                          />
                          <Input
                            value={newdesc}
                            maxLength={100}
                            onChange={onChangeNewdesc}
                            placeholder="your description (optional)"
                            className="my-5"
                          />
                        </div>
                        <DialogFooter className="sm:justify-between">
                          <DialogClose asChild>
                            <Button type="button" variant="bordered">
                              Close
                            </Button>
                          </DialogClose>

                          <Button
                            variant="bordered"
                            onClick={() => addLinkUrl(newname, newdesc, newUrl)}
                            className="   bg-green-500 "
                          >
                            add
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                  <form onSubmit={uploadProfileImg}>
                    <div className="grid w-[320px] items-center gap-1.5">
                      <label htmlFor="picture">
                        Upload your Profile(png/jpeg)
                      </label>
                      <Input id="picture" type="file" />
                    </div>
                    <Button type="submit" className="my-2">
                      upload
                    </Button>
                  </form>
                  <br />
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
                </div>
                <br />
                <div className="rounded-[20px] p-5 bg-white">
                  <br />
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
                </div>
                <Separator className="my-5" />

                <p className="text-center  text-3xl my-3">
                  Social reseaux link
                </p>
                {reseauxitems.map((item, index) => (
                  <div
                    key={index}
                    className="p-5 gap-3 my-2 bg-white rounded-[20px]"
                  >
                    <p key={index + 1} className=" font-bold">
                      reseaux Link :<span>{index}</span>
                    </p>
                    <div
                      key={index + 2}
                      className="flex items-center gap-2 my-2"
                    >
                      <p key={index + 3}>
                        {returnReseauxIcon(item.icon, "rgba(0, 0, 0, 1)")}
                      </p>

                      <Input
                        key={index + 4}
                        value={item.reseaux_url}
                        onChange={(e) =>
                          handleResauxUrlChange(item.position, e.target.value)
                        }
                      />
                    </div>
                    <div key={index + 5} className="flex justify-end">
                      <div key={index + 6} className="flex items-center gap-2">
                        <p key={index + 7} className="text-gray-500 text-sm">
                          show on page:
                        </p>
                        <Switch key={index + 8} />
                        <Button
                          onPress={() => handleDeleteReseaux(item.position)}
                        >
                          <TrashIcon />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}

                <br />
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="bordered" size="sm">
                      add reseaux Icon
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>choose your reseaux Icon</DialogTitle>
                      <DialogDescription>
                        Choose your social media link.
                      </DialogDescription>
                    </DialogHeader>
                    <div>
                      <Button onPress={() => addReseauxItem("FACEBOOK")}>
                        <FaFacebook />
                      </Button>
                      <Button onPress={() => addReseauxItem("INSTAGRAM")}>
                        <FaInstagram />
                      </Button>
                      <Button onPress={() => addReseauxItem("YOUTUBE")}>
                        <BsYoutube />
                      </Button>
                    </div>
                    <DialogFooter className="sm:justify-start">
                      <DialogClose asChild>
                        <Button type="button" variant="bordered">
                          Close
                        </Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                <Separator className="my-5" />
                <a
                  href="https://emojipedia.org"
                  className="text-fuchsia-700 font-bold underline"
                >
                  Go to add emoji🥇📕😎☀️
                </a>
                <p className="my-3 text-3xl text-center ">
                  {" "}
                  All Block:(
                  <span className="text-fuchsia-700">{itemsdnd.length}</span>)
                </p>

                <div className="mt-10">
                  <div>
                    {" "}
                    <DndContext
                      sensors={sensors}
                      collisionDetection={closestCenter}
                      onDragEnd={handleDragEnd}
                    >
                      <SortableContext
                        items={itemsdnd.map((item) => item.position)}
                        strategy={verticalListSortingStrategy}
                      >
                        {itemsdnd.map((item: any, index: any) => (
                          <div key={index + 1}>
                            <MainSortableItem
                              key={item.position}
                              item={item}
                              index={index}
                              isDragOn={true}
                              backgroundColor={cardcolor}
                              borderRadius={cardBorderRadius}
                              borderRadiusColor={cardBorderRadiusColor}
                              padding={cardPadding}
                              margin={cardmargin}
                              isHolding={isHolding}
                              witchComponent={item.type}
                            />
                          </div>
                        ))}
                      </SortableContext>
                    </DndContext>
                  </div>
                </div>

                <br />
                <Button
                  onPress={() => {
                    //addItemdata();
                    if (itemsdndforAdd.length > 0) {
                      //if detect update ,Update in the function
                      addComponent(itemsdndforAdd);
                      setItemsdndForADD([]);
                    } else {
                      updateComponentCardText(itemsdnd);
                      updateComponentUrl(itemsdnd);
                      updateActiveUrl(itemsdnd);
                    }
                    if (reseauxitemsForAdd.length > 0) {
                      addReseauxLink(reseauxitemsForAdd);
                      setreseauxItemsForADD([]);
                    } else {
                      //
                    }
                  }}
                >
                  Sync :add or update
                </Button>
                <br />

                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="bordered">
                      Add block <PlusIcon />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>
                        Add link,text,youtube video,spotify,separator and more{" "}
                      </DialogTitle>
                      <DialogDescription>Choose.</DialogDescription>
                    </DialogHeader>
                    <div className="flex items-center space-x-2">
                      <div className="grid flex-1 gap-2">
                        <ScrollArea className="w-full  rounded-md border">
                          <div className="grig grid-cols-3 gap-3 ">
                            <DialogClose asChild>
                              <Button
                                variant="bordered"
                                className="mx-2 my-2"
                                onClick={() => {
                                  addItem("COMPONENT_LINK");
                                }}
                              >
                                <LinkIcon />
                              </Button>
                            </DialogClose>
                            <DialogClose asChild>
                              <Button
                                variant="bordered"
                                className="mx-2 my-2"
                                onClick={() => {
                                  addItem("COMPONENT_SEPARATOR");
                                }}
                              >
                                <SeparatorHorizontalIcon />
                              </Button>
                            </DialogClose>
                            <DialogClose asChild>
                              <Button
                                variant="bordered"
                                className="mx-2 my-2"
                                onClick={() => {
                                  addItem("COMPONENT_TEXT");
                                }}
                              >
                                <TextIcon />
                              </Button>
                            </DialogClose>
                            <DialogClose asChild>
                              <Button
                                variant="bordered"
                                className="mx-2 my-2"
                                onClick={() => {
                                  addItem("COMPONENT_SPOTIFY");
                                }}
                              >
                                <BsSpotify />
                              </Button>
                            </DialogClose>
                            <DialogClose asChild>
                              <Button
                                variant="bordered"
                                className="mx-2 my-2"
                                onClick={() => {
                                  //setlabelselected("facebook link");
                                  // setFacebooklinkdisable(true);
                                  addItem("COMPONENT_YOUTUBE_EMB");
                                }}
                              >
                                <BsYoutube />
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
                        <Button type="button" variant="flat">
                          Close
                        </Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </>
            ) : null}

            {appearrancelayoutShow ? (
              <>
                <div className="grid">
                  <p className="font-bold my-5">
                    Background color: <span>{bgcolor1}</span> -
                    <span>{bgcolor2}</span>
                  </p>
                  <div className="flex items-center gap-4">
                    <RgbaStringColorPicker
                      color={bgcolor1}
                      onChange={debounceSearch}
                    />
                    <RgbaStringColorPicker
                      color={bgcolor2}
                      onChange={(color) => setBgColor2(color)}
                    />
                    ;
                  </div>
                  <Slider
                    label="Temperature"
                    step={1}
                    maxValue={90}
                    minValue={0}
                    defaultValue={45}
                    onChange={setColorDegres}
                    value={colorDegres}
                    className="max-w-md"
                  />
                  <p className="font-bold my-5">
                    Name color: <span>{color1}</span>
                  </p>

                  <RgbaStringColorPicker color={color1} onChange={setColor} />
                  <p className="font-bold my-5">
                    Card color: <span>{cardcolor}</span>
                  </p>

                  <RgbaStringColorPicker
                    color={cardcolor}
                    onChange={(color) => setCardColorr(color)}
                  />

                  <p className="font-bold my-5">
                    Card Outline color: <span>{cardBorderRadiusColor}</span>
                  </p>

                  <RgbaStringColorPicker
                    color={cardBorderRadiusColor}
                    onChange={(color) => setCardBorderRadiusColorr(color)}
                  />

                  <p className="font-bold my-5">
                    Margin: <span>{cardmargin}</span>
                  </p>

                  <Slider
                    label="Margin"
                    step={1}
                    maxValue={90}
                    minValue={0}
                    defaultValue={45}
                    onChange={setCardmargin}
                    value={cardmargin}
                    className="max-w-md"
                  />
                  <p className="font-bold my-5">
                    padding: <span>{cardPadding}</span>
                  </p>

                  <Slider
                    label="Padding"
                    step={1}
                    maxValue={90}
                    minValue={0}
                    defaultValue={45}
                    onChange={setCardPadding}
                    value={cardPadding}
                    className="max-w-md"
                  />
                  <p className="font-bold my-5">
                    Border Radius: <span>{cardBorderRadius}</span>
                  </p>

                  <Slider
                    label="Border Radius"
                    step={1}
                    maxValue={90}
                    minValue={0}
                    defaultValue={45}
                    onChange={setCardBorderRadius}
                    value={cardBorderRadius}
                    className="max-w-md"
                  />
                </div>
              </>
            ) : null}

            <br />
          </div>
        </ScrollArea>

        <Divider orientation="vertical" />
        <div className=" w-2/6 flex justify-center bg-gray-50 ">
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
            <ScrollArea
              className="  w-[300px] h-[500px] border-gray-600 rounded-3xl shadow-lg p-6 border-[7px]"
              style={{
                background: `linear-gradient(${colorDegres}deg, ${bgcolor1}, ${bgcolor2})`,
              }}
            >
              <div className="grid mx-auto">
                {photoUrl && (
                  <Image
                    src={photoUrl}
                    alt="profil"
                    width={100}
                    height={100}
                    className="w-[60px] h-[60px] rounded-[60px] mx-auto my-2 "
                  />
                )}

                <p className="text-xl text-center" style={{ color: color1 }}>
                  @<span>{name} </span>
                </p>
                <div className="flex justify-center">
                  {" "}
                  <BsFillPatchCheckFill className="text-blue-400 ml-16" />
                </div>

                <p className="my-5 mx-10 text-gray-500 text-center text-[12px] ">
                  {desc}
                </p>
                <div className="flex justify-center">
                  <div className="flex items-center gap-4 my-1">
                    <Badge variant="outline">
                      <BsPhone />
                      Outline
                    </Badge>
                    <Badge variant="outline">
                      <span>
                        <FaLocationArrow />
                      </span>
                      Outline
                    </Badge>
                  </div>
                </div>

                <div className="flex justify-center">
                  <div className="flex items-center gap-2">
                    {reseauxitems.map((item, index) => (
                      <Link href={item.reseaux_url} target="_blank" key={index}>
                        {returnReseauxIcon(item.icon, color1)}
                      </Link>
                    ))}
                  </div>
                </div>

                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragEnd={handleDragEnd}
                >
                  <SortableContext
                    items={itemsdnd.map((item) => item.position)}
                    strategy={verticalListSortingStrategy}
                  >
                    {itemsdnd.map((item, index) => (
                      <SortableItem
                        key={item.position}
                        item={item}
                        index={index}
                        isDragOn={true}
                        backgroundColor={cardcolor}
                        borderRadius={cardBorderRadius}
                        borderRadiusColor={cardBorderRadiusColor}
                        padding={cardPadding}
                        margin={cardmargin}
                        isHolding={isHolding}
                        witchComponent={item.type}
                      />
                    ))}
                  </SortableContext>
                </DndContext>
              </div>
            </ScrollArea>
          </div>
        </div>
      </div>
    );
  }

  function homeForMobile() {
    return (
      <div className="flex w-full">
        <ScrollArea className="w-full  bg-gray-100 p-4 lg:p-10 ">
          <br />

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
                  <div className="flex items-center space-x-1">
                    <span>Create bio link</span>
                  </div>
                }
              />
              <Tab
                key="grid"
                title={
                  <div className="flex items-center space-x-1">
                    <span>Grid</span>
                  </div>
                }
              />
              <Tab
                key="appearance"
                title={
                  <div className="flex items-center space-x-1">
                    <span>Appearance</span>
                  </div>
                }
              />
            </Tabs>

            {buttonlayoutShow ? <>{ButtonLayout()}</> : null}
            {gridlayoutShow ? (
              <>
                <p className="my-5">All link</p>
                <div className="flex items-start">
                  <ButtonGroup variant="flat">
                    <Button>{selectedOption}</Button>
                    <Dropdown placement="bottom-end">
                      <DropdownTrigger>
                        <Button isIconOnly>
                          <ChevronDownIcon />
                        </Button>
                      </DropdownTrigger>
                      <DropdownMenu
                        disallowEmptySelection
                        aria-label="Merge options"
                        selectedKeys={selectedOption}
                        selectionMode="single"
                        onSelectionChange={(key: any) => setSelectedOption(key)}
                        className="max-w-[300px]"
                      >
                        {yourlink.map((item, index) => (
                          <DropdownItem
                            key={item.link_url}
                            onClick={() => {
                              //fetch all data with the current selected url
                              selectedUrl.current = item.link_url;
                              setselectedLink(item.link_url);
                              setphotoUrl(item.photo_url);
                              setname(item.user_name);
                              setdesc(item.user_desc);
                              fetchReseauxLink();
                              fetchSiteLink();
                            }}
                          >
                            {item.link_url}
                          </DropdownItem>
                        ))}
                      </DropdownMenu>
                    </Dropdown>
                  </ButtonGroup>
                </div>

                <br />

                <div>
                  {" "}
                  <div className="flex justify-end">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="bordered" size="sm">
                          <PlusIcon /> link
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                          <DialogTitle>Create new Link</DialogTitle>
                          <DialogDescription>link.</DialogDescription>
                        </DialogHeader>
                        <div>
                          <Input
                            value={newUrl}
                            maxLength={15}
                            onChange={onChangeNewUrl}
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
                          <br />
                          <Input
                            value={newname}
                            onChange={onChangeNewname}
                            placeholder="your name"
                          />
                          <Input
                            value={newdesc}
                            maxLength={100}
                            onChange={onChangeNewdesc}
                            placeholder="your description (optional)"
                            className="my-5"
                          />
                        </div>
                        <DialogFooter className="justify-between gap-2">
                          <DialogClose asChild>
                            <Button type="button" variant="bordered">
                              Close
                            </Button>
                          </DialogClose>

                          <Button
                            variant="bordered"
                            onClick={() => addLinkUrl(newname, newdesc, newUrl)}
                            className=" bg-green-500 "
                          >
                            add
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                  <form onSubmit={uploadProfileImg}>
                    <div className="grid w-[200px] items-center gap-1.5">
                      <label htmlFor="picture">Upload Profile(png/jpeg)</label>
                      <Input id="picture" type="file" />
                    </div>
                    <Button type="submit" className="my-2">
                      upload
                    </Button>
                  </form>
                  <br />
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
                </div>
                <br />
                <div className="rounded-[20px] p-1 lg:p-5 bg-white">
                  <br />
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
                </div>
                <Separator className="my-5" />

                <p className="text-center  text-3xl my-3">
                  Social reseaux link
                </p>
                {reseauxitems.map((item, index) => (
                  <div
                    key={index}
                    className="p-5 gap-3 my-2 bg-white rounded-[20px]"
                  >
                    <p key={index + 1} className=" font-bold">
                      reseaux Link :<span>{index}</span>
                    </p>
                    <div
                      key={index + 2}
                      className="flex items-center gap-2 my-2"
                    >
                      <p key={index + 3}>
                        {returnReseauxIcon(item.icon, "rgba(0, 0, 0, 1)")}
                      </p>

                      <Input
                        key={index + 4}
                        value={item.reseaux_url}
                        onChange={(e) =>
                          handleResauxUrlChange(item.position, e.target.value)
                        }
                      />
                    </div>
                    <div key={index + 5} className="flex justify-end">
                      <div key={index + 6} className="flex items-center gap-2">
                        <p key={index + 7} className="text-gray-500 text-sm">
                          show on page:
                        </p>
                        <Switch key={index + 8} />
                        <Button
                          onPress={() => handleDeleteReseaux(item.position)}
                        >
                          <TrashIcon />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}

                <br />
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="bordered" size="sm">
                      add reseaux Icon
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>choose your reseaux Icon</DialogTitle>
                      <DialogDescription>
                        Choose your social media link.
                      </DialogDescription>
                    </DialogHeader>
                    <div>
                      <Button onPress={() => addReseauxItem("FACEBOOK")}>
                        <FaFacebook />
                      </Button>
                      <Button onPress={() => addReseauxItem("INSTAGRAM")}>
                        <FaInstagram />
                      </Button>
                      <Button onPress={() => addReseauxItem("YOUTUBE")}>
                        <BsYoutube />
                      </Button>
                    </div>
                    <DialogFooter className="sm:justify-start">
                      <DialogClose asChild>
                        <Button type="button" variant="bordered">
                          Close
                        </Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                <Separator className="my-5" />
                <a
                  href="https://emojipedia.org"
                  className="text-fuchsia-700 font-bold underline"
                >
                  Go to add emoji🥇📕😎☀️
                </a>
                <p className="my-3 text-3xl text-center ">
                  {" "}
                  All Block:(
                  <span className="text-fuchsia-700">{itemsdnd.length}</span>)
                </p>

                <div className="mt-10">
                  <div>
                    {" "}
                    <DndContext
                      sensors={sensors}
                      collisionDetection={closestCenter}
                      onDragEnd={handleDragEnd}
                    >
                      <SortableContext
                        items={itemsdnd.map((item) => item.position)}
                        strategy={verticalListSortingStrategy}
                      >
                        {itemsdnd.map((item: any, index: any) => (
                          <div key={index + 1}>
                            <MainSortableItem
                              key={item.position}
                              item={item}
                              index={index}
                              isDragOn={isDraggable}
                              backgroundColor={cardcolor}
                              borderRadius={cardBorderRadius}
                              borderRadiusColor={cardBorderRadiusColor}
                              padding={cardPadding}
                              margin={cardmargin}
                              isHolding={isHolding}
                              witchComponent={item.type}
                            />
                          </div>
                        ))}
                      </SortableContext>
                    </DndContext>
                  </div>
                </div>

                <br />
                <Button
                  onPress={() => {
                    if (itemsdndforAdd.length > 0) {
                      //if detect update ,Update in the function
                      addComponent(itemsdndforAdd);
                      setItemsdndForADD([]);
                    } else {
                      updateComponentCardText(itemsdnd);
                      updateComponentUrl(itemsdnd);
                      updateActiveUrl(itemsdnd);
                    }
                    if (reseauxitemsForAdd.length > 0) {
                      addReseauxLink(reseauxitemsForAdd);
                      setreseauxItemsForADD([]);
                    } else {
                      //
                    }
                  }}
                >
                  Sync :add or update
                </Button>
                <br />

                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="bordered">
                      Add block <PlusIcon />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>
                        Add link,text,youtube video,spotify,separator and more{" "}
                      </DialogTitle>
                      <DialogDescription>Choose.</DialogDescription>
                    </DialogHeader>
                    <div className="flex items-center space-x-2">
                      <div className="grid flex-1 gap-2">
                        <ScrollArea className="w-full  rounded-md border">
                          <div className="grig grid-cols-3 gap-3 ">
                            <DialogClose asChild>
                              <Button
                                variant="bordered"
                                className="mx-2 my-2"
                                onClick={() => {
                                  addItem("COMPONENT_LINK");
                                }}
                              >
                                <LinkIcon />
                              </Button>
                            </DialogClose>
                            <DialogClose asChild>
                              <Button
                                variant="bordered"
                                className="mx-2 my-2"
                                onClick={() => {
                                  addItem("COMPONENT_SEPARATOR");
                                }}
                              >
                                <SeparatorHorizontalIcon />
                              </Button>
                            </DialogClose>
                            <DialogClose asChild>
                              <Button
                                variant="bordered"
                                className="mx-2 my-2"
                                onClick={() => {
                                  addItem("COMPONENT_TEXT");
                                }}
                              >
                                <TextIcon />
                              </Button>
                            </DialogClose>
                            <DialogClose asChild>
                              <Button
                                variant="bordered"
                                className="mx-2 my-2"
                                onClick={() => {
                                  addItem("COMPONENT_SPOTIFY");
                                }}
                              >
                                <BsSpotify />
                              </Button>
                            </DialogClose>
                            <DialogClose asChild>
                              <Button
                                variant="bordered"
                                className="mx-2 my-2"
                                onClick={() => {
                                  //setlabelselected("facebook link");
                                  // setFacebooklinkdisable(true);
                                  addItem("COMPONENT_YOUTUBE_EMB");
                                }}
                              >
                                <BsYoutube />
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
                        <Button type="button" variant="flat">
                          Close
                        </Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </>
            ) : null}

            <Modal size="full" isOpen={isOpen} onClose={onClose}>
              <ScrollArea className="w-full h-[700px]">
                {" "}
                <ModalContent>
                  {(onClose) => (
                    <>
                      <ModalHeader className="flex flex-col ">
                        Modal Title
                      </ModalHeader>
                      <ModalBody>
                        <ScrollArea
                          className="  w-full  h-[600px] border-gray-600 rounded-3xl shadow-lg  border-[7px]"
                          style={{
                            background: `linear-gradient(${colorDegres}deg, ${bgcolor1}, ${bgcolor2})`,
                          }}
                        >
                          <div className="grid mx-auto">
                            {photoUrl && (
                              <Image
                                src={photoUrl}
                                alt="profil"
                                width={100}
                                height={100}
                                className="w-[60px] h-[60px] rounded-[60px] mx-auto my-2 "
                              />
                            )}

                            <p
                              className="text-xl text-center"
                              style={{ color: color1 }}
                            >
                              @<span>{name} </span>
                            </p>
                            <div className="flex justify-center">
                              {" "}
                              <BsFillPatchCheckFill className="text-blue-400 ml-16" />
                            </div>

                            <p className="my-5 mx-10 text-gray-500 text-center text-[12px] ">
                              {desc}
                            </p>
                            <div className="flex justify-center">
                              <div className="flex items-center gap-4 my-1">
                                <Badge variant="outline">
                                  <BsPhone />
                                  Outline
                                </Badge>
                                <Badge variant="outline">
                                  <span>
                                    <FaLocationArrow />
                                  </span>
                                  Outline
                                </Badge>
                              </div>
                            </div>

                            <div className="flex justify-center">
                              <div className="flex items-center gap-2">
                                {reseauxitems.map((item, index) => (
                                  <Link
                                    href={item.reseaux_url}
                                    target="_blank"
                                    key={index}
                                  >
                                    {returnReseauxIcon(item.icon, color1)}
                                  </Link>
                                ))}
                              </div>
                            </div>

                            <DndContext
                              sensors={sensors}
                              collisionDetection={closestCenter}
                              onDragEnd={handleDragEnd}
                            >
                              <SortableContext
                                items={itemsdnd.map((item) => item.position)}
                                strategy={verticalListSortingStrategy}
                              >
                                {itemsdnd.map((item, index) => (
                                  <SortableItem
                                    key={item.position}
                                    item={item}
                                    index={index}
                                    isDragOn={isDraggable}
                                    backgroundColor={cardcolor}
                                    borderRadius={cardBorderRadius}
                                    borderRadiusColor={cardBorderRadiusColor}
                                    padding={cardPadding}
                                    margin={cardmargin}
                                    isHolding={isHolding}
                                    witchComponent={item.type}
                                  />
                                ))}
                              </SortableContext>
                            </DndContext>
                          </div>
                        </ScrollArea>
                        <Button
                          className="my-5"
                          color="primary"
                          onPress={lockUnlock}
                        >
                          {isHolding ? <LockOpenIcon /> : <LockIcon />}
                        </Button>
                      </ModalBody>
                    </>
                  )}
                </ModalContent>
              </ScrollArea>
            </Modal>

            <div className="grid gap-5 fixed bottom-2 end-3">
              <Button onPress={() => onOpen()}>
                <SmartphoneIcon />
              </Button>
              <Button onPress={lockUnlock}>
                {isHolding ? <LockOpenIcon /> : <LockIcon />}
              </Button>
            </div>

            {appearrancelayoutShow ? (
              <>
                <div className="grid">
                  <p className="font-bold my-5">
                    Background color: <span>{bgcolor1}</span> -
                    <span>{bgcolor2}</span>
                  </p>
                  <div className="flex items-center gap-4">
                    <RgbaStringColorPicker
                      color={bgcolor1}
                      onChange={(color) => setBgColor1(color)}
                    />
                    <RgbaStringColorPicker
                      color={bgcolor2}
                      onChange={(color) => setBgColor2(color)}
                    />
                    ;
                  </div>
                  <Slider
                    label="Temperature"
                    step={1}
                    maxValue={90}
                    minValue={0}
                    defaultValue={45}
                    onChange={setColorDegres}
                    value={colorDegres}
                    className="max-w-md"
                  />
                  <p className="font-bold my-5">
                    Name color: <span>{color1}</span>
                  </p>

                  <RgbaStringColorPicker color={color1} onChange={setColor} />
                  <p className="font-bold my-5">
                    Card color: <span>{cardcolor}</span>
                  </p>

                  <RgbaStringColorPicker
                    color={cardcolor}
                    onChange={setCardColor}
                  />

                  <p className="font-bold my-5">
                    Card Outline color: <span>{cardBorderRadiusColor}</span>
                  </p>

                  <RgbaStringColorPicker
                    color={cardBorderRadiusColor}
                    onChange={(color) => setCardBorderRadiusColorr(color)}
                  />

                  <p className="font-bold my-5">
                    Margin: <span>{cardmargin}</span>
                  </p>

                  <Slider
                    label="Margin"
                    step={1}
                    maxValue={90}
                    minValue={0}
                    defaultValue={45}
                    onChange={setCardmargin}
                    value={cardmargin}
                    className="max-w-md"
                  />
                  <p className="font-bold my-5">
                    padding: <span>{cardPadding}</span>
                  </p>

                  <Slider
                    label="Padding"
                    step={1}
                    maxValue={90}
                    minValue={0}
                    defaultValue={45}
                    onChange={setCardPadding}
                    value={cardPadding}
                    className="max-w-md"
                  />
                  <p className="font-bold my-5">
                    Border Radius: <span>{cardBorderRadius}</span>
                  </p>

                  <Slider
                    label="Border Radius"
                    step={1}
                    maxValue={90}
                    minValue={0}
                    defaultValue={45}
                    onChange={setCardBorderRadius}
                    value={cardBorderRadius}
                    className="max-w-md"
                  />
                </div>
              </>
            ) : null}

            <br />
          </div>
        </ScrollArea>
      </div>
    );
  }

  function fetchAlldatawithClick(item: LinkRetriv) {}
}

function ButtonLayout() {
  return (
    <div className="grid grid-cols-3 gap-5">
      <div className="flex rounded-sm size-[100px] bg-slate-400"></div>
      <div className="flex rounded-sm size-[100px] bg-slate-400"></div>
      <div className="flex rounded-sm size-[100px] bg-slate-400"></div>
      <div className="flex rounded-sm size-[100px] bg-slate-400"></div>
      <div className="flex rounded-sm size-[100px] bg-slate-400"></div>
      <div className="flex rounded-sm size-[100px] bg-slate-400"></div>
    </div>
  );
}
