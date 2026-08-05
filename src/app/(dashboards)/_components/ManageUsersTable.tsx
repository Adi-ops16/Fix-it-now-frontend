"use client";

import { useMemo, useState } from "react";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { IUser } from "@/lib/types";


type Props = {
    users: IUser[];
    toggleAction?: (formData: FormData) => Promise<any>
};

export default function ManageUsersTable({ users, toggleAction }: Props) {
    const [roleFilter, setRoleFilter] = useState("ALL");
    const [search, setSearch] = useState("");

    const filteredUsers = useMemo(() => {
        return users.filter((user) => {
            const matchesRole =
                roleFilter === "ALL" || user.role === roleFilter;

            const matchesSearch =
                user.name
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                user.email
                    .toLowerCase()
                    .includes(search.toLowerCase());

            return matchesRole && matchesSearch;
        });
    }, [users, roleFilter, search]);

    return (
        <div className="space-y-6">

            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

                <Input
                    placeholder="Search name or email..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="max-w-sm"
                />

                <Select
                    value={roleFilter}
                    onValueChange={(value) => setRoleFilter(value || "ALL")}
                >
                    <SelectTrigger className="w-45">
                        <SelectValue placeholder="Role" />
                    </SelectTrigger>

                    <SelectContent>
                        <SelectItem value="ALL">
                            All Roles
                        </SelectItem>

                        <SelectItem value="CUSTOMER">
                            Customer
                        </SelectItem>

                        <SelectItem value="TECHNICIAN">
                            Technician
                        </SelectItem>

                        <SelectItem value="ADMIN">
                            Admin
                        </SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="rounded-lg border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>User</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Joined</TableHead>
                            <TableHead className="text-right">
                                Action
                            </TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {filteredUsers.length === 0 ? (
                            <TableRow>
                                <TableCell
                                    colSpan={6}
                                    className="h-32 text-center text-muted-foreground"
                                >
                                    No users found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            filteredUsers.map((user) => (
                                <TableRow key={user.id}>

                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <img
                                                src={
                                                    user.photo_url ??
                                                    "/avatar.png"
                                                }
                                                alt={user.name}
                                                className="h-10 w-10 rounded-full object-cover"
                                            />

                                            <span className="font-medium">
                                                {user.name}
                                            </span>
                                        </div>
                                    </TableCell>

                                    <TableCell>
                                        {user.email}
                                    </TableCell>

                                    <TableCell>
                                        <Badge
                                            variant={
                                                user.role === "ADMIN"
                                                    ? "default"
                                                    : "secondary"
                                            }
                                        >
                                            {user.role}
                                        </Badge>
                                    </TableCell>

                                    <TableCell>
                                        <Badge
                                            variant={
                                                user.user_status === "ACTIVE"
                                                    ? "default"
                                                    : "destructive"
                                            }
                                        >
                                            {user.user_status}
                                        </Badge>
                                    </TableCell>

                                    <TableCell>
                                        {new Date(
                                            user.created_at
                                        ).toLocaleDateString()}
                                    </TableCell>

                                    <TableCell className="text-right">
                                        {toggleAction ? (
                                            <form action={toggleAction} className="inline-block">
                                                <input type="hidden" name="userId" value={user.id} />
                                                <input type="hidden" name="currentStatus" value={user.user_status} />
                                                {user.user_status === "ACTIVE" ? (
                                                    <Button size="sm" variant="destructive" type="submit">
                                                        Ban
                                                    </Button>
                                                ) : (
                                                    <Button size="sm" type="submit">
                                                        Unban
                                                    </Button>
                                                )}
                                            </form>
                                        ) : (
                                            user.user_status === "ACTIVE" ?
                                                <Button size="sm" variant="destructive">
                                                    Ban
                                                </Button>
                                                :
                                                <Button size="sm" >
                                                    Unban
                                                </Button>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}