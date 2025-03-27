"use client";

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { laptopFormSchema, LaptopformType } from "./types";
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

const addnewlaptop = () => {
  const [isLoading, setLoading] = useState(false);
  const [isOpen, setOpen] = useState(true);

  const methods = useForm<LaptopformType>({
    resolver: zodResolver(laptopFormSchema),
  });

  const OnSubmit = async (data: LaptopformType) => {
    setLoading(true);

    const formdata = new FormData();

    formdata.append("name", data.name);
    formdata.append("brand", data.brand);
    formdata.append("desription", data.description);
    formdata.append("modelNo", data.modelNo);
    formdata.append("price", String(data.price));
    formdata.append("inventory", String(data.inventory));
    formdata.append("processor", data.processor);
    formdata.append("ram", data.ram);
    formdata.append("romsize", data.romsize);
    formdata.append("romtype", data.romtype);
    formdata.append("useType", data.useType);
    formdata.append("featureImage", data.featureImage[0]);
    Array.from(data.images).forEach((image, i) =>
      formdata.append(`images`, image)
    );

    try {
      const res = await axios.post("/api/createNewLaptop", formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen ">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(OnSubmit)} className=" ">
          <div className=" grid grid-cols-2 gap-8">
            <UnifiedInput
              componentType="input"
              fieldName="name"
              label="Laptop Name"
            />
            <UnifiedInput
              componentType="input"
              fieldName="modelNo"
              label="ModelNo"
            />
            <UnifiedInput
              componentType="select"
              fieldName="brand"
              label="Brand"
              triggerLabel="Select Laptop Brand"
              options={LAPTOP_BRANDS}
            />
            <UnifiedInput
              componentType="textarea"
              fieldName="description"
              label="Description (Laptop specification)"
            />
            <UnifiedInput
              componentType="input"
              fieldName="price"
              label="Price"
              isNumber={true}
              inputType="number"
            />
            <UnifiedInput
              componentType="input"
              fieldName="inventory"
              label="Inventory (Total no of stocks..)"
              isNumber={true}
              inputType="number"
            />
            <UnifiedInput
              componentType="radio"
              fieldName="ram"
              label="Ram Size"
              options={RAM_SIZES}
            />{" "}
            <UnifiedInput
              componentType="radio"
              fieldName="romtype"
              label="Storage Type"
              options={ROM_TYPES}
            />
            <UnifiedInput
              componentType="radio"
              fieldName="romsize"
              label="Storage Size"
              options={ROM_SIZES}
            />
            <UnifiedInput
              componentType="select"
              fieldName="processor"
              label="Processor"
              triggerLabel="Choose laptop processor"
              options={PROCESSOR_LISTS}
            />
            <UnifiedInput
              componentType="radio"
              fieldName="useType"
              label="Laptop Uses"
              options={LAPTOP_USE_TYPE}
            />
            <UnifiedImgaeinput fieldName="featureImage" label="Feature Image" />
            <UnifiedImgaeinput
              isMultiple={true}
              fieldName="images"
              label="Gallery Images (Max-3)"
            />
          </div>

          <button
            disabled={isLoading}
            className="btn btn-primary mystyle mt-6 "
          >
            submit
          </button>
        </form>
      </FormProvider>
    </div>
  );
};

export default addnewlaptop;
