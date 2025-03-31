export const LAPTOP_BRANDS = [
  { label: "ASUS", value: "asus" },
  { label: "Acer", value: "acer" },
  { label: "Apple", value: "apple" },
  { label: "Dell", value: "dell" },
  { label: "HP", value: "hp" },
  { label: "Lenovo", value: "lenovo" },
  { label: "MSI", value: "msi" },
  { label: "Razer", value: "razer" },
  { label: "Samsung", value: "samsung" },
  { label: "LG", value: "lg" },
  { label: "Microsoft", value: "microsoft" },
  { label: "Gigabyte", value: "gigabyte" },
  { label: "Huawei", value: "huawei" },
  { label: "Toshiba", value: "toshiba" },
  { label: "Panasonic", value: "panasonic" },
  { label: "Sony", value: "sony" },
  { label: "VAIO", value: "vaio" },
  { label: "Xiaomi", value: "xiaomi" },
  { label: "Alienware", value: "alienware" },
  { label: "Framework", value: "framework" },
  { label: "Intel", value: "intel" },
  { label: "AMD", value: "amd" },
];

export const RAM_SIZES = [
  { label: "4GB", value: "4gb" },
  { label: "8GB", value: "8gb" },
  { label: "12GB", value: "12gb" },
  { label: "16GB", value: "16gb" },
  { label: "32GB", value: "32gb" },
];

export const ROM_SIZES = [
  { label: "256GB", value: "256gb" },
  { label: "512GB", value: "512gb" },
  { label: "1TB", value: "1tb" },
  { label: "2TB", value: "2tb" },
  { label: "4TB", value: "4tb" },
];

export const ROM_TYPES = [
  { label: "HDD", value: "hdd" },
  { label: "SSD (SATA 2.5)", value: "sata" },
  { label: "NVME SSD", value: "nvme" },
];

export const PROCESSOR_LISTS = [
  { label: "Intel 3rd Gen", value: "intel-3" },
  { label: "Intel 5th Gen", value: "intel-5" },
  { label: "Intel 7th Gen", value: "intel-7" },
  { label: "Intel 8th Gen", value: "intel-8" },
  { label: "Intel 9th Gen", value: "intel-9" },
  { label: "Intel 10th Gen", value: "intel-10" },
  { label: "Intel 11th Gen", value: "intel-11" },
  { label: "Intel 12th Gen", value: "intel-12" },
  { label: "Intel 13th Gen", value: "intel-13" },
  { label: "Intel 14th Gen", value: "intel-14" },
  { label: "Intel 15th Gen", value: "intel-15" },
  { label: "AMD Ryzen 3000 Series", value: "amd-ryzen-3000" },
  { label: "AMD Ryzen 4000 Series", value: "amd-ryzen-4000" },
  { label: "AMD Ryzen 5000 Series", value: "amd-ryzen-5000" },
  { label: "AMD Ryzen 6000 Series", value: "amd-ryzen-6000" },
  { label: "AMD Ryzen 7000 Series", value: "amd-ryzen-7000" },
  { label: "AMD Ryzen 8000 Series", value: "amd-ryzen-8000" },
  { label: "AMD Ryzen 9000 Series", value: "amd-ryzen-9000" },
  { label: "AMD Ryzen AI 300 Series", value: "amd-ryzen-ai-300" },
  { label: "Apple M1", value: "apple-m1" },
  { label: "Apple M2", value: "apple-m2" },
  { label: "Apple M3", value: "apple-m3" },
  { label: "Apple M4", value: "apple-m4" },
  {
    label: "Qualcomm Snapdragon 8cx Gen 2",
    value: "qualcomm-snapdragon-8cx-gen-2",
  },
  {
    label: "Qualcomm Snapdragon 8cx Gen 3",
    value: "qualcomm-snapdragon-8cx-gen-3",
  },
];

export const LAPTOP_USE_TYPE = [
  { label: "Basic", value: "basic" },
  { label: "Multitasking", value: "multitasking" },
  { label: "Gaming", value: "gaming" },
];

export const desktopProductCategory = [
  { label: "Processor", value: "processor" },
  { label: "RAM", value: "ram" },
  { label: "Motherboard", value: "motherboard" },
  { label: "Graphics Card", value: "graphics-card" },
  { label: "Power Supply", value: "power-supply" },
  { label: "Monitor", value: "monitor" },
  { label: "Storage", value: "storage" },
  { label: "Keyboard", value: "keyboard" },
  { label: "Mouse", value: "mouse" },
  { label: "Webcam", value: "webcam" },
  { label: "Headset", value: "headset" },
  { label: "Speaker", value: "speaker" },
  { label: "Cabinet", value: "cabinet" },
  { label: "CPU Cooler", value: "cpu-cooler" },
];

