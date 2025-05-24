export interface Book {
  id: number;
  isbn: string;
  name: string;
  stock: number;
  price: number;
  image: string;
}

export interface BookCart {
    book: Book;
    quantity: number;
}