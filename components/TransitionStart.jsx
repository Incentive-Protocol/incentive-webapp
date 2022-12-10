import { motion } from 'framer-motion';

export function TransitionStart({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="Animation Flex Center Column"
      style={{ gap: '4rem ' }}>
      {children}
    </motion.div>
  );
}
