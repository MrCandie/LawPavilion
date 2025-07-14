import { ImSpinner10 } from "react-icons/im";

export default function Spinner() {
  return (
    <div className="h-screen flex flex-col gap-2 items-center justify-center w-full">
      <ImSpinner10 className="animate-spin text-[20px]" />
    </div>
  );
}