// Category-specific options

export const processorGenTypeOptions = [
  { label: "AMD RYZEN 3", value: "amd-ryzen-3" },
  { label: "AMD RYZEN 5", value: "amd-ryzen-5" },
  { label: "AMD RYZEN 7", value: "amd-ryzen-7" },
  { label: "AMD RYZEN 9", value: "amd-ryzen-9" },
  { label: "AMD RYZEN THREADRIPPER", value: "amd-ryzen-threadripper" },

  { label: "AMD 9000 Series", value: "amd-9000-series" },
  { label: "AMD 8000 Series", value: "amd-8000-series" },
  { label: "AMD 7000 Series", value: "amd-7000-series" },
  { label: "AMD 5000 Series", value: "amd-5000-series" },
  { label: "AMD 4000 Series", value: "amd-4000-series" },
  { label: "AMD 3000 Series", value: "amd-3000-series" },

  { label: "INTEL CORE i3", value: "intel-core-i3" },
  { label: "INTEL CORE i5", value: "intel-core-i5" },
  { label: "INTEL CORE i7", value: "intel-core-i7" },
  { label: "INTEL CORE i9", value: "intel-core-i9" },
  { label: "INTEL CORE ULTRA 5", value: "intel-core-ultra-5" },
  { label: "INTEL CORE ULTRA 7", value: "intel-core-ultra-7" },
  { label: "INTEL CORE ULTRA 9", value: "intel-core-ultra-9" },

  { label: "INTEL 14th Gen", value: "intel-14th-gen" },
  { label: "INTEL 13th Gen", value: "intel-13th-gen" },
  { label: "INTEL 12th Gen", value: "intel-12th-gen" },
  { label: "INTEL 11th Gen", value: "intel-11th-gen" },
  { label: "INTEL 10th Gen", value: "intel-10th-gen" },
];

export const ramTypeOptions = [
  { label: "DDR3", value: "ddr3" },
  { label: "DDR4", value: "ddr4" },
  { label: "DDR5", value: "ddr5" },
];

export const ramByKitOptions = [
  { label: "Single", value: "single" },
  { label: "Dual", value: "dual" },
  { label: "Quad", value: "quad" },
];

export const motherboardchipsetTypeOptions = [
  { label: "Intel", value: "intel" },
  { label: "AMD", value: "amd" },
];

export const motherboardChipsetOptions = [
  { label: "AMD A520", value: "amd-a520" },
  { label: "AMD A620", value: "amd-a620" },
  { label: "AMD B450", value: "amd-b450" },
  { label: "AMD B550", value: "amd-b550" },
  { label: "AMD B650", value: "amd-b650" },
  { label: "AMD X870", value: "amd-x870" },
  { label: "AMD X670", value: "amd-x670" },

  { label: "INTEL B760", value: "intel-b760" },
  { label: "INTEL H610", value: "intel-h610" },
  { label: "INTEL H510", value: "intel-h510" },
  { label: "INTEL H410", value: "intel-h410" },
  { label: "INTEL H310", value: "intel-h310" },
  { label: "INTEL Z790", value: "intel-z790" },
  { label: "INTEL Z890", value: "intel-z890" },
];

