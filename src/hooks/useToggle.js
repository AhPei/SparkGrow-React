const useToggle = (initialState = false) => {
  // Initialize the state
  const [state, setState] = useState(initialState);

  // Define and memorize toggler function in case we pass down the component,
  // This function change the boolean value to it's opposite value
  // const toggle = () => setState(!state);
  const toggle = useCallback(() => setState((state) => !state), []);

  return [state, toggle];
};

// Usage
// function App() {
//     // Call the hook which returns, current value and the toggler function
//     const [isTextChanged, setIsTextChanged] = useToggle();

//     return (
//         <button onClick={setIsTextChanged}>{isTextChanged ? 'Toggled' : 'Click to Toggle'}</button>
//     );
// }
