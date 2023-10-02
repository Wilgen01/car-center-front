export interface Response<T> {
    message: string;
    status:  string;
    result?:  T;
}