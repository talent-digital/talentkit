import { useFormContext } from "react-hook-form";

import { StyledInput } from "./styled-input";
import { FormInputs } from "../types";

export const BasicInfo = () => {
  const { register } = useFormContext<FormInputs>();

  return (
    <>
      <StyledInput>
        <label>Unique season competence Id number (e.g. 100)</label>
        <input type="text" {...register("seedId")} disabled />
      </StyledInput>

      <StyledInput>
        <label>Title</label>
        <input type="text" {...register("title")} />
      </StyledInput>

      <StyledInput>
        <label>Info</label>
        <textarea rows={3} {...register("info")} />
      </StyledInput>

      <StyledInput>
        <label>Assets URL</label>
        <input type="text" {...register("assetsURL")} />
      </StyledInput>

      <StyledInput>
        <label>
          Season end message <i>(legacy option)</i>
        </label>
        <textarea rows={3} {...register("seasonEndMessage")} />
      </StyledInput>

      <div>
        <input type="checkbox" {...register("linearSeason")} />
        <label>Linear season</label>
      </div>
    </>
  );
};
