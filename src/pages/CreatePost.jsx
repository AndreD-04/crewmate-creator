import React, { useState } from 'react';
import { supabase } from '../client';

const CreatePost = () => {
    const [crewmate, setCrewmate] = useState({ name: "", attribute1: "", attribute2: "" });

    // Stretch Feature: Mapping attributes to categories
    const categoryOptions = {
        Warrior: ['Strength', 'Stamina', 'Shield'],
        Mage: ['Mana', 'Intelligence', 'Spells'],
        Rogue: ['Stealth', 'Speed', 'Daggers']
    };

    const createCrewmate = async (event) => {
        event.preventDefault();
        await supabase.from('crewmates').insert(crewmate);
        window.location = "/";
    }

    return (
        <div className="CreatePost">
            <h2>Create a New Crewmate</h2>
            <form onSubmit={createCrewmate}>
                <input type="text" placeholder="Name" onChange={(e) => setCrewmate({...crewmate, name: e.target.value})} required />
                
                <h3>Select a Class:</h3>
                <select onChange={(e) => setCrewmate({...crewmate, attribute1: e.target.value, attribute2: ""})}>
                    <option value="">-- Choose Category --</option>
                    <option value="Warrior">Warrior</option>
                    <option value="Mage">Mage</option>
                    <option value="Rogue">Rogue</option>
                </select>

                {/* Stretch Feature: Only show attributes for the selected category */}
                {crewmate.attribute1 && (
                    <div className="attribute-options">
                        <h3>Select Specialty:</h3>
                        {categoryOptions[crewmate.attribute1].map(attr => (
                            <label key={attr}>
                                <input 
                                    type="radio" 
                                    name="attr2" 
                                    value={attr} 
                                    onChange={(e) => setCrewmate({...crewmate, attribute2: e.target.value})} 
                                /> {attr}
                            </label>
                        ))}
                    </div>
                )}
                <button type="submit">Create Crewmate</button>
            </form>
        </div>
    )
}
export default CreatePost;