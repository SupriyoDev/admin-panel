"use client";

import UnifiedInput from "@/app/_components/UnifiedInput";
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
} from "@/app/constants/data";
import { desktopProductFormSchema, desktopProductType } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";

const DesktopPage = () => {
  const methods = useForm<desktopProductType>({
    resolver: zodResolver(desktopProductFormSchema),
  });

  const OnSubmit = async (data: desktopProductType) => {
    console.log(data);
    // const formdata = new FormData();
  };

  const { reset, watch, getValues } = methods;

  const category = watch("category");
  const motherboardchipType = watch("motherboardChipsetType");
  const storageTyp = watch("storageType");

  return (
    <div>
      <div className="">
        <h3>Add New Desktop products</h3>

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
                fieldName="price"
                label="Price"
              />{" "}
              <UnifiedInput
                componentType="input"
                fieldName="inventory"
                label="Inventory"
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
              hidden={!category}
              disabled={!category}
              className=" btn btn-primary w-[500px] rounded-lg my-8 "
            >
              Submit
            </button>
          </form>
        </FormProvider>

        <div></div>
      </div>
    </div>
  );
};

export default DesktopPage;

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
