export {};

declare global {
  interface Liveblocks {
    Presence: {
      // cursor: { x: number, y: number } | null,
      // ...
    };
    Storage: {
      // author: LiveObject<{ firstName: string, lastName: string }>,
      // ...
      leftMargin: number;
      rightMargin: number;
    };

    UserMeta: {
      id: string;
      info: {
        name: string;
        avatar: string;
      };
    };

    RoomEvent: {
      // type: "NOTIFICATION",
      // ...
    };
  }
}
