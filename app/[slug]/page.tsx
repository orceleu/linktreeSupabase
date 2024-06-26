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
interface SiteUrl {
  site1: string;
  site2: string;
  site3: string;
  site4: string;
  site5: string;
  site6: string;
  site7: string;
  site8: string;
  site9: string;
  site10: string;
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

  const [imageUrl, setImageUrl] = useState("https://via.placeholder.com/600"); // URL initiale de l'image

  const [reseauxClick, setReseauxClick] = useState<ReseauxClick[]>([]);

  /* const [isfbnull, setFbnull] = useState(true);
  const [isytnull, setytnull] = useState(true);
  const [isignull, setignull] = useState(true);
  const [isxnull, setxnull] = useState(true);
  const [issnapnull, setsnapnull] = useState(true);
  const [isgitnull, setgitnull] = useState(true);
  const [isonlynull, setonlynull] = useState(true);
  const [ispintnull, setpintnull] = useState(true);
  const [isdisconull, setdisconull] = useState(true);*/
  const [userNotFound, setUserNotfound] = useState(false);
  const [reseaux, setReseaux] = useState<Reseaux[]>([]);
  const [siteUrl, setSiteUrl] = useState<SiteUrl[]>([
    {
      site1: "1handforhaiti.org;handforhaiti",
      site2: "2site.com;support my work",
      site3: "3site.com;my portfoliot",
      site4: "4site.com;my shop",
      site5: "5handforhaiti.org;handforhaiti",
      site6: "7site.com;support my work",
      site7: "10site.com;my portfoliot",
      site8: "6site.com;my shop",
      site9: "8handforhaiti.org;handforhaiti",
      site10: "9site.com;support my work",
    },
  ]);
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
  function changeappareance() {
    setAppareance(simpleAppareance);
  }
  const bg = "87e6c1";
  const [youtubeEmbededUrl, setYoutubeEmbededUrl] = useState<SiteUrl[]>([]);
  const [filteredArray, setFilteredArray] = useState<string[]>([]);
  const [filteredSiteUrl, setFilteredSiteUrl] = useState<string[]>([]);
  const [filteredYoutubeEmbeded, setFilteredYoutubeEmbeded] = useState<
    string[]
  >([]);
  const [originalString, setOriginalString] = useState<string>(
    "1mysite.com;Buy me a coffe"
  );

  //selectionne embedebvideo et siteUrlPlus_title separement en fonction supabase
  // Fonction pour séparer la chaîne en deux parties à partir de l'indicateur ";"
  const splitString = (str: string): [string, string] => {
    const [firstPart, secondPart] = str.split(";");
    return [firstPart, secondPart];
  };

  useEffect(() => {
    console.log(appareance[0].mainBackground);

    // Transformer l'objet en tableau de paires [clé, valeur]
    const reseauxList: string[] = reseaux.flatMap((reseau) =>
      Object.values(reseau)
    );
    const siteUrlList: string[] = siteUrl.flatMap((reseau) =>
      Object.values(reseau)
    );

    // Trier les valeurs par ordre croissant en fonction du préfixe numérique
    const sortedList = reseauxList.sort((a, b) => {
      const numA = parseInt(a, 10);
      const numB = parseInt(b, 10);
      return numA - numB;
    });
    const sortedSiteUrlList = siteUrlList.sort((a, b) => {
      const numA = parseInt(a, 10);
      const numB = parseInt(b, 10);
      return numA - numB;
    });

    // Mettre à jour l'état du tableau filtré
    setFilteredArray(sortedList);
    setFilteredSiteUrl(sortedSiteUrlList);
  }, [reseaux]);

  //appeler lors de lintegration de lurl ahref
  function removeLeadingCharacter(str: string, charToRemove: string): string {
    if (str.startsWith(charToRemove)) {
      return str.slice(1);
    }
    return str;
  }

  const fetchdata = async () => {
    const countriesWithCitiesQuery = supabase
      .from("link")
      .select("*")
      .eq("link_url", urlId);

    type CountriesWithCities = QueryData<typeof countriesWithCitiesQuery>;

    const { data, error } = await countriesWithCitiesQuery;

    if (error) throw error;
    console.log(data);
    if (data.length == 0) {
      setUserNotfound(true);
    }
    const countriesWithCities: CountriesWithCities = data;

    setCountrie(countriesWithCities);
    console.log(countriesWithCities);
  };