export const graphicsCardSeriesOptions = [
  { label: "AMD RX 9000 Series", value: "amd-rx-9000-series" },
  { label: "AMD RX 7900 Series", value: "amd-rx-7900-series" },
  { label: "AMD RX 7800 Series", value: "amd-rx-7800-series" },
  { label: "AMD RX 7700 Series", value: "amd-rx-7700-series" },
  { label: "AMD RX 7600 Series", value: "amd-rx-7600-series" },
  { label: "AMD RX 6900 Series", value: "amd-rx-6900-series" },
  { label: "AMD RX 6800 Series", value: "amd-rx-6800-series" },
  { label: "AMD RX 6700 Series", value: "amd-rx-6700-series" },
  { label: "AMD RX 6600 Series", value: "amd-rx-6600-series" },

  // NVIDIA RTX 50 Series
  { label: "NVIDIA RTX 5090 Series", value: "nvidia-rtx-5090-series" },
  { label: "NVIDIA RTX 5080 Series", value: "nvidia-rtx-5080-series" },
  { label: "NVIDIA RTX 5070 Series", value: "nvidia-rtx-5070-series" },
  { label: "NVIDIA RTX 5060 Series", value: "nvidia-rtx-5060-series" },
  { label: "NVIDIA RTX 5050 Series", value: "nvidia-rtx-5050-series" },

  // NVIDIA RTX 40 Series
  { label: "NVIDIA RTX 4090 Series", value: "nvidia-rtx-4090-series" },
  { label: "NVIDIA RTX 4080 Series", value: "nvidia-rtx-4080-series" },
  { label: "NVIDIA RTX 4070 Series", value: "nvidia-rtx-4070-series" },
  { label: "NVIDIA RTX 4060 Series", value: "nvidia-rtx-4060-series" },
  { label: "NVIDIA RTX 4050 Series", value: "nvidia-rtx-4050-series" },

  // NVIDIA RTX 30 Series
  { label: "NVIDIA RTX 3090 Series", value: "nvidia-rtx-3090-series" },
  { label: "NVIDIA RTX 3080 Series", value: "nvidia-rtx-3080-series" },
  { label: "NVIDIA RTX 3070 Series", value: "nvidia-rtx-3070-series" },
  { label: "NVIDIA RTX 3060 Series", value: "nvidia-rtx-3060-series" },
  { label: "NVIDIA RTX 3050 Series", value: "nvidia-rtx-3050-series" },

  // NVIDIA GTX Series
  { label: "NVIDIA GTX 1660 Series", value: "nvidia-gtx-1660-series" },
  { label: "NVIDIA GTX 1650 Series", value: "nvidia-gtx-1650-series" },
  { label: "NVIDIA GTX 1080 Series", value: "nvidia-gtx-1080-series" },
  { label: "NVIDIA GTX 1070 Series", value: "nvidia-gtx-1070-series" },
  { label: "NVIDIA GTX 1060 Series", value: "nvidia-gtx-1060-series" },
  { label: "NVIDIA GTX 1050 Series", value: "nvidia-gtx-1050-series" },
  { label: "NVIDIA GTX 980 Series", value: "nvidia-gtx-980-series" },
  { label: "NVIDIA GTX 970 Series", value: "nvidia-gtx-970-series" },
  { label: "NVIDIA GTX 960 Series", value: "nvidia-gtx-960-series" },
  { label: "NVIDIA GTX 950 Series", value: "nvidia-gtx-950-series" },
  { label: "NVIDIA GTX 780 Series", value: "nvidia-gtx-780-series" },
  { label: "NVIDIA GTX 770 Series", value: "nvidia-gtx-770-series" },
  { label: "NVIDIA GTX 760 Series", value: "nvidia-gtx-760-series" },
  { label: "NVIDIA GTX 750 Series", value: "nvidia-gtx-750-series" },
  { label: "NVIDIA GTX 680 Series", value: "nvidia-gtx-680-series" },
  { label: "NVIDIA GTX 670 Series", value: "nvidia-gtx-670-series" },
  { label: "NVIDIA GTX 660 Series", value: "nvidia-gtx-660-series" },
  { label: "NVIDIA GTX 650 Series", value: "nvidia-gtx-650-series" },
];

export const smpsCertificationTypeOptions = [
  { label: "80+ Bronze", value: "80-plus-bronze" },
  { label: "80+ Gold", value: "80-plus-gold" },
  { label: "80+ Platinum", value: "80-plus-platinum" },
];

export const monitorTypeOptions = [
  { label: "Gaming Monitor", value: "gaming-monitor" },
  { label: "Professional Monitor", value: "professional-monitor" },
  { label: "4K Monitor", value: "4k-monitor" },
  { label: "2K Monitor", value: "2k-monitor" },
];

export const monitorSizeOptions = [
  { label: "34 Inch", value: "34-inch" },
  { label: "32 Inch", value: "32-inch" },
  { label: "27 Inch", value: "27-inch" },
  { label: "24 Inch", value: "24-inch" },
  { label: "22 Inch", value: "22-inch" },
];

export const storageTypeOptions = [
  { label: "SSD", value: "ssd" },
  { label: "HDD", value: "hdd" },
];

export const storageCategoriesOptions = [
  // HDD Options
  { label: "External Hard Drive", value: "external-hard-drive" },
  { label: "Internal Hard Drive", value: "internal-hard-drive" },
  { label: "Enterprise Hard Drive", value: "enterprise-hard-drive" },

  // SSD Options
  { label: "SATA 2.5 Inch SSD", value: "sata-2-5-inch-ssd" },
  { label: "NVMe Gen3 SSD", value: "nvme-gen3-ssd" },
  { label: "NVMe Gen4 SSD", value: "nvme-gen4-ssd" },
  { label: "NVMe Gen5 SSD", value: "nvme-gen5-ssd" },
  { label: "External SSD", value: "external-ssd" },
];
