import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { URL } from "url";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  var url: any;
  if (req.url !== undefined && req.url !== null) {
    url = new URL(req.url);
    console.log(url.pathname);
  }
  const extractEnpoint = url.pathname;
  const token = extractEnpoint.substring(5);
  var result: string = ".";
  switch (token) {
    case "a":
      result = "profil a";
      break;
    case "b":
      result = "profil b";
      break;
    case "c":
      result = "profil c";
      break;
    case "d":
      result = "profil d";
      break;
    case "e":
      result = "profil e";
      break;
  }
  return NextResponse.json({ reponse: "great ", token: result });
}
