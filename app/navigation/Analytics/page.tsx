"use client";
import { Separator } from "@/components/ui/separator";
import { Button } from "@nextui-org/button";
import { BarChart4, HomeIcon, Link2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { Line } from "react-chartjs-2";

export default function Analytics() {
  const options = {
    maintainAspectRatio: false, // Permet de désactiver le ratio d'aspect fixe
  };
  const router = useRouter();
  return (
    <>
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
      </div>
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
