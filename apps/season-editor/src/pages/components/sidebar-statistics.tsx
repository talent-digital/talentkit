import { Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { FormInputs } from "../types";
import { useEffect, useState } from "react";
import { StyledSidebarSection } from "./styled-sidebar-section";

export const SidebarStatistics = () => {
  const [values, setValues] = useState<FormInputs | undefined>(undefined);
  const { getValues } = useFormContext<FormInputs>();

  useEffect(() => {
    const interval = setInterval(() => {
      setValues(getValues());
    }, 3000);

    return () => clearInterval(interval);
  }, [getValues]);

  return (
    <StyledSidebarSection>
      <Typography variant="h6">Statistics</Typography>

      <Typography variant="body2">
        Competence areas: <b>{values?.competenceAreas?.length ?? 0}</b>
      </Typography>
      <Typography variant="body2">
        Competences: <b>{getCompetenceNumber(values)}</b>
      </Typography>
      <Typography variant="body2">
        SubCompetences: <b>{getSubCompetenceNumber(values)}</b>
      </Typography>
      <Typography variant="body2">
        Episodes: <b>{values?.episodes.length}</b>
      </Typography>
      <Typography variant="body2">
        Test items: <b>{values?.testItems.length}</b>
      </Typography>
      <Typography variant="body2">
        Feedback questions: <b>{values?.feedbackQuestions.length}</b>
      </Typography>
      <Typography variant="body2">
        Badges: <b>{values?.badges.length}</b>
      </Typography>
    </StyledSidebarSection>
  );
};

const getCompetenceNumber = (values?: FormInputs) => {
  if (!values) {
    return 0;
  }
  const numberedArray = Object.entries(values)
    .filter(([key]) => key.includes("competences"))
    .map(([_key, value]) => {
      if (Array.isArray(value)) {
        return value.length;
      }
      return 0;
    });

  return numberedArray.reduce((acc, curr) => acc + curr, 0);
};

const getSubCompetenceNumber = (values?: FormInputs) => {
  if (!values) {
    return 0;
  }
  const numberedArray = Object.entries(values)
    .filter(([key]) => key.includes("subCompetences"))
    .map(([_key, value]) => {
      if (Array.isArray(value)) {
        return value.length;
      }
      return 0;
    });

  return numberedArray.reduce((acc, curr) => acc + curr, 0);
};
