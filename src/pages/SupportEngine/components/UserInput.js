import { useRef, useState } from "react";
import SendIcon from "./icons/SendIcon";

function UserInput({ onSubmit, disabled }) {
  const [inputActive, setInputActive] = useState(false);
  const [inputHasText, setInputHasText] = useState(false);
  const userInput = useRef(null);

  const submitText = (event) => {
    event.preventDefault();
    const text = userInput.current.value;
    if (text && text.length > 0) {
      onSubmit(text);
      userInput.current.value = "";
    }
  };

  const handleKeyDown = (event) => {
    if (event.keyCode === 13 && !event.shiftKey) {
      return submitText(event);
    }
  };

  const handleKeyUp = () => {
    const target = userInput.current.value;
    const inputHasText = target.length !== 0 && target !== "\n";
    setInputHasText(inputHasText);
  };

  return (
    <form
      className={`sc-user-input ${inputActive && "active"} ${
        disabled && "disabled"
      }`}
    >
      <input
        ref={userInput}
        onFocus={() => setInputActive(true)}
        onBlur={() => setInputActive(false)}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
        placeholder="Write a reply..."
        className="sc-user-input--text"
        disabled={disabled}
      />
      <div className="sc-user-input--buttons">
        {inputHasText && (
          <div className="sc-user-input--button ">
            <SendIcon onClick={submitText} />
          </div>
        )}
      </div>
    </form>
  );
}

export default UserInput;

// UserInput.propTypes = {
//   onSubmit: PropTypes.func.isRequired,
//   onFilesSelected: PropTypes.func.isRequired,
//   showEmoji: PropTypes.bool,
// };


// import PropTypes from "prop-types";
// import { useRef, useState } from "react";
// import SendIcon from "./icons/SendIcon";
// import FileIcon from "./icons/FileIcon";

// function UserInput({ onSubmit }) {
//   const [inputActive, setInputActive] = useState(false);
//   const [inputHasText, setInputHasText] = useState(false);
//   const [userInput, setUserInput] = useState("");
//   // const userInput = useRef("");

//   const submitText = (e) => {
//     e.preventDefault();
//     const text = userInput;
//     if (text && text.length > 0) {
//       onSubmit({
//         author: "me",
//         type: "text",
//         data: { text },
//       });
//       setUserInput("");
//     }
//   };

//   const handleKeyUp = (e) => {
//     const target = e.target.innerHTML;
//     const inputHasText = target.length !== 0 && target !== "\n";
//     setInputHasText(inputHasText);
//   };

//   console.log(inputHasText);

//   return (
//     <form
//       className={`sc-user-input ${inputActive ? "active" : ""}`}
//       onSubmit={submitText}
//     >
//       <input
//         value={userInput}
//         onChange={(e) => setUserInput(e.target.value)}
//         onFocus={() => setInputActive(true)}
//         onBlur={() => setInputActive(false)}
//         onKeyUp={handleKeyUp}
//         placeholder="Write a reply..."
//         className="sc-user-input--text"
//       />
//       <div className="sc-user-input--buttons">
//         <div className="sc-user-input--button"></div>
//         <div className="sc-user-input--button"></div>
//         {inputHasText && (
//           <div className="sc-user-input--button">
//             <SendIcon onClick={submitText} />
//           </div>
//         )}
//       </div>
//     </form>
//   );
// }

// UserInput.propTypes = {
//   onSubmit: PropTypes.func.isRequired,
//   onFilesSelected: PropTypes.func.isRequired,
//   showEmoji: PropTypes.bool,
// };

// export default UserInput;
