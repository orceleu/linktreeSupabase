import { LinkIcon, SeparatorHorizontalIcon, TextIcon } from "lucide-react";
import React from "react";
import {
  BsCashCoin,
  BsDiscord,
  BsSpotify,
  BsTwitch,
  BsTwitterX,
  BsYoutube,
} from "react-icons/bs";
import { FaFacebook, FaInstagram, FaPatreon, FaYoutube } from "react-icons/fa";

const ReturnIconMain = (iconChoosen: string) => {
  switch (iconChoosen) {
    case "COMPONENT_LINK":
      return (
        <div className="my-2  p-2 lg:p-10 ">
          <LinkIcon className="size-[20px] lg:size-[50px]  my-2" />
          <p className="text-[10px] lg:text-xl text-gray-700 underline">Link</p>
        </div>
      );
    case "COMPONENT_YOUTUBE_EMB":
      return (
        <div className="my-2  p-2 lg:p-10 ">
          <FaYoutube className="size-[20px] lg:size-[50px]" />
          <p className="text-[10px] lg:text-xl text-gray-700 underline">
            Youtube embeded video
          </p>
        </div>
      );
    case "COMPONENT_TEXT":
      return (
        <div className="my-2 p-2 lg:p-10 ">
          <TextIcon className="size-[20px] lg:size-[50px]" />
          <p className="text-[10px] lg:text-xl text-gray-700 underline">Text</p>
        </div>
      );
    case "COMPONENT_SPOTIFY":
      return (
        <div className="my-2  p-2 lg:p-10 ">
          <BsSpotify className="size-[20px] lg:size-[50px]" />
          <p className="text-[10px] lg:text-xl text-gray-700 underline">
            Spotify embeded
          </p>
        </div>
      );
    case "COMPONENT_GOFUNDME":
      return (
        <div className="my-2  p-2 lg:p-10 ">
          <BsCashCoin className="size-[20px] lg:size-[50px]" />
          <p className="text-[10px] lg:text-xl text-gray-700 underline">
            Go fund me
          </p>
        </div>
      );
    case "COMPONENT_EXPANDABLE_TEXT":
      return (
        <div className="my-2  p-2 lg:p-10 ">
          <SeparatorHorizontalIcon className="size-[20px] lg:size-[50px]" />
          <p className="text-[10px] lg:text-xl text-gray-700 underline">
            Expandable text
          </p>
        </div>
      );
    case "COMPONENT_SEPARATOR":
      return (
        <div className="my-2  p-2 lg:p-10 ">
          <SeparatorHorizontalIcon className="size-[20px] lg:size-[50px]" />
          <p className="text-[10px] lg:text-xl text-gray-700 underline">
            Separator
          </p>
        </div>
      );

    default:
      null;
      break;
  }
};
const returnReseauxIcon = (icon: string, color: string) => {
  switch (icon) {
    case "FACEBOOK":
      return <FaFacebook className="w-7 h-7" style={{ color: color }} />;
    case "INSTAGRAM":
      return <FaInstagram className="w-7 h-7" style={{ color: color }} />;
    case "X":
      return <BsTwitterX className="w-7 h-7" style={{ color: color }} />;
    case "YOUTUBE":
      return <BsYoutube className="w-7 h-7" style={{ color: color }} />;
    case "TWITCH":
      return <BsTwitch className="w-7 h-7" style={{ color: color }} />;
    case "SPOTIFY":
      return <BsSpotify className="w-7 h-7" style={{ color: color }} />;
    case "DISCORD":
      return <BsDiscord className="w-7 h-7" style={{ color: color }} />;
    case "PATREON":
      return <FaPatreon className="w-7 h-7" style={{ color: color }} />;
    default:
      return null;
  }
};
export { ReturnIconMain, returnReseauxIcon };
