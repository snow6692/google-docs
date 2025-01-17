import { FaCaretDown } from "react-icons/fa";

interface IProps {
  position: number;
  isLeft: boolean;
  isDragging: boolean;
  onMouseDown: () => void;
  onDoubleClick: () => void;
}

function Marker({
  isDragging,
  onDoubleClick,
  isLeft,
  onMouseDown,
  position,
}: IProps) {
  return (
    <>
      {/* Marker Container */}
      <div
        className="absolute top-0 w-4 h-full cursor-ew-resize z-[5] group -ml-2"
        style={{ [isLeft ? "left" : "right"]: `${position}px` }}
        onMouseDown={onMouseDown}
        onDoubleClick={onDoubleClick}
      >
        {/* Caret Icons */}
        <FaCaretDown className="absolute left-1/2 top-0 h-4 fill-blue-500 transform -translate-x-1/2 z-20" />

        {/* Debugging Line */}
        <div
          className="absolute left-1/2 top-4 transform -translate-x-1/2 z-10"
          style={{
            height: "100vh", // Test height
            width: "1px",
            backgroundColor: "#3b72f6",
            opacity: isDragging ? 1 : 0,
            transition: "opacity 0.5s ease-in-out",
          }}
        />
      </div>
    </>
  );
}

export default Marker;
