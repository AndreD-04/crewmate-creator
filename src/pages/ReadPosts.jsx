import React, { useState, useEffect } from 'react';
import { supabase } from '../client';
import { Link } from 'react-router-dom';

const ReadPosts = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const { data } = await supabase.from('crewmates').select();
            setPosts(data);
        }
        fetchPosts();
    }, []);

    // Stretch Feature: Calculate Stats
    const total = posts.length;
    const mages = posts.filter(p => p.attribute1 === 'Mage').length;
    const successMetric = (total * 25); // Simple logic: more crew = higher success
    const isLegendary = successMetric >= 75;

    return (
        <div className="ReadPosts">
            <div className="crew-stats-panel">
                <h2>Crew Summary</h2>
                <p>Total Crew: {total}</p>
                <p>Mage Population: {total > 0 ? ((mages/total)*100).toFixed(0) : 0}%</p>
                <div className="success-bar">
                    <h3>Success Probability: {successMetric}%</h3>
                    {isLegendary ? <p>✨ LEGENDARY CREW STATUS REACHED ✨</p> : <p>Keep recruiting...</p>}
                </div>
            </div>

            {/* Stretch Feature: Look of the list changes based on success metric */}
            <div className={`gallery-container ${isLegendary ? 'legendary-theme' : ''}`}>
                {posts && posts.length > 0 ? (
                    posts.map((post) => (
                        <div key={post.id} className="crewmate-card">
                            <img src="https://shorthaired-curio-664.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F7b2c0b5d-0b1e-4b1a-9b1d-0b1e4b1a9b1d%2Fcrewmate.png?table=block&id=0b1e4b1a-9b1d-0b1e-4b1a-9b1d0b1e4b1a&spaceId=7b2c0b5d-0b1e-4b1a-9b1d-0b1e4b1a9b1d&width=250&userId=&cache=v2" alt="crew" className="crewmate-img" />
                            <h3>{post.name}</h3>
                            <p>Class: {post.attribute1}</p>
                            <p>Specialty: {post.attribute2}</p>
                            <Link to={'/edit/' + post.id}><button className="edit-btn">Edit</button></Link>
                        </div>
                    ))
                ) : <h2>No Crewmates Yet 🚀</h2>}
            </div>
        </div>  
    );
};
export default ReadPosts;