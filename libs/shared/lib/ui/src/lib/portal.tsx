"use client";

import { createPortal } from "react-dom";

import { FC, ReactNode, useEffect } from "react";

interface Props {
  children: ReactNode;
  getHTMLElementId: string;
}

export const Portal: FC<Props> = ({ children, getHTMLElementId }) => {
  const mount = document.getElementById(getHTMLElementId);

  const el = document.createElement("div");

  useEffect(() => {
    if (mount) mount.appendChild(el);
    return () => {
      if (mount) mount.removeChild(el);
    };
  }, [el, mount]);

  if (!mount) return null;

  return createPortal(children, el);
};
