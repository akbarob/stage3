"use client";
import { image } from "@/utils/bluredData";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import ImageList from "@/components/ImageList";
import Loading from "@/components/Loading";
import { DndContext } from "@dnd-kit/core";
import Navbar from "@/components/Navbar";
import update from "immutability-helper";
import toast from "react-hot-toast";

export default function Home() {
  const [user, setUser] = useState({});
  const [images, setImages] = useState(image);
  const [search, setSearch] = useState("");
  const [isDropped, setIsDropped] = useState(false);
  const session = useSession();

  useEffect(() => {
    setUser(session?.data?.user);
  }, [session]);

  useEffect(() => {
    if (search.length >= 1)
      return setImages(
        image.filter((item) => item.tag.includes(search.toLowerCase()))
      );
    else setImages(image);
  }, [search]);

  if (session.status === "loading") return <Loading />;
  else if (session.status === "authenticated" || "unauthenticated")
    return (
      <main className="flex min-h-screen flex-col items-center  p-4 md:p-10 gap-6 lg:gap-10 bg-gradient-to-r from-blue-200 via-rose-200 to-sky-500 ">
        <Navbar setSearch={setSearch} user={user} />
        <DndContext onDragEnd={handleDragEnd} id="hng">
          <ImageList images={images} user={user} />
        </DndContext>
      </main>
    );

  function handleDragEnd(event) {
    const { active, over } = event;
    console.log(user);

    const dragIndex = user && active?.data?.current.index;
    const hoverIndex = user && over?.data?.current.index;
    const draggedImage = images[dragIndex];
    if (user) {
      if (
        over &&
        over?.data?.current?.accepts.includes(active?.data?.current.type)
      ) {
        // do stuff
        setIsDropped(true);
        setImages(
          update(images, {
            $splice: [
              [dragIndex, 1],
              [hoverIndex, 0, draggedImage],
            ],
          })
        );
      }
    }
    if (!user) {
      toast.error("Login in to rearrange photos");
    }
  }
}
