import { LinkIcon, SeparatorHorizontalIcon, TextIcon } from "lucide-react";
import React from "react";
import { BsCashCoin, BsSpotify } from "react-icons/bs";
import { FaYoutube } from "react-icons/fa";

export default function ReturnIcon(iconChoosen: string) {
  switch (iconChoosen) {
    case "COMPONENT_LINK":
      return (
        <div className="my-2 p-10 ">
          <LinkIcon className="w-[50px] h-[50px] my-2" />
          <p className="text-gray-700 underline">Link</p>
        </div>
      );
    case "COMPONENT_YOUTUBE_EMB":
      return (
        <div className="my-2 p-10 ">
          <FaYoutube className="w-[50px] h-[50px]" />
          <p className="text-gray-700 underline">Youtube embeded video</p>
        </div>
      );
    case "COMPONENT_TEXT":
      return (
        <div className="my-2 p-10 ">
          <TextIcon className="w-[50px] h-[50px]" />
          <p className="text-gray-700 underline">Text</p>
        </div>
      );
    case "COMPONENT_SPOTIFY":
      return (
        <div className="my-2 p-10 ">
          <BsSpotify className="w-[50px] h-[50px]" />
          <p className="text-gray-700 underline">Spotify embeded</p>
        </div>
      );
    case "COMPONENT_GOFUNDME":
      return (
        <div className="my-2 p-10 ">
          <BsCashCoin className="w-[50px] h-[50px]" />
          <p className="text-gray-700 underline">Go fund me</p>
        </div>
      );
    case "COMPONENT_EXPANDABLE_TEXT":
      return (
        <div className="my-2 p-10 ">
          <SeparatorHorizontalIcon className="w-[50px] h-[50px]" />
          <p className="text-gray-700 underline">Expandable text</p>
        </div>
      );
    case "COMPONENT_SEPARATOR":
      return (
        <div className="my-2 p-10 ">
          <SeparatorHorizontalIcon className="w-[50px] h-[50px]" />
          <p className="text-gray-700 underline">Separator</p>
        </div>
      );

    default:
      null;
      break;
  }
}
