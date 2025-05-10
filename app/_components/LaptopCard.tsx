"use client";

import Link from "next/link";
import { laptopResponseType } from "../../lib/types";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import toast from "react-hot-toast";
import { deleteLaptopAction } from "@/lib/actions";

const LaptopCard = ({ laptop }: { laptop: laptopResponseType }) => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const [isDeleting, setDeleting] = useState<boolean>(false);

  return (
    <div className="card bg-base-100 max-w-80 w-full  p-1 rounded-lg shadow-lg relative">
      {isDeleting && (
        <div className=" absolute bg-red-500  h-24 w-full flex items-center justify-center">
          <p className="text-2xl font-bold">Remove From DB...</p>
        </div>
      )}

      <div className="flex overflow-hidden justify-center w-full  bg-slate-200">
        <img
          src={laptop.featureImage}
          alt={laptop.name}
          width={100}
          height={100}
          className="object-contain w-full rounded-lg"
        />
      </div>

      <div className="card-body">
        <h2 className=" line-clamp-1 text-lg">
          Title:{"  "}
          {laptop.name}
        </h2>
        <p className="line-clamp-1 text-lg">ModelNo: {laptop.modelNo}</p>
        <p className="line-clamp-1 text-lg">
          Description: {laptop.description}
        </p>
        <p className="line-clamp-1 text-lg">Price: {laptop.price}</p>
        <div className="card-actions justify-end">
          {/* delete actions  */}
          <AlertDialog open={isOpen}>
            <AlertDialogTrigger asChild>
              <button
                onClick={() => setOpen(true)}
                className="btn btn-error rounded-md"
                type="button"
              >
                {" "}
                Delete
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Are you really want to delete?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  this product and remove product data and images from our
                  servers and database.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={() => setOpen(false)}>
                  Cancel
                </AlertDialogCancel>
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    setDeleting(true);
                    setOpen(false);

                    const formdata = new FormData();
                    formdata.append("laptop_id", laptop.id);

                    const res = await deleteLaptopAction(formdata);
                    if (res.error) {
                      toast.error(res.error);
                      return;
                    } else {
                      toast.success(res.message!);
                      setDeleting(false);
                    }
                  }}
                >
                  <Button type="submit" className="bg-red-500 hover:bg-red-500">
                    Delete
                  </Button>
                </form>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <Link href={`/admin/allLaptop/${laptop.id}`}>
            <button className="btn btn-info rounded-md">Edit</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LaptopCard;
