"use client";

import { Input } from "@/components/ui/input";
import {
  updateLaptopDescriptionAction,
  updateLaptopInventoryAction,
  updateLaptopMrpAction,
  updateLaptopPriceAction,
} from "@/lib/actions";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import Link from "next/link";
import { FormEvent, useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import toast, { ToastType } from "react-hot-toast";
import {
  LaptopformType,
  laptopImgsSchema,
  laptopResponseType,
} from "../../lib/types";
import UnifiedImgaeinput from "./unifiedImageInput";
import { LaptopDataUpdateHandler } from "@/lib/utils";

export type LaptopDetails = Omit<LaptopformType, "featureImage" | "images">;
export type LaptopImgs = Pick<LaptopformType, "featureImage" | "images">;

const EditLaptop = ({ laptop }: { laptop: laptopResponseType }) => {
  const [isLoading, setLoading] = useState(false);
  const [isLoading1, setLoading1] = useState(false);
  const [isLoading2, setLoading2] = useState(false);
  const [isLoading3, setLoading3] = useState(false);
  const [isOpen, setOpen] = useState(true);
  const inputref = useRef<HTMLInputElement>(null);
  const mrpRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const inventoryRef = useRef<HTMLInputElement>(null);

  // const detailMethod = useForm<LaptopDetails>({
  //   resolver: zodResolver(laptopDetailsSchema),
  //   defaultValues: {
  //     ...laptop,
  //   },
  // });
  const imageMethod = useForm<{
    featureImage: File[] | FileList;
    images: File[] | FileList;
  }>({
    resolver: zodResolver(laptopImgsSchema),
  });

  // laptop price update
  const HandleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    setLoading(true);

    try {
      e.preventDefault();
      const formdata = new FormData();
      if (inputref.current) {
        formdata.append("laptop_id", laptop.id);
        formdata.append("laptop_price", inputref.current.value);
      }

      const res = await updateLaptopPriceAction(formdata);

      if (res.error) {
        toast.error(res.error);
      } else {
        toast.success(res.message!);
      }
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  // image update

  const OnImageSubmit = async ({
    featureImage,
    images,
  }: {
    featureImage: FileList | File[];
    images: FileList | File[];
  }) => {
    const formdata = new FormData();
    formdata.append("id", laptop.id);
    formdata.append("featureImage", featureImage[0]);
    (Array.from(images) as File[]).forEach((image) => {
      formdata.append(`images`, image as File);
    });

    try {
      await axios.post("/api/laptopImg", formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Images updated successfully!");
    } catch (error) {
      toast.error("Failed to update images");
    }
  };

  return (
    <div className="h-screen ">
      {/* <FormProvider {...detailMethod}> */}
      <div className=" flex gap-4 w-full justify-between">
        <h2 className=" bg-slate-700  text-white px-8 py-3 text-lg rounded-lg mb-8">
          Update Laptop Details :
        </h2>
        <Link href={"/admin/allLaptop"}>
          <button className=" btn bg-[#008add] rounded-lg text-white ">
            Back
          </button>
        </Link>
      </div>
      <form onSubmit={HandleSubmit} className=" ">
        {/* <div className=" grid grid-cols-2 gap-8">
            <UnifiedInput
              componentType="input"
              fieldName="name"
              label="Laptop Name"
              setValue={laptop.name}
            />
            <UnifiedInput
              componentType="input"
              fieldName="modelNo"
              label="ModelNo"
              setValue={laptop.modelNo}
            />
            <UnifiedInput
              componentType="select"
              fieldName="brand"
              label="Brand"
              triggerLabel="Select Laptop Brand"
              options={LAPTOP_BRANDS}
              setValue={laptop.brand}
            />
            <UnifiedInput
              componentType="textarea"
              fieldName="description"
              label="Description (Laptop specification)"
              setValue={laptop.description}
            />
            <UnifiedInput
              componentType="input"
              fieldName="price"
              label="Price"
              isNumber={true}
              inputType="number"
              setValue={String(laptop.price)}
            />
            <UnifiedInput
              componentType="input"
              fieldName="inventory"
              label="Inventory (Total no of stocks..)"
              isNumber={true}
              inputType="number"
              setValue={String(laptop.inventory)}
            />
            <UnifiedInput
              componentType="radio"
              fieldName="ram"
              label="Ram Size"
              options={RAM_SIZES}
              setValue={laptop.ram}
            />{" "}
            <UnifiedInput
              componentType="radio"
              fieldName="romtype"
              label="Storage Type"
              options={ROM_TYPES}
              setValue={laptop.romtype}
            />
            <UnifiedInput
              componentType="radio"
              fieldName="romsize"
              label="Storage Size"
              options={ROM_SIZES}
              setValue={laptop.romsize}
            />
            <UnifiedInput
              componentType="select"
              fieldName="processor"
              label="Processor"
              triggerLabel="Choose laptop processor"
              options={PROCESSOR_LISTS}
              setValue={laptop.processor}
            />
            <UnifiedInput
              componentType="radio"
              fieldName="useType"
              label="Laptop Uses"
              options={LAPTOP_USE_TYPE}
              setValue={laptop.useType}
            />
          </div> */}

        <Input
          className=" border-2 border-[#008add]"
          ref={inputref}
          step="any"
          type="number"
          required
          placeholder="Update Laptop Price"
        />

        <button
          type="submit"
          disabled={isLoading}
          className="btn bg-[#008add] text-white  text-lg mystyle mt-6 max-w-[200px]  "
        >
          {isLoading ? "Updating price..." : "Update Price"}
        </button>
      </form>
      {/* </FormProvider> */}

      {/* update laptop mrp  */}

      <div className=" mt-10">
        <form
          onSubmit={LaptopDataUpdateHandler(
            laptop.id,
            "laptop_mrp",
            mrpRef,
            setLoading1,
            updateLaptopMrpAction
          )}
        >
          <Input
            className=" border-2 border-[#008add]  "
            ref={mrpRef}
            step="any"
            type="number"
            required
            placeholder="Update Maximum Retail price"
          />

          <button
            type="submit"
            disabled={isLoading1}
            className="btn bg-[#008add] text-white  text-lg mystyle mt-6 max-w-[200px]  "
          >
            {isLoading1 ? "Updating MRP..." : "Update MRP"}
          </button>
        </form>
      </div>

      {/* update laptop description  */}
      <div className=" mt-10">
        <form
          className=" flex flex-col"
          onSubmit={LaptopDataUpdateHandler(
            laptop.id,
            "laptop_description",
            descriptionRef,
            setLoading2,
            updateLaptopDescriptionAction
          )}
        >
          <textarea
            className=" border-2 border-[#008add] rounded-xl overflow-hidden py-2 px-4 "
            required
            ref={descriptionRef}
            rows={5}
            placeholder="Update Laptop Description"
          />

          <button
            type="submit"
            disabled={isLoading2}
            className="btn bg-[#008add] text-white  text-lg mystyle mt-6 max-w-[200px]  "
          >
            {isLoading2 ? "Updating Description..." : "Update Description"}
          </button>
        </form>
      </div>
      {/* update laptop Inventory  */}
      <div className=" mt-10">
        <form
          className=" flex flex-col"
          onSubmit={LaptopDataUpdateHandler(
            laptop.id,
            "laptop_inventory",
            inventoryRef,
            setLoading3,
            updateLaptopInventoryAction
          )}
        >
          <Input
            className=" border-2 border-[#008add]  "
            ref={inventoryRef}
            step="any"
            type="number"
            required
            placeholder="Update Inventory"
          />

          <button
            type="submit"
            disabled={isLoading3}
            className="btn bg-[#008add] text-white  text-lg mystyle mt-6 max-w-[200px]  "
          >
            {isLoading3 ? "Updating Inventory..." : "Update stocks"}
          </button>
        </form>
      </div>

      {/* update laptop images  */}

      <div className="mt-20 py-10">
        <h3 className="bg-slate-700 text-white px-8 py-3 text-lg rounded-lg mb-8">
          Update Laptop images :
        </h3>
        <FormProvider {...imageMethod}>
          <form onSubmit={imageMethod.handleSubmit(OnImageSubmit)}>
            <UnifiedImgaeinput
              fieldName="featureImage"
              label="Feature Image"
              setUrl={[laptop.featureImage]}
            />
            <UnifiedImgaeinput
              isMultiple={true}
              fieldName="images"
              label="Gallery Images (Max-3)"
              setUrl={laptop.images}
            />
            <button
              type="submit"
              className="btn bg-[#008add] text-white  text-lg mystyle mt-6 max-w-[200px]"
            >
              Update Images
            </button>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default EditLaptop;
