import {
    FiChevronDown,
} from "react-icons/fi";
import { motion } from "framer-motion";
import { useState } from "react";

function DropDownSelect({ options, icons, selected, setSelected }) {
    const [open, setOpen] = useState(false);

    return (
        <div className={icons.length === 5 ? "pt-1 py-8 px-1 sm:px-2" : "pb-8 sm:py-8 px-1 sm:px-2"}>
            <motion.div animate={open ? "open" : "closed"} className="relative">
                <button
                    onClick={() => setOpen((pv) => !pv)}
                    className={`${icons.length === 5 ? 'px-16' : 'px-5 sm:px-10 md:px-16'} flex items-center gap-2 py-2 rounded-md text-indigo-50 bg-indigo-500 hover:bg-indigo-500 transition-colors`}
                >
                    <span className="font-medium text-sm">{selected || 'All'}</span>
                    <motion.span variants={iconVariants}>
                        <FiChevronDown />
                    </motion.span>
                </button>

                <motion.ul
                    initial={wrapperVariants.closed}
                    variants={wrapperVariants}
                    style={{ originY: "top", translateX: "-50%" }}
                    className={`${icons.length === 5 ? 'w-48' : 'w-32 md:w-48'} z-40 flex flex-col gap-2 p-2 rounded-lg bg-white shadow-xl absolute top-[120%] left-[50%] overflow-hidden`}
                >
                    {options.map((option, index) => (
                        <Option key={index} setOpen={setOpen} Icon={icons[index]} text={option} setSelected={setSelected} />

                    ))}
                </motion.ul>
            </motion.div>
        </div>
    );
};

const Option = ({ text, Icon, setOpen, setSelected }) => {
    return (
        <motion.li
            variants={itemVariants}
            onClick={() => { setOpen(false); setSelected(text) }}
            className="flex items-center gap-2 w-full sm:p-2 text-xs font-medium whitespace-nowrap rounded-md hover:bg-indigo-100 text-slate-700 hover:text-indigo-500 transition-colors cursor-pointer"
        >
            <motion.span variants={actionIconVariants}>
                <Icon />
            </motion.span>
            <span>{text || 'All'}</span>
        </motion.li>
    );
};

export default DropDownSelect

const wrapperVariants = {
    open: {
        scaleY: 1,
        transition: {
            when: "beforeChildren",
            staggerChildren: 0.1,
        },
    },
    closed: {
        scaleY: 0,
        transition: {
            when: "afterChildren",
            staggerChildren: 0.1,
        },
    },
};

const iconVariants = {
    open: { rotate: 180 },
    closed: { rotate: 0 },
};

const itemVariants = {
    open: {
        opacity: 1,
        y: 0,
        transition: {
            when: "beforeChildren",
        },
    },
    closed: {
        opacity: 0,
        y: -15,
        transition: {
            when: "afterChildren",
        },
    },
};

const actionIconVariants = {
    open: { scale: 1, y: 0 },
    closed: { scale: 0, y: -7 },
};