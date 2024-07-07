import { LinkIcon, SeparatorHorizontalIcon, TextIcon } from "lucide-react";
import React from "react";
import { BsCashCoin, BsSpotify } from "react-icons/bs";
import { FaYoutube } from "react-icons/fa";

export default function ReturnIcon(iconChoosen: string) {
  switch (iconChoosen) {
    case "link":
      return (
        <div>
          <LinkIcon className="w-[50px] h-[50px] my-2" />
        </div>
      );
    case "youtubeEmb":
      return (
        <div className="my-2 p-10 ">
          <FaYoutube className="w-[50px] h-[50px]" />
          <p className="text-gray-700 underline">Youtube embeded video</p>
        </div>
      );
    case "text":
      return (
        <div className="my-2 p-10 ">
          <TextIcon className="w-[50px] h-[50px]" />
          <p className="text-gray-700 underline">Text</p>
        </div>
      );
    case "spotify":
      return (
        <div className="my-2 p-10 ">
          <BsSpotify className="w-[50px] h-[50px]" />
          <p className="text-gray-700 underline">Spotify embeded</p>
        </div>
      );
    case "gofundme":
      return (
        <div className="my-2 p-10 ">
          <BsCashCoin className="w-[50px] h-[50px]" />
          <p className="text-gray-700 underline">Go fund me</p>
        </div>
      );
    case "expandable-text":
      return (
        <div className="my-2 p-10 ">
          <SeparatorHorizontalIcon className="w-[50px] h-[50px]" />
          <p className="text-gray-700 underline">Expandable text</p>
        </div>
      );
    case "separator":
      return (
        <div className="my-2 p-10 ">
          <SeparatorHorizontalIcon className="w-[50px] h-[50px]" />
          <p className="text-gray-700 underline">Separator</p>
        </div>
      );

    default:
      <LinkIcon className="w-[50px] h-[50px]" />;
      break;
  }
  return <div>ReturnIcon</div>;
}
