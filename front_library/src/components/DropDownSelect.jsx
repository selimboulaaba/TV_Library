import {
    FiEdit,
    FiChevronDown,
} from "react-icons/fi";
import { BiCameraMovie } from "react-icons/bi";
import { MdOutlineLiveTv } from "react-icons/md";
import { PiFloppyDisk } from "react-icons/pi";

import { motion } from "framer-motion";
import { useState } from "react";

function DropDownSelect({ type, setType }) {
    const [open, setOpen] = useState(false);

    return (
        <div className="p-8 flex items-center justify-center">
            <motion.div animate={open ? "open" : "closed"} className="relative">
                <button
                    onClick={() => setOpen((pv) => !pv)}
                    className="flex items-center gap-2 px-16 py-2 rounded-md text-indigo-50 bg-indigo-500 hover:bg-indigo-500 transition-colors"
                >
                    <span className="font-medium text-sm">{type}</span>
                    <motion.span variants={iconVariants}>
                        <FiChevronDown />
                    </motion.span>
                </button>

                <motion.ul
                    initial={wrapperVariants.closed}
                    variants={wrapperVariants}
                    style={{ originY: "top", translateX: "-50%" }}
                    className="z-40 flex flex-col gap-2 p-2 rounded-lg bg-white shadow-xl absolute top-[120%] left-[50%] w-48 overflow-hidden"
                >
                    <Option setOpen={setOpen} Icon={PiFloppyDisk} text="All" setType={setType} />
                    <Option setOpen={setOpen} Icon={BiCameraMovie} text="Movies" setType={setType} />
                    <Option setOpen={setOpen} Icon={MdOutlineLiveTv} text="TV Series" setType={setType} />
                </motion.ul>
            </motion.div>
        </div>
    );
};

const Option = ({ text, Icon, setOpen, setType }) => {
    return (
        <motion.li
            variants={itemVariants}
            onClick={() => { setOpen(false); setType(text) }}
            className="flex items-center gap-2 w-full p-2 text-xs font-medium whitespace-nowrap rounded-md hover:bg-indigo-100 text-slate-700 hover:text-indigo-500 transition-colors cursor-pointer"
        >
            <motion.span variants={actionIconVariants}>
                <Icon />
            </motion.span>
            <span>{text}</span>
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