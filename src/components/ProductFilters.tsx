import type { Facet, AppliedFacets, FacetFilter, PriceRangeValue } from "../types/types";

interface FiltersProps {
  facets: Facet[];
  selectedFilters: AppliedFacets;
  onChange: (filters: AppliedFacets) => void;
}

export const Filters = ({ facets, selectedFilters, onChange }: FiltersProps) => {
  const isChecked = (facetId: string, identifier: string) => {
    return selectedFilters[facetId]?.some((faset) => faset.identifier === identifier) || false;
  };

  const handleCheckbox = (
    facetId: string,
    identifier: string,
    value: string | PriceRangeValue,
    checked: boolean
  ) => {
    const prev = selectedFilters[facetId] || [];
    
    let next: FacetFilter[];
    if (checked) {
      next = [...prev, { identifier, value }];
    } else {
      next = prev.filter((facet) => facet.identifier !== identifier);
    }

    const updated = { ...selectedFilters };
    if (next.length > 0) {
      updated[facetId] = next;
    } else {
      delete updated[facetId];
    }

    onChange(updated);
  };

  return (
    <div className="w-80 px-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-green-700">Filters</h2>
        {Object.keys(selectedFilters).length > 0 && (
          <button onClick={() => onChange({})} className="text-xs text-green-700 hover:underline">
            Clear all
          </button>
        )}
      </div>

      {facets.length === 0 && <p className="text-sm text-gray-900 italic">No filters available</p>}

      {facets.map((facet) => (
        <div className="mb-4 border rounded-lg p-3 max-h-64 overflow-y-auto" key={facet.identifier}>
          <h3 className="text-sm font-medium text-green-700 mb-2">{facet.displayName}</h3>
          <ul className="space-y-1">
            {facet.options.map((option) => {
              return (
                <li key={option.identifier}>
                  <label className="flex items-center cursor-pointer hover:bg-gray-50 p-1 rounded">
                    <input
                      type="checkbox"
                      checked={isChecked(facet.identifier, option.identifier)}
                      onChange={(e) => 
                        handleCheckbox(facet.identifier, option.identifier, option.value, e.target.checked)
                      }
                      className="mr-2"
                    />
                    <span className="text-sm flex-1">{option.displayValue}</span>
                    <span className="text-xs text-gray-500">({option.productCount})</span>
                  </label>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
};