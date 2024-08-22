"use client";

import { useState } from "react";

export default function useToggle(): [
  boolean,
  () => void,
  React.Dispatch<React.SetStateAction<boolean>>,
] {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return [isOpen, toggle, setIsOpen] as const;
}
