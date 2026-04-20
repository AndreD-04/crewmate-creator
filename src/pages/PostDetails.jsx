import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../client';

const PostDetails = () => {
    const { id } = useParams();
    const [crewmate, setCrewmate] = useState(null);

    useEffect(() => {
        const fetchCrewmate = async () => {
            const { data } = await supabase
                .from('crewmates')
                .select()
                .eq('id', id)
                .single();
            setCrewmate(data);
        }
        fetchCrewmate();
    }, [id]);

    if (!crewmate) return <h2>Loading...</h2>;

    return (
        <div className="DetailsPage">
            <h1>Stats for {crewmate.name}</h1>
            <div className="details-card">
                <p><strong>Primary Class:</strong> {crewmate.attribute1}</p>
                <p><strong>Speed Rating:</strong> {crewmate.attribute2}</p>
                
                {/* Extra info requirement: you can add a fun message based on stats */}
                <p>
                    {crewmate.attribute2 === "Fast" 
                        ? "This crewmate is ready to sprint into action!" 
                        : "A slow and steady crewmate, perfect for defense."}
                </p>

                <Link to={`/edit/${id}`}>
                    <button>Edit Crewmate Stats</button>
                </Link>
            </div>
        </div>
    );
};

export default PostDetails;