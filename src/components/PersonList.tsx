import React, { useState } from 'react';
import { Trash2, User } from 'lucide-react';
import { useBillContext } from '../context/BillContext';
import ItemAssignment from './ItemAssignment';
import ItemSelector from './ItemSelector';

interface PersonFormProps {
  onAdd: (name: string) => void;
}

export const PersonForm: React.FC<PersonFormProps> = ({ onAdd }) => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      setError('Name is required');
      return;
    }

    onAdd(name);
    setName('');
    setError('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <div className="flex gap-2">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Person name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-emerald-500 text-white rounded-md hover:bg-emerald-600 transition-colors"
        >
          Add
        </button>
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </form>
  );
};

interface PersonListProps {
  className?: string;
}

export const PersonList: React.FC<PersonListProps> = ({ className = '' }) => {
  const { people, assignments, removePerson } = useBillContext();

  if (people.length === 0) {
    return (
      <div className={`text-center py-6 text-gray-500 ${className}`}>
        No people added yet. Add people who are splitting the bill.
      </div>
    );
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {people.map((person) => {
        const personAssignments = assignments.filter(a => a.personId === person.id);
        
        return (
          <div
            key={person.id}
            className="p-4 bg-gray-50 rounded-lg border border-gray-200"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <User size={16} className="text-gray-500" />
                <span className="font-medium">{person.name}</span>
              </div>
              <button
                onClick={() => removePerson(person.id)}
                className="text-gray-400 hover:text-red-500 transition-colors"
                aria-label="Remove person"
              >
                <Trash2 size={16} />
              </button>
            </div>

            <div className="space-y-2">
              {personAssignments.map(assignment => (
                <ItemAssignment
                  key={`${assignment.itemId}-${person.id}`}
                  itemId={assignment.itemId}
                  personId={person.id}
                />
              ))}
            </div>

            <ItemSelector personId={person.id} />
          </div>
        );
      })}
    </div>
  );
};