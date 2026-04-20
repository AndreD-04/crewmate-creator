import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../client';

const EditPost = () => {
    const { id } = useParams();
    const [crewmate, setCrewmate] = useState({ name: "", attribute1: "", attribute2: "" });

    // 1. Fetch existing data so the user sees what they are editing
    useEffect(() => {
        const fetchCrewmate = async () => {
            const { data } = await supabase
                .from('crewmates')
                .select()
                .eq('id', id)
                .single();
            
            if (data) setCrewmate(data);
        }
        fetchCrewmate();
    }, [id]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setCrewmate((prev) => ({ ...prev, [name]: value }));
    };

    // 2. Update logic
    const updatePost = async (event) => {
        event.preventDefault();
        await supabase
            .from('crewmates')
            .update({ 
                name: crewmate.name, 
                attribute1: crewmate.attribute1, 
                attribute2: crewmate.attribute2 
            })
            .eq('id', id);

        window.location = "/";
    }

    // 3. Delete logic
    const deletePost = async (event) => {
        event.preventDefault();
        await supabase
            .from('crewmates')
            .delete()
            .eq('id', id);

        window.location = "/";
    }

    return (
        <div>
            <h2>Edit Your Crewmate</h2>
            <form onSubmit={updatePost}>
                <label>Name:</label>
                <input type="text" name="name" value={crewmate.name} onChange={handleChange} />
                
                <br/>
                
                <label>Class:</label>
                <input type="radio" name="attribute1" value="Warrior" checked={crewmate.attribute1 === "Warrior"} onChange={handleChange} /> Warrior
                <input type="radio" name="attribute1" value="Mage" checked={crewmate.attribute1 === "Mage"} onChange={handleChange} /> Mage

                <br/>

                <button type="submit">Update Crewmate</button>
                <button className="deleteButton" onClick={deletePost}>Delete Crewmate</button>
            </form>
        </div>
    )
}

export default EditPost;