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
  Children,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Database } from "../database.type";
//import { Button } from "@/components/ui/button";
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
import {
  FaFacebook,
  FaLocationArrow,
  FaPatreon,
  FaYoutubeSquare,
} from "react-icons/fa";
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
  PlusIcon,
  SeparatorHorizontalIcon,
  SnailIcon,
  TextIcon,
  TrashIcon,
  TwitchIcon,
  TwitterIcon,
  YoutubeIcon,
} from "lucide-react";

import // Dropdown,
// DropdownTrigger,
// DropdownMenu,
// DropdownItem,
// Avatar,
// Button,
// ButtonGroup,
"@nextui-org/react";
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
import ReturnIcon from "./ReturnIcon";
import { Spotify } from "react-spotify-embed";

interface ReseauxUrl {
  id: string;
  is_active: boolean;
  position: number;
  icon: string;
  reseaux_url: string;
  click: number;
  for_link_url: string;
}

interface SiteUrl {
  id: string;
  is_active: boolean;
  position: number;
  card_name: string;
  site_url: string;
  photo_url: string;
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

interface IconReseaux {
  icon: IconType;
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
  const [isfacebooklinkdisable, setFacebooklinkdisable] = useState(false);
  const [isinstagramlinkdisable, setInstagramlinkdisable] = useState(false);
  const [isXlinkdisable, setXlinkdisable] = useState(false);
  const [email, setEmail] = useState("");
  const [selectedlink, setselectedLink] = useState("");
  const [selectedKeys, setSelectedKeys] = useState("text");

