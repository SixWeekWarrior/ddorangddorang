export type NoteReq = {
  title: string;
  content: string;
};

export type Note = {
  id: number;
  title: string;
  content: string;
  sender: string;
  isRead: boolean;
  createdAt: string;
  url: string;
};
