import { useSortable } from "@dnd-kit/sortable";
import { Input } from "@nextui-org/react";
import { Separator } from "@radix-ui/react-separator";
import { Properties } from "csstype";
import React from "react";
import { CSS } from "@dnd-kit/utilities";
import { Spotify } from "react-spotify-embed";
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
  isHolding,
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
    touchAction: isHolding, // Important for mobile devices
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
            ></iframe>
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
        return <Separator className="my-5 w-full bg-h " />;

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
          <div className="rounded-md shadow-md p-5 mt-5 bg-slate-200">
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
      <>
        <div
          ref={setNodeRef}
          style={style}
          {...attributes}
          {...listenersOnstate}
          className="flex justify-center"
        >
          {returnComponent(witchComponent)}
        </div>
      </>
    );
  }
};
export { SortableItem };
