"use client";

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  laptopDetailsSchema,
  laptopFormSchema,
  LaptopformType,
  laptopImgsSchema,
  laptopResponseType,
} from "../../lib/types";
import {
  LAPTOP_BRANDS,
  LAPTOP_USE_TYPE,
  PROCESSOR_LISTS,
  RAM_SIZES,
  ROM_SIZES,
  ROM_TYPES,
} from "../constants/data";
import axios from "axios";
import UnifiedImgaeinput from "./unifiedImageInput";
import UnifiedInput from "./UnifiedInput";
import { useState } from "react";
import Link from "next/link";

export type LaptopDetails = Omit<LaptopformType, "featureImage" | "images">;
export type LaptopImgs = Pick<LaptopformType, "featureImage" | "images">;

const EditLaptop = ({ laptop }: { laptop: laptopResponseType }) => {
  const [isLoading, setLoading] = useState(false);
  const [isOpen, setOpen] = useState(true);

  const detailMethod = useForm<LaptopDetails>({
    resolver: zodResolver(laptopDetailsSchema),
    defaultValues: {
      ...laptop,
    },
  });
  const imageMethod = useForm<LaptopImgs>({
    resolver: zodResolver(laptopImgsSchema),
  });

  const OnSubmit = async (data: LaptopDetails) => {
    setLoading(true);

    try {
      const res = await axios.put("/api/laptop", data);

      console.log(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const OnImageSubmit = async (data: LaptopImgs) => {
    const formdata = new FormData();
    formdata.append("id", laptop.id);
    formdata.append("featureImage", data.featureImage[0]);
    Array.from(data.images).forEach((image, i) =>
      formdata.append(`images`, image)
    );

    try {
      await axios.post("/api/laptopImg", formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (error) {
    } finally {
    }
  };

  return (
    <div className="h-screen ">
      <FormProvider {...detailMethod}>
        <form onSubmit={detailMethod.handleSubmit(OnSubmit)} className=" ">
          <div className=" flex gap-4 w-full justify-between">
            <h2 className=" bg-slate-700  text-white px-8 py-3 text-lg rounded-lg mb-8">
              Update Laptop Details :
            </h2>
            <Link href={"/admin/allLaptop"}>
              <button className=" btn btn-primary rounded-lg ">Back</button>
            </Link>
          </div>
          <div className=" grid grid-cols-2 gap-8">
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
          </div>

          <button
            disabled={isLoading}
            className="btn btn-warning text-black  text-lg mystyle mt-6 max-w-[200px]  "
          >
            Update Details
          </button>
        </form>
      </FormProvider>

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
            <button className="btn btn-warning text-black  text-lg mystyle mt-6 max-w-[200px]">
              Update Images
            </button>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default EditLaptop;
