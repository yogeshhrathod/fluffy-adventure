import "./inputStyle.scss";

export default function AlphaInput(props) {
  const {
    arrangedAlpha,
    setArrangedAlpha,
    reset,
    value,
    setValue,
    setIsCompleted,
    isCompleted,
    alphaInput,
    setIsFirstEvent,
    isfirstEvent,
  } = props;

  const onPasteHander = (event) => {
    event.preventDefault();
    return;
  };

  const checkInput = (event) => {
    setValue(event.target.value);
    if (isfirstEvent) {
      setIsFirstEvent(false);
      props.handleTimer(Date.now());
    }
    const lastChar = event.target.value.length - 1;
    if (event.target.value) {
      if (
        arrangedAlpha[0][lastChar] ===
        event.target.value[lastChar].toUpperCase()
      ) {
        arrangedAlpha[1][lastChar] = true;
        setArrangedAlpha([...arrangedAlpha]);
      } else {
        arrangedAlpha[1][lastChar] = false;
        setArrangedAlpha([...arrangedAlpha]);
      }

      if (lastChar === 25) {
        const invalid = arrangedAlpha[1].filter((isValid) => !isValid);
        if (!invalid.length) {
          setIsCompleted(true);
          props.handleTimer(Date.now());
        }
      }
    } else {
      reset();
    }
  };

  return (
    <div className="container">
      <input
        ref={alphaInput}
        value={value}
        maxLength="26"
        className="input"
        type="text"
        disabled={isCompleted}
        onChange={(event) => checkInput(event)}
        onPaste={(event) => onPasteHander(event)}
      ></input>
    </div>
  );
}
