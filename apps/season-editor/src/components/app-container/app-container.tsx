import { Box, styled } from "@mui/material";
import { ChangeEvent, useState } from "react";
import { parse, stringify } from "yaml";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useForm } from "react-hook-form";
import IconButton from "@mui/material/IconButton";

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
    changeNodeList(parse(readFile));
  };

  const onSubmit = (data: Record<string, string>, exportFile = false) => {
    const newNodeList = Object.entries(data).reduce(
      (accumulator, [key, value]) => {
        const [needle, type] = key.split("-");

        return changeTreeNode(accumulator, needle, type, value);
      },
      nodeList
    );

    changeNodeList(newNodeList);

    if (exportFile) {
      saveFile(newNodeList);
    }
  };

  const changeNodeList = (newNodeList: Node) => {
    setNodeList(newNodeList);
    setListKey(getRandomString());
    reset();
  };

  const saveFile = (newNodeList: Node) => {
    const element = document.createElement("a");
    const file = new Blob([stringify(newNodeList)], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "season.yaml";
    element.click();
  };

  const handleAddNode = (position: string) => {
    const newNodeList = addTreeNode(nodeList, position);
    changeNodeList(newNodeList);
  };

  const handleRemoveNode = (position: string) => () => {
    const newNodeList = removeTreeNode(nodeList, position);
    changeNodeList(newNodeList);
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
          {Object.entries(nodes).length === index + 1 && (
            <IconButton
              color="success"
              onClick={() => handleAddNode(newTreePosition)}
            >
              <AddIcon />
            </IconButton>
          )}
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
          <IconButton
            color="error"
            sx={{ marginTop: -8, marginBottom: -8 }}
            onClick={handleRemoveNode(treePosition)}
          >
            <RemoveIcon />
          </IconButton>
        </div>
      );
    }

    return (
      <div>
        <div>
          <span>{key}:</span>
          <IconButton
            color="error"
            sx={{ marginTop: -8, marginBottom: -8 }}
            onClick={handleRemoveNode(treePosition)}
          >
            <RemoveIcon />
          </IconButton>
        </div>
        <Box>{renderNodeList(value, treePosition)}</Box>
      </div>
    );
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <StyledNavigation>
        <input type="file" accept=".yml,.yaml" onChange={handleFileChange} />
        <button onClick={() => console.log(nodeList)}>Log nodeList</button>
        <button onClick={handleSubmit((data) => onSubmit(data))}>
          Save changes
        </button>
        <button onClick={handleSubmit((data) => onSubmit(data, true))}>
          Save and Export season.yaml
        </button>
      </StyledNavigation>
      <Box sx={{ padding: 2 }} key={listKey}>
        <b>KEY: {listKey}</b>
        {renderNodeList(nodeList)}
      </Box>
    </Box>
  );
};

const addTreeNode = (nodes: Node, needle: string, treePosition = ""): Node => {
  return Object.entries(nodes).reduce((accumulator, [key, value], index) => {
    const nextTreePosition = treePosition + index;

    if (nextTreePosition === needle && typeof nodes !== "string") {
      return {
        ...accumulator,
        [key]: value,
        [""]: "",
      };
    }

    if (typeof value !== "string") {
      return {
        ...accumulator,
        [key]: addTreeNode(value, needle, nextTreePosition),
      };
    }

    return {
      ...accumulator,
      [key]: value,
    };
  }, {});
};

const changeTreeNode = (
  nodes: Node,
  needle: string,
  type: "key" | "value" | string,
  newValue: string,
  treePosition = ""
): Node => {
  return Object.entries(nodes).reduce((accumulator, [key, value], index) => {
    const nextTreePosition = treePosition + index;

    if (nextTreePosition === needle && typeof nodes !== "string") {
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
        [key]: changeTreeNode(value, needle, type, newValue, nextTreePosition),
      };
    }

    return {
      ...accumulator,
      [key]: value,
    };
  }, {});
};

const removeTreeNode = (
  nodes: Node,
  needle: string,
  treePosition = ""
): Node => {
  return Object.entries(nodes).reduce((accumulator, [key, value], index) => {
    const nextTreePosition = treePosition + index;

    if (nextTreePosition === needle && typeof nodes !== "string") {
      return {
        ...accumulator,
      };
    }

    if (typeof value !== "string") {
      return {
        ...accumulator,
        [key]: removeTreeNode(value, needle, nextTreePosition),
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
