export const Spinner = () => {
  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-primary/30 rounded-full animate-pulse-glow" />
        <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-primary rounded-full animate-spin" />
      </div>
    </div>
  );
};
