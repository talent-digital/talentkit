import { FC } from "react";
import {
  FixedSizeNodeData,
  TreeWalkerValue,
  FixedSizeNodePublicState,
  FixedSizeTree,
} from "react-vtree";
import { NodeComponentProps } from "react-vtree/dist/es/Tree";

type TreeNode = Readonly<{
  children: TreeNode[];
  id: number;
  name: string;
}>;

type TreeData = FixedSizeNodeData &
  Readonly<{
    isLeaf: boolean;
    name: string;
    nestingLevel: number;
  }>;

let nodeId = 0;

const createNode = (depth: number = 0): TreeNode => {
  const node: TreeNode = {
    children: [],
    id: nodeId,
    name: `test-${nodeId}`,
  };

  nodeId += 1;

  if (depth === 5) {
    return node;
  }

  for (let i = 0; i < 2; i++) {
    node.children.push(createNode(depth + 1));
  }

  return node;
};

const rootNode = createNode();

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
    name: node.name,
    nestingLevel,
  },
  nestingLevel,
  node,
});

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

const Node: FC<
  NodeComponentProps<TreeData, FixedSizeNodePublicState<TreeData>>
> = ({ data: { isLeaf, name, nestingLevel }, isOpen, style, setOpen }) => (
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
    <div>{name}</div>
  </div>
);

export const VTree = () => {
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
