import { Box, Button, IconButton } from "@mui/material";
import { StyledInput } from "./styled-input";
import { useFieldArray, useFormContext } from "react-hook-form";
import { FormInputs } from "../types";
import { Competences } from "./competences";
import DeleteIcon from "@mui/icons-material/Delete";
import { getNextCompetenceId, tryRemoveCompetence } from "../utils";
import { ConfirmDialogContext } from "../context";
import { useContext } from "react";

export const CompetenceAreas = () => {
  const { confirmChoice } = useContext(ConfirmDialogContext);
  const { register, control, getValues, setFocus } =
    useFormContext<FormInputs>();
  const {
    fields: competenceAreaFields,
    append: appendCompetenceArea,
    remove: removeCompetenceArea,
  } = useFieldArray({
    control,
    name: "competenceAreas",
  });

  const getCompetenceAreaId = (): string => {
    const { seedId, competenceAreas } = getValues();

    return getNextCompetenceId(
      seedId,
      seedId,
      competenceAreas,
      "competenceAreaId"
    );
  };

  const handleAppendCompetenceArea = () => {
    appendCompetenceArea({
      name: "",
      competenceAreaId: getCompetenceAreaId(),
    });

    setTimeout(() => {
      const index = competenceAreaFields.length;
      setFocus(`competenceAreas.${index}.name`);
    });
  };

  const handleRemoveCompetenceArea = async (index: number) => {
    const confirmed = confirmChoice && (await confirmChoice("Are you sure?"));
    if (!confirmed) {
      return;
    }

    const values = getValues();
    const removeFn = () => removeCompetenceArea(index);
    const competenceAreaId = competenceAreaFields[index].competenceAreaId;

    const competenceIdList = values[`competences-${competenceAreaId}`].map(
      ({ competenceId }) => competenceId
    );

    const childSubCompetences = competenceIdList
      .flatMap((competenceId) => {
        return values[`subCompetences-${competenceAreaId}-${competenceId}`];
      })
      .map(
        (item) =>
          item.competenceAreaId + item.competenceId + item.subCompetenceId
      );

    tryRemoveCompetence(values, childSubCompetences, removeFn);
  };

  return (
    <>
      {competenceAreaFields.map((competenceAreaField, index) => (
        <Box key={competenceAreaField.id}>
          <Box sx={{ display: "flex", gap: [0, 2], alignItems: "center" }}>
            <StyledInput short>
              <label>Id</label>
              <input
                readOnly
                type="text"
                {...register(
                  `competenceAreas.${index}.competenceAreaId` as const
                )}
              />
            </StyledInput>
            <StyledInput>
              <label>Name</label>
              <input
                type="text"
                {...register(`competenceAreas.${index}.name` as const)}
              />
            </StyledInput>
            <div>
              <IconButton
                onClick={() => handleRemoveCompetenceArea(index)}
                color="error"
                title="Delete competence area"
              >
                <DeleteIcon />
              </IconButton>
            </div>
          </Box>

          <Competences
            competenceAreaId={competenceAreaField.competenceAreaId}
          />
        </Box>
      ))}
      <div>
        <Button
          variant="contained"
          type="button"
          onClick={handleAppendCompetenceArea}
        >
          Add Competence Area
        </Button>
      </div>
    </>
  );
};
