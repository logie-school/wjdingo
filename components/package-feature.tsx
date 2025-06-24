"use client";

import { CheckIcon, XIcon } from "lucide-react";
import * as React from "react";

interface PackageFeatureProps {
    enabled: boolean;
    title: string;
}

const PackageFeature: React.FC<PackageFeatureProps> = ({ enabled, title }) => {
    if (!enabled) {
        return (
            <div className="flex items-center gap-4 w-full border-b-1 border-solid border-accent p-2 shrink-0">
                <XIcon className=" dark:text-red-300 text-red-800 shrink-0" />
                <p>{title}</p>
            </div>
        );
    }

    return (
        <div className="flex items-center gap-4 w-full border-b-1 border-solid border-accent p-2">
            <CheckIcon className="dark:text-green-300 text-green-800 shrink-0" />
            <p>{title}</p>
        </div>
    );
};

export { PackageFeature };