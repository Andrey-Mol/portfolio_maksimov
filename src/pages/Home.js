import React from 'react';
import { motion } from 'framer-motion';

const Home = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
        >
            <h1>Welcome to My Portfolio</h1>
            <p>Here you can see my latest design projects.</p>
        </motion.div>
    );
};

export default Home;