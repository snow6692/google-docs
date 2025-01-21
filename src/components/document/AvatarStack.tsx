import { Separator } from "@/components/ui/separator";
import { useOthers, useSelf } from "@liveblocks/react/suspense";
import Avatar from "./Avatar";

const AvatarStack = () => {
  const users = useOthers();
  const currentUser = useSelf();
  if (users.length === 0) return null;

  return (
    <>
      <div className="flex  items-center">
        {currentUser && (
          <div className=" relative ml-2">
            <Avatar src={currentUser?.info?.avatar} name="You" />
          </div>
        )}
        <div className="flex ">
          {users.map(({ connectionId, info }) => {
            return (
              <Avatar key={connectionId} name={info.name} src={info.avatar} />
            );
          })}
        </div>
      </div>
      <Separator orientation="vertical" />
    </>
  );
};
export default AvatarStack;
