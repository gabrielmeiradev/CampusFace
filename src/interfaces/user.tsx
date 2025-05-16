export interface ICardInUser {
  id: string;
  title: string;
}

export interface IUser {
  id: string;
  name: string;
  cards: ICardInUser[];
}
