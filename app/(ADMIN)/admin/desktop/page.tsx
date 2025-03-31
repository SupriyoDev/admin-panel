"use client";

import UnifiedInput from "@/app/_components/UnifiedInput";
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

  return (
    <div>
      <div className="">
        <h3>Add New Desktop products</h3>

        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(OnSubmit)}
            className="grid grid-cols-2 gap-6 py-4"
          >
            <UnifiedInput
              componentType="input"
              fieldName="name"
              label="Product Name"
            />
            <UnifiedInput
              componentType="input"
              fieldName="brand"
              label="Brand"
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
              options={[{ label: "sd", value: "" }]}
            />
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
