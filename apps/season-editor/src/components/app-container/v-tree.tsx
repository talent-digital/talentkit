import { FC } from "react";
import {
  FixedSizeNodeData,
  TreeWalkerValue,
  FixedSizeNodePublicState,
  FixedSizeTree,
} from "react-vtree";
import { NodeComponentProps } from "react-vtree/dist/es/Tree";

type LegacyNode =
  | {
      [key: string]: string | LegacyNode;
    }
  | string;

type TreeNode = {
  children: TreeNode[];
  id: number;
  key: string;
  value?: string;
};

type TreeData = FixedSizeNodeData &
  Readonly<{
    isLeaf: boolean;
    key: string;
    value?: string;
    nestingLevel: number;
  }>;

const exampleYamlObjNode: LegacyNode = {
  seasonEndMessage: { de: "Vielen Dank für deine Teilnahme!" },
  title: { de: "AWO DigitalCheck" },
};

function getChildren(input: LegacyNode): TreeNode[] {
  return Object.entries(input).map(([key, value], index) => {
    const valueIsString = typeof value === "string";
    return {
      children: valueIsString ? [] : getChildren(value),
      id: Math.ceil(Math.random() * 1000000000) + index, // TODO
      key,
      value: valueIsString ? value : undefined,
    };
  });
}

function transformToTreeNode(input: LegacyNode): TreeNode {
  const node: TreeNode = {
    children: getChildren(input),
    id: 0,
    key: "Season",
  };

  return node;
}

type NodeMeta = Readonly<{
  nestingLevel: number;
  node: TreeNode;
}>;

const getNodeData = (
  node: TreeNode,
  nestingLevel: number
): TreeWalkerValue<TreeData, NodeMeta> => ({
  data: {
    id: node.id.toString(),
    isLeaf: node.children.length === 0,
    isOpenByDefault: true,
    key: node.key,
    value: node.value,
    nestingLevel,
  },
  nestingLevel,
  node,
});

const Node: FC<
  NodeComponentProps<TreeData, FixedSizeNodePublicState<TreeData>>
> = ({
  data: { isLeaf, key, value, nestingLevel },
  isOpen,
  style,
  setOpen,
}) => (
  <div
    style={{
      ...style,
      alignItems: "center",
      display: "flex",
      marginLeft: nestingLevel * 30 + (isLeaf ? 48 : 0),
    }}
  >
    {!isLeaf && (
      <div>
        <button type="button" onClick={() => setOpen(!isOpen)}>
          {isOpen ? "-" : "+"}
        </button>
      </div>
    )}
    <div>
      {key} : {value}
    </div>
  </div>
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const VTree = ({ input }: { input: any }) => {
  const rootNode = transformToTreeNode(input);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function* treeWalker(): any {
    yield getNodeData(rootNode, 0);

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    while (true) {
      const parentMeta = yield;

      // console.log(yield);

      // eslint-disable-next-line @typescript-eslint/prefer-for-of
      for (let i = 0; i < parentMeta.node.children.length; i++) {
        yield getNodeData(
          parentMeta.node.children[i],
          parentMeta.nestingLevel + 1
        );
      }
    }
  }

  return (
    <div>
      <FixedSizeTree
        treeWalker={treeWalker}
        itemSize={30}
        height={1024}
        width="100%"
      >
        {Node}
      </FixedSizeTree>
    </div>
  );
};
