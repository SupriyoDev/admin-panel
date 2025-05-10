"use client";

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
import { Input } from "@/components/ui/input";
import { DeleteProductAction, UpdateProductPriceAction } from "@/lib/actions";
import { useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

type product = {
  id: string;
  name: string;
  brand: string;
  price: number;
  inventory: number;
  images: string[];
  category: string;
  productCode: string;
  description: string;
};

const DesktopProductCard = ({ props }: { props: product }) => {
  const [isOpen, setOpen] = useState(false);
  const [isEditOpen, setEditOpen] = useState(false);
  const inputref = useRef<HTMLInputElement>(null);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isdeleting, setdeleting] = useState<boolean>(false);

  const queryclient = useQueryClient();

  return (
    <div className="card relative bg-base-100 max-w-90  shadow-sm rounded-xl overflow-hidden">
      {isdeleting && (
        <div className=" absolute bg-red-500  h-24 w-full flex items-center justify-center">
          <p className="text-2xl font-bold">Remove From DB...</p>
        </div>
      )}
      {isLoading && (
        <div className=" absolute bg-lime-400  h-24 w-full flex items-center justify-center">
          <p className="text-2xl font-bold">Updating Price...</p>
        </div>
      )}
      <figure className="bg-slate-400">
        <img
          src={props.images[0]}
          alt="Shoes"
          className="w-96 h-60 object-contain"
        />
      </figure>
      <div className="card-body text-slate-700 font-medium text-base ">
        <h2 className="line-clamp-1">
          <span className="text-slate-400">Title:</span> {props.name}
        </h2>
        <p className="line-clamp-1 ">
          {" "}
          <span className="text-slate-400">Product Code:</span>{" "}
          {props.productCode}
        </p>
        <p className=" ">
          <span className="text-slate-400">Category:</span> {props.category}
        </p>
        <p className=" ">
          <span className="text-slate-400">Price:</span>{" "}
          {props.price.toFixed(2)}
        </p>

        <div className="card-actions justify-between">
          {/* // delete server action  */}
          <AlertDialog open={isOpen}>
            <AlertDialogTrigger asChild>
              <Button
                onClick={() => setOpen(true)}
                variant={"destructive"}
                className="text-lg hover:opacity-80"
                type="button"
              >
                {" "}
                Delete
              </Button>
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
                    setdeleting(true);
                    setOpen(false);

                    const formdata = new FormData();
                    formdata.append("product_id", props.id);

                    const res = await DeleteProductAction(formdata);
                    if (res.error) {
                      toast.error(res.error);
                      return;
                    } else {
                      toast.success(res.message!);
                      queryclient.invalidateQueries({
                        queryKey: ["desktop_products"],
                      });
                    }
                    setdeleting(false);
                  }}
                >
                  <Button type="submit" className="bg-red-500 hover:bg-red-500">
                    Delete
                  </Button>
                </form>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          {/* //confirm dialog server action  */}
          <AlertDialog open={isEditOpen}>
            <AlertDialogTrigger asChild>
              <Button
                type="button"
                onClick={() => setEditOpen(true)}
                className="text-lg bg-blue-600 text-white hover:opacity-80 hover:bg-blue-600"
              >
                Edit
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Update price data</AlertDialogTitle>
                <AlertDialogDescription>{props.name}</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter className="">
                <form
                  className="flex gap-2 items-start"
                  onSubmit={async (e) => {
                    e.preventDefault();
                    setLoading(true);
                    setEditOpen(false);

                    const formdata = new FormData();

                    if (inputref.current) {
                      formdata.append("price", inputref.current.value);
                      formdata.append("product_id", props.id);
                    }

                    const res = await UpdateProductPriceAction(formdata);
                    if (res.error) {
                      toast.error(res.error);
                      return;
                    } else {
                      toast.success(res.message!);
                      queryclient.invalidateQueries({
                        queryKey: ["desktop_products"],
                      });
                    }
                    setLoading(false);
                  }}
                >
                  <Input
                    ref={inputref}
                    className="border-2 border-amber-300 "
                    type="number"
                    placeholder="Update price"
                  />
                  <Button
                    type="submit"
                    className="bg-amber-500 hover:bg-amber-500"
                  >
                    Update
                  </Button>
                </form>
                <AlertDialogCancel onClick={() => setEditOpen(false)}>
                  Cancel
                </AlertDialogCancel>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  );
};

export default DesktopProductCard;
