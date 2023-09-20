"use client";

import { DndContext } from "@dnd-kit/core";

// import { SessionProvider } from "next-auth/react";

export default function DndKit({ children }) {
  function handleDragEnd(event) {
    if (event.over && event.over.id === "droppable") {
      setIsDropped(true);
    }
  }
  return <DndContext onDragEnd={handleDragEnd}>{children}</DndContext>;
}
