
import { FinancialEntity, FinancialSystemTreeProps } from './FinancialSystemTree/types';
import { useTreeState } from './FinancialSystemTree/useTreeState';
import { TreeNode } from './FinancialSystemTree/TreeNode';
import { FoldersTree } from './FinancialSystemTree/FoldersTree';
import { SearchBar } from './FinancialSystemTree/SearchBar';

export { FinancialEntity } from './FinancialSystemTree/types';

export const FinancialSystemTree = ({ onEntitySelect }: FinancialSystemTreeProps) => {
  const {
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
  } = useTreeState();

  const handleEntitySelect = (entity: FinancialEntity) => {
    setSelectedEntity(entity.id);
    onEntitySelect(entity);
  };

  const renderTree = () => {
    return filteredData.map(category => (
      <TreeNode
        key={category.id}
        node={category}
        level={0}
        isExpanded={expandedNodes.has(category.id)}
        isSelected={selectedEntity === category.id}
        onToggle={toggleNode}
        onEntitySelect={handleEntitySelect}
      />
    ));
  };

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg border">
        <div className="p-3 border-b bg-gray-50 rounded-t-lg">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">
            Entidades del Sistema Financiero
          </h3>
          <SearchBar 
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
          />
        </div>
        <div className="p-2 max-h-96 overflow-y-auto">
          {renderTree()}
        </div>
      </div>

      <FoldersTree
        selectedEntity={selectedEntity}
        expandedFolders={expandedFolders}
        selectedFiles={selectedFiles}
        onToggleFolder={toggleFolder}
        onToggleFileSelection={toggleFileSelection}
        findEntityById={findEntityById}
      />
    </div>
  );
};
