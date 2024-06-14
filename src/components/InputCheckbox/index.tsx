import cx from "classnames"
import { useRef } from "react"
import { InputCheckboxComponent } from "./types"

export const InputCheckbox: InputCheckboxComponent = 
({ id, checked = false, disabled, onChange }) => {
  const { current: inputId } = useRef(`RampInputCheckbox-${id}`)

  // console.log("Checked:", checked)
  return (
    <div className="RampInputCheckbox--container" data-testid={inputId}>
      <label
        className={cx("RampInputCheckbox--label", {
          "RampInputCheckbox--label-checked": checked,
          "RampInputCheckbox--label-disabled": disabled,
        })}
        onClick={
          () => onChange(!checked)
        }
      />      
      <input
        id={inputId}
        type="checkbox"
        className="RampInputCheckbox--input"
        checked={checked}
        disabled={disabled}
        onChange={() => onChange(!checked)}
      />
    </div>
  )
}
