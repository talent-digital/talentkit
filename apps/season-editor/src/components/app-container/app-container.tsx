import { Box, styled } from "@mui/material";
import { ChangeEvent, useState } from "react";
import { parse } from "yaml";
import AddIcon from "@mui/icons-material/Add";
import { useForm } from "react-hook-form";

type Node =
  | {
      [key: string]: string | Node;
    }
  | string;

const exampleYamlObjNode: Node = {
  seasonEndMessage: { de: "Vielen Dank für deine Teilnahme!" },
  title: { de: "AWO DigitalCheck" },
};

export const AppContainer = () => {
  const [nodeList, setNodeList] = useState<Node>(exampleYamlObjNode);
  const [listKey, setListKey] = useState(getRandomString());
  const { register, handleSubmit, reset } = useForm();

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || !event.target.files[0]) {
      return;
    }
    const file = event.target.files[0];

    const readFile = await file.text();

    const parsedYaml = parse(readFile);

    setNodeList(parsedYaml);
    setListKey(getRandomString());
    reset();
    console.log("parsedYaml", parsedYaml);
  };

  const onSubmit = (data: Record<string, string>) => {
    const newNodeList = Object.entries(data).reduce(
      (accumulator, [key, value]) => {
        const [needle, type] = key.split("-");

        return findAndReplaceInTree(accumulator, needle, type, value);
      },
      nodeList
    );

    setNodeList(newNodeList);
    setListKey(getRandomString());
    reset();
  };

  const renderNodeList = (nodes: Node, treePosition: string = "") => {
    return Object.entries(nodes).map(([key, value], index) => {
      const newTreePosition = treePosition + index;

      return (
        <div
          title={newTreePosition}
          key={newTreePosition}
          style={{
            borderLeft: `1px solid rgba(0, 0, 0, 0.25)`,
            paddingLeft: 16,
          }}
        >
          {renderNode(key, value, newTreePosition)}
        </div>
      );
    });
  };

  const renderNode = (key: string, value: Node, treePosition: string) => {
    if (typeof value === "string") {
      return (
        <div>
          <input
            type="text"
            defaultValue={key}
            {...register(`${treePosition}-key`)}
          />
          <span>: </span>
          <input
            type="text"
            defaultValue={value}
            {...register(`${treePosition}-value`)}
          />
        </div>
      );
    }

    return (
      <div>
        <span>{key}:</span>
        <Box>
          {renderNodeList(value, treePosition)}
          <AddIcon color="success" sx={{ marginLeft: 2 }} />
        </Box>
      </div>
    );
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <StyledNavigation>
        <input type="file" accept=".yml,.yaml" onChange={handleFileChange} />
        <button onClick={() => console.log(nodeList)}>Log nodeList</button>
        <button onClick={handleSubmit(onSubmit)}>Submit</button>
      </StyledNavigation>
      <Box sx={{ padding: 2 }} key={listKey}>
        <b>KEY: {listKey}</b>
        {renderNodeList(nodeList)}
      </Box>
    </Box>
  );
};

const findAndReplaceInTree = (
  nodes: Node,
  needle: string,
  type: "key" | "value" | string,
  newValue: string,
  treePosition = ""
): Node => {
  return Object.entries(nodes).reduce((accumulator, [key, value], index) => {
    const newTreePosition = treePosition + index;

    if (newTreePosition === needle && typeof nodes !== "string") {
      if (type === "key") {
        return {
          ...accumulator,
          [newValue]: value,
        };
      } else {
        return {
          ...accumulator,
          [key]: newValue,
        };
      }
    }

    if (typeof value !== "string") {
      return {
        ...accumulator,
        [key]: findAndReplaceInTree(
          value,
          needle,
          type,
          newValue,
          newTreePosition
        ),
      };
    }

    return {
      ...accumulator,
      [key]: value,
    };
  }, {});
};

const getRandomString = () => {
  return (Math.random() + 1).toString(36).substring(7);
};

const StyledNavigation = styled("div")(({ theme }) => ({
  padding: theme.spacing(2),
  background: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
}));
