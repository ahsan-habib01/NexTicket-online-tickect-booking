const Logo = () => {
  return (
    <div className="flex items-center gap-2 select-none">
      {/* Icon */}
      <img src="/route.png" alt="" className="h-7 w-7" />

      {/* Text */}
      <h1 className="text-3xl font-bold text-orange-950 dark:text-white tracking-tight">
        NexTicket
      </h1>
    </div>
  );
};

export default Logo;
