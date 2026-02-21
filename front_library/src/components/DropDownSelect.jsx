import {
    FiChevronDown,
} from "react-icons/fi";
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";

function DropDownSelect({ options, icons, selected, setSelected }) {
    const [open, setOpen] = useState(false);
    const containerRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            const isInside = (containerRef.current && containerRef.current.contains(event.target)) || 
                             (event.composedPath && event.composedPath().includes(containerRef.current));
            if (!isInside) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("touchstart", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("touchstart", handleClickOutside);
        };
    }, []);

    return (
        <div ref={containerRef} className="relative w-full">
            <motion.div animate={open ? "open" : "closed"} className="relative">
                <button
                    type="button"
                    onClick={(e) => { e.preventDefault(); setOpen((pv) => !pv); }}
                    className={`px-4 sm:px-6 md:px-8 flex w-full justify-between sm:justify-center items-center gap-2 py-2.5 rounded-xl text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 transition-colors shadow-sm`}
                >
                    <span className="font-medium text-sm">{selected || 'All'}</span>
                    <motion.span variants={iconVariants}>
                        <FiChevronDown />
                    </motion.span>
                </button>

                <motion.ul
                    initial={wrapperVariants.closed}
                    variants={wrapperVariants}
                    style={{ originY: "top" }}
                    className={`w-full z-40 flex flex-col gap-1 p-2 rounded-xl bg-white border border-slate-200 shadow-xl absolute top-[110%] left-0 overflow-hidden`}
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
            className="flex items-center gap-2 w-full p-2 text-xs font-medium whitespace-nowrap rounded-lg hover:bg-slate-100 text-slate-600 hover:text-indigo-600 transition-colors cursor-pointer"
        >
            <motion.span variants={actionIconVariants}>
                <Icon className="text-indigo-500 text-base" />
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