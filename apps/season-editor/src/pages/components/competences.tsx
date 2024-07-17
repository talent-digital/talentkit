import { Box, Button, IconButton } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useFieldArray, useFormContext } from "react-hook-form";
import DeleteIcon from "@mui/icons-material/Delete";
import { useContext } from "react";
import { FormInputs } from "../types";
import { StyledInput } from "./styled-input";
import { SubCompetences } from "./sub-competences";
import { getNextCompetenceId, tryRemoveCompetence } from "../utils";
import { ConfirmDialogContext } from "../context";

type CompetencesProps = {
  competenceAreaId: string;
};

export const Competences = ({ competenceAreaId }: CompetencesProps) => {
  const { confirmChoice } = useContext(ConfirmDialogContext);
  const { register, control, getValues, setFocus } =
    useFormContext<FormInputs>();
  const {
    fields: competenceFields,
    append: appendCompetence,
    remove: removeCompetence,
  } = useFieldArray({
    control,
    name: `competences-${competenceAreaId}`,
    shouldUnregister: true,
  });

  const getCompetenceId = (): string => {
    const values = getValues();
    const competences = values[`competences-${competenceAreaId}`];

    return getNextCompetenceId(
      values.seedId,
      competenceAreaId,
      competences,
      "competenceId"
    );
  };

  const handleAppendCompetence = () => {
    appendCompetence({
      name: "",
      competenceAreaId: competenceAreaId,
      competenceId: getCompetenceId(),
    });

    setTimeout(() => {
      const index = competenceFields.length;
      setFocus(`competences-${competenceAreaId}.${index}.name`);
    });
  };

  const handleRemoveCompetence = async (index: number) => {
    const confirmed = confirmChoice && (await confirmChoice("Are you sure?"));
    if (!confirmed) {
      return;
    }
    const values = getValues();
    const removeFn = () => removeCompetence(index);
    const competenceId = competenceFields[index].competenceId;
    const childSubCompetences: string[] = values[
      `subCompetences-${competenceAreaId}-${competenceId}`
    ].map(
      (item) => item.competenceAreaId + item.competenceId + item.subCompetenceId
    );

    tryRemoveCompetence(values, childSubCompetences, removeFn);
  };

  return (
    <Box
      sx={{
        paddingLeft: 4,
        marginTop: 2,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        borderLeft: `1px solid ${grey[400]}`,
      }}
    >
      {competenceFields
        .filter(
          (competenceField) =>
            competenceField.competenceAreaId === competenceAreaId
        )
        .map((competenceField, index) => {
          return (
            <div key={competenceField.id}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: [0, 2],
                }}
              >
                <input
                  type="hidden"
                  {...register(
                    `competences-${competenceAreaId}.${index}.competenceAreaId` as const
                  )}
                />
                <StyledInput short>
                  <label>Id</label>
                  <input
                    readOnly
                    type="text"
                    {...register(
                      `competences-${competenceAreaId}.${index}.competenceId` as const
                    )}
                  />
                </StyledInput>
                <StyledInput>
                  <label>Name</label>
                  <input
                    type="text"
                    {...register(
                      `competences-${competenceAreaId}.${index}.name` as const
                    )}
                  />
                </StyledInput>
                <div>
                  <IconButton
                    onClick={() => handleRemoveCompetence(index)}
                    color="error"
                    title="Delete competence"
                  >
                    <DeleteIcon />
                  </IconButton>
                </div>
              </Box>
              <SubCompetences
                competenceId={competenceField.competenceId}
                competenceAreaId={competenceAreaId}
              />
            </div>
          );
        })}

      <div>
        <Button
          variant="contained"
          type="button"
          onClick={handleAppendCompetence}
        >
          Add Competence
        </Button>
      </div>
    </Box>
  );
};
