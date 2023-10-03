import { Brand } from "./brand.model";

export interface Vehicle {
    plate: string;
    color: string;
    brand_id?: number;
    brand: Brand
}