  const selectedValue = useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys]
  );
  const [reseauxitems, setreseauxItems] = useState<ReseauxUrl[]>([
    {
      id: "1234",
      is_active: true,
      position: 0,
      icon: "facebook",
      reseaux_url: "https://facebook.com",
      click: 0,
      for_link_url: "betelgeuse",
    },
    {
      id: "1235",
      is_active: true,
      position: 1,
      icon: "instagram",
      reseaux_url: "https://facebook.com2",
      click: 0,
      for_link_url: "betelgeuse",
    },
    {
      id: "1236",
      is_active: true,
      position: 2,
      icon: "youtube",
      reseaux_url: "https://facebook.com3",
      click: 0,
      for_link_url: "betelgeuse",
    },
    {
      id: "1237",
      is_active: true,
      position: 2,
      icon: "twitch",
      reseaux_url: "https://facebook.com4",
      click: 0,
      for_link_url: "betelgeuse",
    },
    {
      id: "1238",
      is_active: true,
      position: 2,
      icon: "spotify",
      reseaux_url: "https://facebook.com5",
      click: 0,
      for_link_url: "betelgeuse",
    },
  ]);

  const [itemsdnd, setItemsdnd] = useState<ComponentType[]>([]);
  const [itemsdndforAdd, setItemsdndForADD] = useState<ComponentType[]>([]);
  const [inputs, setInputs] = useState<ComponentType[]>([]);
  const [labelselected, setlabelselected] = useState("");
  const [textDispo, setTextDispo] = useState("");
  const [paymentData, setPaymentData] = useState(null);
  const userId = useRef("");
  const [yourlink, setyourlink] = useState<LinkRetriv[]>([]);

  //color picker

  /*borderRadius,
  borderRadiusColor,
  padding,
  margin*/
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
  const colorcontext = createContext(color1);
  const [colorDegres, setColorDegres] = useState<number | number[]>(45);
  //

  const [buttonlayoutShow, setbuttonLayoutShow] = useState(false);
  const [gridlayoutShow, setgridLayoutShow] = useState(false);
  const [appearrancelayoutShow, setappearanceLayoutShow] = useState(false);
  const [isHome, setHome] = useState(true);
  const [isanalytics, setAnalytics] = useState(false);
  const [isshortlink, setshortlink] = useState(false);
  //url user selectionne
  let selectedUrl = useRef("*");
  //let updatedItem = useRef<SiteUrl[]>([]);
  const [selectedOption, setSelectedOption] = useState(new Set(["merge"]));
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  interface SortableItemProps {
    item: ComponentType;
    index: number;
    isDragOn: boolean;
    backgroundColor: string;
    borderRadius: number | number[];
    borderRadiusColor: string;
    padding: number | number[];
    margin: number | number[];
    title: string;
    url: string;
    witchComponent: string;
  }
  //react dnd,dnd/sorted
  const SortableItem: React.FC<SortableItemProps> = ({
    item,
    index,
    isDragOn,
    backgroundColor,
    borderRadius,
    borderRadiusColor,
    padding,
    margin,
    title,
    url,
    witchComponent,
  }) => {
    const { attributes, listeners, setNodeRef, transform, transition } =
      useSortable({ id: item.position });

    let listenersOnstate = isDragOn ? { ...listeners } : undefined;

    const style: Properties = {
      transform: CSS.Transform.toString(transform),
      transition,
      /*padding: `${padding}px`,
      margin: `${margin}px`,
      backgroundColor: backgroundColor,
      border: `1px solid ${borderRadiusColor}`,
      borderRadius: `${borderRadius}px`,*/
      touchAction: "none", // Important for mobile devices
      userSelect: "none", // Prevents text selection during drag
    };
    const styleForsep: Properties = {
      transform: CSS.Transform.toString(transform),
      transition,
      padding: `${padding}px`,
      margin: `${margin}px`,

      touchAction: "none", // Important for mobile devices
      userSelect: "none", // Prevents text selection during drag
    };

    const returnComponent = (component: string) => {
      switch (component) {
        case "COMPONENT_YOUTUBE_EMB":
          return (
            <div className="my-5">
              <iframe
                className=" rounded-[20px]"
                width={230}
                src={`https://www.youtube.com/embed/fPq50rwItiY?si=CbB1e9XaxNivOxF-`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>{" "}
            </div>
          );
        case "COMPONENT_TEXT":
          return (
            <p style={{ color: cardcolor }} className="p-5 text-center">
              {item.texte}
            </p>
          );
        case "COMPONENT_SPOTIFY":
          return (
            <Spotify
              className="w-full mx-5  my-5"
              link="https://open.spotify.com/album/0fUy6IdLHDpGNwavIlhEsl?si=mTiITmlHQpaGkoivGTv8Jw"
            />
          );
        case "COMPONENT_SEPARATOR":
          return <Separator className="my-5" />;
        case "COMPONENT_LINK":
          return (
            <div
              style={{
                backgroundColor: backgroundColor,
                border: `1px solid ${borderRadiusColor}`,
                borderRadius: `${borderRadius}px`,
                margin: `${margin}px`,
                width: "230px",
                padding: `${padding}px`,
              }}
            >
              <p className="text-center ">{item.texte}</p>
            </div>
          );
        case "COMPONENT_FORM":
          return (
            <div
              className="rounded-md shadow-md p-5 mt-5"
              style={{ color: cardcolor }}
            >
              <Input label="Full name:" />
              <br />
              <Input label="Email:" />
            </div>
          );
        default:
          null;
          break;
      }
    };

    if (item.is_active) {
      return (
        <div
          ref={setNodeRef}
          style={style}
          {...attributes}
          {...listenersOnstate}
          className="flex justify-center"
        >
          {returnComponent(witchComponent)}
        </div>
      );
    }
  };
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

  const MainSortableItem: React.FC<SortableItemProps> = ({
    item,
    index,
    backgroundColor,
    borderRadius,
    borderRadiusColor,
    padding,
    margin,
    title,
    url,
    witchComponent,
  }) => {
    const { attributes, listeners, setNodeRef, transform, transition } =
      useSortable({ id: item.position });

    const style: Properties = {
      transform: CSS.Transform.toString(transform),
      transition,
      padding: "8px",
      borderRadius: "20px ",
      marginTop: `45px`,
      marginBottom: `1px`,
      backgroundColor: "rgba(255, 255, 255, 1)",

      touchAction: "none", // Important for mobile devices
      userSelect: "none", // Prevents text selection during drag
    };
    /*
<div
        {...listeners}
        style={{
          padding: "8px",
          cursor: "grab",
          backgroundColor: "#ccc",
          marginRight: "8px",
        }}
      >
        ||
      </div>
*/
    return (
      <div style={style} className="flex justify-between ">
        <div className="flex items-center gap-7">
          <div
            ref={setNodeRef}
            {...listeners}
            {...attributes}
            style={{
              padding: "8px",
              cursor: "grab",

              marginRight: "8px",
            }}
          >
            |||
          </div>

          {ReturnIcon(witchComponent)}
        </div>

        <div className="  rounded-[20px] bg-white">
          {returnMainComponent(witchComponent, index, item, setNodeRef)}
        </div>
      </div>
    );
  };
  function returnMainComponent(
    witchComponent: string,
    index: number,
    item: any,
    setNodeRef: any
  ) {
    switch (witchComponent) {
      case "COMPONENT_LINK":
        return (
          <>
            <p>
              Link : <span>{index + 1}:</span>
            </p>
            <div className="flex rounded-b-[20px] bg-white p-3 gap-2">
              <Input
                type="text"
                value={
                  inputs.find((input) => input.position === item.position)
                    ?.texte || item.texte
                }
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
                value={
                  inputs.find((input) => input.position === item.position)
                    ?.url || item.url
                }
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
                placeholder="Ex: My facebook page"
              />
            </div>
            <br />
            <div className="flex justify-end">
              <div className="flex items-center gap-5">
                <p className="text-gray-500 text-sm">show on page:</p>
                <Switch
                  isSelected={item.is_active}
                  aria-label="Automatic updates"
                  onChange={() =>
                    handleIsVisibleChangeForSite(item.position, !item.is_active)
                  }
                />
                <Button
                  variant="flat"
                  onPress={() => {
                    handleDelete(item.position); //delete item on ui
                    deleteSiteUrl(item.site_url); //delete item on database
                  }}
                  className="bg-red-500 text-white"
                >
                  Delete
                </Button>
              </div>
            </div>
          </>
        );

      case "COMPONENT_YOUTUBE_EMB":
        return (
          <>
            <Input />
          </>
        );
      case "COMPONENT_SEPARATOR":
        return (
          <div className="flex ">
            <Separator className="bg-black my-auto" />
          </div>
        );

      default:
        null;
        break;
    }
  }

  const descriptionsMap = {
    merge:
      "All commits from the source branch are added to the destination branch via a merge commit.",
    squash:
      "All commits from the source branch are added to the destination branch as a single commit.",
    rebase:
      "All commits from the source branch are added to the destination branch individually.",
  };

  const labelsMap: any = {
    merge: "Create a merge commit",
    squash: "Squash and merge",
    rebase: "Rebase and merge",
  };

  // Convert the Set to an Array and get the first value.
  const selectedOptionValue = Array.from(selectedOption)[0];

  const reseauxIcons: IconReseaux[] = [
    { icon: FaFacebook },
    { icon: FaInstagram },
    { icon: BsTwitterX },
  ];

  const returnIcon = (pos: string, color: string) => {
    switch (pos) {
      case "facebook":
        return <FaFacebook className="w-7 h-7" style={{ color: color }} />;
      case "instagram":
        return <FaInstagram className="w-7 h-7" style={{ color: color }} />;
      case "x":
        return <BsTwitterX className="w-7 h-7" style={{ color: color }} />;
      case "youtube":
        return <BsYoutube className="w-7 h-7" style={{ color: color }} />;
      case "twitch":
        return <BsTwitch className="w-7 h-7" style={{ color: color }} />;
      case "spotify":
        return <BsSpotify className="w-7 h-7" style={{ color: color }} />;
      case "discord":
        return <BsDiscord className="w-7 h-7" style={{ color: color }} />;
      case "patreon":
        return <FaPatreon className="w-7 h-7" style={{ color: color }} />;
      default:
        return null;
    }
  };
  const returnComponent = (component: string, color: string, url: string) => {
    switch (component) {
      case "facebook":
        return <FaFacebook className="w-7 h-7" style={{ color: color }} />;
      case "instagram":
        return <FaInstagram className="w-7 h-7" style={{ color: color }} />;
      case "x":
        return <BsTwitterX className="w-7 h-7" style={{ color: color }} />;
      case "youtube":
        return (
          <>
            <iframe
              width={500}
              height="mx-auto"
              src={`${url}`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </>
        );
      case "twitch":
        return <BsTwitch className="w-7 h-7" style={{ color: color }} />;
      case "spotify":
        return <BsSpotify className="w-7 h-7" style={{ color: color }} />;
      case "discord":
        return <BsDiscord className="w-7 h-7" style={{ color: color }} />;
      case "patreon":
        return <FaPatreon className="w-7 h-7" style={{ color: color }} />;
      default:
        return null;
    }
  };

  /*

  
   
   1- changer la itemdnd sur la table site***
   2-update les positions en temps reel***
   3- add input for label
   4-detecter les donnees a inserer et les donnees a update,
   5-active /desactive url
   6-delete url site




*/

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

      updateSitePosition(newItems);
    }
  };

  const addItemdata = () => {
    setItemsdnd((previewItem) => [...previewItem, ...itemsdnd]);
  };

  // Fonction pour soustraire deux tableaux de chaînes de caractères
  function subtractArrays(arr1: SiteUrl[], arr2: SiteUrl[]): SiteUrl[] {
    return arr1.filter((item) => !arr2.includes(item));
  }

  // Exemple de tableaux
  //const array1: SiteUrl[] = ["pomme", "banane", "orange", "fraise"];
  // const array2: SiteUrl[] = ["banane", "fraise", "kiwi"];

  // Fonction pour trouver les différences entre deux objets

  // Affichage des différences
  function additemTodatabase() {
    //displayDifferences(updateddata, initialdata);
    console.log(itemsdndforAdd);
  }

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

      setname(data[0].user_name);
      setdesc(data[0].user_desc);
    }

    // fetchReseauxLink();
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
    reseauxitems.map(
      async (update) => {
        const { data, error } = await supabase

          .from("users_reseaux") // Remplacez par le nom de votre table
          .update({ position: update.position }) // Remplacez par la colonne et la valeur à mettre à jour
          .eq("reseaux_url", update.reseaux_url);
      } // Critères de sélection pour l'enregistrement à mettre à jour
    );
  };
  const updateSitePosition = async (dataForUpdate: ComponentType[]) => {
    dataForUpdate.map(
      async (update) => {
        const { data, error } = await supabase

          .from("component") // Remplacez par le nom de votre table
          .update({ position: update.position }) // Remplacez par la colonne et la valeur à mettre à jour
          .eq("id", update.id);
      } // Critères de sélection pour l'enregistrement à mettre à jour
    );
  };
  const updateSiteCardName = async (dataForUpdate: ComponentType[]) => {
    dataForUpdate.map(
      async (update) => {
        const { data, error } = await supabase

          .from("component") // Remplacez par le nom de votre table
          .update({ texte: update.texte }) // Remplacez par la colonne et la valeur à mettre à jour
          .eq("url", update.url);
      } // Critères de sélection pour l'enregistrement à mettre à jour
    );
  };
  const updateSiteUrl = async (dataForUpdate: ComponentType[]) => {
    dataForUpdate.map(
      async (update) => {
        const { data, error } = await supabase

          .from("component") // Remplacez par le nom de votre table
          .update({ url: update.url }) // Remplacez par la colonne et la valeur à mettre à jour
          .eq("id", update.id);
      } // Critères de sélection pour l'enregistrement à mettre à jour
    );
  };
  const updateActiveUrl = async (dataForUpdate: ComponentType[]) => {
    dataForUpdate.map(
      async (update) => {
        const { data, error } = await supabase

          .from("component") // Remplacez par le nom de votre table
          .update({ is_active: update.is_active }) // Remplacez par la colonne et la valeur à mettre à jour
          .eq("id", update.id);
      } // Critères de sélection pour l'enregistrement à mettre à jour
    );
  };
  const deleteSiteUrl = async (urlId: string) => {
    const { data, error } = await supabase

      .from("component") // Remplacez par le nom de votre table
      .delete() // Remplacez par la colonne et la valeur à mettre à jour
      .eq("url", urlId);
    updateSitePosition(itemsdnd);
  };

  const addSitesLink = async () => {
    const { data, error } = await supabase
      .from("component")
      .insert(itemsdndforAdd);
    if (error) console.log(error);
    console.log(data);
    setItemsdndForADD([]);
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

  /* const handleContentChange = (id: string, newContent: string) => {
    setItemsdnd((items) =>
      items.map((item) =>
        item.id === id ? { ...item, content: newContent } : item
      )
    );
  };*/
  ////////////////////////////////////////////////////////////////////////

  const handleInputChange = (id: number, value: string) => {
    setreseauxItems((prevInputs) =>
      prevInputs.map((input) =>
        input.position === id ? { ...input, reseaux_url: value } : input
      )
    );
  };
  /* const handleLabelChange = (id: number, label: string) => {
    setreseauxItems((prevInputs) =>
      prevInputs.map((input) =>
        input.position === id ? { ...input, card_name: label } : input
      )
    );
  };*/
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

  const handleSave = (id: number) => {
    const input = inputs.find((input) => input.position === id);
    if (input) {
      setItemsdnd((prevItems) =>
        prevItems.map((item) =>
          item.position === id
            ? {
                ...item,
                url: input.url,
                texte: input.texte,
              }
            : item
        )
      );
    }
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

  const handlePaymentSuccess = (paymentMethod: any) => {
    console.log("Payment successful", paymentMethod);
    setPaymentData(paymentMethod);
  };
  const route = useRouter();

  const isLogin = async () => {
    const { data, error } = await supabaseBrowserClient.auth.getUser();
    //const {data, error} = await supabase.auth.getSession();
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

  return (
    <div className="flex h-screen">
      <div className="w-auto bg-gray-200 h-[700px]">
        <div className="grid mx-2">
          <Button
            size="sm"
            variant="bordered"
            className=" mt-5"
            onPress={() => {
              setHome(true);
              setAnalytics(false);
              setshortlink(false);
            }}
          >
            <HomeIcon />
          </Button>
          <Button
            size="sm"
            className="my-5 "
            variant="bordered"
            onPress={() => {
              setHome(false);
              setAnalytics(true);
              setshortlink(false);
            }}
          >
            <BarChart4 />
          </Button>
          <Button
            size="sm"
            variant="bordered"
            onPress={() => {
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
                <ButtonGroup variant="flat">
                  <Button>{labelsMap[selectedOptionValue]}</Button>
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
                      <DropdownItem
                        key="merge"
                        description={descriptionsMap["merge"]}
                      >
                        {labelsMap["merge"]}
                      </DropdownItem>
                      <DropdownItem
                        key="squash"
                        description={descriptionsMap["squash"]}
                      >
                        {labelsMap["squash"]}
                      </DropdownItem>
                      <DropdownItem
                        key="rebase"
                        description={descriptionsMap["rebase"]}
                      >
                        {labelsMap["rebase"]}
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </ButtonGroup>
                <br />
                {yourlink.map((link, index) => (
                  <p
                    key={index}
                    onClick={() => {
                      selectedUrl.current = link.link_url;
                      setselectedLink(link.link_url);
                      setphotoUrl(link.photo_url);
                      setname(link.user_name);
                      setdesc(link.user_desc);
                      fetchSiteLink();
                    }}
                    className="text-blue-600"
                  >
                    {link.link_url}
                  </p>
                ))}
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
                        <DialogFooter className="sm:justify-start">
                          <DialogClose asChild>
                            <Button type="button" variant="bordered">
                              Close
                            </Button>
                          </DialogClose>
                          <div className="flex justify-end">
                            <Button
                              variant="bordered"
                              onClick={() =>
                                addLinkUrl(newname, newdesc, newUrl)
                              }
                              className=" fixed bottom-2  bg-green-500 "
                            >
                              add
                            </Button>
                          </div>
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
                  <div className="flex justify-end">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="bordered" size="sm">
                          bg color
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                          <DialogTitle>
                            pick background color: <span>{bgcolor1}</span>-
                            <span>{bgcolor2}</span>
                          </DialogTitle>
                          <DialogDescription>
                            Choose your social media link.
                          </DialogDescription>
                        </DialogHeader>
                        <div>
                          <RgbaStringColorPicker
                            color={bgcolor1}
                            onChange={setbgColor1}
                          />
                          <RgbaStringColorPicker
                            color={bgcolor2}
                            onChange={setbgColor2}
                          />
                          ;
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
                  </div>
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
                  <div className="flex justify-end">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="bordered" size="sm">
                          Name color
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                          <DialogTitle>
                            pick color<span>{color1}</span>
                          </DialogTitle>
                          <DialogDescription>
                            Choose your social media link.
                          </DialogDescription>
                        </DialogHeader>
                        <div>
                          <RgbaStringColorPicker
                            color={color1}
                            onChange={setColor}
                          />
                          ;
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
                  </div>
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

                <p className="text-center font-bold text-3xl my-3">
                  all your link
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
                        {returnIcon(item.icon, "rgba(0, 0, 0, 1)")}
                      </p>

                      <Input key={index + 4} value={item.reseaux_url} />
                    </div>
                    <div key={index + 5} className="flex justify-end">
                      <div key={index + 6} className="flex items-center gap-2">
                        <p key={index + 7} className="text-gray-500 text-sm">
                          show on page:
                        </p>
                        <Switch key={index + 8} />
                      </div>
                    </div>
                  </div>
                ))}
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
                        {returnComponent(
                          item.icon,
                          "rgba(0, 0, 0, 1)",
                          "https://www.youtube.com/embed/fPq50rwItiY?si=CbB1e9XaxNivOxF-"
                        )}
                      </p>

                      <Input key={index + 4} value={item.reseaux_url} />
                    </div>
                    <div key={index + 5} className="flex justify-end">
                      <div key={index + 6} className="flex items-center gap-2">
                        <p key={index + 7} className="text-gray-500 text-sm">
                          show on page:
                        </p>
                        <Switch key={index + 8} />
                      </div>
                    </div>
                  </div>
                ))}

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
                        {returnIcon(item.icon, "rgba(0, 0, 0, 1)")}
                      </p>

                      <Input key={index + 4} value={item.reseaux_url} />
                    </div>
                    <div key={index + 5} className="flex justify-end">
                      <div key={index + 6} className="flex items-center gap-2">
                        <p key={index + 7} className="text-gray-500 text-sm">
                          show on page:
                        </p>
                        <Switch key={index + 8} />
                      </div>
                    </div>
                  </div>
                ))}

                <a
                  href="https://emojipedia.org"
                  className="text-fuchsia-700 font-bold underline"
                >
                  Go to add emoji🥇📕😎☀️
                </a>
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
                              title=""
                              url=""
                              witchComponent={item.type}
                            />
                          </div>
                        ))}
                      </SortableContext>
                    </DndContext>
                  </div>
                </div>
                <p>
                  All items:{" "}
                  {itemsdnd
                    .map((item) => `${item.position}${item.url}`)
                    .filter(Boolean)
                    .join(",")}
                </p>
                <br />
                <Button
                  onPress={() => {
                    //addItemdata();
                    if (itemsdndforAdd.length > 0) {
                      additemTodatabase();
                      //if detect update ,Update in the function
                      addSitesLink();
                    } else {
                      updateSiteCardName(itemsdnd);
                      updateSiteUrl(itemsdnd);
                      updateActiveUrl(itemsdnd);
                    }
                  }}
                >
                  Sync :add or update
                </Button>
                <br />

                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="bordered">
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
                      onChange={setbgColor1}
                    />
                    <RgbaStringColorPicker
                      color={bgcolor2}
                      onChange={setbgColor2}
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
                    onChange={setCardBorderRadiusColor}
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
                        {returnIcon(item.icon, color1)}
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
                        title=""
                        url=""
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

function ButtonLayout() {
  return (
    <div>
      <p>button layout</p>
    </div>
  );
}
