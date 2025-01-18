import { ClientSideSuspense } from "@liveblocks/react";
import AvatarStack from "./AvatarStack";

export const Avatars = () => {
  return (
    <ClientSideSuspense fallback={null}>
      <AvatarStack />
    </ClientSideSuspense>
  );
};
export default Avatars;
