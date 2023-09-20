import { useDraggable, useDroppable } from "@dnd-kit/core";
import Image from "next/image";
import { useRef } from "react";
import { blured } from "../utils/bluredData";

const ImageMove = ({ image, index, user }) => {
  const ref = useRef();
  const imgblur = blured;
  const type = "Image";

  const { isOver, setNodeRef: drop } = useDroppable({
    id: image.id,
    data: {
      index: index,
      accepts: type,
    },
  });
  const styleDrop = {
    color: isOver ? "green" : undefined,
  };

  const {
    attributes,
    listeners,
    setNodeRef: drag,
    transform,
  } = useDraggable({
    id: image.id,
    data: {
      index: index,
      type: type,
    },
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;
  return (
    <div
      style={styleDrop}
      ref={drop}
      //   style={{ opacity: isD ? 0.5 : 1, cursor: user && "move" }}
      className={`relative w-[100px] h-[100px]  md:w-[150px] md:h-[150px]  lg:w-[300px] lg:h-[300px]   ${
        isOver && "rounded-[20px] border"
      }`}
    >
      <Image
        ref={drag}
        style={style}
        {...listeners}
        {...attributes}
        alt={`img - ${image.id}`}
        src={image.src}
        className={`rounded-xl object-cover  hover:border-4 hover:border-rose-700 `}
        fill
        sizes="75vw"
        placeholder="blur"
        blurDataURL={imgblur}
      />
    </div>
  );
};

export default function ImageList({ images, user }) {
  const renderImage = (images, index) => {
    return images ? (
      <ImageMove
        image={images}
        user={user}
        index={index}
        key={`${images.id}-image`}
      />
    ) : null;
  };

  return (
    <section className="grid grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-5 bg-black/10 p-8 rounded-lg">
      {images.length >= 1 ? (
        images?.map(renderImage)
      ) : (
        <p className="text-rose-700 font-semibold text-2xl text-center">
          No result on TAG searched
        </p>
      )}
    </section>
  );
}
