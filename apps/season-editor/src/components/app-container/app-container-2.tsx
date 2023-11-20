import { Box, styled } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import { VTree } from "./v-tree";
import { parse, stringify } from "yaml";

type TreeNode = {
  children: TreeNode[];
  id: number;
  key: string;
  value?: string;
};

type LegacyNode =
  | {
      [key: string]: string | LegacyNode;
    }
  | string;

const exampleYamlObjNode: LegacyNode = {
  seasonEndMessage: { de: "Vielen Dank für deine Teilnahme!" },
  title: { de: "AWO DigitalCheck" },
};

export const AppContainer2 = () => {
  const [nodeList, changeNodeList] = useState({});

  useEffect(() => {
    const nodeList = transformToTreeNode(exampleYamlObjNode);
    console.log("Node list:", nodeList);
    console.log("Object: ", transformToObject(nodeList));
  }, []);

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || !event.target.files[0]) {
      return;
    }

    const file = event.target.files[0];
    const readFile = await file.text();
    changeNodeList(parse(readFile));
  };

  return (
    <form>
      <StyledNavigation>
        <input type="file" accept=".yml,.yaml" onChange={handleFileChange} />
        {/* <button onClick={() => console.log(nodeList)}>Log nodeList</button>
        <button onClick={handleSubmit((data) => onSubmit(data))}>
          Save changes
        </button>
        <button onClick={handleSubmit((data) => onSubmit(data, true))}>
          Save and Export season.yaml
        </button> */}
        lorem ipsum navigator
      </StyledNavigation>
      <Box sx={{ padding: 2 }}>
        <b>KEY</b>
        {/* {renderNodeList(nodeList)} */}
        <VTree input={nodeList} />
      </Box>
    </form>
  );
};

const transformToTreeNode = (input: LegacyNode): TreeNode => {
  const node: TreeNode = {
    children: getChildren(input),
    id: 0,
    key: "Season",
  };

  return node;
};

const getChildren = (input: LegacyNode): TreeNode[] => {
  return Object.entries(input).map(([key, value], index) => {
    const valueIsString = typeof value === "string";
    return {
      children: valueIsString ? [] : getChildren(value),
      id: index,
      key,
      value: valueIsString ? value : undefined,
    };
  });
};

const transformToObject = (input: TreeNode): LegacyNode => {
  return input.children.reduce((accumulator, currentValue) => {
    return {
      ...accumulator,
      [currentValue.key]: currentValue.value
        ? currentValue.value
        : transformToObject(currentValue),
    };
  }, {});
};

const StyledNavigation = styled("div")(({ theme }) => ({
  padding: theme.spacing(2),
  background: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
}));
