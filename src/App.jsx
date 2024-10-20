import { useState } from "react";
const App = () => {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResponse("");
    // setLoading(true);

    try {
      const res = await fetch("https://nucleito.onrender.com/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ input }),
      });

      const response = await res.json();
      // Make sure we're setting a string value, not an object
      setResponse(response.ans);
    } catch (error) {
      console.error("Error:", error);
      setResponse("Error occurred while fetching response");
    }
  };

  return (
    <>
      <div className="ml-[20vh] rounded-xl rounded-b-none mt-[10vh] p-5 bg-white  w-[80vw]">
        <img
          src="logo192.png"
          alt="nuclieto"
          className="w-[50px] rounded-full"
        ></img>
        <p className="ml-[20vh] " id="response">
          {response}
        </p>
      </div>
      <div className="bg-[#E5CFF7]  kk flex justify-center ml-[20vh] rounded-xl rounded-t-none w-[80vw] ">
        <form className="p-10" id="myForm" onSubmit={handleSubmit}>
          <input
            type="text"
            id="myInput"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="rounded-lg text-center w-[70vw] p-2"
            placeholder="Enter Your Prompt"
          ></input>
          <button
            type="submit"
            className=" m-2 text-2xl pl-2 text-white hover:text-slate-200"
          >
            ➤
          </button>
        </form>
      </div>
    </>
  );
};

export default App;
