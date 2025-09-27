"use client";

import { DeepseekIcon } from "@/icons/deepseek.icon";
import { OpenaiIcon } from "@/icons/openai.icon";
import { useChat } from "@ai-sdk/react";
import { CopyIcon, GlobeIcon, RefreshCcwIcon } from "lucide-react";
import { Fragment, useState } from "react";

import { cn } from "@/lib/utils";
import { Action, Actions } from "@/components/ai-elements/actions";
import { Conversation, ConversationContent, ConversationScrollButton } from "@/components/ai-elements/conversation";
import { Loader } from "@/components/ai-elements/loader";
import { Message, MessageContent } from "@/components/ai-elements/message";
import {
  PromptInput,
  PromptInputActionAddAttachments,
  PromptInputActionMenu,
  PromptInputActionMenuContent,
  PromptInputActionMenuTrigger,
  PromptInputAttachment,
  PromptInputAttachments,
  PromptInputBody,
  PromptInputButton,
  PromptInputModelSelect,
  PromptInputModelSelectContent,
  PromptInputModelSelectItem,
  PromptInputModelSelectTrigger,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputToolbar,
  PromptInputTools,
  type PromptInputMessage,
} from "@/components/ai-elements/prompt-input";
import { Reasoning, ReasoningContent, ReasoningTrigger } from "@/components/ai-elements/reasoning";
import { Response } from "@/components/ai-elements/response";
import { Source, Sources, SourcesContent, SourcesTrigger } from "@/components/ai-elements/sources";

const models = [
  {
    name: "GPT 4o",
    value: "openai/gpt-4o",
    icon: <OpenaiIcon className="size-4" />,
  },
  {
    name: "Deepseek R1",
    value: "deepseek/deepseek-r1",
    icon: <DeepseekIcon className="size-4" />,
  },
];

export const Chat = () => {
  const [input, setInput] = useState("");
  const [model, setModel] = useState<string>(models[0].value);
  const [webSearch, setWebSearch] = useState(false);
  const { messages, sendMessage, status, regenerate } = useChat();

  const handleSubmit = (message: PromptInputMessage) => {
    const hasText = Boolean(message.text);
    const hasAttachments = Boolean(message.files?.length);

    if (!(hasText || hasAttachments)) {
      return;
    }

    void sendMessage(
      {
        text: message.text ?? "Sent with attachments",
        files: message.files,
      },
      {
        body: {
          model,
          webSearch,
        },
      },
    );

    setInput("");
  };

  return (
    <div className="flex h-full flex-col">
      <Conversation className="flex-1">
        <ConversationContent className="p-4">
          {messages.map((message) => (
            <div key={message.id} className="py-2">
              {message.role === "assistant" &&
                message.parts.filter((part) => part.type === "source-url").length > 0 && (
                  <Sources>
                    <SourcesTrigger count={message.parts.filter((part) => part.type === "source-url").length} />
                    {message.parts
                      .filter((part) => part.type === "source-url")
                      .map((part, i) => (
                        <SourcesContent key={message.id}>
                          <Source href={part.url} title={part.url} />
                        </SourcesContent>
                      ))}
                  </Sources>
                )}
              {message.parts.map((part, i) => {
                switch (part.type) {
                  case "text":
                    return (
                      <Fragment key={message.id}>
                        <Message from={message.role}>
                          <MessageContent>
                            <Response>{part.text}</Response>
                          </MessageContent>
                        </Message>
                        {message.role === "assistant" && i === messages.length - 1 && (
                          <Actions className="ml-2">
                            <Action onClick={() => regenerate()} label="Retry">
                              <RefreshCcwIcon className="size-3" />
                            </Action>
                            <Action onClick={() => navigator.clipboard.writeText(part.text)} label="Copy">
                              <CopyIcon className="size-3" />
                            </Action>
                          </Actions>
                        )}
                      </Fragment>
                    );
                  case "reasoning":
                    return (
                      <Reasoning
                        key={message.id}
                        className="mb-0.5 w-full"
                        isStreaming={
                          status === "streaming" && i === message.parts.length - 1 && message.id === messages.at(-1)?.id
                        }
                      >
                        <ReasoningTrigger />
                        <ReasoningContent>{part.text}</ReasoningContent>
                      </Reasoning>
                    );
                  case "step-start": {
                    throw new Error('Not implemented yet: "step-start" case');
                  }
                  case "dynamic-tool": {
                    throw new Error('Not implemented yet: "dynamic-tool" case');
                  }
                  case "source-url": {
                    throw new Error('Not implemented yet: "source-url" case');
                  }
                  case "source-document": {
                    throw new Error('Not implemented yet: "source-document" case');
                  }
                  case "file": {
                    throw new Error('Not implemented yet: "file" case');
                  }
                  default:
                    return null;
                }
              })}
            </div>
          ))}
          {status === "submitted" && <Loader />}
        </ConversationContent>
        <ConversationScrollButton />
      </Conversation>

      <div className="p-4 pt-0">
        <PromptInput
          onSubmit={handleSubmit}
          globalDrop
          multiple
          className="focus-within:outline-primary/60 transition-all duration-300 focus-within:outline-2"
        >
          <PromptInputBody className="border-0">
            <PromptInputAttachments>
              {(attachment) => <PromptInputAttachment data={attachment} />}
            </PromptInputAttachments>
            <PromptInputTextarea onChange={(e) => setInput(e.target.value)} value={input} />
          </PromptInputBody>
          <PromptInputToolbar className="border-0">
            <PromptInputTools>
              <PromptInputActionMenu>
                <PromptInputActionMenuTrigger />
                <PromptInputActionMenuContent>
                  <PromptInputActionAddAttachments />
                </PromptInputActionMenuContent>
              </PromptInputActionMenu>
              <PromptInputButton variant="ghost" onClick={() => setWebSearch(!webSearch)}>
                <GlobeIcon size={16} className={cn(webSearch && "text-foreground")} />
                <span className={cn("text-xs", webSearch && "text-foreground")}>Search</span>
              </PromptInputButton>
              <PromptInputModelSelect
                onValueChange={(value) => {
                  setModel(value);
                }}
                value={model}
              >
                <PromptInputModelSelectTrigger hideIcon className="rounded-full">
                  {models.find((model) => model.value === model.value)?.icon}
                </PromptInputModelSelectTrigger>
                <PromptInputModelSelectContent>
                  {models.map((model) => (
                    <PromptInputModelSelectItem key={model.value} value={model.value}>
                      {model.name}
                      {model.icon}
                    </PromptInputModelSelectItem>
                  ))}
                </PromptInputModelSelectContent>
              </PromptInputModelSelect>
            </PromptInputTools>
            <PromptInputSubmit
              disabled={!input && !status}
              status={status}
              className={cn("bg-muted hover:bg-muted rounded-full", input && "bg-blue-500 hover:bg-blue-600")}
            />
          </PromptInputToolbar>
        </PromptInput>
      </div>
    </div>
  );
};
