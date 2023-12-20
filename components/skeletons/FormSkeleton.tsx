const FormSkeleton = () => {
  return (
    <div className="w-full flex items-start gap-3 p-3.5">
      <div className="rounded-full h-10 w-10 skeleton"></div>
      <div className="flex-1">
        <div className="w-full h-14 rounded-md skeleton"></div>
        <div className="w-full h-4 rounded-md skeleton my-2"></div>
      </div>
    </div>
  );
};

export default FormSkeleton;
