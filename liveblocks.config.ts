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
