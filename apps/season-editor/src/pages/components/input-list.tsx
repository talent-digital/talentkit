import { useContext } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { Box, Button, IconButton } from "@mui/material";

import { ConfirmDialogContext } from "../context";
import { StyledInput } from "./styled-input";
import { FormInputs } from "../types";

type Only<T, U> = T extends U ? T : never;

type NestedKeys<T> = T extends object
  ? { [K in keyof T]: K | NestedKeys<T[K]> }[keyof T]
  : never;

type FormInputsKeys = Only<NestedKeys<FormInputs>, string>;

type ListFormInputs = {
  // eslint-disable-next-line no-unused-vars
  [K in FormInputsKeys]: {
    text: string;
  }[];
};

export const InputList = ({
  formFieldName,
  itemIndex,
  label,
  list,
  onUpdate,
}: {
  formFieldName: FormInputsKeys;
  itemIndex: number;
  label: string;
  list: string;
  onUpdate: (_index: number, _list: string) => void;
}) => {
  const { confirmChoice } = useContext(ConfirmDialogContext);
  const { register, control, getValues } = useForm<ListFormInputs>({
    defaultValues: {
      [`${formFieldName}`]: list?.split(",").map((text) => ({ text })) ?? [],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: formFieldName,
  });

  const updateValues = () => {
    onUpdate(
      itemIndex,
      // prettier-ignore
      getValues()[formFieldName].map(({ text }) => text)
        .join(",")
    );
  };

  const handleRemove = async (index: number) => {
    const confirmed = confirmChoice && (await confirmChoice("Are you sure?"));
    if (!confirmed) {
      return;
    }

    remove(index);
    updateValues();
  };

  return (
    <Box
      sx={{
        marginTop: 2,
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      {fields.map((field, index) => (
        <Box
          key={field.id}
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <StyledInput>
            <label style={{ textTransform: "capitalize" }}>
              {label} {index}
            </label>
            <input
              type="text"
              {...register(`${formFieldName}.${index}.text` as const)}
              onBlur={updateValues}
            />
          </StyledInput>
          <div>
            <IconButton
              onClick={() => {
                handleRemove(index);
              }}
              color="error"
              title={`Delete ${label} ${index}`}
            >
              <DeleteIcon />
            </IconButton>
          </div>
        </Box>
      ))}
      <div>
        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          type="button"
          onClick={() =>
            append({
              text: "",
            })
          }
        >
          Add {label}
        </Button>
      </div>
    </Box>
  );
};
