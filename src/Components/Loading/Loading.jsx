const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white dark:bg-gray-900">
      <h1 className="text-3xl font-bold text-[#ff6900] animate-pulse">
        NexTicket
      </h1>
      <div className="animate-spin h-10 w-10 mt-4 rounded-full border-4 border-gray-300 border-t-[#ff6900]"></div>
    </div>
  );
};

export default Loading;
