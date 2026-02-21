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
        <div ref={containerRef} className={icons.length === 5 ? "pt-1 py-8 px-1 sm:px-2" : "pb-8 sm:py-8 px-1 sm:px-2"}>
            <motion.div animate={open ? "open" : "closed"} className="relative">
                <button
                    type="button"
                    onClick={(e) => { e.preventDefault(); setOpen((pv) => !pv); }}
                    className={`${icons.length === 5 ? 'px-16' : 'px-5 sm:px-10 md:px-16'} flex items-center gap-2 py-2 rounded-md text-white bg-[#7f553980] hover:bg-[#63422d80] transition-colors`}
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
            className="flex items-center gap-2 w-full sm:p-2 text-xs font-medium whitespace-nowrap rounded-md hover:bg-[#f3e8e0] text-slate-700 hover:text-[#6e452a] transition-colors cursor-pointer"
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