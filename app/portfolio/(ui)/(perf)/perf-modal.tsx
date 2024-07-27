"use client";
import useToggle from "@/ui/hooks/useToggle";
import Modal from "@/ui/modal";
import React from "react";

export default function PerfModal() {
  const [isModalOpen, modalToggle] = useToggle();

  return (
    <>
      <button
        data-modal-target="static-modal"
        data-modal-toggle="static-modal"
        onClick={() => modalToggle()}
        className="block rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800
        focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
      >
        Toggle modal
      </button>
      <Modal
        header="Add Coin"
        isOpen={isModalOpen}
        onClose={() => modalToggle()}
      >
        pref-modal
      </Modal>
    </>
  );
}
