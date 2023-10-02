import { Brand } from "./brand.model";

export interface Vehicle {
    plate: string;
    color: string;
    brand: Brand;
}