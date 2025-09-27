"use client";

import { Chat } from "@/components/ai-chat-drawer/chat";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerClose, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";

export const AiChatDrawer = () => {
  return (
    <Drawer direction="right" modal={false}>
      <DrawerTrigger asChild>
        <Button variant="outline" className="fixed right-4 bottom-4">
          Open Drawer
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto flex h-full w-full max-w-md flex-col">
          <DrawerHeader className="flex flex-row items-center justify-between">
            <DrawerTitle>Move Goal</DrawerTitle>

            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerHeader>
          <div className="flex-1 overflow-hidden">
            <Chat />
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
