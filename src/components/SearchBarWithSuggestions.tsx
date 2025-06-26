import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { Command, CommandInput, CommandList, CommandItem, CommandGroup, CommandEmpty } from '@/components/ui/command';
import { cn } from '@/lib/utils';

// Mock data to simulate fetching product and category suggestions
const MOCK_SUGGESTIONS = [
  { value: 'gaming-laptop', label: 'Gaming Laptop', group: 'Laptops' },
  { value: 'ultrabook', label: 'Ultrabook', group: 'Laptops' },
  { value: 'macbook-pro', label: 'MacBook Pro', group: 'Laptops' },
  { value: 'wireless-mouse', label: 'Wireless Mouse', group: 'Accessories' },
  { value: 'mechanical-keyboard', label: 'Mechanical Keyboard', group: 'Accessories' },
  { value: '4k-monitor', label: '4K Monitor', group: 'Monitors' },
  { value: 'webcam', label: 'Webcam', group: 'Peripherals' },
  { value: 'usb-c-hub', label: 'USB-C Hub', group: 'Accessories' },
  { value: 'noise-cancelling-headphones', label: 'Noise-Cancelling Headphones', group: 'Audio' },
  { value: 'smartphone', label: 'Smartphone', group: 'Mobile' },
  { value: 'tablet', label: 'Tablet', group: 'Mobile' },
];

type Suggestion = {
  value: string;
  label: string;
  group: string;
};

const SearchBarWithSuggestions: React.FC = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const commandRef = useRef<HTMLDivElement>(null);

  console.log('SearchBarWithSuggestions loaded');

  // Effect to handle closing the suggestion list when clicking outside
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (commandRef.current && !commandRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const handleSelect = useCallback((selectedValue: string) => {
    setInputValue(selectedValue);
    setOpen(false);
    navigate(`/product-listing?search=${encodeURIComponent(selectedValue)}`);
  }, [navigate]);
  
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue.trim()) {
      handleSelect(inputValue);
    }
  };

  const filteredSuggestions = inputValue
    ? MOCK_SUGGESTIONS.filter(suggestion =>
        suggestion.label.toLowerCase().includes(inputValue.toLowerCase())
      )
    : [];

  const groupedSuggestions = filteredSuggestions.reduce<Record<string, Suggestion[]>>((acc, suggestion) => {
    const group = suggestion.group;
    if (!acc[group]) {
      acc[group] = [];
    }
    acc[group].push(suggestion);
    return acc;
  }, {});

  return (
    <div className="relative w-full max-w-lg">
      <form onSubmit={handleFormSubmit}>
        <Command ref={commandRef} shouldFilter={false} className="overflow-visible bg-transparent">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <CommandInput
              value={inputValue}
              onValueChange={setInputValue}
              onFocus={() => setOpen(true)}
              placeholder="Search products and categories..."
              className="pl-9"
            />
          </div>

          <div className="absolute w-full z-50 top-full mt-2">
            {open && filteredSuggestions.length > 0 && (
              <CommandList className="rounded-lg border bg-popover text-popover-foreground shadow-md">
                <CommandEmpty>No results found.</CommandEmpty>
                {Object.entries(groupedSuggestions).map(([group, suggestions]) => (
                  <CommandGroup key={group} heading={group}>
                    {suggestions.map(suggestion => (
                      <CommandItem
                        key={suggestion.value}
                        value={suggestion.label}
                        onSelect={handleSelect}
                        className="cursor-pointer"
                      >
                        {suggestion.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                ))}
              </CommandList>
            )}
          </div>
        </Command>
      </form>
    </div>
  );
};

export default SearchBarWithSuggestions;