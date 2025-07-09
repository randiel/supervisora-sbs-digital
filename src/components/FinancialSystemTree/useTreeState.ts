
import { useState } from 'react';
import { TreeNode, FinancialEntity } from './types';
import { financialSystemData } from './data';

export const useTreeState = () => {
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());
  const [selectedEntity, setSelectedEntity] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set());
  const [selectedFiles, setSelectedFiles] = useState<Set<string>>(new Set());

  const toggleNode = (nodeId: string) => {
    const newExpanded = new Set(expandedNodes);
    if (newExpanded.has(nodeId)) {
      newExpanded.delete(nodeId);
    } else {
      newExpanded.add(nodeId);
    }
    setExpandedNodes(newExpanded);
  };

  const toggleFolder = (folderId: string) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(folderId)) {
      newExpanded.delete(folderId);
    } else {
      newExpanded.add(folderId);
    }
    setExpandedFolders(newExpanded);
  };

  const toggleFileSelection = (fileId: string) => {
    const newSelected = new Set(selectedFiles);
    if (newSelected.has(fileId)) {
      newSelected.delete(fileId);
    } else {
      newSelected.add(fileId);
    }
    setSelectedFiles(newSelected);
  };

  const filterNodes = (nodes: TreeNode[], searchTerm: string): TreeNode[] => {
    if (!searchTerm) return nodes;

    const filtered: TreeNode[] = [];
    
    for (const node of nodes) {
      const matchesName = node.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesLicense = node.license?.toLowerCase().includes(searchTerm.toLowerCase());
      
      if (matchesName || matchesLicense) {
        filtered.push(node);
      } else if (node.children) {
        const filteredChildren = filterNodes(node.children, searchTerm);
        if (filteredChildren.length > 0) {
          filtered.push({
            ...node,
            children: filteredChildren
          });
        }
      }
    }
    
    return filtered;
  };

  const findEntityById = (entityId: string): TreeNode | null => {
    const findInNodes = (nodes: TreeNode[]): TreeNode | null => {
      for (const node of nodes) {
        if (node.id === entityId && node.isEntity) {
          return node;
        }
        if (node.children) {
          const found = findInNodes(node.children);
          if (found) return found;
        }
      }
      return null;
    };
    return findInNodes(financialSystemData);
  };

  const filteredData = filterNodes(financialSystemData, searchTerm);

  return {
    expandedNodes,
    selectedEntity,
    setSelectedEntity,
    searchTerm,
    setSearchTerm,
    expandedFolders,
    selectedFiles,
    toggleNode,
    toggleFolder,
    toggleFileSelection,
    filteredData,
    findEntityById
  };
};
