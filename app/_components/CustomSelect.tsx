"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  desktopProductCategory,
  DESKTOP_PRODUCT_BRANDS,
} from "@/constants/data";
import { RotateCcw } from "lucide-react";

interface Props {
  filterOptions: React.Dispatch<
    React.SetStateAction<{
      category: string;
      brand: string;
    }>
  >;
}

const CustomSelect = ({ filterOptions }: Props) => {
  return (
    <div className=" flex gap-8">
      <div>
        <Select
          onValueChange={(categ) =>
            filterOptions((prev) => ({ ...prev, category: categ }))
          }
        >
          <SelectTrigger className="w-[180px] bg-slate-900 text-white  ">
            <SelectValue placeholder={"Select category"} className="" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Desktop Product Category</SelectLabel>
              {desktopProductCategory.map((product, i) => (
                <SelectItem value={product.value} key={i}>
                  {product.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Select
          onValueChange={(brand) =>
            filterOptions((prev) => ({ ...prev, brand }))
          }
        >
          <SelectTrigger className="w-[180px] bg-slate-900 text-white  ">
            <SelectValue placeholder={"Select Brand"} className="" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Desktop Product Category</SelectLabel>
              {DESKTOP_PRODUCT_BRANDS.map((product, i) => (
                <SelectItem key={i} value={product.value}>
                  {product.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Button onClick={() => filterOptions({ category: "", brand: "" })}>
          Reset <RotateCcw className="rotate-12" />
        </Button>
      </div>
    </div>
  );
};

export default CustomSelect;
