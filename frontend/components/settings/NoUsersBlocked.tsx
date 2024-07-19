import React from 'react';
import { Typography, Box } from '@mui/material';
import { motion } from 'framer-motion';
import Image from 'next/image';

const NoUsersBlocked = () => {
  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      bgcolor="background.default"
      color="text.primary"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ rotate: 360, scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
          duration: 0.5,
        }}
      >
        
      </motion.div>
      <Typography variant="h5" marginTop={2}>
        No users blocked
      </Typography>
    </Box>
  );
};

export default NoUsersBlocked;
