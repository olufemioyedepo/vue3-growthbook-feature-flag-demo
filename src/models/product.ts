export interface ProductFakeStore {
    id:          number;
    title:       String;
    price:       number;
    description: String;
    category:    String;
    image:       String;
    rating:      Rating;
}

export interface Rating {
    rate:  number;
    count: number;
}