import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";

// KOMPONEN NODE
const CustomTreeNode = ({
    node,
    level = 0,
    childrenKey = "children",
    onNodePress,
    renderNode,
}) => {
    const [expanded, setExpanded] = useState(false);

    const hasChildren =
        Array.isArray(node?.[childrenKey]) && node?.[childrenKey].length > 0;

    const handlePress = () => {
        if (hasChildren) {
            setExpanded((prev) => !prev);
        } else {
            onNodePress?.({ node });
        }
    };

    return (
        <View>
            <TouchableOpacity onPress={handlePress} activeOpacity={0.8}>
                {renderNode({
                    node,
                    level,
                    isExpanded: expanded,
                    hasChildrenNodes: hasChildren,
                })}
            </TouchableOpacity>

            {expanded &&
                hasChildren &&
                node[childrenKey].map((child, index) => {
                    const key = getSafeKey(child, index);
                    return (
                        <CustomTreeNode
                            key={key}
                            node={child}
                            level={level + 1}
                            childrenKey={childrenKey}
                            onNodePress={onNodePress}
                            renderNode={renderNode}
                        />
                    );
                })}
        </View>
    );
};

// KOMPONEN UTAMA
const CustomTreeView = ({ data = [], childrenKey = "children", onNodePress, renderNode }) => {
    return (
        <View>
            {data.map((node, index) => {
                const key = getSafeKey(node, index);
                return (
                    <CustomTreeNode
                        key={key}
                        node={node}
                        level={0}
                        childrenKey={childrenKey}
                        onNodePress={onNodePress}
                        renderNode={renderNode}
                    />
                );
            })}
        </View>
    );
};

// FUNGSI AMAN UNTUK MEMBUAT KEY
const getSafeKey = (node, index) => {
    if (typeof node?.id === "string" || typeof node?.id === "number") return node.id;
    if (typeof node?.key === "string" || typeof node?.key === "number") return node.key;
    if (typeof node?.title === "string") return `${node.title}-${index}`;
    return `node-${index}`; // fallback
};

export default CustomTreeView;
