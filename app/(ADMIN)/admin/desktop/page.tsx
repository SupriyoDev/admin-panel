"use client";

import UnifiedInput from "@/app/_components/UnifiedInput";
import { Input } from "@/components/ui/input";

import {
  amdMotherboardChipsetOptions,
  DESKTOP_PRODUCT_BRANDS,
  desktopProductCategory,
  gpuOptions,
  hddCategoriesOptions,
  intelMotherboardChipsetOptions,
  monitorSizeOptions,
  monitorTypeOptions,
  motherboardchipsetTypeOptions,
  processorGenTypeOptions,
  ramByKitOptions,
  ramTypeOptions,
  ssdCategoriesOptions,
  storageTypeOptions,
} from "@/constants/data";
import { desktopProductFormSchema, desktopProductType } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Loader, X } from "lucide-react";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";

const AllowedTypes = ["image/jpg", "image/jpeg", "image/png"];
const MAX_SIZE = 2 * 1024 * 1024;

const DesktopPage = () => {
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrl] = useState<string[]>([]);
  const [imageUploaded, setImageUploaded] = useState<number>(0);
  const [isLoading, setloading] = useState(false);

  const methods = useForm<desktopProductType>({
    resolver: zodResolver(desktopProductFormSchema),
  });

  const { reset, watch } = methods;
  const OnSubmit = async (data: desktopProductType) => {
    setloading(true);
    try {
      const res = await axios.post("/api/desktop_product", {
        ...data,
        images: imageUrls,
      });
      reset();

      if (imageUrls.length > 0) {
        localStorage.removeItem("images");
        setImageUrls([]);
        setPreviewUrl([]);
        setImageFiles([]);
      }

      toast.success(res.data.message);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setloading(false);
    }
  };

  //Handle Image submit
  const handleImageSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setloading(true);

    const files = imageFiles;

    const formdata = new FormData();
    files.forEach((file) => formdata.append("product-images", file));

    try {
      const res = await axios.post(
        "/api/desktop_product/image-upload",
        formdata,
        {
          onUploadProgress(progressEvent) {
            const { loaded, total } = progressEvent;
            const uploaded = (loaded * 100) / (total ?? 1);
            setImageUploaded(uploaded);
          },
        }
      );

      localStorage.setItem("images", JSON.stringify(res.data.imageUrls));
      setImageUrls(res.data.imageUrls);
      toast.success(res.data.message);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setloading(false);
    }
  };

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    const blankSpace = 3 - imageFiles.length;
    const chooseFiles = files.slice(0, blankSpace);

    if (chooseFiles.length < 1) return;

    chooseFiles.forEach((file) => {
      //type check
      if (!AllowedTypes.includes(file.type)) {
        return;
      }
      //size check
      if (file.size > MAX_SIZE) {
        return;
      }

      // set the file
      setImageFiles((prev) => [...prev, file]);

      //set preview Url
      const tempUrl = URL.createObjectURL(file);
      setPreviewUrl((prev) => [...prev, tempUrl]);
    });
  };

  useEffect(() => {
    const files = localStorage.getItem("images");
    const images: string[] = JSON.parse(files as any);
    if (images) {
      setImageUrls(images);
      setPreviewUrl(images);
    }
    return;
  }, []);

  const category = watch("category");
  const motherboardchipType = watch("motherboardChipsetType");
  const storageTyp = watch("storageType");

  return (
    <div>
      <div className="">
        <h3 className="text-white text-xl font-semibold bg-[#008add] px-6 py-2 rounded-md ">
          Add New Desktop products :{"   "}
          <span className="text-xl font-light">
            First upload the images. Then fill the details
          </span>
        </h3>

        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(OnSubmit)} className="">
            <div className="grid grid-cols-2 gap-6 py-4">
              <UnifiedInput
                componentType="input"
                fieldName="name"
                label="Product Name"
              />
              <UnifiedInput
                componentType="select"
                fieldName="brand"
                label="Brand"
                options={DESKTOP_PRODUCT_BRANDS}
                triggerLabel="Choose Brand"
              />{" "}
              <UnifiedInput
                componentType="input"
                isNumber={true}
                inputType="number"
                fieldName="mrp"
                label="MRP"
              />{" "}
              <UnifiedInput
                componentType="input"
                isNumber={true}
                inputType="number"
                fieldName="price"
                label="Price"
              />{" "}
              <UnifiedInput
                componentType="input"
                fieldName="inventory"
                label="Inventory (Total stocks in number)"
                isNumber={true}
                inputType="number"
              />{" "}
              <UnifiedInput
                componentType="input"
                fieldName="productCode"
                label="Product Code (Model no.)"
              />{" "}
              <UnifiedInput
                componentType="input"
                fieldName="description"
                label="Product Specification"
              />
              <UnifiedInput
                componentType="select"
                fieldName="category"
                label="Product Category"
                options={desktopProductCategory}
                triggerLabel="Choose Category"
              />
              {category && (
                <div className="pt-6">
                  <section className=" mb-4">
                    <p className="text-lg text-white rounded-lg px-6 py-2 font-bold bg-slate-600">
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </p>
                  </section>
                  <section>
                    {category === "processor" && (
                      <>
                        <UnifiedInput
                          componentType="select"
                          label="Processor Gen"
                          fieldName="processorGenType"
                          triggerLabel="Choose processor Gen/series"
                          options={processorGenTypeOptions}
                        />
                      </>
                    )}

                    {category === "motherboard" && (
                      <div className="flex flex-col gap-4">
                        <UnifiedInput
                          componentType="select"
                          options={motherboardchipsetTypeOptions}
                          fieldName="motherboardChipsetType"
                          label="Chipset Type"
                          triggerLabel="choose motherboard chipset type"
                        />
                        {motherboardchipType && (
                          <UnifiedInput
                            componentType="select"
                            options={
                              motherboardchipType === "intel"
                                ? intelMotherboardChipsetOptions
                                : amdMotherboardChipsetOptions
                            }
                            fieldName="motherboardChipset"
                            label="Chipset"
                            triggerLabel="choose motherboard chipset"
                          />
                        )}
                      </div>
                    )}

                    {category === "graphics-card" && (
                      <>
                        <UnifiedInput
                          componentType="select"
                          options={gpuOptions}
                          fieldName="graphicsCardSeries"
                          label="Graphics Card Series"
                          triggerLabel="Choose graphics card series"
                        />
                      </>
                    )}

                    {category === "ram" && (
                      <>
                        <UnifiedInput
                          componentType="select"
                          options={ramByKitOptions}
                          fieldName="ramByKit"
                          label="Ram Kit Options"
                          triggerLabel="Choose ram kit options"
                        />
                        <UnifiedInput
                          componentType="select"
                          options={ramTypeOptions}
                          fieldName="ramType"
                          label="Ram Type"
                          triggerLabel="Choose Ram type"
                        />
                      </>
                    )}
                    {category === "storage" && (
                      <div className="flex flex-col gap-4">
                        <UnifiedInput
                          componentType="select"
                          options={storageTypeOptions}
                          fieldName="storageType"
                          label="Storage Type"
                          triggerLabel="Choose storage type"
                        />
                        {storageTyp && (
                          <UnifiedInput
                            componentType="select"
                            options={
                              storageTyp === "ssd"
                                ? ssdCategoriesOptions
                                : hddCategoriesOptions
                            }
                            fieldName="storageSubType"
                            label="Storage details"
                            triggerLabel="Choose storage details "
                          />
                        )}
                      </div>
                    )}

                    {category === "monitor" && (
                      <div className="flex flex-col gap-4">
                        <UnifiedInput
                          componentType="select"
                          options={monitorTypeOptions}
                          fieldName="monitorType"
                          label="Monitor Type"
                          triggerLabel="Choose monitor type"
                        />
                        <UnifiedInput
                          componentType="select"
                          options={monitorSizeOptions}
                          fieldName="monitorSize"
                          label="Monitor Size"
                          triggerLabel="Choose monitor size"
                        />
                      </div>
                    )}
                  </section>
                </div>
              )}
            </div>

            <button
              type="submit"
              hidden={!category || imageUrls.length === 0}
              disabled={!category || isLoading}
              className=" btn btn-primary w-[500px] rounded-lg my-8 "
            >
              {isLoading ? (
                <span className="inline-flex gap-2 items-center">
                  <Loader className="w-5 h-5 animate-spin" /> Submitting{" "}
                </span>
              ) : (
                "Submit"
              )}
            </button>
          </form>
        </FormProvider>

        <div>
          <form onSubmit={handleImageSubmit} className=" flex flex-col gap-3">
            <label htmlFor="images" className="label">
              Product Images : (First upload the image then fill the product
              details) <span className="text-red-500 text-2xl">*</span>
            </label>
            <div className="bg-[#008add] w-[500px] py-3 px-3 rounded-lg ">
              <Input
                disabled={imageFiles.length > 2}
                id="images"
                type="file"
                onChange={handleImageChange}
                className="bg-[#008add]   text-white border-2 border-dashed h-11 "
                placeholder=""
                accept="image/jpg, image/png, image/jpeg, image/webp"
              />
            </div>

            {/* preview section  */}
            <div className=" max-w-[600px] grid grid-cols-3 gap-3">
              {previewUrls.map((url, index) => (
                <div
                  key={index}
                  className="relative col-span-1 bg-slate-300  rounded-lg flex items-center justify-center"
                >
                  <img
                    src={url}
                    alt=""
                    height={100}
                    width={100}
                    className="object-contain w-full h-[200px] "
                  />
                  <button
                    type="button"
                    className="btn btn-error rounded-sm btn-sm  absolute top-0 right-0"
                    onClick={() => {
                      const url = previewUrls[index];
                      // delete from files
                      setImageFiles((files) =>
                        files.filter((file, i) => i !== index)
                      );
                      setPreviewUrl((urls) =>
                        urls.filter((_, i) => i !== index)
                      );

                      //delete from previewUrls
                      URL.revokeObjectURL(url);
                    }}
                  >
                    <X />
                  </button>
                  {/* loading state icons */}
                </div>
              ))}
            </div>

            <button
              disabled={isLoading || imageFiles.length === 0}
              type="submit"
              className="btn btn-info btn-wide rounded-md text-xl relative overflow-hidden  "
            >
              {isLoading && (
                <div
                  className="absolute max-w-full  h-full bg-primary  "
                  style={{ width: `${imageUploaded}%` }}
                ></div>
              )}
              <span className="z-10 text-white">
                {isLoading
                  ? `Uploading ${imageUploaded.toFixed(1)}%`
                  : "Upload Images"}
              </span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DesktopPage;
export const dynamic = "force-dynamic";

//  "processor",
//   "ram",
//   "motherboard",
//   "graphics-card",
//   "power-supply",
//   "cabinet",
//   "storage",
//   "monitor",
//   "keyboard",
//   "mouse",
//   "webcam",
//   "headset",
//   "speaker",

//  name: varchar().notNull(),
//   brand: varchar().notNull(),
//   price: doublePrecision().notNull(),
//   inventory: integer().notNull(),
//   images: varchar().array().notNull(),
//   category: varchar().notNull().$type<typeof categoryEnum>(),
//   productCode: varchar().notNull(),
//   description: text().notNull(),
//   processorGenType: varchar(),
//   motherboardChipset: varchar(),
//   motherboardChipsetType: varchar(),
//   graphicsCardSeries: varchar(),
//   ramType: varchar(),
//   ramByKit: varchar(),
//   storageType: varchar(),
//   storageSubType: varchar(),
//   smpsCertificationType: varchar(),
//   monitorType: varchar(),
//   monitorSize: varchar(),
//   monitorRefreshRate: varchar(),
//   monitorResolution: varchar(),
// })