  const fetchreseaux = async () => {
    const reseauxdata = supabase
      .from("usersreseaux")
      .select(
        `facebook,
        youtube,
        instagram,
        x,
        snapchat,
        github,
        discord,
        pinterest,
        onlyfans`
      )
      .eq("usersreseauxid", urlId);

    type reseauxdata = QueryData<typeof reseauxdata>;
    const { data, error } = await reseauxdata;
    if (error) throw error;
    const result: reseauxdata = data;

    setReseaux(result);

    /*if (reseaux[0]?.facebook !== null && reseaux[0]?.facebook !== undefined) {
      setFbnull(false);
    }
    if (reseaux[0]?.youtube !== null && reseaux[0]?.youtube !== undefined) {
      setytnull(false);
    }
    if (reseaux[0]?.instagram !== null && reseaux[0]?.instagram !== undefined) {
      setignull(false);
    }
    if (reseaux[0]?.x !== null && reseaux[0]?.x !== undefined) {
      setxnull(false);
    }
    if (reseaux[0]?.snapchat !== null && reseaux[0]?.snapchat !== undefined) {
      setsnapnull(false);
    }
    if (reseaux[0]?.discord !== null && reseaux[0]?.discord !== undefined) {
      setdisconull(false);
    }
    if (reseaux[0]?.onlyfans !== null && reseaux[0]?.onlyfans !== undefined) {
      setonlynull(false);
    }
    if (reseaux[0]?.github !== null && reseaux[0]?.github !== undefined) {
      setgitnull(false);
    }
    if (reseaux[0]?.pinterest !== null && reseaux[0]?.pinterest !== undefined) {
      setpintnull(false);
    }

    console.log(isfbnull);*/
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
        fetchdata();
        fetchreseaux();
        fetchreseauxClick();
      }
    }
  }, [urlId, reseaux[0]?.facebook]);
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
      <RgbaStringColorPicker color={color1} onChange={setColor} />;
      <RgbaStringColorPicker color={color2} onChange={setColor2} />;
      <RgbaStringColorPicker color={color3} onChange={setColor3} />
      <p>{color3}</p>
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
        <Button
          onClick={() => {
            changeappareance();
          }}
        >
          change appareance
        </Button>
      </div>
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
            <div className="grid  ">
              <Image
                src={claireremovebg}
                alt=""
                className="w-[60px] h-[60px] rounded-[60px] mx-auto my-2 "
              />
              <p
                style={{ color: appareance[0].nameColor }}
                className={`text-xl  text-center`}
              >
                {country[0]?.user_name}
              </p>
              <p
                style={{ color: appareance[0].descColor }}
                className={`my-5 text-center mx-10`}
              >
                {country[0]?.user_desc}
              </p>
              <Carroussel
                img1="https://www.youtube.com/embed/fPq50rwItiY?si=CbB1e9XaxNivOxF-"
                img2="https://www.youtube.com/embed/4WCxtdLDLsE?si=gakX2Jw-l9hy-uXw"
                img3="https://www.youtube.com/embed/5SAud9NhxZQ?si=kaZLW6Ht3Yovnt7s"
                img4="https://www.youtube.com/embed/5DdGdY_JJ9I?si=BPOienLkwAPxF2KW"
              />
              <div className="flex justify-center my-5">
                <Spotify
                  style={{
                    height: 500,
                    background: appareance[0].mainBackground,
                  }}
                  className="w-full mx-5 "
                  link="https://open.spotify.com/album/0fUy6IdLHDpGNwavIlhEsl?si=mTiITmlHQpaGkoivGTv8Jw"
                />
              </div>

              <div className="sm:mt-3 md:mt-5">
                {filteredArray.map((item, index) => {
                  // Ne rendre la div que si l'élément n'est pas vide
                  if (item) {
                    let reseauxCardTitle = "";
                    if (item.includes("facebook")) {
                      reseauxCardTitle = "facebook";
                    } else if (item.includes("youtube")) {
                      reseauxCardTitle = "youtube";
                    } else if (item.includes("pinterest")) {
                      reseauxCardTitle = "pinterest";
                    } else if (item.includes("x")) {
                      reseauxCardTitle = "x";
                    } else if (item.includes("instagram")) {
                      reseauxCardTitle = "instagram";
                    } else if (item.includes("onlyfan")) {
                      reseauxCardTitle = "onlyfan";
                    } else if (item.includes("snapchat")) {
                      reseauxCardTitle = "snapchat";
                    } else if (item.includes("discord")) {
                      reseauxCardTitle = "discord";
                    } else {
                      reseauxCardTitle = "any";
                    }

                    return (
                      <a
                        href={`https://www.${removeLeadingCharacter(
                          item,
                          item.charAt(0)
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        key={index}
                      >
                        <div
                          style={{
                            backgroundColor: appareance[0].cardColor,
                            borderRadius: appareance[0].bordersRadius,
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor =
                              appareance[0].mainBackground;
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor =
                              appareance[0].cardColor;
                          }}
                          className={`lg:max-w-[1000px]  overflow-hidden shadow-lg  m-4 cursor-pointer `}
                          onClick={() => {
                            // console.log(item);

                            if (item.includes("facebook")) {
                              console.log("facebook clicked");
                              updateFacebookClick(
                                reseauxClick[0]?.facebookclick
                              );
                            } else if (item.includes("instagram")) {
                              console.log("instagram cliked");
                              updateInstagramClick(
                                reseauxClick[0]?.instagramclick
                              );
                            } else if (item.includes("youtube")) {
                              console.log("youtube cliked");
                              updateYoutubeClick(reseauxClick[0]?.youtubeclick);
                            } else if (item.includes("x")) {
                              console.log("x cliked");
                              updateXClick(reseauxClick[0]?.xclick);
                            } else if (item.includes("pinterest")) {
                              console.log("pinterest cliked");
                              updatePinterestClick(
                                reseauxClick[0]?.pinterestclick
                              );
                            }

                            // updateFacebookClick(reseauxClick[0]?.facebookclick);
                          }}
                        >
                          <div className="px-6 py-4">
                            <p
                              style={{ color: appareance[0].titleCardColor }}
                              className={`font-bold text-xl   mx-auto my-auto text-center`}
                            >
                              {reseauxCardTitle}
                            </p>
                          </div>
                        </div>
                      </a>
                    );
                  }
                  return null; // Ne rien rendre si l'élément est vide
                })}
              </div>
              <br />

              <div className="mt-10">
                {filteredSiteUrl.map((item, index) => {
                  // Ne rendre la div que si l'élément n'est pas vide
                  if (item) {
                    let removedFirstChar = removeLeadingCharacter(
                      item,
                      item.charAt(0)
                    );
                    const [firstPart, secondPart] =
                      splitString(removedFirstChar);

                    return (
                      <a
                        href={`https://www.${firstPart}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        key={index}
                      >
                        <div
                          style={{
                            backgroundColor: color3,
                            borderRadius: appareance[0].bordersRadius,

                            border: `2px solid ${appareance[0].outlinedCarcColor}`,
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor =
                              appareance[0].mainBackground;
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = color3;
                          }}
                          className={`lg:max-w-[1000px]   overflow-hidden shadow-lg   m-4 cursor-pointer `}
                          onClick={() => {
                            // console.log(item);

                            if (item.includes("facebook")) {
                              console.log("facebook clicked");
                              updateFacebookClick(
                                reseauxClick[0]?.facebookclick
                              );
                            } else if (item.includes("instagram")) {
                              console.log("instagram cliked");
                              updateInstagramClick(
                                reseauxClick[0]?.instagramclick
                              );
                            } else if (item.includes("youtube")) {
                              console.log("youtube cliked");
                              updateYoutubeClick(reseauxClick[0]?.youtubeclick);
                            } else if (item.includes("x")) {
                              console.log("x cliked");
                              updateXClick(reseauxClick[0]?.xclick);
                            } else if (item.includes("pinterest")) {
                              console.log("pinterest cliked");
                              updatePinterestClick(
                                reseauxClick[0]?.pinterestclick
                              );
                            }

                            // updateFacebookClick(reseauxClick[0]?.facebookclick);
                          }}
                        >
                          <div className="px-6 py-4">
                            <p
                              style={{
                                color: appareance[0].titleCardColor,
                              }}
                              className={`font-bold text-xl  mx-auto my-auto text-center`}
                            >
                              {secondPart}
                            </p>
                          </div>
                        </div>
                      </a>
                    );
                  }
                  return null; // Ne rien rendre si l'élément est vide
                })}
              </div>
              <br />
              <br />
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
