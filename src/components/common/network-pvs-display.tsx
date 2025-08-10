"use client";

import React, { useState } from "react";
import {
  Divider,
  Skeleton,
  Spinner,
  Radio,
  RadioGroup,
  cn,
} from "@heroui/react";
import { getMemberAccountNetwork } from "@/actions/member-actions";
import { useQuery } from "@tanstack/react-query";

const NetworkPvsDisplay = ({
  accountId,
  mode,
  onChoiceChange,
}: {
  accountId: string;
  mode: "DISPLAY" | "CHOICE";
  onChoiceChange?: (side: string) => void;
}) => {
  const [selectedSide, setSelectedSide] = useState<string>("");

  const {
    data: network,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["member-account-network", accountId],
    queryFn: () => getMemberAccountNetwork({ accountId }),
    enabled: !!accountId,
  });

  const handleSideChange = (value: string) => {
    setSelectedSide(value);
    if (onChoiceChange) {
      onChoiceChange(value);
    }
  };


  if (isLoading) {
    return (
      <div className="flex flex-col gap-2 border border-gray-700 p-3 rounded-lg">
        <h1 className="text-center">PVs</h1>
        <Divider />
        <div className="flex gap-3 justify-between items-center py-4">
          <div className="flex flex-col gap-2">
            <Skeleton className="w-18 h-2" />
            <Skeleton className="w-32 h-2" />
          </div>
          <div className="flex flex-col gap-2">
            <Skeleton className="w-18 h-2" />
            <Skeleton className="w-32 h-2" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col gap-2 border border-gray-700 p-3 rounded-lg">
        <h1 className="text-center">PVs</h1>
        <Divider />
        <div className="text-center text-red-500 py-4">
          <p className="text-sm">Erreur de chargement</p>
        </div>
      </div>
    );
  }

  if (mode === "CHOICE") {
    return (
      <div className="w-full flex flex-col gap-2 border-0 sm:border sm:border-gray-700 p-0 sm:p-3 rounded-lg">
        <h1 className="text-start text-sm">
          Choix de la position de l&apos;enregistrement
        </h1>
        <Divider />
        {accountId ? (
          <RadioGroup
            value={selectedSide}
            onValueChange={handleSideChange}
            orientation="horizontal"
            classNames={{
              wrapper: "w-full flex justify-between gap-3",
            }}
            isDisabled={!accountId}
          >
            <Radio
              value="left"
              classNames={{
                base: cn(
                  "w-full inline-flex m-0 bg-content2 hover:bg-content1 items-center justify-between",
                  "flex-row-reverse cursor-pointer rounded-lg sm:gap-4 sm:p-4 gap-2 p-2 border-2 border-transparent",
                  "data-[selected=true]:border-green-500"
                ),
              }}
            >
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="sm:text-sm font-mono">
                    {network?.pvs?.left || 0} PVs
                  </span>
                </div>
                <p className="text-[10px] sm:text-xs truncate">
                  Gauche{" "}
                  <small
                    className={`text-xs ${
                      network?.pvs?.stronger === "left"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    (
                    {network?.pvs?.stronger === "left"
                      ? "Pied fort"
                      : "Pied faible"}
                    )
                  </small>
                </p>
              </div>
            </Radio>

            <Divider orientation="vertical" className="mx-2 hidden sm:block" />

            <Radio
              value="right"
              classNames={{
                base: cn(
                  "w-full inline-flex m-0 bg-content2 hover:bg-content1 items-center justify-between",
                  "flex-row-reverse cursor-pointer rounded-lg gap-2 sm:gap-4 sm:p-4 p-2 border-2 border-transparent",
                  "data-[selected=true]:border-green-500"
                ),
              }}
            >
              <div className="flex flex-1 flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-mono">
                    {network?.pvs?.right || 0} PVs
                  </span>
                </div>
                <p className="sm:text-xs text-[10px] truncate">
                  Droite{" "}
                  <small
                    className={`text-xs ${
                      network?.pvs?.stronger === "right"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    (
                    {network?.pvs?.stronger === "right"
                      ? "Pied fort"
                      : "Pied faible"}
                    )
                  </small>
                </p>
              </div>
            </Radio>
          </RadioGroup>
        ) : (
          <p className="text-center font-extralight text-red-300 py-4">
            Veuillez sélectionner un compte parrain!
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 border border-gray-700 p-3 rounded-lg">
      <h1 className="text-center">PVs</h1>
      <Divider />
      <div className="flex justify-between gap-3">
        <div className="py-1.5">
          <h1 className="text-sm font-mono">{network?.pvs?.left}</h1>
          <p className="font-mono">
            Gauche{" "}
            <small
              className={`text-xs ${
                network?.pvs?.stronger === "left"
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              ({network?.pvs?.stronger === "left" ? "Pied fort" : "Pied faible"}
              )
            </small>
          </p>
        </div>
        <Divider orientation="vertical" />
        <div className="py-1.5">
          <h1 className="text-sm font-mono">{network?.pvs?.right}</h1>
          <p className="font-mono">
            Droite{" "}
            <small
              className={`text-xs ${
                network?.pvs?.stronger === "right"
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              (
              {network?.pvs?.stronger === "right" ? "Pied fort" : "Pied faible"}
              )
            </small>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NetworkPvsDisplay;
