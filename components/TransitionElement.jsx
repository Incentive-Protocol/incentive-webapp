import { motion } from "framer-motion";

export function TransitionElement({ children }) {

    return (
        <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.2 }}
        >
            {children}
        </motion.div>
    )
}