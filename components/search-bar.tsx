"use client";
import { Command, Search } from "lucide-react";

interface SearchBarProps {
  onClick?: () => void;
  isSearch?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  onClick, 
  isSearch
}) => {
  return (
    <>
    <div className="md:block hidden" onClick={onClick}>
      <div className="w-56 flex relative ml-0 mr-2 overflow-hidden justify-between items-center cursor-pointer md:w-[400px] lg:w-[400px] py-1 md:pl-9 lg:pl-9 pl-4 rounded-md bg-slate-200 focus-visible:ring-slate-200">
        <Search className="h-4 w-4 absolute my-2 left-3 text-slate-500" />
        <div
          className="text-slate-500 flex items-center justify-start cursor-pointer w-full bg-transparent focus:outline-none focus-visible:ring-transparent"
        >
          Search in Nexus
        </div>
        <div>
          {isSearch && (
            <kbd className="ml-auto my-1 mr-3 pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
              {process.platform === "darwin" ? (
                <>
                  <span className="text-xs">
                    <Command className="h-4 w-4" />
                  </span>
                  <span className="text-base">/</span>
                </>
              ) : (
                <>
                  <span className="text-xs font-semibold">
                    Ctrl
                  </span>
                  <span className="text-base">/</span>
                </>
              )}
            </kbd>
          )}
        </div>
      </div>
    </div>
    </>
  );
};

export default SearchBar;
