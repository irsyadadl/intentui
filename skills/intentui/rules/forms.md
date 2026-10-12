# Forms

Verify local component exports and the installed React Aria types before generating controlled props. Both audited branches provide the following compositions. They share source patterns, but consuming projects may have older customized implementations.

| Control     | Verified composition                                                                         | State and validation                                                                            |
| ----------- | -------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| TextField   | `TextField` → `Label`, `Input`, `Description`, `FieldError`                                  | string `value`/`onChange`; `name`, `isRequired`, `isInvalid`                                    |
| NumberField | `NumberField` → `Label`, `NumberInput`, `FieldError`                                         | numeric `value`/`onChange`, min/max/format options from types                                   |
| Checkbox    | `CheckboxField` → `Checkbox`, optional `Description`; or `CheckboxGroup` with named children | field `isSelected`/`onChange` and `name`; group value on CheckboxField, not Checkbox            |
| Radio       | `RadioGroup` → `Label`, `RadioField` → `Radio`                                               | group string `value`/`onChange`; each RadioField has `value`, not Radio                         |
| Switch      | `SwitchField` → `Switch`, optional `Description`                                             | field `isSelected`/`onChange` and `name`, not Switch button                                     |
| Select      | `Select` → `Label`, `SelectTrigger`, `SelectContent` → `SelectItem`                          | inspect installed `SelectProps`; current upstream delegates value/onChange to React Aria        |
| ComboBox    | `ComboBox` → `Label`, `ComboBoxInput`, `ComboBoxContent` → `ComboBoxItem`                    | selection differs from `inputValue`/`onInputChange`; inspect installed generics and state props |
| DatePicker  | `DatePicker` → `Label`, `DatePickerTrigger`; optional explicit `DatePickerOverlay`           | React Aria `DateValue`, not a JavaScript Date string; overlay is supplied by wrapper            |
| Groups      | `Fieldset` → `Legend`, `FieldGroup` or fields                                                | preserve legend/label relationships and native form semantics                                   |

Prefer NumberField and DatePicker for their formatting, keyboard, and date behavior. Do not assume raw `Input type="number"` or `type="date"` provides those semantics. Keep server validation and form-library adapters in the project's existing model.

```tsx
import { Button } from "@/components/ui/button"
import { Fieldset, Legend, Label, Description, FieldError } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { TextField } from "@/components/ui/text-field"
import { NumberField, NumberInput } from "@/components/ui/number-field"
import { CheckboxField, Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioField, Radio } from "@/components/ui/radio"
import { SwitchField, Switch } from "@/components/ui/switch"
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select"
import { ComboBox, ComboBoxInput, ComboBoxContent, ComboBoxItem } from "@/components/ui/combo-box"
import { DatePicker, DatePickerTrigger } from "@/components/ui/date-picker"

export function SettingsForm() {
  return (
    <form>
      <Fieldset>
        <Legend>Profile</Legend>
        <TextField name="email" type="email" isRequired>
          <Label>Email</Label>
          <Input />
          <Description>Used for account notifications.</Description>
          <FieldError />
        </TextField>
        <NumberField name="seats" minValue={1}>
          <Label>Seats</Label>
          <NumberInput />
          <FieldError />
        </NumberField>
        <CheckboxField name="updates">
          <Checkbox>Send updates</Checkbox>
        </CheckboxField>
        <RadioGroup name="plan" defaultValue="basic">
          <Label>Plan</Label>
          <RadioField value="basic">
            <Radio>Basic</Radio>
          </RadioField>
          <RadioField value="team">
            <Radio>Team</Radio>
          </RadioField>
        </RadioGroup>
        <SwitchField name="alerts">
          <Switch>Enable alerts</Switch>
        </SwitchField>
        <Select name="region" aria-label="Region">
          <SelectTrigger />
          <SelectContent>
            <SelectItem id="asia">Asia</SelectItem>
          </SelectContent>
        </Select>
        <ComboBox name="owner" aria-label="Owner">
          <ComboBoxInput />
          <ComboBoxContent>
            <ComboBoxItem id="sam">Sam</ComboBoxItem>
          </ComboBoxContent>
        </ComboBox>
        <DatePicker name="start">
          <Label>Start date</Label>
          <DatePickerTrigger />
        </DatePicker>
      </Fieldset>
      <Button type="submit">Save</Button>
    </form>
  )
}
```

Use visible labels or `aria-label` for controls. FieldError renders validation state through the field's context; use `validate` or the existing form integration for application errors. Inspect `validationBehavior` in installed types. Place `name` and field-level validation on the parent field as its API requires. `Fieldset` spaces `data-slot="control"` rows; add that slot to custom rows only if its local styles expect it.

The examples use an illustrative alias; preserve the actual one. React Server Component consumers need an appropriate client boundary.

The audited Checkbox, Radio, and Switch exports wrap React Aria button primitives. Their corresponding Field wrappers own selection/value/name/validation props. Older customized versions may use the historical monolithic API; inspect the local implementation rather than moving state mechanically.
