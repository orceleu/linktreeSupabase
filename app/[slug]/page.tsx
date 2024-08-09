"use client";
import React, { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRef } from "react";

import { QueryResult, QueryData, QueryError } from "@supabase/supabase-js";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { YouTubeEmbed } from "react-social-media-embed";
import { TikTokEmbed } from "react-social-media-embed";
import { LinkedInEmbed } from "react-social-media-embed";
import { InstagramEmbed } from "react-social-media-embed";
import { supabase } from "../supabase/supabaseInstance";
import {
  HexColorPicker,
  RgbaColorPicker,
  RgbaStringColorPicker,
} from "react-colorful";
import Image from "next/image";
import claireremovebg from "../../public/claireremovebg.png";
import { Button } from "@/components/ui/button";
import { Share2Icon, ShareIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
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
import "react-spotify-embed";
import { Spotify } from "react-spotify-embed";
import { Input } from "@nextui-org/react";
import Link from "next/link";
import { returnReseauxIcon } from "../dashboard/ReturnIcon";
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
interface Props {
  img1: string;
  img2: string;
  img3: string;
  img4: string;
}
interface ReseauxUrl {
  id: string;
  is_active: boolean;
  position: number;
  icon: string;
  reseaux_url: string;
  click: number;
  for_link_url: string;
}
interface Appareance {
  mainBackground: string;
  nameColor: string;
  descColor: string;
  cardColor: string;
  titleCardColor: string;
  outlinedCarcColor: string;
  bordersRadius: string;
}
export default function Page({ params }: { params: { slug: string } }) {
  // className={`bg-gradient-to-b from-[#3047f5] to-[#fc0101] w-full h-screen`}
  const [urlId, setTable] = useState("");
  const [country, setCountrie] = useState<LinkRetriv[]>([]);
  //const [reseaux, setReseaux] = useState<Reseaux[]>([]);
  const [color1, setColor] = useState("");
  const [color2, setColor2] = useState("");
  const [color3, setColor3] = useState("");
  const [cardBorderRadiusColor, setCardBorderRadiusColor] = useState(
    " rgba(255, 0, 213, 1)"
  );
  const [cardPadding, setCardPadding] = useState<number | number[]>(15);
  const [cardmargin, setCardmargin] = useState<number | number[]>(15);
  const [colorDegres, setColorDegres] = useState<number | number[]>(45);
  const [cardcolor, setCardColor] = useState(" rgba(152, 205, 166, 0)");
  const [cardBorderRadius, setCardBorderRadius] = useState<number | number[]>(
    15
  );
  const [reseauxitems, setreseauxItems] = useState<ReseauxUrl[]>([]);
  const [imageUrl, setImageUrl] = useState("https://via.placeholder.com/600"); // URL initiale de l'image

  const [reseauxClick, setReseauxClick] = useState<ReseauxClick[]>([]);

  const [itemsdnd, setItemsdnd] = useState<ComponentType[]>([]);

  const [userNotFound, setUserNotfound] = useState(false);
  const [reseaux, setReseaux] = useState<Reseaux[]>([]);

  const [name, setname] = useState("");
  const [desc, setdesc] = useState("");
  const [appareance, setAppareance] = useState<Appareance[]>([
    //probleme de boucle ,l'index premier actualise le rendu et les autre n'ont pas le temp de s'affecter
    {
      mainBackground: "rgba(45, 162, 152, 0.41)",
      nameColor: "rgba(45, 162, 152, 0.41)",
      descColor: "rgba(0, 0, 0, 1)",
      cardColor: "rgba(45, 162, 152, 0.41)",
      titleCardColor: "rgba(0, 0, 0, 1)",
      outlinedCarcColor: "rgba(0, 0, 0, 1)",
      bordersRadius: "10px",
    },
  ]);
  let simpleAppareance: Appareance[] = [
    {
      mainBackground: "rgba(45, 162, 152, 0.41)",
      nameColor: "rgba(45, 162, 152, 0.41)",
      descColor: "rgba(45, 162, 152, 0.41)",
      cardColor: "rgba(45, 162, 152, 0.41)",
      titleCardColor: "rgba(45, 162, 152, 0.41)",
      outlinedCarcColor: "rgba(45, 162, 152, 0.41)",
      bordersRadius: "40px",
    },
  ];

  const fetchAllLink = async () => {
    const { data, error } = await supabase
      .from("link")
      .select("*")
      .eq("link_url", urlId);
    if (error) console.log(error);

    if (data) {
      setname(data[0]?.user_name);
      setdesc(data[0]?.user_desc);
    }

    fetchReseauxLink();
    fetchComponent();
  };
  const fetchReseauxLink = async () => {
    const { data, error } = await supabase
      .from("users_reseaux")
      .select("*")
      .eq("for_link_url", urlId)
      .order("position", { ascending: true });

    if (error) console.log(error);
    if (data) setreseauxItems(data);
    console.log(`reseaux feching: ${data}`);
  };
  const fetchComponent = async () => {
    const { data, error } = await supabase
      .from("component")
      .select("*")
      .eq("for_link_url", urlId)
      .order("position", { ascending: true });

    if (error) console.log(error);
    if (data) setItemsdnd(data);
    console.log(`component feching: ${data}`);
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
      .eq("usersreseauxidclick", urlId);

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
      .eq("usersreseauxidclick", urlId);
  };
  const updateYoutubeClick = async (initialclick: number) => {
    let prevclick = initialclick;
    const { error } = await supabase
      .from("usersreseauxclick")
      .update({ youtubeclick: prevclick + 1 })
      .eq("usersreseauxidclick", urlId);
  };
  const updateXClick = async (initialclick: number) => {
    let prevclick = initialclick;
    const { error } = await supabase
      .from("usersreseauxclick")
      .update({ xclick: prevclick + 1 })
      .eq("usersreseauxidclick", urlId);
  };
  const updateGithubClick = async (initialclick: number) => {
    let prevclick = initialclick;
    const { error } = await supabase
      .from("usersreseauxclick")
      .update({ githubclick: prevclick + 1 })
      .eq("usersreseauxidclick", urlId);
  };
  const updateInstagramClick = async (initialclick: number) => {
    let prevclick = initialclick;
    const { error } = await supabase
      .from("usersreseauxclick")
      .update({ instagramclick: prevclick + 1 })
      .eq("usersreseauxidclick", urlId);
  };
  const updatePinterestClick = async (initialclick: number) => {
    let prevclick = initialclick;
    const { error } = await supabase
      .from("usersreseauxclick")
      .update({ pinterestclick: prevclick + 1 })
      .eq("usersreseauxidclick", urlId);
  };

  useEffect(() => {
    if (
      params.slug !== undefined &&
      params.slug !== null &&
      params.slug !== "login" &&
      params.slug !== "signup" &&
      params.slug !== "private"
    ) {
      setTable(params.slug);
      if (urlId !== "") {
        fetchAllLink();
      }
    }
  }, [urlId]);
  /* <Carroussel
                img1="https://www.youtube.com/embed/fPq50rwItiY?si=CbB1e9XaxNivOxF-"
                img2="https://www.youtube.com/embed/4WCxtdLDLsE?si=gakX2Jw-l9hy-uXw"
                img3="https://www.youtube.com/embed/5SAud9NhxZQ?si=kaZLW6Ht3Yovnt7s"
                img4="https://www.youtube.com/embed/5DdGdY_JJ9I?si=BPOienLkwAPxF2KW"
              />*/

  return (
    <main
      style={{
        background: `linear-gradient(45deg, ${color1}, ${color2})`,
        backgroundImage: `url(${imageUrl})`,
      }}
    >
      <Button variant="ghost" className="mx-2 my-2">
        <Share2Icon />
      </Button>
      <div className="flex justify-center">
        {userNotFound ? (
          <>
            <p>user not found</p>
          </>
        ) : (
          <div className="  flex justify-center ">
            <div className="grid  mx-10">
              <Image
                src={claireremovebg}
                alt=""
                className="w-[60px] h-[60px] rounded-[60px] mx-auto my-2 "
              />
              <p
                style={{ color: appareance[0].nameColor }}
                className={`text-xl  text-center`}
              >
                {name}
              </p>
              <p
                style={{ color: appareance[0].descColor }}
                className={`my-5 text-center mx-10`}
              >
                {desc}
              </p>
              <div className="flex justify-center">
                <div className="flex items-center gap-2">
                  {reseauxitems.map((item, index) => (
                    <Link href={item.reseaux_url} target="_blank" key={index}>
                      {returnReseauxIcon(item.icon, color1)}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="my-10">
                {itemsdnd.map((item, index) => (
                  <ComponentToReturn
                    key={item.position}
                    item={item}
                    backgroundColor={cardcolor}
                    borderRadius={cardBorderRadius}
                    borderRadiusColor={cardBorderRadiusColor}
                    padding={cardPadding}
                    margin={cardmargin}
                    witchComponent={item.type}
                  />
                ))}
              </div>
            </div>
            <Button
              variant="outline"
              className="rounded-[50px] fixed bottom-4 sm:mx-auto lg:end-5"
            >
              create your ssply.bio
            </Button>
          </div>
        )}
      </div>
    </main>
  );
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
interface SortableItemProps {
  item: ComponentType;
  backgroundColor: string;
  borderRadius: number | number[];
  borderRadiusColor: string;
  padding: number | number[];
  margin: number | number[];
  witchComponent: string;
}

const ComponentToReturn: React.FC<SortableItemProps> = ({
  item,
  backgroundColor,
  borderRadius,
  borderRadiusColor,
  padding,
  margin,
  witchComponent,
}) => {
  const returnComponent = (component: string) => {
    switch (component) {
      case "COMPONENT_YOUTUBE_EMB":
        return (
          <div className="rounded-[20px] my-5">
            <YouTubeEmbed
              className="w-full mx-5  my-5 rounded-[20px]"
              url=">https://youtu.be/TLGFTH4s_0Y?si=3rOU1LiQfpSYFHnz"
              height={220}
            />{" "}
          </div>
        );
      case "TIKTOK_EMB":
        return (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <TikTokEmbed
              className="w-full mx-5  my-5"
              url="https://www.tiktok.com/@epicgardening/video/7055411162212633903"
            />
          </div>
        );
      case "LINKEDIN_EMB":
        return (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <LinkedInEmbed
              className="w-full mx-5  my-5"
              url="https://www.linkedin.com/embed/feed/update/urn:li:share:6898694772484112384"
              postUrl="https://www.linkedin.com/posts/peterdiamandis_5-discoveries-the-james-webb-telescope-will-activity-6898694773406875648-z-D7"
              height={570}
            />
          </div>
        );

      case "INSTAGRAM_EMB":
        return (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <InstagramEmbed
              className="w-full mx-5  my-5"
              url="https://www.instagram.com/p/CUbHfhpswxt/"
            />
          </div>
        );
      case "COMPONENT_TEXT":
        return (
          <>
            <p className="p-5 text-center">{item.texte}</p>
          </>
        );
      case "COMPONENT_SPOTIFY":
        return (
          <Spotify
            className="w-full mx-5  my-5"
            link="https://open.spotify.com/album/0fUy6IdLHDpGNwavIlhEsl?si=mTiITmlHQpaGkoivGTv8Jw"
          />
        );
      case "COMPONENT_SEPARATOR":
        return (
          <div className="flex justify-center">
            <Separator className="my-5 w-[200px]" />
          </div>
        );
      case "COMPONENT_LINK":
        return (
          <Link href={item.url} target="_blank">
            {" "}
            <div
              style={{
                backgroundColor: backgroundColor,
                border: `1px solid ${borderRadiusColor}`,
                borderRadius: `${borderRadius}px`,
                margin: `${margin}px`,

                padding: `${padding}px`,
              }}
              className="w-full "
            >
              <p className="text-center ">{item.texte}</p>
            </div>
          </Link>
        );
      case "COMPONENT_FORM":
        return (
          <div className="rounded-md shadow-md p-5  bg-slate-200">
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
    return <>{returnComponent(witchComponent)}</>;
  }
};

const Carroussel: React.FC<Props> = ({ img1, img2, img3, img4 }) => {
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [windowsizeybfinal, setWindowSizeybfinal] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    if (windowSize.width < 620) {
      setWindowSizeybfinal(250);
    } else {
      setWindowSizeybfinal(520);
    }
    window.addEventListener("resize", handleResize);

    // Nettoyer l'écouteur d'événement lors du démontage du composant
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const person = [
    {
      picture: img1,
    },
    {
      picture: img2,
    },
    {
      picture: img3,
    },
    {
      picture: img4,
    },
  ];
  return (
    <div className="flex justify-center ">
      <Carousel
        plugins={[plugin.current]}
        className={`w-[${windowsizeybfinal}px] max-w-[520px]`}
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {person.map((_img, index) => (
            //https://www.youtube.com/embed/fPq50rwItiY?si=CbB1e9XaxNivOxF-
            <CarouselItem key={index}>
              <div className="bg-black ">
                <iframe
                  key={index}
                  width={windowsizeybfinal}
                  height="mx-auto"
                  src={`${_img.picture}`}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>
              <br />
              <br />

              <Separator />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};
/*
<Carroussel
                img1="https://www.youtube.com/embed/fPq50rwItiY?si=CbB1e9XaxNivOxF-"
                img2="https://www.youtube.com/embed/4WCxtdLDLsE?si=gakX2Jw-l9hy-uXw"
                img3="https://www.youtube.com/embed/5SAud9NhxZQ?si=kaZLW6Ht3Yovnt7s"
                img4="https://www.youtube.com/embed/5DdGdY_JJ9I?si=BPOienLkwAPxF2KW"
              />

              <br />

               <div>
        <p style={{ fontFamily: "Roboto, sans-serif" }}>
          Ceci est un paragraphe avec la police Roboto.
        </p>
        <p style={{ fontFamily: "Open Sans, sans-serif" }}>
          Ceci est un paragraphe avec la police Open Sans.
        </p>
        <p style={{ fontFamily: "Lobster, cursive" }}>
          Ceci est un paragraphe avec la police Lobster.
        </p>
      </div>
*/
