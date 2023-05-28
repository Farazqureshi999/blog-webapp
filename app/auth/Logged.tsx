'use client';

import {signOut} from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

interface LoggedProps{
    image:string;
}

export default function Logged({image}:LoggedProps) {
    return (
        <li className="flex gap-8 item-center">
            <button
                className="px-6 py-2 text-sm text-white bg-gray-700 rounded-xl"
                onClick={() => signOut()}>Sign out</button>
            <Link href={'/dashboard'} >
                <Image width={64} className="w-12 rounded-full" height={64} src={image} priority alt="logo"/>
            </Link>
        </li>
    )
}