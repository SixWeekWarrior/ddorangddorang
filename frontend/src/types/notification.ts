export type ContentInfo = {
  title: string;
  body: string;
};

export type MessageInfo = {
  topic: string;
  notification: ContentInfo;
  data: Record<string, any>;
};

export type NotificationInfo = {
  message: MessageInfo;
};
