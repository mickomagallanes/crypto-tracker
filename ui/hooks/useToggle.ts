"use client";

import { useState } from "react";

export default function useToggle(): [boolean, () => void] {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return [isOpen, toggle] as const;
}
