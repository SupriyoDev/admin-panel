import Image from "next/image";
import React from "react";
import { laptopResponseType } from "../../lib/types";
import Link from "next/link";

const LaptopCard = ({ laptop }: { laptop: laptopResponseType }) => {
  return (
    <div className="card bg-base-100 max-w-[300px]  p-1 rounded-lg shadow-lg">
      <div className="flex overflow-hidden justify-center">
        <Image
          src={laptop.featureImage}
          alt={laptop.name}
          width={100}
          height={100}
          className="object-contain w-full h-[250px] rounded-lg"
        />
        {laptop.images.map((image, i) => (
          <Image
            src={image}
            alt={image}
            width={100}
            height={100}
            className="object-cover w-[105px] rounded-lg"
          />
        ))}
        <img src={laptop.featureImage} alt="" width={300} height={300} />
      </div>

      <div className="card-body">
        <h2 className="card-title">
          {laptop.name}:{laptop.modelNo}
        </h2>
        <p>{laptop.description}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-error rounded-md">Delete</button>
          <Link href={`/admin/allLaptop/${laptop.id}`}>
            <button className="btn btn-info rounded-md">Edit</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LaptopCard;
