"use server";

import mongoose from "mongoose";
import { connectToDatabase } from "../database/mongoose";
import { handleError } from "../utils";
import Group from "../database/models/group.model";


export async function createGroup(
    groupName: string,
    creatorId: string,
    membersIds: string[] = [],
) {
    try {
        await connectToDatabase();

        const creatorObjectId = new mongoose.Types.ObjectId(creatorId);
        const members = Array.from(
            new Set([
                creatorObjectId,
                ...membersIds.map((id) => new mongoose.Types.ObjectId(id)),
            ]),
        );

        const newGroup = await Group.create({
            name: groupName,
            createdBy: creatorObjectId,
            members,
        });
        return JSON.parse(JSON.stringify(newGroup));
    } catch (error) {
        console.error("Error creating group:",error);
        handleError(error);
    }
}

export async function addMemberToGroup(groupId: string, userId: string) {
    try {
        await connectToDatabase();
        const group = await Group.findById(groupId);
        if (!group) {
            throw new Error("Group not found");
        }

        if (!group.members.includes(userId)) {
            group.members.push(userId);
            await group.save();
        }
        return JSON.parse(JSON.stringify(group));
    }catch (error) {
        console.error("Error adding member to group:", error);
        handleError(error);
    }
}


export async function addMessageToGroup(
    groupId: string,
    userId: string,
    text: string,
) {
    try {
        await connectToDatabase();
        const group = await Group.findById(groupId);
        if(!group) throw new Error("Group not found");


        // convert userID to ObjectId
        const senderObjectId = new mongoose.Types.ObjectId(userId);
        const message = {
            sender: senderObjectId,
            text,
        };
        group.messages.push(message);
        await group.save();

        return JSON.parse(JSON.stringify(group));
    } catch (error) {
        console.error("Error adding message to group:", error);
        handleError(error);
    }
}

export async function getGroupById(groupId: string) {
    try {
        await connectToDatabase();
        const group = await Group.findById(groupId).populate(
            "members",
            "firstName lastName photo",
        );
        if (!group) throw new Error("Group not found");
        return JSON.parse(JSON.stringify(group));
    } catch (error) {
        console.error("Error retrieving group:", error);
        handleError(error);
    }
}

export async function getAllGroups() {
    try {
        await connectToDatabase();
        const groups = await Group.find().populate(
            "members",
            "firstName lastName photo",
        );

        return JSON.parse(JSON.stringify(groups));
    } catch (error) {
        console.error("Error retrieving groups:", error);
        handleError(error);
    }
}

export async function getGroupMessages(groupId: string) {
    try {
        await connectToDatabase();
        const group = await Group.findById(groupId).populate(
            "messages.sender",
            "firstName lastName photo",
        )
        if (!group) throw new Error("Group not found");

        return JSON.parse(JSON.stringify(group.messages));
    } catch (error) {
        console.error("Error retrieving group messages:", error);
        handleError(error);
    }
}