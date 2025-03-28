import { db } from "@/drizzle/db";
import { laptopTable } from "@/drizzle/schema";
import LaptopCard from "./LaptopCard";
import Link from "next/link";

const GetAllLaptop = async () => {
  const res = await db.select().from(laptopTable);
  if (res.length < 1)
    return (
      <div className=" w-full flex justify-center items-center">
        <div className=" flex flex-col items-center ">
          <h2 className="mt-10 text-4xl font-light text-primary mb-6">
            There is no Laptops to show !!!
          </h2>
          <Link href={"/admin"}>
            <button className=" btn btn-primary rounded-lg">
              + Add New Laptop
            </button>
          </Link>
        </div>
      </div>
    );
  return (
    <div className=" w-full">
      <div className=" w-full">
        {res.length > 0 &&
          res.map((laptop) => <LaptopCard laptop={laptop} key={laptop.id} />)}
      </div>
    </div>
  );
};

export default GetAllLaptop;
