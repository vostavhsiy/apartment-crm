"use client";

import { copyToClipboard } from "@/shared/lib/utils";
import { Copy } from "lucide-react";

import { FC } from "react";

interface Props {
  copyText: string;
}

export const CopyButton: FC<Props> = ({ copyText }) => {
  const handleClick = () => {
    copyToClipboard(copyText);
  };

  return (
    <button className='cursor-pointer' onClick={handleClick}>
      <Copy size={14} />
    </button>
  );
};
