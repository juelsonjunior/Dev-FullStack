function MessageError({ text }) {
  return (
    <>
      <div className="bg-slate-900 px-4  py-2 fixed top-0 left-1/2 transform -translate-x-1/2 rounded-md">
        <span className="text-sm text-blue-500">{text}</span>
      </div>
    </>
  );
}

export default MessageError;
