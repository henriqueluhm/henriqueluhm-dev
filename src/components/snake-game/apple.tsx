"use client";

export function Apple() {
  return (
    <div className="relative flex items-center justify-center w-full h-full">
      <div className="size-2.5 bg-red-500 rounded-full shadow-xl" />
      <div className="absolute top-px w-0.5 h-1 bg-green-600" />
    </div>
  );
}
